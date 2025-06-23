import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DefaultLayout from "./layout/DefaultLayout";
import SobrePage from "./pages/SobrePage";
import TierForm from "./components/home/TierFormHome";
import TierList from "./pages/TierListPage";
import RankingListPage from "./pages/RankingListPage";

export default function App() {

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
          path: "/ranking/:id",
          element: <RankingListPage />,
        },
        {
          path: "/sobre",
          element: <SobrePage />,
        },
      ],
    },
  ]);

  return (<RouterProvider router={router}></RouterProvider>);
}
