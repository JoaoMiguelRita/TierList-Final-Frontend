import { useState } from 'react'
import './App.css'
import CanvaDrawing from './components/CanvaDrawing.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Desenhe!</h1>
      <CanvaDrawing/>
    </div>
  )
}

export default App
