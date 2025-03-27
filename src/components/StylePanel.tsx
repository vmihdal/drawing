import React from 'react';
import * as Slider from '@radix-ui/react-slider';
import { useStore } from '../store/useStore';

export const StylePanel: React.FC = () => {
  const { selectedElement, updateElementStyle } = useStore();

  if (!selectedElement) return null;

  const handleStyleChange = (property: string, value: any) => {
    updateElementStyle(selectedElement.id, { [property]: value });
  };

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-lg shadow-lg p-4 w-64">
      <h3 className="text-lg font-semibold mb-4">Style</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Stroke Color</label>
          <input
            type="color"
            value={selectedElement.style.strokeColor}
            onChange={(e) => handleStyleChange('strokeColor', e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Stroke Width</label>
          <Slider.Root
            className="relative flex items-center w-full h-5"
            value={[selectedElement.style.strokeWidth]}
            onValueChange={([value]) => handleStyleChange('strokeWidth', value)}
            max={20}
            step={1}
          >
            <Slider.Track className="bg-gray-200 relative grow h-1 rounded-full">
              <Slider.Range className="absolute h-full bg-blue-500 rounded-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-5 h-5 bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" />
          </Slider.Root>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Stroke Style</label>
          <select
            value={selectedElement.style.strokeStyle}
            onChange={(e) => handleStyleChange('strokeStyle', e.target.value)}
            className="w-full border rounded p-1"
          >
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sloppiness</label>
          <Slider.Root
            className="relative flex items-center w-full h-5"
            value={[selectedElement.style.sloppiness]}
            onValueChange={([value]) => handleStyleChange('sloppiness', value)}
            max={10}
            step={0.1}
          >
            <Slider.Track className="bg-gray-200 relative grow h-1 rounded-full">
              <Slider.Range className="absolute h-full bg-blue-500 rounded-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-5 h-5 bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" />
          </Slider.Root>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Edges</label>
          <select
            value={selectedElement.style.edges}
            onChange={(e) => handleStyleChange('edges', e.target.value)}
            className="w-full border rounded p-1"
          >
            <option value="sharp">Sharp</option>
            <option value="round">Round</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Opacity</label>
          <Slider.Root
            className="relative flex items-center w-full h-5"
            value={[selectedElement.style.opacity]}
            onValueChange={([value]) => handleStyleChange('opacity', value)}
            max={1}
            step={0.01}
          >
            <Slider.Track className="bg-gray-200 relative grow h-1 rounded-full">
              <Slider.Range className="absolute h-full bg-blue-500 rounded-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-5 h-5 bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" />
          </Slider.Root>
        </div>
      </div>
    </div>
  );
};