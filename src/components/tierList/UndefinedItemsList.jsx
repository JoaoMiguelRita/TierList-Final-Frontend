import { useDroppable } from "@dnd-kit/core";
import TierItemDraggable from "./dnd/TierItemDraggable";

export default function UndefinedItemsList({ items, onEdit, onDelete }) {
  const { setNodeRef, isOver } = useDroppable({ id: "?" }); // ID "?" para itens não classificados

  // Garante que 'items' é um array, caso contrário, retorna algo seguro
  if (!Array.isArray(items)) {
    console.error("TierListTable: 'items' não é um array válido:", items);
    return null;
  }

  return (
    <div
      ref={setNodeRef} // Torna esta div uma área dropavel
      className={`mt-10 p-4 rounded-lg transition-colors duration-300 ${
        isOver ? "bg-green-800" : "bg-gray-700"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Itens não classificados</h2>
      {items.length === 0 ? (
        <p className="text-center text-gray-400 italic">Nenhum item por enquanto.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <TierItemDraggable
              key={item.id_item}
              item={item}
              onEdit={onEdit} // Passando as props para o item individual
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}