export default function TierBoard() {
    
  function corNivel(nivel) {
    switch (nivel) {
      case "S":
        return "bg-red-500";
      case "A":
        return "bg-orange-400";
      case "B":
        return "bg-yellow-300 text-black";
      case "C":
        return "bg-yellow-100 text-black";
      case "D":
        return "bg-green-300 text-black";
      default:
        return "bg-gray-600";
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4 max-w-6xl mx-auto">
        {["S", "A", "B", "C", "D"].map((nivel, index) => (
          <div key={nivel} className="flex items-center border border-gray-700">
            {/* Coluna da letra */}
            <div
              className={`w-16 h-full flex items-center justify-center font-bold text-xl ${corNivel(
                nivel
              )}`}
            >
              {nivel}
            </div>

            {/* Container dos itens */}
            <div className="flex-1 flex gap-2 p-4 bg-gray-800 min-h-[80px] flex-wrap">
              {/* Aqui serão renderizados os cards dos itens classificados */}
              <p className="text-gray-500 italic">Sem itens</p>
            </div>

            {/* Controles de linha */}
            <div className="flex flex-col gap-4 px-4 py-2 bg-gray-700">
              <button title="Mover para cima">⬆️</button>
              <button title="Mover para baixo">⬇️</button>
              {/*<button title="Configurar nível">⚙️</button>*/}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
