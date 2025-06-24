import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableRankingItem from "../dnd/SortableRankingItem";
import TierForm from "../tierList/TierForm";


export default function TierListRanking({
  items,
  onDragEnd,
  onEdit,
  onDelete,
  onAddItem,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={items.map((item) => item.id_item)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4 max-w-3xl mx-auto">
          {items.map((item, index) => (
            <SortableRankingItem
              key={item.id_item}
              item={item}
              index={index}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>
      <TierForm onAddItem={onAddItem} />
    </DndContext>
  );
}