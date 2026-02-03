import React from 'react';
import { Attributes } from '../types';

interface Props {
  attributes: Attributes;
  diffs: number[] | null; // 接收当前题目的分值变动 [c, b, i, s]
}

const AttributeBars: React.FC<Props> = ({ attributes, diffs }) => {
  const categories = [
    { key: 'cunning', label: '权谋', value: attributes.cunning, idx: 0 },
    { key: 'benevolence', label: '仁德', value: attributes.benevolence, idx: 1 },
    { key: 'innovation', label: '革新', value: attributes.innovation, idx: 2 },
    { key: 'integrity', label: '守正', value: attributes.integrity, idx: 3 },
  ];

  return (
    <div className="flex flex-wrap gap-4 md:gap-6">
      {categories.map((cat) => {
        const change = diffs ? diffs[cat.idx] : 0;
        return (
          <div key={cat.key} className="flex flex-col gap-1 w-20 md:w-28 relative">
            <div className="flex justify-between text-[10px] md:text-xs font-bold text-stone-400">
              <span>{cat.label}</span>
              <span className="text-yellow-600">{cat.value}</span>
            </div>
            
            {/* 进度条 */}
            <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-stone-800">
              <div 
                className="h-full bg-gradient-to-r from-[#d4a373] to-[#b8860b] transition-all duration-700 ease-out" 
                style={{ width: `${Math.min(cat.value, 100)}%` }}
              ></div>
            </div>

            {/* 数值飘字动画 */}
            {change !== 0 && (
              <div 
                key={`${cat.key}-${change}`} // 强制重新触发动画
                className={`absolute -top-4 right-0 font-bold text-xs animate-float-up ${
                  change > 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {change > 0 ? `+${change}` : change}
              </div>
            )}
          </div>
        );
      })}

      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(-20px); opacity: 0; }
        }
        .animate-float-up {
          animation: float-up 1.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AttributeBars;