import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DefaultLayout from "./layout/DefaultLayout";
import SobrePage from "./pages/SobrePage";
import TierForm from "./components/TierFormHome";
import TierList from "./pages/TierListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/form",
        element: <TierForm />,
      },
      {
        path: "/tierList/:id",
        element: <TierList />,
      },
      {
        path: "/sobre",
        element: <SobrePage />,
      }
    ]
  }
]);

export default function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}  

