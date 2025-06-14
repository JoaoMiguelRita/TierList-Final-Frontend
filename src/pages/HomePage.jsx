import { useEffect, useState } from 'react';
import { v4 as uuidv4} from 'uuid';
import axios from 'axios';

export default function HomePage() {
    const [tierList, setTierList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/tierList').then(
        response => {
            setTierList(response.data)
        }
        )
    }, [TierList]);

    const handleAddTier = (newTier) => {
        newTier.id = uuidv4()
        axios.post('http://localhost:3000/tierList', newTier)
    };

    const handleDeleteTier = (id) => {
        axios.delete(`http://localhost:3000/tierList/${id}`)
    };

    const handleConcluirTier = (id) => {
        axios.patch(`http://localhost:3000/tierList/${id}`, {concluido: true})
    };

    const handleEditarTier = (id, newTier) => {
        axios.patch(`http://localhost:3000/tierList/${id}`, newTier)
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6">
            <h1 className="text-2xl font-bold text-center mb-6">📝 Tier List</h1>
            <p className="text-gray-700">teste</p>
            </div>
        </div>
    );
}
