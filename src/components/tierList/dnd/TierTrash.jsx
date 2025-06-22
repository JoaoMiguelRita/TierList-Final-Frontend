import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export default function TierTrash() {
  // O ID do droppable da lixeira pode ser uma string única, por exemplo, "trash-can"
  const { setNodeRef, isOver } = useDroppable({
    id: "trash", // <-- ID único para a lixeira
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        mt-8 p-6 border-2 border-dashed rounded-lg flex items-center justify-center
        transition-all duration-300
        ${isOver ? 'bg-red-700 border-red-500' : 'bg-gray-800 border-gray-600'}
      `}
      style={{ minHeight: '100px' }} // Garante que a área seja visível
    >
      <p className="text-xl font-semibold text-white">
        {isOver ? 'Solte para Excluir!' : 'Arraste para a lixeira para excluir'}
      </p>
    </div>
  );
}