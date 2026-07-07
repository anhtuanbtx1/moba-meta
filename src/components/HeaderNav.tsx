import { Link, useLocation } from 'react-router-dom';
import { Shield, Map as MapIcon, Trophy, Users, User } from 'lucide-react';

export default function HeaderNav() {
  const location = useLocation();
  const path = location.pathname;

  const getNavClass = (isActive: boolean) => {
    return isActive 
      ? "relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/50 bg-blue-500/10 shrink-0 hok-chip-active" 
      : "relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-gray-400 shrink-0 hover:bg-white/10 transition-all duration-300 active:scale-[0.98]";
  };
  const getNavTextClass = (isActive: boolean) => {
    return isActive 
      ? "text-xs font-bold text-blue-400 whitespace-nowrap" 
      : "text-xs font-semibold text-gray-400 whitespace-nowrap";
  };
  const getIconColor = (isActive: boolean) => isActive ? "#60a5fa" : "#9ca3af";

  return (
    <div className="w-full bg-[#0A0A0F] hok-nav-enter">
      {/* Sub-navigation Horizontal Scroll */}
      <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto no-scrollbar border-b border-[#1A1A24]">
        
        {/* Logo/Icon */}
        <Link to="/" className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm mr-1 hok-float">
          <div className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center">
             <Shield size={12} className="text-white" />
          </div>
        </Link>

        <Link to="/" className={getNavClass(path === "/")}>
          <MapIcon size={14} color={getIconColor(path === "/")} />
          <span className={getNavTextClass(path === "/")}>BẢN ĐỒ</span>
          {path === "/" && <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500"></div>}
        </Link>

        <Link to="/meta" className={getNavClass(path.includes("/meta"))}>
          <Trophy size={14} color={getIconColor(path.includes("/meta"))} />
          <span className={getNavTextClass(path.includes("/meta"))}>META</span>
          {path.includes("/meta") && <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500"></div>}
        </Link>

        <Link to="/factions" className={getNavClass(path.includes("/factions"))}>
          <Users size={14} color={getIconColor(path.includes("/factions"))} />
          <span className={getNavTextClass(path.includes("/factions"))}>PHE CÁNH</span>
          {path.includes("/factions") && <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500"></div>}
        </Link>

        <div className="flex-1"></div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <span className="text-[10px] font-bold text-red-400">VI</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <User size={14} className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
