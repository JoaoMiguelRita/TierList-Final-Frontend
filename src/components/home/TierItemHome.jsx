import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TierItemHome({ tier, onDelete, onEdit }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: tier.name,
    type: tier.type,
  });

  const handleCardClick = () => {
    navigate(`/tierList/${tier.id}`);

  };

  /*const handleEdit = (e) => {
    e.stopPropagation();
    const newName = prompt("Digite o novo nome da TierList:", tier.name);
    const newType = prompt("Digite o novo Tipo da TierList:", tier.type);
    if ((newName && newName.trim() !== "") || (newType && newType.trim() !== "")) {
      onEdit(tier.id, { name: newName.trim(), type: newType.trim() });
    }
  };*/

  const openEditModal = (e) => {
    e.stopPropagation();
    setFormData({ name: tier.name, type: tier.type });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (formData.name.trim() === "") {
      alert("O nome não pode estar vazio.");
      return;
    }
    onEdit(tier.id, formData);
    setIsEditing(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Tem certeza que deseja deletar esta Tier List?")) {
      onDelete(tier.id);
    }
  };

  return (
    <>
      <div
        className="bg-gray-800 hover:bg-gray-700 transition-colors p-6 rounded-xl shadow-md cursor-pointer flex flex-col justify-between h-full"
        onClick={handleCardClick}
      >
        <div>
          <h2 className="text-xl font-bold mb-1">{tier.name}</h2>
          <p className="text-sm text-gray-400 capitalize">
            {tier.type === "default" ? "Padrão" : tier.type || "sem tipo"}
          </p>
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="text-yellow-400 hover:underline"
            onClick={openEditModal}
          >
            Editar
          </button>
          <button
            className="text-red-500 hover:underline"
            onClick={handleDelete}
          >
            Deletar
          </button>
        </div>
      </div>

      {/*
      Essa parte se chama Modal, foi a melhor forma apresentavel para 
      realizar a edição do campo type.
    */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Editar Tier List</h2>

            <div className="mb-4">
              <label className="block mb-1 text-sm">Nome</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nome"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="mb-6">
              <label className="block mb-1 text-sm">Tipo</label>
              <select
                className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <option value="">Selecione um tipo</option>
                <option value="default">Padrão</option>
                <option value="ranking">Ranking</option>
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded font-semibold"
                onClick={handleSave}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
