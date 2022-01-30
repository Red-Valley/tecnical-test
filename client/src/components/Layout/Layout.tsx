import Header from "../Header";
import Container from '@mui/material/Container';
import { Outlet } from "react-router-dom";



function Layout() {
  return (
    <div className="layout">
      <Header />
      <div className="container  mx-auto px-4">
       <Outlet />
      </div>      
    </div>
  );
}

export default Layout;