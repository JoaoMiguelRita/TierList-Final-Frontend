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
      className="border p-4 rounded hover:bg-gray-500 shadow-sm bg-gray-600"
    >
      {/* Apenas essa parte será "arrastável" */}
      <div
        className="cursor-move rounded px-1 text-white font-semibold"
        {...listeners}
      >
        {item.name_item}
      </div>

      {/* Botões funcionam normalmente agora */}
      <div className="flex justify-between mt-2">
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
