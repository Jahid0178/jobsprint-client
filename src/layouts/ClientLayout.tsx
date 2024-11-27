import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { Outlet } from "react-router";

const ClientLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default ClientLayout;
