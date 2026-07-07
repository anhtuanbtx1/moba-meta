import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { REGIONS_MOCK, getHeroesByRegion } from "../data/heroesMockData";
import HeaderNav from "../components/HeaderNav";

const FACTIONS = REGIONS_MOCK.map(r => ({
  id: r.id,
  name: r.name,
  heroCount: getHeroesByRegion(r.id).length
})).filter(f => f.heroCount > 0); // Only show factions with heroes

export default function Factions() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState("truong-thanh");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHero, setSelectedHero] = useState("bach-ly-huyen-sach");
  const rightScrollRef = useRef<HTMLDivElement>(null);
  const leftScrollRef = useRef<HTMLDivElement>(null);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const handleRightScroll = () => {
    if (!rightScrollRef.current) return;
    const container = rightScrollRef.current;
    const cards = container.querySelectorAll(".faction-card");
    let closestId = activeId;
    let minDistance = Infinity;
    const containerCenter = container.getBoundingClientRect().top + (container.getBoundingClientRect().height / 2);
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + (rect.height / 2);
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) { minDistance = distance; closestId = card.id.replace("card-", ""); }
    });
    if (closestId !== activeId) {
      setActiveId(closestId);
      const leftItem = leftScrollRef.current?.querySelector("#nav-" + closestId);
      if (leftItem) leftItem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleSelectFaction = (id: string) => {
    setActiveId(id);
    const card = rightScrollRef.current?.querySelector("#card-" + id);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    if (modalContentRef.current && modalContentRef.current.scrollTop > 0) return;
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const y = e.touches[0].clientY;
    if (y > startY) {
      setCurrentY(y - startY);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (currentY > 100) {
      setIsModalOpen(false);
    }
    setCurrentY(0);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isModalOpen]);

  const currentFaction = FACTIONS.find(f => f.id === activeId);
  const currentHeroes = getHeroesByRegion(activeId) || getHeroesByRegion("truong-thanh");

  return (
    <div className="h-[100dvh] bg-[#0A0A0F] text-gray-100 flex flex-col font-sans overflow-hidden relative hok-page-enter">
      <HeaderNav />
      <div className="px-4 py-3 bg-[#0A0A0F] z-10 border-b border-[#1A1A24] sticky top-0">
        <div className="relative border border-[#d4af37]/25 rounded-2xl bg-[#12121A] hok-search-focus hok-shine">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#d4af37]/70 text-sm">⌕</span>
          <input type="text" className="block w-full pl-10 pr-3 py-2.5 rounded-2xl bg-transparent text-gray-300 sm:text-sm outline-none placeholder:text-gray-500" placeholder="Tìm tướng, skin, khu vực..." />
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-[35%] flex flex-col bg-[#0A0A0F] border-r border-[#1A1A24] h-full">
          <div className="px-3 py-4 text-[11px] font-bold text-[#d4af37] tracking-wider uppercase">THẾ LỰC ({FACTIONS.length})</div>
          <div ref={leftScrollRef} className="flex-1 overflow-y-auto overflow-x-hidden pb-20 no-scrollbar">
            {FACTIONS.map(f => {
              const isActive = activeId === f.id;
              return (
                <div key={f.id} id={"nav-" + f.id} onClick={() => handleSelectFaction(f.id)} className={isActive ? "relative py-4 pl-4 pr-2 cursor-pointer transition-all duration-300 bg-gradient-to-r from-[#d4af37]/10 to-transparent text-white hok-chip-active" : "relative py-4 pl-4 pr-2 cursor-pointer transition-all duration-300 text-gray-400 hover:text-gray-200 active:scale-[0.98]"}>
                  {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-3/5 bg-[#d4af37] rounded-r-md"></div>}
                  <div className={isActive ? "text-[14px] truncate w-full font-semibold hok-title-shine" : "text-[14px] truncate w-full font-medium"}>{f.name}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div ref={rightScrollRef} onScroll={handleRightScroll} className="w-[65%] overflow-y-auto snap-y snap-mandatory no-scrollbar scroll-smooth relative bg-[#08080C]" style={{ scrollPaddingTop: "50vh", scrollPaddingBottom: "50vh" }}>
          <div className="h-[15vh] snap-align-none shrink-0"></div>
          <div className="px-4 pb-[30vh] space-y-6">
            {FACTIONS.map(f => {
              const isActive = activeId === f.id;
              return (
                <div key={f.id} id={"card-" + f.id} className="faction-card snap-center shrink-0 w-full flex justify-center py-2" style={{ "--i": FACTIONS.findIndex(x => x.id === f.id) } as React.CSSProperties}>
                  <div className={isActive ? "relative w-full max-w-sm rounded-[24px] flex flex-col items-center justify-center overflow-hidden aspect-[3/4] bg-[#12121A] border-[1.5px] border-[#d4af37] opacity-100 scale-100 hok-card-motion hok-card-active" : "relative w-full max-w-sm rounded-[24px] flex flex-col items-center justify-center overflow-hidden aspect-[4/5] bg-[#0c0c14] border border-[#1A1A24] opacity-50 scale-90 hok-card-motion"}>
                    {isActive && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                         <div className="w-48 h-48 border border-white/10 rounded-full absolute hok-mist"></div>
                         <div className="w-32 h-32 border border-[#d4af37]/20 rounded-full absolute hok-float"></div>
                      </div>
                    )}
                    <div className="relative z-10 flex flex-col items-center p-6 w-full h-full justify-between">
                      <div className="flex flex-col items-center mt-6">
                        <h2 className={isActive ? "font-chakra font-bold text-center uppercase tracking-wider text-[22px] text-white" : "font-chakra font-bold text-center uppercase tracking-wider text-sm text-gray-400"}>{f.name}</h2>
                        <p className={isActive ? "text-[#d4af37] text-sm mt-1 font-medium" : "text-gray-500 text-xs mt-1"}>{f.heroCount} Tướng</p>
                      </div>
                      <div className="mb-6 w-full flex justify-center">
                        {isActive ? (
                          <button onClick={() => setIsModalOpen(true)} className="w-[85%] py-[14px] bg-gradient-to-r from-[#e8bc2a] to-[#d4af37] text-[#0A0A0F] font-black text-[15px] rounded-full uppercase active:scale-95 transition-transform hok-shine">XEM TƯỚNG</button>
                        ) : (
                          <button onClick={(e) => { e.stopPropagation(); handleSelectFaction(f.id); }} className="px-8 py-2.5 bg-white/5 text-gray-400 font-semibold text-xs rounded-full uppercase active:scale-95 border border-white/10">CHỌN</button>
                        )}
                      </div>
                    </div>
                    {isActive && (
                      <>
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] border-[#d4af37] rounded-tl-[24px]"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] border-[#d4af37] rounded-tr-[24px]"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] border-[#d4af37] rounded-bl-[24px]"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] border-[#d4af37] rounded-br-[24px]"></div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className={isModalOpen ? "fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 opacity-100" : "fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 opacity-0 pointer-events-none"}
        onClick={() => setIsModalOpen(false)}
      ></div>

      <div
        className={isModalOpen && !isDragging ? "fixed bottom-0 left-0 right-0 bg-[#12121c] border-t border-white/5 z-50 rounded-t-[20px] transform hok-drawer-motion translate-y-0" : "fixed bottom-0 left-0 right-0 bg-[#12121c] border-t border-white/5 z-50 rounded-t-[20px] transform hok-drawer-motion"}
        style={{
          maxHeight: "80vh",
          transform: isDragging ? "translateY(" + currentY.toString() + "px)" : (isModalOpen ? "translateY(0)" : "translateY(100%)"),
          transition: isDragging ? "none" : "transform 360ms cubic-bezier(.16,1,.3,1)"
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="w-full flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing">
          <div className="w-10 h-1.5 bg-gray-600 rounded-full"></div>
        </div>

        <div className="flex justify-between items-center px-6 py-4 border-b border-white/5">
          <div>
            <div className="text-[10px] text-[#e8bc2a] font-bold tracking-wider mb-0.5">BẢN ĐỒ THẾ LỰC</div>
            <h3 className="text-xl font-bold text-white uppercase">{currentFaction?.name}</h3>
          </div>
          <button
            onClick={() => setIsModalOpen(false)}
            className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:bg-white/20 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div
          ref={modalContentRef}
          className="p-6 overflow-y-auto no-scrollbar"
          style={{ maxHeight: "calc(80vh - 90px)" }}
          onTouchStart={(e) => {
            if (modalContentRef.current && modalContentRef.current.scrollTop > 0) {
              e.stopPropagation();
            }
          }}
        >
          <div className="grid grid-cols-3 gap-y-6 gap-x-4 justify-items-center">
            {currentHeroes.map(hero => {
              const isSelected = selectedHero === hero.id;
              return (
                <div key={hero.id} onClick={() => { setSelectedHero(hero.id); setIsModalOpen(false); navigate("/heroes/" + hero.id); }} className="flex flex-col items-center cursor-pointer group w-full max-w-[80px] hok-avatar-enter" style={{ "--i": currentHeroes.findIndex(x => x.id === hero.id) } as React.CSSProperties}>
                  <div className={isSelected ? "w-[72px] h-[72px] rounded-full overflow-hidden mb-2.5 transition-all ring-2 ring-[#e8bc2a] p-[2.5px]" : "w-[72px] h-[72px] rounded-full overflow-hidden mb-2.5 transition-all group-hover:ring-1 ring-gray-600 p-0"}
                  >
                    <div className="w-full h-full rounded-full bg-[#1a1a2e] flex items-center justify-center overflow-hidden">
                       <img src={hero.image} alt={hero.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display="none"; if(e.currentTarget.parentElement) if (e.currentTarget.parentElement) e.currentTarget.parentElement.innerHTML = "<div class=\"w-full h-full flex items-center justify-center text-xs text-gray-500 font-semibold\">" + hero.name.substring(0, 2).toUpperCase() + "</div>"; }} />
                    </div>
                  </div>
                  <span className={isSelected ? "text-[13px] font-medium text-center leading-tight text-[#e8bc2a]" : "text-[13px] font-medium text-center leading-tight text-gray-300"}
                  >
                    {hero.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
