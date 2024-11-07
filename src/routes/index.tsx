import DefaultLayout from "@/components/layout/default-layout";
import HomePage from "@/pages/(main)/home-page";
import ErrorPage from "@/pages/(static)/error-page";
import { createBrowserRouter } from "react-router-dom";
import { ROUTE_PATH } from "./route-path";
import ProtectedRoute from "./authenticated-route";
import ProtectedRoutes from "./protected-routes";

const routes = createBrowserRouter([
  {
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTE_PATH.HOME,
        element: <HomePage />,
      },
      {
        element: <ProtectedRoute />,
        children: ProtectedRoutes,
      },
    ],
  },
]);

export default routes;
