import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { DndContext } from "@dnd-kit/core";

import TierForm from "../components/tierList/TierForm";
import TierBoard from "../components/tierList/TierBoard";
import UndefinedItemsList from "../components/tierList/UndefinedItemsList";
import TierTrash from "../components/tierList/dnd/TierTrash";

export default function TierListPage() {
  const { id } = useParams();
  const [currentTierList, setCurrentTierList] = useState([]);
  const [error, setError] = useState(null); // Prevenção de erros
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchTierList = async () => {
      
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:3000/tierList/${id}`
        );
        setCurrentTierList(response.data);
      } catch (err) {
        console.log("Erro ao carregar a Tier List:", error?.message, error?.response);
        setError(
          "Não foi possível carregar a Tier List. Por favor, tente novamente."
        );
      } 
    };

    if (id) {
      fetchTierList();
    }
  }, [id]);

  // Função para adicionar novo item
  const handdleAddItem = async (newItem) => {
    if (!currentTierList) {
      alert("Não foi possível adicionar o item, a Tier List não está carregada.")
      return;
    }

    // Adiciona novo item no array
    const updatedItems = [...(currentTierList.items || []), newItem];
 
    try {
      const response = await axios.patch(`http://localhost:3000/tierList/${id}`, {
        items: updatedItems,
      });
      setCurrentTierList(response.data);
      alert("Item adicionado com sucesso!");
    } catch (err) {
      console.log("Erro ao adicionar Item:", error?.message, error?.response);
      alert("Houve um erro ao adicionar o item. Tente novamente.");
    } 
  }

  // Função para lidar com o drop de ITENS (seja ele, do table para o board ou para a lixeira, ou até mesmo fora de um campo válido)
  const handleItemDrop = async (event) => {
    const { active, over } = event;

    // Se o item foi solto em um lugar válido (over existe e não é o próprio item)
    if (!over || active.id === over.id) {
      // Adicionado !over para garantir que foi solto em um local válido
      return;
    }

    const draggedItemId = active.id;
    const droppedZoneId = over.id;

    // Lógica da Lixeira
    if (droppedZoneId === "trash") {
      // Se soltou na lixeira, chame a função de exclusão
      handleDeleteItem(draggedItemId);
      return;
    }

    // Lógica para Mover para Cards/Items
    const draggedItem = currentTierList.items.find(
      (item) => item.id_item === draggedItemId
    );

    if (!draggedItem) return; // Se o item não for encontrado, sai

    const updatedItems = currentTierList.items.map(
      (item) =>
        item.id_item === draggedItemId ? { ...item, tier: droppedZoneId } : item // Use 'droppedZoneId' como nova tier
    );

    setIsProcessing(true); 
    try {
      await axios.patch(`http://localhost:3000/tierList/${id}`, {
        items: updatedItems,
      });
      setCurrentTierList((prev) => ({
        ...prev,
        items: updatedItems,
      }));
    } catch (err) {
      console.error("Erro ao atualizar tier do item:", err);
      alert("Erro ao mover item para outro nível.");
    } finally {
      setIsProcessing(false); 
    }
  };

  const handleEditarItem = async (id_item, newItemData) => {
    if (!currentTierList || !currentTierList.items) return;

    const updatedItems = currentTierList.items.map((item) =>
      item.id_item === id_item ? { ...item, ...newItemData } : item
    );

    setIsProcessing(true); 
    try {
      const response = await axios.patch(
        `http://localhost:3000/tierList/${id}`,
        { items: updatedItems }
      );
      setCurrentTierList(response.data);
      alert("Item editado com sucesso!");
    } catch (err) {
      console.error("Erro ao editar item:", err);
      alert("Houve um erro ao editar o item. Tente novamente.");
    } finally {
      setIsProcessing(false); 
    }
  };

  const handleDeleteItem = async (id_item) => {
    if (!currentTierList || !currentTierList.items) return;

    if (window.confirm("Deseja mesmo deletar este Item?")) {
      const updatedItems = currentTierList.items.filter(
        (item) => item.id_item !== id_item
      );

      setIsProcessing(true); 
      try {
        await axios.patch(`http://localhost:3000/tierList/${id}`, {
          items: updatedItems,
        });
        setCurrentTierList((prevData) => ({
          ...prevData,
          items: updatedItems,
        }));
        alert("Item deletado com sucesso!");
      } catch (error) {
        console.error("Erro ao deletar Item:", error);
        alert("Houve um erro ao deletar o Item. Tente novamente.");
      } finally {
        setIsProcessing(false); 
      }
    }
  };


  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }
  if (!currentTierList) {
    return (
      <p className="text-center text-white mt-10">Tier List não encontrada.</p>
    );
  }

  // Filtra os itens com base na propriedade 'tier'
  const itemsInTiers =
    currentTierList.items?.filter((item) => item.tier !== "?") || [];
  const unclassifiedItems =
    currentTierList.items?.filter((item) => item.tier === "?") || [];

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        {currentTierList.name}
      </h1>

      <DndContext onDragEnd={handleItemDrop}>
        <TierBoard
          items={itemsInTiers} // Passa APENAS os itens que JÁ ESTÃO em alguma tier (S, A, B, C, D)
          // As props foram movidas para handleItemDrop
          onEdit={handleEditarItem}
        />
        <TierForm 
          onAddItem={handdleAddItem}
        />

        <UndefinedItemsList
          items={unclassifiedItems} // Passa os itens com tier "?"
          onEdit={handleEditarItem}
          onDelete={handleDeleteItem}
        />
        <TierTrash />
      </DndContext>
    </div>
  );
}
