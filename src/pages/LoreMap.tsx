import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HEROES_MOCK_DATA, REGIONS_MOCK } from "../data/heroesMockData";
import Factions from "./Factions";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Search, Map, Grid, Shield, Book, ZoomIn, ZoomOut, Maximize, Minimize, RefreshCw } from "lucide-react";

export default function LoreMap() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <div className="h-[100dvh] overflow-hidden"><Factions /></div>;
  }
  return <DesktopLoreMap />;
}

function DesktopLoreMap() {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const regions = REGIONS_MOCK.map((r, i) => {
    const coordsMap: Record<string, { x: number; y: number }> = {
      "tien-gioi": { x: 780, y: 480 },       // Tiên Giới (Center)
      "dong-vuc": { x: 380, y: 250 },        // Đông Vực - Cửu Châu
      "nam-vuc": { x: 30, y: 650 },          // Nam Vực - Hoang Giao
      "vi-tay": { x: 920, y: 280 },          // Vi Tây Lục Mạc
      "my-nhan": { x: 120, y: 250 },         // Mỹ Nhân
      "tam-quoc": { x: 650, y: 180 },        // Tam Quốc
      "phong-than": { x: 1150, y: 550 },     // Phong Thần
      "bac-vuc": { x: 850, y: 700 },         // Bắc Vực - Băng Khâu
      "tay-du": { x: 1300, y: 350 },         // Tây Du Ký
      "ma-gioi": { x: 410, y: 510 }          // Ma Giới
    };
    const colors = ["#d4af37", "#ff4d4d", "#00f2fe", "#8a2be2", "#ffa500", "#ff69b4", "#00ff7f", "#ff1493", "#00ced1", "#ff4500"];

    return {
      ...r,
      x: coordsMap[r.id]?.x ?? 780,
      y: coordsMap[r.id]?.y ?? 480,
      color: colors[i % colors.length],
      count: HEROES_MOCK_DATA.filter(h => h.regionId === r.id).length
    };
  });

  const radius = 150;
  const mapHeroes = HEROES_MOCK_DATA.map(hero => {
    const regionHeroes = HEROES_MOCK_DATA.filter(h => h.regionId === hero.regionId);
    const heroIndex = regionHeroes.findIndex(h => h.id === hero.id);
    const region = regions.find(r => r.id === hero.regionId);
    if (!region) return { ...hero, x: 0, y: 0 };

    // Spread heroes in a circle around the region
    const angle = (heroIndex / regionHeroes.length) * 2 * Math.PI;
    return {
      ...hero,
      x: region.x + radius * Math.cos(angle),
      y: region.y + radius * Math.sin(angle)
    };
  });

  return (
    <div
      className="w-full h-screen text-white flex flex-col font-sans select-none overflow-hidden relative"
      style={{
        backgroundImage: 'url(/assets/images/background/layout_dashboard.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundColor: '#0c0c16'
      }}
    >

      {/* Top Header */}
      <header className="px-6 py-4 flex justify-between items-center border-b border-white/5 backdrop-blur-md bg-[#0c0c16]/80 z-20">
        <div className="flex items-center gap-3">
          <div className="bg-black/90 px-3 py-1.5 border border-[#d4af37] rounded flex items-center gap-2">
            <span className="text-[#d4af37] font-black tracking-widest text-sm">HOK META</span>
          </div>
          <div className="w-6 h-6 rounded-full overflow-hidden border border-white/10 flex items-center justify-center">
            <span className="text-xs">🇻🇳</span>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Q Tìm tướng..."
              className="bg-[#151522] border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-gray-200 focus:outline-none focus:border-[#d4af37] w-64 transition-all"
            />
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded text-xs font-bold tracking-wide uppercase transition-colors">
            Đăng Nhập
          </button>
        </div>
      </header>

      {/* Main Sandbox Interactive Map Area */}
      <div className="flex-1 w-full h-full relative z-10">
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={2}
          centerOnInit={true}
        >
          {({ zoomIn, zoomOut, resetTransform, zoomToElement }) => (
            <>
              <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-[1500px] !h-[900px] relative">
                {/* SVG connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                  <defs>
                    <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#d4af37" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#ff4d4d" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  {/* Dynamic connection lines from Center (index 0) to others */}
                  {regions.map((region, index) => {
                    if (index === 0) return null; // Skip center itself
                    const center = regions[0];
                    return (
                      <line
                        key={`line-${index}`}
                        x1={center.x}
                        y1={center.y}
                        x2={region.x}
                        y2={region.y}
                        stroke="url(#line-grad)"
                        strokeWidth="1.5"
                        strokeDasharray="4,4"
                      />
                    );
                  })}
                </svg>

                {/* Region Nodes */}
                {regions.map((region) => {
                  const nodeHeroes = HEROES_MOCK_DATA.filter(h => h.regionId === region.id).slice(0, 5);
                  return (
                    <div
                      key={region.id}
                      className="absolute cursor-pointer group z-10"
                      style={{ left: region.x - 110, top: region.y - 110, width: 220, height: 220 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (selectedRegion === region.id) {
                          setSelectedRegion(null);
                          resetTransform(600);
                        } else {
                          setSelectedRegion(region.id);
                          zoomToElement(region.id, 1.1, 600);
                        }
                      }}
                    >
                      {/* Floating miniature avatars around node */}
                      <div id={region.id} className={`relative w-full h-full flex items-center justify-center transition-opacity duration-700 ${selectedRegion && selectedRegion !== region.id ? 'opacity-30' : 'opacity-100'}`}>
                        <style>{`
                          @keyframes flow {
                            from { stroke-dashoffset: 28; }
                            to { stroke-dashoffset: 0; }
                          }
                        `}</style>
                        <div className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 ${selectedRegion === region.id ? 'opacity-0' : 'opacity-100'}`}>
                          {nodeHeroes.map((hero, index) => {
                            // Seeded pseudo-random hash to make offsets organic, randomized, but stable
                            const seed = hero.id + index;
                            let hash = 0;
                            for (let j = 0; j < seed.length; j++) {
                              hash = seed.charCodeAt(j) + ((hash << 5) - hash);
                            }

                            // Base sector angle to prevent overlaps + small random angle offset to guarantee no collision (max -12 to +12 degrees)
                            const sectorAngle = (index / nodeHeroes.length) * 2 * Math.PI - Math.PI / 2;
                            const randomAngleOffset = (((hash & 0xFFFF) / 65535) * 2 - 1) * (Math.PI / 15);
                            const finalAngle = sectorAngle + randomAngleOffset;

                            // Random radius between 70px and 88px to place them in different orbits
                            const randomRadius = 70 + (((hash >> 16) & 0xFF) / 255) * 18;

                            const left = 110 + randomRadius * Math.cos(finalAngle) - 16; // 16px is half of 32px (w-8)
                            const top = 110 + randomRadius * Math.sin(finalAngle) - 16;  // 16px is half of 32px (h-8)

                            return (
                              <div
                                key={hero.id}
                                className="absolute w-8 h-8 rounded-full border border-[#d4af37]/60 bg-gray-900 overflow-hidden shadow-lg transform hover:scale-125 transition-transform pointer-events-auto"
                                style={{
                                  left,
                                  top,
                                  transitionDelay: `${index * 50}ms`
                                }}
                              >
                                <img src={hero.image} alt={hero.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                              </div>
                            );
                          })}
                        </div>

                        {/* Hexagonal Core Faction Button */}
                        <div
                          className={`w-28 h-32 flex flex-col items-center justify-center border transition-all duration-300 relative shadow-2xl ${selectedRegion === region.id ? 'bg-[#151522]/40 opacity-50' : 'bg-[#151522]/90 group-hover:scale-105'}`}
                          style={{
                            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                            borderColor: region.color + (selectedRegion === region.id ? "30" : "60"),
                            boxShadow: selectedRegion === region.id ? 'none' : `0 0 25px ${region.color}15`
                          }}
                        >
                          <Map size={24} color={region.color} className="mb-1" />
                          <span className="text-white text-center font-black text-[11px] leading-tight px-2 tracking-wide uppercase">
                            {region.name.replace(/\n/g, ' ')}
                          </span>
                          <span className="text-[#d4af37] text-[10px] font-bold mt-1">
                            {region.count} Tướng
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Expanded Heroes for selected region */}
                {mapHeroes.map(hero => {
                  const region = regions.find(r => r.id === hero.regionId);
                  const isSelected = selectedRegion === hero.regionId;
                  return (
                    <div
                      key={hero.id}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer z-20 hover:z-50 ${isSelected ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"}`}
                      style={{
                        left: isSelected ? hero.x : (region?.x || hero.x),
                        top: isSelected ? hero.y : (region?.y || hero.y),
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/heroes/" + hero.id);
                      }}
                    >
                      {/* Dashed line to region center */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0" style={{ left: '50%', top: '50%' }}>
                        <line
                          x1={0}
                          y1={0}
                          x2={(region?.x || hero.x) - hero.x}
                          y2={(region?.y || hero.y) - hero.y}
                          stroke={region?.color || "#d4af37"}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeDasharray="12, 16"
                          opacity={isSelected ? 0.8 : 0}
                          style={{ animation: 'flow 2s linear infinite' }}
                        />
                      </svg>

                      <div className={`${isSelected ? 'animate-heroReveal' : ''}`}>
                        <div className="relative z-10 group hover:scale-110 transition-transform flex flex-col items-center">
                          {/* Outer animated rings on hover */}
                          <div className="absolute inset-[-8px] rounded-full border-[1.5px] border-dashed border-[#00e5ff] opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" style={{ animation: 'spin 15s linear infinite' }}></div>
                          <div className="absolute inset-[-8px] rounded-full border-2 border-transparent border-t-[#22c55e] border-r-[#22c55e] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ animation: 'spin 8s linear infinite reverse' }}></div>

                          {/* Avatar */}
                          <div className="w-16 h-16 rounded-full border-[1.5px] border-[#d4af37] bg-gray-900 overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.4)] relative z-10">
                            <img src={hero.image} alt={hero.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                          </div>

                          {/* Tooltip Card */}
                          <div className="absolute top-[120%] bg-[#1a1814] border border-[#d4af37] rounded-xl px-5 py-2.5 w-max min-w-[130px] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-50 flex flex-col items-center">
                            <span className="text-white font-black text-sm tracking-widest uppercase drop-shadow-md">
                              {hero.name}
                            </span>
                            <span className="text-[#d4af37] font-bold text-[9px] tracking-widest uppercase mt-0.5">
                              {hero.roles.join(" - ")}
                            </span>

                            {/* Decorative Divider */}
                            <div className="flex items-center justify-center w-full my-2">
                              <div className="w-[3px] h-[3px] rotate-45 bg-[#d4af37]"></div>
                              <div className="h-[1px] bg-[#d4af37]/60 flex-1 mx-1"></div>
                              <div className="w-[3px] h-[3px] rotate-45 bg-[#d4af37]"></div>
                            </div>

                            <span className="text-[#d4af37] font-bold text-[10px] tracking-widest uppercase">
                              ♦ {hero.views} NHIỆT
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </TransformComponent>

              {/* Bottom Right Zoom controls */}
              <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20">
                <button onClick={() => zoomIn()} className="w-10 h-10 bg-white text-gray-900 font-bold rounded flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors">
                  <ZoomIn size={18} />
                </button>
                <button onClick={() => zoomOut()} className="w-10 h-10 bg-white text-gray-900 font-bold rounded flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors">
                  <ZoomOut size={18} />
                </button>
                <button onClick={() => resetTransform()} className="w-10 h-10 bg-white text-gray-900 font-bold rounded flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors" title="Đặt lại thu phóng">
                  <RefreshCw size={18} />
                </button>
                <button onClick={toggleFullscreen} className="w-10 h-10 bg-[#151522] text-white rounded flex items-center justify-center shadow-lg border border-white/5 hover:bg-[#1a1a2d] transition-colors" title="Toàn màn hình">
                  {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                </button>
              </div>
            </>
          )}
        </TransformWrapper>
      </div>

      {/* Left Sidebar control panel */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 bg-black/80 border border-white/5 rounded-2xl p-3 z-20 backdrop-blur-md shadow-2xl">
        <button className="p-3 bg-[#d4af37]/20 text-[#d4af37] rounded-xl hover:bg-[#d4af37]/30 transition-all">
          <Book size={20} />
        </button>
        <button className="p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
          <Map size={20} />
        </button>
        <button className="p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
          <Grid size={20} />
        </button>
        <button className="p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
          <Shield size={20} />
        </button>
      </div>

      {/* Footer copyright */}
      <footer className="absolute bottom-4 left-6 z-20 text-[10px] text-gray-500 font-medium">
        DỰ ÁN ĐANG TRONG QUÁ TRÌNH HOÀN THIỆN... V1.3
      </footer>

    </div>
  );
}
