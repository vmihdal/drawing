import React, { useRef, useEffect, useState } from 'react';
import rough from 'roughjs';
import { useStore } from '../store/useStore';
import { Element, Point } from '../types';

const generator = rough.generator();

export const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [startPanningPoint, setStartPanningPoint] = useState<Point | null>(null);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  
  const {
    elements,
    tool,
    backgroundColor,
    selectedElement,
    addElement,
    updateElement,
    setSelectedElement
  } = useStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Clear canvas
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Apply offset for infinite canvas
    context.save();
    context.translate(offset.x, offset.y);

    // Draw all elements
    elements.forEach((element) => {
      drawElement(context, element);
    });

    context.restore();
  }, [elements, backgroundColor, offset]);

  const drawElement = (context: CanvasRenderingContext2D, element: Element) => {
    context.globalAlpha = element.style.opacity;

    switch (element.type) {
      case 'rectangle':
        const rect = generator.rectangle(
          element.x1,
          element.y1,
          element.x2 - element.x1,
          element.y2 - element.y1,
          {
            stroke: element.style.strokeColor,
            strokeWidth: element.style.strokeWidth,
            roughness: element.style.sloppiness,
          }
        );
        draw(context, rect);
        break;
      // Add other shape drawing logic here
    }

    context.globalAlpha = 1;
  };

  const draw = (context: CanvasRenderingContext2D, roughElement: any) => {
    context.beginPath();
    roughElement.sets.forEach((set: any) => {
      set.ops.forEach((op: any) => {
        switch (op.op) {
          case 'move':
            context.moveTo(op.data[0], op.data[1]);
            break;
          case 'lineTo':
            context.lineTo(op.data[0], op.data[1]);
            break;
          case 'bcurveTo':
            context.bezierCurveTo(
              op.data[0],
              op.data[1],
              op.data[2],
              op.data[3],
              op.data[4],
              op.data[5]
            );
            break;
        }
      });
    });
    context.stroke();
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (event.button !== 0) return;

    const { clientX, clientY } = event;
    const point = { x: clientX - offset.x, y: clientY - offset.y };

    if (tool === 'pan') {
      setIsPanning(true);
      setStartPanningPoint(point);
      return;
    }

    setIsDrawing(true);
    setStartPoint(point);

    if (tool !== 'selection') {
      const id = Date.now().toString();
      const newElement: Element = {
        id,
        type: tool,
        x1: point.x,
        y1: point.y,
        x2: point.x,
        y2: point.y,
        style: useStore.getState().defaultStyle,
        layer: elements.length,
      };
      addElement(newElement);
      setSelectedElement(newElement);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing && !isPanning) return;

    const { clientX, clientY } = event;
    const point = { x: clientX - offset.x, y: clientY - offset.y };

    if (isPanning && startPanningPoint) {
      const dx = point.x - startPanningPoint.x;
      const dy = point.y - startPanningPoint.y;
      setOffset({ x: offset.x + dx, y: offset.y + dy });
      return;
    }

    if (selectedElement && startPoint) {
      const updatedElement = {
        ...selectedElement,
        x2: point.x,
        y2: point.y,
      };
      updateElement(updatedElement);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setIsPanning(false);
    setStartPanningPoint(null);
    setStartPoint(null);
  };

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="absolute top-0 left-0"
    />
  );
};