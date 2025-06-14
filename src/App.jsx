import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import HomePage from "./pages/HomePage";
import DefaultLayout from "./layout/DefaultLayout";
import SobrePage from "./pages/SobrePage";

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

