import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


export default function SortableRankingItem({ item, index, onEdit, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id_item,
  });

  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="flex items-center justify-between bg-gray-700 px-5 py-3 rounded shadow"
    >
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold">{index + 1}º</span>
        <span>{item.name_item}</span>
      </div>
      <div className="flex gap-4">
        <button
          className="text-yellow-400 hover:underline"
          onClick={() => {
            const newName = prompt("Novo nome:", item.name_item);
            if (newName) onEdit(item.id_item, { name_item: newName });
          }}
        >
          Editar
        </button>
        <button
          className="text-red-500 hover:underline"
          onClick={() => onDelete(item.id_item)}
        >
          Deletar
        </button>
      </div>
    </div>
  );
}
