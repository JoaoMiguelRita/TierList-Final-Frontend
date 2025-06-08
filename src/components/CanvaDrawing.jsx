import { useEffect, useRef } from 'react';
import * as fabric from 'fabric';


export default function CanvaDrawing() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);
    canvas.isDrawingMode = true;

    // Default definição do pincel, NÃO REMOVER
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    
    canvas.backgroundColor = 'white';
    canvas.selectionBorderColor = 'black';
    
    canvas.renderAll(); // Solução que o chat deu para setar o background como branco como padrão

    // Propriedades do lápis
    canvas.freeDrawingBrush.color = 'black';
    canvas.freeDrawingBrush.width = 2;

    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={400}
      style={{ 
        border: '2px solid #4876FF',
        boxShadow: '10px 2px 4px #4876FF'}}
    />
  );
}
