import { DndContext } from "@dnd-kit/core";
import TierForm from "./TierForm";
import UndefinedItemsList from "./UndefinedItemsList";
import TierBoard from "../dnd/TierBoard";
import TierTrash from "../dnd/TierTrash";

export default function TierList({
  itemsInTiers,
  unclassifiedItems,
  onItemDrop,
  onEdit,
  onDelete,
  onAddItem,
}) {
  return (
    <DndContext onDragEnd={onItemDrop}>
      <TierBoard items={itemsInTiers} onEdit={onEdit} />
      <TierForm onAddItem={onAddItem} />
      <UndefinedItemsList items={unclassifiedItems} onEdit={onEdit} onDelete={onDelete} />
      <TierTrash/>
    </DndContext>
  );
}