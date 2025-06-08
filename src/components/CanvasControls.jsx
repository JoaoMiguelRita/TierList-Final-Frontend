import React from 'react';
import CanvasUndoRedo from './CanvasUndoRedo';

export default function CanvasControls({ onUndo, onRedo }) {
  return (
    <div>
      <button onClick={onUndo}>Desfazer (Ctrl+Z)</button>
      <button onClick={onRedo}>Refazer (Ctrl+Shift+Z)</button>
    </div>
  );
}