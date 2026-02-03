import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import { Attributes } from '../types';

interface Props {
  attributes: Attributes;
}

const AttributeRadar: React.FC<Props> = ({ attributes }) => {
  // 转换数据，确保属性顺序与进度条展示一致
  const data = [
    { subject: '权谋', A: attributes.cunning },
    { subject: '仁德', A: attributes.benevolence },
    { subject: '革新', A: attributes.innovation },
    { subject: '守正', A: attributes.integrity },
  ];

  return (
    <div className="w-full h-64 md:h-80 animate-fade-in">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart 
          cx="50%" 
          cy="50%" 
          outerRadius="75%" 
          data={data}
          margin={{ top: 10, right: 30, bottom: 10, left: 30 }}
        >
          {/* 网格线颜色调整为暗铜色，增加仪式感 */}
          <PolarGrid stroke="#d4a373" strokeOpacity={0.2} strokeDasharray="3 3" />
          
          {/* 刻度轴标签：使用古风配色 */}
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#d4a373', fontSize: 14, fontWeight: 'bold' }} 
          />
          
          {/* 隐藏数值刻度，但保留环形层级感 */}
          <PolarRadiusAxis 
            angle={45} 
            domain={[0, 150]} 
            tick={false} 
            axisLine={false} 
          />
          
          {/* 雷达覆盖区：渐变金配色与动效 */}
          <Radar
            name="命格属性"
            dataKey="A"
            stroke="#d4a373"
            strokeWidth={2}
            fill="#d4a373"
            fillOpacity={0.5}
            // 增加生长动画
            isAnimationActive={true}
            animationDuration={1500}
            animationBegin={300}
          />
        </RadarChart>
      </ResponsiveContainer>
      
      {/* 底部装饰文案 */}
      <div className="text-center">
        <p className="text-[10px] text-stone-500 font-serif tracking-widest italic">
          — 乾坤已定，命数归一 —
        </p>
      </div>
    </div>
  );
};

export default AttributeRadar;