import { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

export default function TierForm({ initialData = {}}) {
  const [newTier, setNewTier] = useState({
        "name": "",
        "type": "",
        ...initialData,
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log("Dados que serão enviados:", newTier);    

        if (newTier.name.trim() === "" || newTier.type.trim() === "") {
            alert("Por favor, preencha o nome e o tipo da TierList.");
        return;
        }

        try {
            const tierToSave = { ...newTier, id: uuidv4() };
            await axios.post('http://localhost:3000/tierList', tierToSave);
            alert("TierList adicionada com sucesso!");
            setNewTier({ // Aqui só limpa o form
                "name": "",
                "type": ""
            });
            navigate('/'); // Redireciona para a HomePage depois de salvar
            } catch (error) {
            console.error("Erro ao adicionar TierList:", error);
            alert("Houve um erro ao adicionar a TierList. Tente novamente.");
        }
    }

    const handleCancel = () => {
      navigate('/'); 
    }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-700 p-4 rounded flex flex-col gap-2">
      <input
        name="name"
        type="text"
        value={newTier.name}
        onChange={e => setNewTier({ ...newTier, name: e.target.value})}
        placeholder="Nome da TierList"
        className="p-2 rounded bg-gray-800 text-white"
      />
      <select
        name="type"
        value={newTier.type}
        onChange={e => setNewTier({ ...newTier, type: e.target.value})}
        className="p-2 rounded bg-gray-800 text-white"
      >
        <option value="">Selecione um Tipo</option>
        <option value="default">Padrão</option>
        <option value="ranking">Ranking</option>
      </select>
      <div className="flex gap-2 mt-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Salvar
        </button>
        <button type="button" onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
          Cancelar
        </button>
      </div>
    </form>
  );
}
