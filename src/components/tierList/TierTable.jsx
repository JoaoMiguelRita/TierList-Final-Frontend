export default function TierTable() {
  return (
    <>
      {/* Área de itens disponíveis */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">Itens não classificados</h2>
        <div className="flex flex-wrap gap-2 p-4 bg-gray-800 rounded">
          {/* Aqui virão as imagens para arrastar */}
          <img
            src="/exemplo.png"
            className="w-20 h-20 object-cover rounded cursor-pointer"
          />
          <img
            src="/exemplo2.png"
            className="w-20 h-20 object-cover rounded cursor-pointer"
          />
        </div>
      </div>
    </>
  );
}
