import { create } from 'zustand';
import { Element, ElementStyle } from '../types';

interface DrawingState {
  elements: Element[];
  selectedElement: Element | null;
  tool: Element['type'];
  backgroundColor: string;
  defaultStyle: ElementStyle;
  setElements: (elements: Element[]) => void;
  addElement: (element: Element) => void;
  updateElement: (element: Element) => void;
  deleteElement: (elementId: string) => void;
  setSelectedElement: (element: Element | null) => void;
  setTool: (tool: Element['type']) => void;
  setBackgroundColor: (color: string) => void;
  updateElementStyle: (elementId: string, style: Partial<ElementStyle>) => void;
  updateElementLayer: (elementId: string, action: 'front' | 'back' | 'forward' | 'backward') => void;
}

const defaultStyle: ElementStyle = {
  strokeColor: '#000000',
  strokeWidth: 2,
  strokeStyle: 'solid',
  sloppiness: 0,
  edges: 'sharp',
  opacity: 1,
};

export const useStore = create<DrawingState>((set) => ({
  elements: [],
  selectedElement: null,
  tool: 'selection',
  backgroundColor: '#ffffff',
  defaultStyle,
  
  setElements: (elements) => set({ elements }),
  
  addElement: (element) => set((state) => ({
    elements: [...state.elements, element]
  })),
  
  updateElement: (element) => set((state) => ({
    elements: state.elements.map((el) => 
      el.id === element.id ? element : el
    )
  })),
  
  deleteElement: (elementId) => set((state) => ({
    elements: state.elements.filter((el) => el.id !== elementId)
  })),
  
  setSelectedElement: (element) => set({ selectedElement: element }),
  
  setTool: (tool) => set({ tool }),
  
  setBackgroundColor: (color) => set({ backgroundColor: color }),
  
  updateElementStyle: (elementId, style) => set((state) => ({
    elements: state.elements.map((el) => 
      el.id === elementId 
        ? { ...el, style: { ...el.style, ...style } }
        : el
    )
  })),
  
  updateElementLayer: (elementId, action) => set((state) => {
    const elements = [...state.elements];
    const index = elements.findIndex((el) => el.id === elementId);
    const element = elements[index];
    
    if (!element) return state;
    
    elements.splice(index, 1);
    
    switch (action) {
      case 'front':
        elements.push(element);
        break;
      case 'back':
        elements.unshift(element);
        break;
      case 'forward':
        elements.splice(Math.min(index + 1, elements.length), 0, element);
        break;
      case 'backward':
        elements.splice(Math.max(index - 1, 0), 0, element);
        break;
    }
    
    return { elements };
  }),
}));