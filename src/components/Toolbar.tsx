import React from 'react';
import { useStore } from '../store/useStore';
import {
  CursorArrowRaysIcon,
  ArrowsPointingOutIcon,
  PencilSquareIcon,
  ExclamationCircleIcon,
  ArrowRightIcon,
  PencilIcon,
  DocumentTextIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

const tools = [
  { type: 'selection', icon: <CursorArrowRaysIcon className="w-6 h-6" />, shortcut: 'V' },
  { type: 'pan', icon: <ArrowsPointingOutIcon className="w-6 h-6" />, shortcut: 'H' },
  { type: 'rectangle', icon: <PencilSquareIcon className="w-6 h-6" />, shortcut: 'R' },
  { type: 'diamond', icon: <PencilSquareIcon className="w-6 h-6 rotate-45" />, shortcut: 'D' },
  { type: 'ellipse', icon: <ExclamationCircleIcon className="w-6 h-6" />, shortcut: 'O' },
  { type: 'arrow', icon: <ArrowRightIcon className="w-6 h-6" />, shortcut: 'A' },
  { type: 'line', icon: <ArrowRightIcon className="w-6 h-6" />, shortcut: 'L' },
  { type: 'pencil', icon: <PencilIcon className="w-6 h-6" />, shortcut: 'P' },
  { type: 'text', icon: <DocumentTextIcon className="w-6 h-6" />, shortcut: 'T' },
  { type: 'eraser', icon: <TrashIcon className="w-6 h-6" />, shortcut: 'E' },
];

export const Toolbar: React.FC = () => {
  const { tool, setTool } = useStore();

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const tool = tools.find(t => t.shortcut.toLowerCase() === event.key.toLowerCase());
      if (tool) {
        setTool(tool.type as any);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setTool]);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 flex space-x-2">
      {tools.map((t) => (
        <button
          key={t.type}
          className={`p-2 rounded hover:bg-gray-100 relative group ${
            tool === t.type ? 'bg-gray-100' : ''
          }`}
          onClick={() => setTool(t.type as any)}
        >
          {t.icon}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {t.type} ({t.shortcut})
          </div>
        </button>
      ))}
    </div>
  );
};