import TierItemTable from "./TierItemTable";

export default function TierListTable({ items, onDelete, onEdit }) {

  return (
    <>
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">Itens não classificados</h2>
        <div className="flex flex-wrap gap-2 p-4 bg-gray-800 rounded">
          {items.length === 0 ? (
            <p className="text-gray-400">Nenhum item adicionado ainda. Adicione alguns!</p>
          ) : (
            items.map((item) => (
              
                <TierItemTable
                  key={item.id_item} 
                  item={item}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
            ))
          )}
        </div>
      </div>
    </>
  );
}