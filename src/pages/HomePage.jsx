import { useEffect, useState } from 'react';
import { v4 as uuidv4} from 'uuid';
import axios from 'axios';
import TierListHome from '../components/TierListHome';
import { Link } from 'react-router-dom';

export default function HomePage() {
    const [tierList, setTierList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/tierList').then(
        response => {
            setTierList(response.data)
        }
        )
    }, [TierListHome]);

    const handleEditarTier = (id, newTier) => {
        axios.patch(`http://localhost:3000/tierList/${id}`, newTier)
    };

    const handleDeleteTier = (id) => {
        window.confirm("Deseja mesmo deletar esta TierList?")
        ? (axios.delete(`http://localhost:3000/tierList/${id}`))
        : (null)
    };

    return (
        <div className="min-h-200 bg-gray-800 px-60 p-8">
            <Link
                to="/form"
                className="block bg-gray-600 hover:bg-gray-500 transition-colors rounded-xl shadow-lg p-6 max-w-xl mx-auto"
            >    

                <h1 className="text-lg font-bold text-center m-auto">Nova Tier-List</h1>
            </Link>

            <TierListHome
                tierList={tierList}
                onDelete={handleDeleteTier}
                onEdit={handleEditarTier}
            />
        </div>
    );
}
