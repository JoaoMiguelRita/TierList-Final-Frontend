import { Link, Navigate } from "react-router-dom";

export default function TierItemHome({ tier, onDelete, onEdit }) {
  const handleNavClick = () => {
    Navigate(`/tierList/${tier.id}`);
  }

  const handleEdit = (e) => {
    e.stopPropagation(); // evita navegação
    const newName = prompt("Digite o novo nome da TierList:", tier.name);
    if (newName && newName.trim() !== "") {
      onEdit(tier.id, { name: newName.trim() });
    }
  };

  return (
    <Link 
        className="flex flex-col border p-4 rounded hover:bg-gray-500 shadow-snpm bg-gray-600"
        to={`/tierList/${tier.id}`}
    >
      <p
        id="name"
        className="cursor-pointer rounded px-1"
      >
        {tier.name}
      </p>
      <p
        id="type"
        className="cursor-pointer rounded px-1"
      >
        {tier.type}
      </p>
      <div className="flex justify-between mt-2">
        <button
          className="text-red-600 hover:underline"
          onClick={(e) => {
            e.stopPropagation(); // evita navegação ao clicar no botão
            
          }}
        >
          Editar
        </button>
        <button
          className="text-red-600 hover:underline"
          onClick={(e) => {
            e.stopPropagation(); // evita navegação ao clicar no botão
            onDelete(tier.id);
          }}
        >
          Deletar
        </button>
      </div>
    </Link>
  );
}
