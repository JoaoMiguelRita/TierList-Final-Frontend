import { react } from 'react';

export default function CanvasUndoRedo({ onAddScribble, onUndo, onRedo }) {
  
  const drawStack = useRef([]); // Ref. ao traço atual
  const undoStack = useRef([]); // Ref. aos traços desfeitos

  const handleAddScribble = (newScribble) => {
    drawStack.current.push(newScribble);
    undoStack.current = [];
  };

  const handleUndo = (canva) => {
    const item = drawStack.current.pop();
    if (item) {
      canva.remove(item);
      undoStack.current.push(item);
      canva.renderAll();
    }
  };

  const handleRedo = (canva) => {
    const item = undoStack.current.pop();
    if (item) {
      canva.add(item);
      drawStack.current.push(item);
      canva.renderAll();
    }
  };

  return {
    onAddScribble: handleAddScribble,
    onUndo: handleUndo,
    onRedo: handleRedo
  };
}