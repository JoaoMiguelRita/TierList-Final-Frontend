export default function TierItemTable({ item, onDelete, onEdit }) {
  return (
    <div className="flex flex-col border p-4 rounded hover:bg-gray-500 shadow-sm bg-gray-600">
      <p className="cursor-pointer rounded px-1">
        {item.name_item}
      </p>
      <div className="flex justify-between mt-2">
        <button
          className="text-red-600 hover:underline"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(item.id_item, /* Dados para edição */);
          }}
        >
          Editar
        </button>
        <button
          className="text-red-600 hover:underline"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.id_item);
          }}
        >
          Deletar
        </button>
      </div>
    </div>
  );
}