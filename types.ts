
export interface Attributes {
  cunning: number; // 权谋
  benevolence: number; // 仁德
  innovation: number; // 革新
  integrity: number; // 守正
}

export interface Reaction {
  speaker: string;
  text: string;
}

export interface Option {
  label: string;
  text: string;
  scores: [number, number, number, number];
  reaction?: Reaction;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
  historicalFact: string; // 史实对照
}

export enum EndingType {
  IRON_EMPRESS = '铁血女帝',
  SAINT_MONARCH = '圣君归唐',
  LONELY_DEATH = '孤帝崩殂',
  INNOVATOR = '革新先驱',
  BLANK_SLATE = '无字留白',
  DEFAULT = '圣君归唐'
}
