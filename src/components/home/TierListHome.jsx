import TierItemHome from "./TierItemHome";

export default function TierListHome({tierList, onDelete, onEdit}) {
  return (
    <div className="min-w-sw mx-auto mt-10 bg-gray-700 text-gray-100  rounded-xl shadow-lg p-6">
       {tierList.map(tier => (
            <TierItemHome
              key={tier.id}
              tier={tier}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
    </div>
  );
}