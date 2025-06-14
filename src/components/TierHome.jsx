import { useEffect, useRef } from 'react';
import * as fabric from 'fabric';
import CanvasUndoRedo from './CanvasUndoRedo';


export default function CanvasDrawing({onAddScribble}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);
    canvas.isDrawingMode = true;

    // Default definição do pincel, NÃO REMOVER
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    
    // Propriedades do lápis
    canvas.freeDrawingBrush.color = 'black';
    canvas.freeDrawingBrush.width = 2;

    // Propriedades do quadro
    canvas.backgroundColor = 'white';  
    canvas.renderAll(); // Solução que o chat deu para setar o background como branco como padrão

    // Função para salvar cada novo traço
    canvas.on('path:created', (event) => {
      const newScribble = event.path.toObject();
      if (onAddScribble) {
        onAddScribble(newScribble);
      }
    });

    return () => {
      canvas.dispose();
    };
  }, [onAddScribble]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        style={{ 
          border: '2px solid #4876FF',
          boxShadow: '10px 0px 0px #4876FF'}}
      />
    </div>  
  );
}
