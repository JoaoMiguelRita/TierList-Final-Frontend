import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

function DraggableItem({ item }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id_item,
  });

  const style = {
    transform: transform
    ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
    : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-2 rounded bg-gray-500 text-white cursor-move shadow"
    >
      {item.name_item}
    </div>
  );
}

function DroppableRow({ tier, children }) {
  const { setNodeRef, isOver } = useDroppable({
    id: tier,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 flex gap-2 p-4 flex-wrap transition-colors duration-300 ${
        isOver ? "bg-green-800" : "bg-gray-800"
      } min-h-[80px]`}
    >
      {children}
    </div>
  );
}

export default function TierBoard({ items = [], onItemDrop, onEdit }) {
  const levels = ["S", "A", "B", "C", "D"];

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const draggedItemId = active.id;
      const newTier = over.id;
      onItemDrop(draggedItemId, newTier);
    }
  };

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
        {levels.map((nivel) => (
          <div
            key={nivel}
            className="flex items-center border border-gray-700"
          >
            {/* Nivel da Tier */}
            <div
              className={`w-16 h-full flex items-center justify-center font-bold text-xl ${corNivel(
                nivel
              )}`}
            >
              {nivel}
            </div>

            {/* Área de drop */}
            <DroppableRow tier={nivel}>
              {items
                .filter((item) => item.tier === nivel)
                .map((item) => (
                  <DraggableItem 
                    key={item.id_item} 
                    item={item}
                    onEdit={onEdit}  
                  />
                ))}
            </DroppableRow>
          </div>
        ))}
      </div>
    </>
  );
}
