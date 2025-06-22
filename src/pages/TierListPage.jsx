import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TierForm from "../components/tierList/TierForm";
import TierBoard from "../components/tierList/TierBoard";
import TierTable from "../components/tierList/TierTable";

export default function TierListPage() {
  const { id } = useParams();
  const [tierList, setTierList] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:3000/tierList/${id}`);
        setTierList(res.data);
        // Aqui futuramente pode vir o fetch dos itens dessa lista
      } catch (error) {
        console.error("Erro ao buscar TierList:", error);
      }
    }

    fetchData();
  }, [id]);

  if (!tierList) return <p className="text-center text-white">Carregando...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">{tierList?.name}</h1>
      <TierBoard/>
      <TierForm/>
      <TierTable/>
    </div>
  );
}
