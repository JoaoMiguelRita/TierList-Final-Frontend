import { useDraggable } from "@dnd-kit/core";

export default function TierItemDraggable({ item, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id_item,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const newName = prompt("Novo nome:", item.name_item);
    if (newName !== null && newName.trim() !== "") {
      onEdit(item.id_item, {
        name_item: newName,
      });
    } else if (newName === "") {
      alert("O nome do item não pode ser vazio.");
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onDelete(item.id_item);
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className="border p-4 rounded shadow-sm bg-gray-600"
    >
      {/* Área arrastável */}
      <div
        {...listeners}
        title="Arraste por aqui"
        className="cursor-move rounded flex items-center gap-2 bg-gray-700 p-3 text-white font-semibold shadow-inner"
      >
        <span className="text-gray-600">☰</span>
        <span>{item.name_item}</span>
      </div>

      {/* Ações */}
      <div className="flex justify-between mt-3">
        <button
          className="text-yellow-400 hover:underline"
          onClick={handleEditClick}
        >
          Editar
        </button>
        <button
          className="text-red-400 hover:underline"
          onClick={handleDeleteClick}
        >
          Deletar
        </button>
      </div>
    </div>
  );
}
