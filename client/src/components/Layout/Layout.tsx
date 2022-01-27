import Header from "../Header";
import Container from '@mui/material/Container';


interface WrapperProps {
  children: React.ReactNode;
}

function Layout({ children }: WrapperProps) {
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
      <Container maxWidth="lg">
      {children}
      </Container>
      </div>      
    </div>
  );
}

export default Layout;