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
    onEdit(tier.id, formData);
    setIsEditing(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(tier.id);
  };

  return (
    <>
    <div
      className="flex flex-col border p-4 rounded hover:bg-gray-500 shadow-snpm bg-gray-600 cursor-pointer"
      onClick={handleCardClick}
    >
      <p className="font-bold">{tier.name}</p>
      <p className="text-sm">{tier.type}</p>

      <div className="flex justify-between mt-2">
        <button
          className="text-red-600 hover:underline"
          /*onClick={handleEdit}*/
          onClick={openEditModal}
        >
          Editar
        </button>
        <button
          className="text-red-600 hover:underline"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Editar Tier List</h2>

            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 mb-4"
              placeholder="Nome"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <select
              className="w-full p-2 rounded bg-gray-700 mb-4"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option value="">Selecione um tipo</option>
              <option value="default">Padrão</option>
              <option value="ranking">Ranking</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded"
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
