import { useEffect, useState } from 'react'
import './App.css'
import CanvasDrawing from './components/CanvasDrawing.jsx'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import CanvasControls from './components/CanvasControls.jsx';

export default function App() {
  const [canvaDrawings, setCanvaDrawings] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/draw').then(
      reponse => {
        setCanvaDrawings(reponse.data)
      }
    )
  }, [])

  const handleAddScribble = (newScribble) => {
    newScribble.id = uuidv4();
    axios.post('http://localhost:3000/draw', newScribble)
      .then(() => {
        console.log('Traço salvo:', newScribble);
      })
      .catch(error => {
        console.error('Erro ao salvar:', error);
      });
  };

  const handleClearDraws = async () => {
    try {
      const response = await fetch('http://localhost:3000/draw');
      const draws = await response.json();

      // Deleta todos os desenhos
      for (const draw of draws) {
        await fetch(`http://localhost:3000/draw/${draw.id}`, {
          method: 'DELETE',
        });
      }

      // Limpa o estado local para remover da tela
      setCanvaDrawings([]);

      console.log('Todos os desenhos foram apagados.');
    } catch (error) {
      console.error('Erro ao limpar os desenhos:', error);
    }
  };

  return (
    <div>
      <h1>Desenhe!</h1>
      <CanvasDrawing
        onAddScribble={handleAddScribble}
      />
      <CanvasControls />
      <button onClick={handleClearDraws}>Limpar Desenhos</button>
    </div>
  )
}
