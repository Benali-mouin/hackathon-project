import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";

import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import AllEstates from "./components/AllEstates.jsx";
import AddEstate from "./components/AddEstate.jsx";
import Customers from "./components/Customers.jsx";
import Msg from './components/msg.jsx'; 
function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                {
                    path: "products",
                    element: <AllEstates/>,
                },
                {
                    path: "new-product",
                    element: <AddEstate/>,
                },
                {
                    path: "customers",
                    element: <Customers />,
                },
                {
                    path: "messages",
                    element: <Msg/>,
                }
            ],
        },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
