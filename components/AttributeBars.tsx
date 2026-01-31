
import React from 'react';
import { Attributes } from '../types';

interface Props {
  attributes: Attributes;
}

const AttributeBars: React.FC<Props> = ({ attributes }) => {
  const categories = [
    { key: 'cunning', label: '权谋', value: attributes.cunning, icon: '📜' },
    { key: 'benevolence', label: '仁德', value: attributes.benevolence, icon: '🕊️' },
    { key: 'innovation', label: '革新', value: attributes.innovation, icon: '🔥' },
    { key: 'integrity', label: '守正', value: attributes.integrity, icon: '⚖️' },
  ];

  const MAX_VAL = 150;

  return (
    <div className="w-full space-y-6 py-4">
      {categories.map((cat) => {
        const percentage = Math.min((cat.value / MAX_VAL) * 100, 100);
        return (
          <div key={cat.key} className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-yellow-100 font-bold flex items-center gap-2 tracking-widest">
                <span className="text-xl">{cat.icon}</span> {cat.label}
              </span>
              <span className="text-yellow-600 font-mono text-lg font-bold">{cat.value}</span>
            </div>
            <div className="h-4 w-full bg-black/40 rounded-full overflow-hidden border border-stone-800 p-0.5">
              <div 
                className="h-full rounded-full progress-bar-fill relative"
                style={{ width: `${percentage}%` }}
              >
                <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
              </div>
            </div>
          </div>
        );
      })}
      <p className="text-[10px] text-stone-500 text-right italic pt-2">* 功过皆由心起，数值止于轮回</p>
    </div>
  );
};

export default AttributeBars;
