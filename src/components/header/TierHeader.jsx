export default function TierHeader({ title, type, onToggleType }) {
  return (
    <>
      <h1 className="text-4xl font-bold mb-8 text-center">{title}</h1>
      <div className="flex justify-center mb-6">
        <button
          onClick={onToggleType}
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded"
        >
          Alternar para {type === "ranking" ? "Tier List" : "Ranking"}
        </button>
      </div>
    </>
  );
}
