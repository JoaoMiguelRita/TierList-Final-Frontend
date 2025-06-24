import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import axios from "axios";
import TierListRanking from "../components/ranking/TierListRankingList";
import TierList from "../components/tierList/TierList";
import TierHeader from "../components/header/TierHeader";

export default function TierListPage() {
  const { id } = useParams();
  const [currentTierList, setCurrentTierList] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/tierList/${id}`)
      .then((res) => setCurrentTierList(res.data))
      .catch(() => setError("Erro ao carregar Tier List."));
  }, [id]);

  const handleEditItem = async (id_item, newItemData) => {
    const updatedItems = currentTierList.items.map((item) =>
      item.id_item === id_item ? { ...item, ...newItemData } : item
    );
    try {
      const res = await axios.patch(`http://localhost:3000/tierList/${id}`, {
        items: updatedItems,
      });
      setCurrentTierList(res.data);
    } catch {
      alert("Erro ao editar item.");
    }
  };

  const handleDeleteItem = async (id_item) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja deletar este item?"
    );
    if (!confirmDelete) return;

    const updatedItems = currentTierList.items.filter(
      (item) => item.id_item !== id_item
    );

    try {
      await axios.patch(`http://localhost:3000/tierList/${id}`, {
        items: updatedItems,
      });
      setCurrentTierList((prev) => ({ ...prev, items: updatedItems }));
    } catch {
      alert("Erro ao deletar item.");
    }
  };

  const handleAddItem = async (newItem) => {
    const updatedItems = [...(currentTierList.items || []), newItem];
    try {
      const res = await axios.patch(`http://localhost:3000/tierList/${id}`, {
        items: updatedItems,
      });
      setCurrentTierList(res.data);
    } catch {
      alert("Erro ao adicionar item.");
    }
  };

  const handleRankingDrop = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const sorted = [...currentTierList.items].sort((a, b) => a.ordem - b.ordem);
    const oldIndex = sorted.findIndex((item) => item.id_item === active.id);
    const newIndex = sorted.findIndex((item) => item.id_item === over.id);

    const reordered = arrayMove(sorted, oldIndex, newIndex).map(
      (item, index) => ({
        ...item,
        ordem: index + 1,
      })
    );

    setCurrentTierList((prev) => ({ ...prev, items: reordered }));

    axios
      .patch(`http://localhost:3000/tierList/${id}`, { items: reordered })
      .catch(() => {
        alert("Erro ao reordenar.");
      });
  };

  const handleItemDrop = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const draggedId = active.id;
    const droppedZone = over.id;

    if (droppedZone === "trash") {
      handleDeleteItem(draggedId);
      return;
    }

    const updatedItems = currentTierList.items.map((item) =>
      item.id_item === draggedId ? { ...item, tier: droppedZone } : item
    );

    setCurrentTierList((prev) => ({ ...prev, items: updatedItems }));
    axios
      .patch(`http://localhost:3000/tierList/${id}`, { items: updatedItems })
      .catch(() => {
        alert("Erro ao mover item.");
      });
  };

  const toggleType = async () => {
    const newType = currentTierList.type === "ranking" ? "tier" : "ranking";
    try {
      await axios.patch(`http://localhost:3000/tierList/${id}`, {
        type: newType,
      });
      setCurrentTierList((prev) => ({ ...prev, type: newType }));
    } catch {
      alert("Erro ao alternar tipo.");
    }
  };

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!currentTierList)
    return (
      <p className="text-white text-center mt-10">Carregando Tier List...</p>
    );

  const { type, name, items = [] } = currentTierList;
  const sortedItems = [...items].sort((a, b) => a.ordem - b.ordem);
  const itemsInTiers = items.filter((item) => item.tier !== "?");
  const unclassifiedItems = items.filter((item) => item.tier === "?");

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-8">
      <TierHeader title={name} type={type} onToggleType={toggleType} />

      {type === "ranking" ? (
        <TierListRanking
          items={sortedItems}
          onDragEnd={handleRankingDrop}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
          onAddItem={handleAddItem}
        />
      ) : (
        <TierList
          itemsInTiers={itemsInTiers}
          unclassifiedItems={unclassifiedItems}
          onItemDrop={handleItemDrop}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
          onAddItem={handleAddItem}
        />
      )}
    </div>
  );
}
