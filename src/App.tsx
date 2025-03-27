import React from 'react';
import { Canvas } from './components/Canvas';
import { Toolbar } from './components/Toolbar';
import { StylePanel } from './components/StylePanel';
import { Menu } from './components/Menu';

function App() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-50">
      <Canvas />
      <Toolbar />
      <StylePanel />
      <Menu />
    </div>
  );
}

export default App;