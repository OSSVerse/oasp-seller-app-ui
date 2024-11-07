import { Outlet } from "react-router-dom";
import NavBar from "./nav-bar";
import useAuthStore from "@/store/auth-store";
import Footer from "./footer";

const DefaultLayout = () => {
  const { isAuthenticated } = useAuthStore()
  return (
    <div data-testid="default-layout">
      <NavBar />
      <Outlet />
      {isAuthenticated && <Footer />}
    </div>
  );
};

export default DefaultLayout;
