import TierItemHome from "./TierItemHome";

export default function TierListHome({tierList, onDelete, onEdit}) {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
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