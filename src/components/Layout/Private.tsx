import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex justify-center h-screen">
      <Outlet />
    </div>
  );
};

export default Layout;
