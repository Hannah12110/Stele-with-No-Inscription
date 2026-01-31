
import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import { Attributes } from '../types';

interface Props {
  attributes: Attributes;
}

const AttributeRadar: React.FC<Props> = ({ attributes }) => {
  const data = [
    { subject: '权谋', A: attributes.cunning, fullMark: 150 },
    { subject: '仁德', A: attributes.benevolence, fullMark: 150 },
    { subject: '革新', A: attributes.innovation, fullMark: 150 },
    { subject: '守正', A: attributes.integrity, fullMark: 150 },
  ];

  return (
    <div className="w-full h-64 md:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#444" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#fbbf24', fontSize: 14 }} />
          <Radar
            name="属性"
            dataKey="A"
            stroke="#eab308"
            fill="#eab308"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttributeRadar;
