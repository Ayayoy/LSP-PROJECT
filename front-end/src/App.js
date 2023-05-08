import { Outlet, useLocation } from 'react-router-dom';
import Header from './shared/Header';
import Footer from './shared/Footer';

function App() {
  const location = useLocation();
  const hideHeader =
     location.pathname === "/BookList" 
  || location.pathname === "/BorrowedBooks" 
  || location.pathname === "/AdminDashboard" 
  || location.pathname === "/RegistrationReq"  
  || location.pathname === "/BorrowingReq"  ;

  return (
    <div>
      {!hideHeader && <Header />}
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
