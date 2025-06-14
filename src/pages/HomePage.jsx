import { useEffect, useState } from 'react';
import { v4 as uuidv4} from 'uuid';
import axios from 'axios';
import TierListHome from '../components/TierListHome';

export default function HomePage() {
    const [tierList, setTierList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/tierList').then(
        response => {
            setTierList(response.data)
        }
        )
    }, [TierListHome]);

    const handleAddTier = (newTier) => {
        newTier.id = uuidv4()
        axios.post('http://localhost:3000/tierList', newTier)
    };

    const handleDeleteTier = (id) => {
        axios.delete(`http://localhost:3000/tierList/${id}`)
    };

    const handleEditarTier = (id, newTier) => {
        axios.patch(`http://localhost:3000/tierList/${id}`, newTier)
    };

    return (
        <div className="min-h-200 bg-gray-800 px-60 p-8">
            <button className="max-w-xl mx-auto bg-gray-600 hover:bg-gray-500 transition-colors rounded-xl shadow-lg p-6">    
                <h1 className="text-lg font-bold text-center m-auto">Nova Tier-List</h1>
            </button>

            <TierListHome
                tierList={tierList}
                onDelete={handleDeleteTier}
                onEdit={handleEditarTier}
            />
        </div>
    );
}
