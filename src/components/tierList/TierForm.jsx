export default function TierForm() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <form>
          <label>Nome item </label>
          <input placeholder="ex: Item 1" />

          <label>Imagem </label>
          <input placeholder="ex: Aqui fodeu..." />
        </form>
        <button
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded"
          onClick={() => alert("Adicionado modal")}
        >
          Adicionar Item
        </button>
      </div>
    </>
  );
}
