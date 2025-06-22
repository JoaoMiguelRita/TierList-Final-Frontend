export default function TierForm() {

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
            console.log("Erro ao adicionar TierList:", error?.message, error?.response);
            alert("Houve um erro ao adicionar a TierList. Tente novamente.");
        }
    }

  return (
    <>
      <div className="flex justify-center mb-6">
        <form onSubmit={handleSubmit}>
          <label>Nome item </label>
          <input placeholder="ex: Item 1" />

          <label>Imagem </label>
          <input placeholder="ex: Aqui fodeu..." />
        </form>
        <button
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          Adicionar Item
        </button>
      </div>
    </>
  );
}
