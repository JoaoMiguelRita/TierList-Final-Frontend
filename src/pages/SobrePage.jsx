export default function SobrePage() {
    return (
        <div className="min-h-screen bg-gray-900 px-6 py-10">
            <div className="max-w-3xl mx-auto bg-gray-800 text-gray-100 rounded-xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-center mb-6 text-white">Sobre o Projeto</h1>
                
                <p className="text-gray-300 mb-4">
                    Este projeto foi desenvolvido com o objetivo de criar uma plataforma interativa para a organização e classificação de itens utilizando dois formatos principais: <strong>Tier List</strong> e <strong>Ranking</strong>.
                </p>

                <p className="text-gray-300 mb-4">
                    Através de uma interface intuitiva, o usuário pode arrastar e soltar os itens entre categorias (também chamadas de camadas) ou reordenar sua posição (no modo Padrão/Ranking). É possível editar, adicionar e excluir itens de forma dinâmica.
                </p>

                <p className="text-gray-300 mb-4">
                    A aplicação foi construída utilizando <strong>React.js</strong> para o front-end, com gerenciamento de estado via <code>useState</code> e <code>useEffect</code>, e integração com o <strong>json-server</strong> para simular uma API RESTful.
                </p>

                <p className="text-gray-300 mb-4">
                    Também foi utilizado o <strong>DND-Kit</strong> para implementar a funcionalidade de arrastar e soltar, proporcionando uma experiência de usuário fluida e moderna.
                </p>

                <p className="text-gray-300">
                    O projeto é um ótimo exemplo de aplicação fullstack simples, ideal para treinar manipulação de estado, componentes reutilizáveis e integração com APIs simuladas.
                </p>
            </div>
        </div>
    );
}
