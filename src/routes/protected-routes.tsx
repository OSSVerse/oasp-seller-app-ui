import DashboardPage from "@/pages/(dashboard)/dashboard-page";
import AssessmentOrderPage from "@/pages/(dashboard)/assessment-order/assessment-order-page";
import type { RouteObject } from "react-router-dom";
import MarketPlacePage from "@/pages/(dashboard)/marketplace/marketplace-page";
import PlaceOrderPage from "@/pages/(dashboard)/placeorder/placeorder-page";
import MyOrdersPage from "@/pages/(dashboard)/my-orders/my-orders-page";
import OrderDetailsPage from "@/pages/(dashboard)/my-orders/orderdetails/orderdetails-page";
import { ROUTE_PATH } from "./route-path";
import ValidationOrderPage from "@/pages/(dashboard)/validation-order/validation-order-page";
import AssessmentOrderDetailPage from "@/pages/(dashboard)/assessment-order/assessment-order-detail-page";
import ValidationOrderDetailPage from "@/pages/(dashboard)/validation-order/validation-order-detail-page";
import MyProjectPage from "@/pages/(dashboard)/my-project/my-project-page";
import MyProjectDetailPage from "@/pages/(dashboard)/my-project/my-project-detail-page";
import MyProjectCreatePage from "@/pages/(dashboard)/my-project/my-project-create-page";

const ProtectedRoutes: RouteObject[] = [
  {
    path: ROUTE_PATH.DASHBOARD,
    element: <DashboardPage />,
  },
  {
    path: ROUTE_PATH.MARKETPLACE,
    element: <MarketPlacePage />,
  },
  {
    path: `${ROUTE_PATH.PLACEORDER}/:id`,
    element: <PlaceOrderPage />,
  },
  {
    path: ROUTE_PATH.MYORDERS,
    element: <MyOrdersPage />,
  },
  {
    path: `${ROUTE_PATH.ORDERDETAIL}/:id`,
    element: <OrderDetailsPage />,
  },
  {
    path: ROUTE_PATH.ASSESSMENTORDER,
    element: <AssessmentOrderPage />,
  },
  {
    path: `${ROUTE_PATH.ASSESSMENTORDER}/:id`,
    element: <AssessmentOrderDetailPage />,
  },
  {
    path: ROUTE_PATH.VALIDATIONORDER,
    element: <ValidationOrderPage />,
  },
  {
    path: `${ROUTE_PATH.VALIDATIONORDER}/:id`,
    element: <ValidationOrderDetailPage />,
  },
  {
    path: ROUTE_PATH.MYPROJECTS,
    element: <MyProjectPage />,
  },
  {
    path: `${ROUTE_PATH.MYPROJECTS}/:id`,
    element: <MyProjectDetailPage />,
  },
  {
    path: ROUTE_PATH.CREATE_MYPROJECTS,
    element: <MyProjectCreatePage />,
  },
];

export default ProtectedRoutes;
