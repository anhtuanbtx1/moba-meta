import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Home, Share2, ChevronLeft, Flag, Trophy, Shield, Info, Book, User, History, Video, Sword } from 'lucide-react';
import { getHeroBySlug } from '../data/heroesMockData';
import type { HeroMockData } from '../data/heroesMockData';

const HeroDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState('CHIẾN ĐẤU');
  const [activeSkillId, setActiveSkillId] = useState('passive');

  // Try to find the hero, otherwise fallback to the default 'thuong'
  const hero: HeroMockData | undefined = getHeroBySlug(slug || '') || getHeroBySlug('thuong');

  if (!hero) {
    return <div className="text-white p-8">Không tìm thấy dữ liệu tướng!</div>;
  }

  const activeSkill = hero.skills.find(s => s.id === activeSkillId) || hero.skills[0];

  const tabs = [
    { id: 'CHIẾN ĐẤU', icon: <Sword size={14} /> },
    { id: 'TIỂU SỬ', icon: <Book size={14} /> },
    { id: 'TRANG PHỤC', icon: <User size={14} /> },
    { id: 'PHỐI HỢP', icon: <User size={14} /> },
    { id: 'LỊCH SỬ', icon: <History size={14} /> },
    { id: 'VIDEO', icon: <Video size={14} /> }
  ];

  return (
    <div className="flex h-[100dvh] bg-[#0d0d12] text-white font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <div className="w-16 bg-[#09090b] border-r border-white/5 flex flex-col items-center py-6 z-20">
        <Link to="/" className="p-3 mb-8 text-gray-400 hover:text-white transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-yellow-400 flex items-center justify-center mb-12 shadow-lg">
          <Flag size={14} className="text-yellow-400 fill-yellow-400" />
        </div>
        <div className="flex flex-col gap-6">
          <Link to="/" className="p-2 text-gray-500 hover:text-white transition-colors">
            <Home size={20} />
          </Link>
          <button className="p-2 text-gray-500 hover:text-white transition-colors">
            <Share2 size={20} />
          </button>
        </div>
        <div className="mt-auto writing-vertical text-[10px] tracking-widest text-gray-600 font-bold rotate-180" style={{ writingMode: 'vertical-rl' }}>
          LANG KỲ
        </div>
      </div>

      {/* Left Column: Hero Portrait & Voting */}
      <div className="w-[35%] relative flex-shrink-0 bg-gray-900 border-r border-white/10 shadow-[20px_0_30px_rgba(0,0,0,0.5)] z-10">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={hero.portrait || hero.image} 
            alt={hero.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1000&auto=format&fit=crop'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-[#0d0d12]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0d0d12]/80"></div>
        </div>

        {/* Content over portrait */}
        <div className="absolute bottom-10 left-8 right-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-red-600 text-[10px] font-black px-2 py-0.5 text-white">CN</span>
            <span className="bg-[#00f2fe] text-[10px] font-black px-2 py-0.5 text-[#0d0d12]">GLOBAL</span>
            <span className="text-[10px] text-gray-400 flex items-center gap-1 ml-auto">
              <span className="w-2 h-2 rounded-full border border-gray-400"></span>
              {hero.views} VIEWS
            </span>
          </div>
          
          <h3 className="text-gray-300 text-sm tracking-[0.3em] font-semibold mb-1 uppercase">{hero.title}</h3>
          <h1 className="text-6xl font-serif font-black text-[#f8f5ec] tracking-wider mb-8 uppercase" style={{ textShadow: '2px 2px 10px rgba(0,0,0,0.8)' }}>
            {hero.name}
            <span className="text-3xl text-orange-600 ml-4 align-top font-sans opacity-80">{hero.chineseName}</span>
          </h1>

          <div className="flex gap-4">
            <button className="flex-1 bg-[#1a1a24]/80 backdrop-blur-md border border-white/5 rounded-lg p-4 flex flex-col hover:bg-[#1a1a24] transition-colors relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center gap-2 text-[#d4af37] font-bold text-xs mb-3">
                <span className="text-lg">👍</span> ỦNG HỘ
              </div>
              <div className="flex justify-between items-end">
                <span className="text-3xl font-black text-[#d4af37]">{hero.upvotes} <span className="text-[10px] font-normal text-gray-400">LƯỢT</span></span>
                <span className="text-[10px] bg-black/50 text-[#d4af37] px-1.5 py-0.5 rounded">+50 KNB</span>
              </div>
            </button>

            <button className="flex-1 bg-[#1a1a24]/80 backdrop-blur-md border border-white/5 rounded-lg p-4 flex flex-col hover:bg-[#1a1a24] transition-colors relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center gap-2 text-gray-400 font-bold text-xs mb-3 group-hover:text-red-400 transition-colors">
                <span className="text-lg grayscale group-hover:grayscale-0">👎</span> PHẢN ĐỐI
              </div>
              <div className="flex justify-between items-end">
                <span className="text-3xl font-black text-white">{hero.downvotes} <span className="text-[10px] font-normal text-gray-500">LƯỢT</span></span>
                <span className="text-[10px] bg-black/50 text-red-400 px-1.5 py-0.5 rounded">-10 KNB</span>
              </div>
            </button>
          </div>
          
          <p className="text-[9px] text-gray-500 mt-4 leading-relaxed max-w-[80%]">
            * MỖI TƯỚNG GIỚI HẠN 1 LƯỢT BÌNH CHỌN / TUẦN (LÀM MỚI VÀO NỮA THỨ 2 HÀNG TUẦN)
          </p>
        </div>
      </div>

      {/* Right Column: Details */}
      <div className="flex-1 overflow-y-auto bg-[#0d0d12] p-8 no-scrollbar">
        {/* Tabs */}
        <div className="flex border-b border-white/5 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-[11px] font-bold tracking-wider transition-colors relative ${activeTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {tab.icon} {tab.id}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white shadow-[0_0_10px_#fff]"></div>
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex flex-col gap-6 max-w-5xl">
          
          {/* Top Row: Meta & Radar */}
          <div className="flex gap-6">
            
            {/* Meta Performance */}
            <div className="flex-1 bg-[#12121a] border border-[#1a1a24] rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#d4af37] to-transparent"></div>
              
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1a1a24] flex items-center justify-center border border-[#d4af37]/30">
                    <Trophy size={18} className="text-[#d4af37]" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Hiệu Suất Meta</h3>
                    <p className="text-[11px] text-gray-500">Chỉ số phiên bản hiện tại</p>
                  </div>
                </div>
                <a href="#" className="text-[10px] text-[#d4af37] flex items-center gap-1 hover:underline">
                  <Trophy size={10} /> Bảng xếp hạng &rsaquo;
                </a>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div>
                  <div className="text-[11px] text-gray-500 font-bold mb-1">TỈ LỆ THẮNG</div>
                  <div className="text-3xl font-black text-[#d4af37]">{hero.stats.winRate}</div>
                </div>
                <div>
                  <div className="text-[11px] text-gray-500 font-bold mb-1">TỈ LỆ BAN</div>
                  <div className="text-3xl font-black text-gray-300">{hero.stats.banRate}</div>
                </div>
                <div>
                  <div className="text-[11px] text-gray-500 font-bold mb-1">TỈ LỆ CHỌN</div>
                  <div className="text-3xl font-black text-gray-300">{hero.stats.pickRate}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                <span className="text-[10px] text-gray-500 font-bold">ĐƯỜNG ƯU TIÊN</span>
                {hero.lanes.map((lane, idx) => (
                  <span key={idx} className="px-3 py-1 bg-[#1a1a24] border border-white/10 rounded-md text-[10px] font-bold text-gray-300">{lane}</span>
                ))}
              </div>
            </div>

            {/* Element (Hệ) */}
            <div className="w-[280px] bg-[#12121a] border border-[#1a1a24] rounded-xl p-6 relative flex flex-col">
               <div className="absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b from-[#d4af37] to-transparent"></div>
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-8 h-8 rounded-full bg-[#1a1a24] flex items-center justify-center border border-[#d4af37]/30">
                    <Shield size={14} className="text-[#d4af37]" />
                 </div>
                 <h3 className="text-white font-bold text-md">Hệ Phái</h3>
               </div>
               <div className="flex-1 flex justify-center items-center">
                 {hero.element ? (
                   <img src={`/assets/images/elements/${hero.element}.webp`} alt={hero.element} className="w-40 h-40 object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:scale-110 transition-transform duration-500" />
                 ) : (
                   <div className="text-gray-600 font-bold text-sm">Chưa rõ hệ</div>
                 )}
               </div>
            </div>
          </div>

          {/* Extra Info Banner */}
          <div className="bg-[#12121a] border border-[#1a1a24] rounded-xl p-4 flex justify-between items-center relative overflow-hidden">
             <div className="absolute left-0 top-0 h-full w-1 bg-[#d4af37]"></div>
             <div className="flex items-center gap-3 ml-2">
               <ChevronLeft size={16} className="text-[#d4af37]" />
               <span className="text-sm font-bold text-gray-300 tracking-wider">THÔNG TIN THÊM</span>
             </div>
             <div className="flex items-center gap-2 bg-[#1a1a24] px-3 py-1.5 rounded border border-[#d4af37]/30 text-[#d4af37] text-xs font-bold shadow-[0_0_10px_rgba(212,175,55,0.1)]">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
               {hero.extraInfo}
             </div>
          </div>

          {/* Skills Section */}
          <div className="mt-4">
            <div className="flex gap-6 mb-8 relative">
              {hero.skills.map(skill => (
                <div key={skill.id} className="flex flex-col items-center gap-3 cursor-pointer group" onClick={() => setActiveSkillId(skill.id)}>
                  <div className={`w-16 h-16 rounded-xl border-2 transition-all overflow-hidden ${activeSkillId === skill.id ? 'border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-110' : 'border-gray-700 opacity-50 group-hover:opacity-100 group-hover:border-gray-500'}`}>
                    <img src={skill.image} alt={skill.name} className="w-full h-full object-cover bg-gray-800" onError={(e) => { e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="%23666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path></svg>'; }} />
                  </div>
                  <span className={`text-[10px] font-bold ${activeSkillId === skill.id ? 'text-white' : 'text-gray-500'}`}>{skill.name}</span>
                </div>
              ))}
              <div className="absolute bottom-6 left-[300px] right-0 h-px bg-gradient-to-r from-[#d4af37] to-transparent opacity-50"></div>
            </div>

            <div className="pl-2 border-l-4 border-[#d4af37] mb-6">
              <h2 className="text-3xl font-black text-white italic">{activeSkill.name}</h2>
              <h3 className="text-[10px] font-bold text-gray-500 tracking-[0.2em] mt-1">// {activeSkill.id.toUpperCase()}</h3>
            </div>

            <div className="flex items-center gap-6 mb-6">
              <span className="text-xs text-gray-400 flex items-center gap-1"><Info size={12} className="text-[#d4af37]"/> Hồi chiêu: <strong className="text-[#d4af37]">{activeSkill.cooldown}</strong></span>
              <span className="text-xs text-gray-400 flex items-center gap-1"><Info size={12} className="text-[#d4af37]"/> Năng lượng: <strong className="text-[#d4af37]">{activeSkill.mana}</strong></span>
            </div>

            <div className="flex gap-2 mb-6">
              {activeSkill.tags.map((tag, i) => (
                <span key={i} className={`px-2 py-1 text-black text-[10px] font-black rounded uppercase ${i % 2 === 0 ? 'bg-[#10b981]' : 'bg-[#f59e0b]'}`}>{tag}</span>
              ))}
            </div>

            <div className="text-gray-300 text-sm leading-relaxed max-w-4xl space-y-4">
              <p>{activeSkill.description}</p>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 w-12 h-12 bg-transparent border border-[#d4af37]/30 rounded-full flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors backdrop-blur-sm z-50">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><line x1="12" y1="9" x2="12" y2="15"></line><line x1="9" y1="12" x2="15" y2="12"></line></svg>
      </button>
    </div>
  );
};

export default HeroDetail;
