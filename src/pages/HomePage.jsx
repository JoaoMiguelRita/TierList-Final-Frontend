import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import TierListHome from "../components/home/TierListHome";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [tierList, setTierList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/tierList").then((response) => {
      setTierList(response.data);
    });
  }, [tierList]);

  const handleEditarTier = (id, newTier) => {
    axios.patch(`http://localhost:3000/tierList/${id}`, newTier);
  };

  const handleDeleteTier = (id) => {
    /*window.confirm("Deseja mesmo deletar esta TierList?")
        ? (axios.delete(`http://localhost:3000/tierList/${id}`))
        : (null)*/
    axios.delete(`http://localhost:3000/tierList/${id}`);
  };

  return (
    <div className="min-h-200 bg-gray-900 text-white px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">
          Tier Lists
        </h1>

        <div className="flex justify-center mb-8">
          <Link
            to="/form"
            className="bg-blue-600 hover:bg-blue-400 transition-colors text-white font-semibold px-6 py-3 rounded-xl shadow-md"
          >
            + Nova Tier-List
          </Link>
        </div>

        <TierListHome
          tierList={tierList}
          onDelete={handleDeleteTier}
          onEdit={handleEditarTier}
        />
      </div>
    </div>
  );
}
