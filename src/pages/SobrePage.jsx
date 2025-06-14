export default function SobrePage() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6">
                <h1 className="text-2xl font-bold text-center mb-6">Sobre</h1>
                <p className="text-gray-700">
                    Este é um aplicativo de lista de tarefas simples criado com React.
                </p>
                <p className="text-gray-700">
                    Você pode adicionar, excluir e marcar tarefas como concluídas.
                </p>
            </div>
        </div>
    );
}
