import TierEditableText from "./TierEditableText"

export default function TierItemHome({tier, onDelete, onEdit}) {
    const handleEdit = (atributo, novoValor) => {
        onEdit(tier.id, { [atributo]: novoValor })
    }

    return (
        <div className="flex flex-col border p-4 rounded shadow-sm bg-gray-600">
            <TierEditableText
            id="name"
            l_text={tier.name}
            onEdit={(value) => handleEdit("name", value)}
            />
            <TierEditableText
            id="type"
            l_text={tier.type}
            onEdit={(value) => handleEdit("type", value)}
            />
            <div className="flex justify-between mt-2">
                <button onClick={() => onDelete(tier.id)} className="text-red-600 hover:underline">
                    Deletar
                </button>
            </div>
        </div>
        )
}