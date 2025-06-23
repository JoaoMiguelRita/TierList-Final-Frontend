import { Link, Outlet, useLocation } from "react-router-dom";

export default function DefaultLayout() {
  const location = useLocation(); 
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <main className="flex-1 container mx-auto px-5 py-6 flex justify-center items-center">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-gray-400 py-4">
        <div className="container mx-auto px-4 flex justify-center">
          {location.pathname === '/' ? (
          <Link
            to="/sobre"
            className="text-gray-00 hover:text-gray-200 transition-colors"
          >
            Sobre
          </Link>
          ) : (
          <Link
            to="/"
            className="text-gray-00 hover:text-gray-200 transition-colors"
          >
            Home
          </Link>
          )}
        </div>
      </footer>
    </div> 
  );
}

