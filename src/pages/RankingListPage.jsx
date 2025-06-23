import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RankingListPage() {
  const { id } = useParams();
  const [rankingList, setRankingList] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/tierList/${id}`)
      .then((res) => setRankingList(res.data))
      .catch((err) => setError("Erro ao carregar ranking."));
  }, [id]);

  const handleEdit = (itemId) => {
    const newName = prompt("Novo nome:");
    if (!newName) return;

    const updatedItems = rankingList.items.map(item =>
      item.id_item === itemId ? { ...item, name_item: newName } : item
    );

    axios.patch(`http://localhost:3000/tierList/${id}`, { items: updatedItems })
      .then(() => setRankingList(prev => ({ ...prev, items: updatedItems })))
      .catch(() => alert("Erro ao editar item."));
  };

  const handleDelete = (itemId) => {
    if (!confirm("Deseja realmente excluir?")) return;

    const updatedItems = rankingList.items.filter(item => item.id_item !== itemId);

    axios.patch(`http://localhost:3000/tierList/${id}`, { items: updatedItems })
      .then(() => setRankingList(prev => ({ ...prev, items: updatedItems })))
      .catch(() => alert("Erro ao deletar item."));
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!rankingList) return <p className="text-white">Carregando ranking...</p>;

  const sortedItems = [...(rankingList.items || [])].sort((a, b) => a.ordem - b.ordem);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        {rankingList.name} - Ranking
      </h1>

      <div className="space-y-4 max-w-3xl mx-auto">
        {sortedItems.map((item, index) => (
          <div
            key={item.id_item}
            className="flex items-center justify-between bg-gray-700 px-4 py-3 rounded shadow"
          >
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold">{index + 1}º</span>
              <span>{item.name_item}</span>
            </div>
            <div className="flex gap-2">
              <button
                className="text-yellow-400 hover:underline"
                onClick={() => handleEdit(item.id_item)}
              >
                Editar
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleDelete(item.id_item)}
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
