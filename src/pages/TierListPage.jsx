import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TierForm from "../components/tierList/TierForm";
import TierBoard from "../components/tierList/TierBoard";
import TierListTable from "../components/tierList/TierListTable"; // Sugiro renomear para UnclassifiedItemsTable.jsx

export default function TierListPage() {
  const { id } = useParams(); // Pega o ID da Tier List da URL
  
  // O estado deve ser para UMA Tier List, não um array de Tier Lists
  const [currentTierList, setCurrentTierList] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTierList = async () => {
      try {
        // Busque APENAS A TIER LIST COM O ID ESPECÍFICO
        const response = await axios.get(`http://localhost:3000/tierList/${id}`);
        setCurrentTierList(response.data); // Define o objeto da Tier List no estado
      } catch (err) {
        console.error("Erro ao carregar a Tier List:", err);
        setError("Não foi possível carregar a Tier List. Por favor, tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    if (id) { // Só busca se tiver um ID na URL
      fetchTierList();
    }
  }, [id]); // O useEffect deve depender do 'id' da URL para recarregar quando a rota muda

  // Funções de manipulação de ITENS (dentro desta Tier List específica)
  const handleEditarItem = async (id_item, newItemData) => {
    if (!currentTierList) return; // Garante que a Tier List está carregada

    const updatedItems = currentTierList.items.map(item =>
      item.id_item === id_item ? { ...item, ...newItemData } : item
    );

    try {
      // Atualiza a Tier List completa com os itens modificados no backend
      const response = await axios.patch(`http://localhost:3000/tierList/${id}`, { items: updatedItems });
      setCurrentTierList(response.data); // Atualiza o estado local com os dados mais recentes
      alert("Item editado com sucesso!");
    } catch (err) {
      console.error("Erro ao editar item:", err);
      alert("Houve um erro ao editar o item. Tente novamente.");
    }
  };

  const handleDeleteItem = async (id_item) => {
    if (!currentTierList) return; // Garante que a Tier List está carregada

    if (window.confirm("Deseja mesmo deletar este Item?")) {
      const updatedItems = currentTierList.items.filter(item => item.id_item !== id_item);

      try {
        // Atualiza a Tier List completa removendo o item no backend
        await axios.patch(`http://localhost:3000/tierList/${id}`, { items: updatedItems });
        setCurrentTierList(prevData => ({
          ...prevData,
          items: updatedItems // Atualiza o estado local
        }));
        alert("Item deletado com sucesso!");
      } catch (error) {
        console.error("Erro ao deletar Item:", error);
        alert("Houve um erro ao deletar o Item. Tente novamente.");
      }
    }
  };

  // --- Condições de Carregamento e Erro ---
  if (loading) {
    return <p className="text-center text-white mt-10">Carregando Tier List...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  // Se a tierList não for encontrada após o carregamento
  if (!currentTierList) {
    return <p className="text-center text-white mt-10">Tier List não encontrada.</p>;
  }

  // Extraia os itens não classificados (assumindo que todos os 'items' são não classificados por enquanto)
  const unclassifiedItems = currentTierList.items || []; // Garante que seja um array, mesmo se 'items' for nulo/indefinido

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">{currentTierList.name}</h1>
      <TierBoard />
      <TierForm /> 
      <TierListTable
        items={unclassifiedItems}
        onEdit={handleEditarItem}
        onDelete={handleDeleteItem}
      />
    </div>
  );
}