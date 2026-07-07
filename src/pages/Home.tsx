import React from 'react';
import { Link } from 'react-router-dom';
import { Sword, Trophy, Newspaper } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div 
      className="min-h-screen text-gray-100 flex flex-col items-center justify-center p-6 text-center"
      style={{
        backgroundImage: 'url(/assets/images/background/layout_dashboard.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundColor: '#080810'
      }}
    >
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-gold-primary to-yellow-500 tracking-wider mb-6 font-chakra">
          HOK GAME MOBA CLONE
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
          Thư viện tướng, bảng xếp hạng meta tier list, cốt truyện skin premium, hiệu ứng kỹ năng và tải hình nền chất lượng cao.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1 */}
          <Link
            to="/meta"
            className="flex flex-col items-center p-6 bg-[#121220] border border-gray-800 rounded-2xl hover:border-gold-primary hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all group"
          >
            <Trophy className="w-12 h-12 text-gold-primary group-hover:scale-110 transition-transform mb-4" />
            <h3 className="text-xl font-bold mb-2">Bảng Xếp Hạng Meta</h3>
            <p className="text-gray-400 text-sm text-center">Tier list tướng mạnh nhất theo meta hiện tại.</p>
          </Link>

          {/* Card 2 */}
          <Link
            to="/heroes"
            className="flex flex-col items-center p-6 bg-[#121220] border border-gray-800 rounded-2xl hover:border-gold-primary hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all group"
          >
            <Sword className="w-12 h-12 text-gold-primary group-hover:scale-110 transition-transform mb-4" />
            <h3 className="text-xl font-bold mb-2">Thư Viện Tướng</h3>
            <p className="text-gray-400 text-sm text-center">Xem thông tin chi tiết kỹ năng, cốt truyện và skin.</p>
          </Link>

          {/* Card 3 */}
          <Link
            to="/tin-tuc"
            className="flex flex-col items-center p-6 bg-[#121220] border border-gray-800 rounded-2xl hover:border-gold-primary hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all group"
          >
            <Newspaper className="w-12 h-12 text-gold-primary group-hover:scale-110 transition-transform mb-4" />
            <h3 className="text-xl font-bold mb-2">Tin Tức / Cẩm Nang</h3>
            <p className="text-gray-400 text-sm text-center">Cập nhật tin tức mới nhất về giải đấu và bản cập nhật.</p>
          </Link>
        </div>

        <div className="flex justify-center gap-4">
          <Link
            to="/heroes"
            className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black rounded-xl hover:brightness-110 transition-all uppercase tracking-wider"
          >
            Khám phá ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
