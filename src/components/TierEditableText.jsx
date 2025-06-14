import { useState } from "react"

export default function TierEditableText({ l_text, onEdit }) {

    const [editing, setEditing] = useState(false)

    const handleDoubleClick = () => {
        setEditing(true)
    }

    const handleEdit = (novoValor) => {
        onEdit(novoValor)
        setEditing(false)
    }

    if (editing) {
        return <input
            type="text"
            autoFocus
            defaultValue={l_text}
            onBlur={e => handleEdit(e.target.value)}
            className="border-b border-blue-400 focus:outline-none w-full px-1"
        />
    }
    return <p
        onDoubleClick={handleDoubleClick}
        className="cursor-pointer hover:bg-gray-500 rounded px-1">
        {l_text}
    </p>
}