import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function TierForm({ onAddItem }) {
  const nameRef = useRef(null);
  const imageRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value.trim();
    const imageUrl = imageRef.current.value.trim();

    if (name === "") {
      alert("Por favor, preencha o nome do item.");
      return;
    }

    const newItem = {
      id_item: uuidv4(),
      name_item: name,
      image_url: imageUrl,
      tier: "?"
    };

    onAddItem(newItem);

    // Limpa os inputs após a adição
    nameRef.current.value = "";
    imageRef.current.value = "";
  };

  return (
    <div className="flex justify-center pt-5 mb-6">
      <form onSubmit={handleSubmit} className="flex gap-4 p-6 bg-gray-800 rounded-lg shadow-md items-center w-full max-w-4xl"> 
        {/* Campo Nome do Item */}
        <div className="flex-1">
          <label htmlFor="nameItem" className="sr-only">Nome do Item</label>
          <input
            id="nameItem"
            type="text"
            placeholder="Nome do item"
            ref={nameRef}
            className="p-2 rounded bg-gray-700 text-white w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="flex-1">
          <label htmlFor="imageUrl" className="sr-only">URL da Imagem</label>
          <input
            id="imageUrl"
            type="text"
            placeholder="URL da imagem (opcional)"
            ref={imageRef}
            className="p-2 rounded bg-gray-700 text-white w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      
        <button
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded transition-colors flex-shrink-0"
          type="submit"
        >
          Adicionar Item
        </button>
      </form>
    </div>
  );
}
