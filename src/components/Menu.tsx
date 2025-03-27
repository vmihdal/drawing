import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useStore } from '../store/useStore';
import { saveAs } from 'file-saver';

export const Menu: React.FC = () => {
  const { elements, setElements, backgroundColor } = useStore();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSave = () => {
    const drawingData = {
      version: '1.0',
      elements,
      backgroundColor,
    };
    
    const blob = new Blob([JSON.stringify(drawingData)], { type: 'application/json' });
    saveAs(blob, 'drawing.draw');
  };

  const handleOpen = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const drawingData = JSON.parse(e.target?.result as string);
        setElements(drawingData.elements);
      } catch (error) {
        console.error('Error reading file:', error);
      }
    };
    reader.readAsText(file);
  };

  const handleExport = () => {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Draw background
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw elements
    elements.forEach((element) => {
      // Draw element logic here
    });

    // Export as PNG
    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, 'drawing.png');
      }
    });
  };

  return (
    <div className="fixed top-4 left-4">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="px-4 py-2 bg-white rounded-lg shadow-lg hover:bg-gray-50">
          File
        </DropdownMenu.Trigger>
        
        <DropdownMenu.Content className="min-w-[200px] bg-white rounded-lg shadow-lg p-2">
          <DropdownMenu.Item
            className="px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            Open
          </DropdownMenu.Item>
          
          <DropdownMenu.Item
            className="px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
            onClick={handleSave}
          >
            Save
          </DropdownMenu.Item>
          
          <DropdownMenu.Item
            className="px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
            onClick={handleExport}
          >
            Export as Image
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleOpen}
        accept=".draw"
        className="hidden"
      />
    </div>
  );
};