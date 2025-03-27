export type Point = {
  x: number;
  y: number;
};

export type ElementStyle = {
  strokeColor: string;
  strokeWidth: number;
  strokeStyle: 'solid' | 'dashed' | 'dotted';
  sloppiness: number;
  edges: 'sharp' | 'round';
  opacity: number;
  backgroundColor?: string;
};

export type Element = {
  id: string;
  type: 'rectangle' | 'diamond' | 'ellipse' | 'arrow' | 'line' | 'pencil' | 'text' | 'eraser';
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  points?: Point[];
  text?: string;
  style: ElementStyle;
  layer: number;
};

export type Tool = {
  type: Element['type'];
  icon: React.ReactNode;
  shortcut: string;
};