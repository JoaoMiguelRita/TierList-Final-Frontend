import { Link, Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">teste layout</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-indigo-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="text-gray-700 hover:text-indigo-500 transition-colors"
                >
                  Sobre
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
