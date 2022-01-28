import Header from "../Header";
import Container from '@mui/material/Container';
import { Outlet } from "react-router-dom";



function Layout() {
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
      <Container maxWidth="lg">
      <Outlet />
      </Container>
      </div>      
    </div>
  );
}

export default Layout;