import React from 'react';
import { Link } from 'react-router-dom';

const MetaList: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080810] text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
          <h2 className="text-3xl font-black font-chakra text-gold-primary tracking-wider uppercase">
            BẢNG XẾP HẠNG META TIER LIST
          </h2>
          <Link to="/" className="text-gray-400 hover:text-white transition-colors">
            &larr; Về trang chủ
          </Link>
        </div>

        {/* Mock Tier list */}
        <div className="space-y-6">
          {/* S Tier */}
          <div className="bg-[#121220] border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-4 py-1.5 bg-gradient-to-r from-amber-600 to-yellow-500 text-slate-950 font-black rounded-lg text-sm">
                TIER S
              </span>
              <span className="text-gray-400 text-sm">Các tướng siêu bá đạo, cấm hoặc chọn trong meta</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="bg-[#1a1a30] border border-gray-800 rounded-xl p-3 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gray-700 mb-2"></div>
                <span className="font-bold text-sm">Lam (Lan)</span>
                <span className="text-xs text-amber-500">Sát Thủ</span>
              </div>
              <div className="bg-[#1a1a30] border border-gray-800 rounded-xl p-3 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gray-700 mb-2"></div>
                <span className="font-bold text-sm">Đại Kiều</span>
                <span className="text-xs text-amber-500">Hỗ Trợ</span>
              </div>
            </div>
          </div>

          {/* A Tier */}
          <div className="bg-[#121220] border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-4 py-1.5 bg-gray-700 text-gray-100 font-black rounded-lg text-sm">
                TIER A
              </span>
              <span className="text-gray-400 text-sm">Các tướng mạnh, rất ổn định để leo rank</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="bg-[#1a1a30] border border-gray-800 rounded-xl p-3 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gray-700 mb-2"></div>
                <span className="font-bold text-sm">Tôn Ngộ Không</span>
                <span className="text-xs text-gray-400">Đấu Sĩ / Sát Thủ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaList;
