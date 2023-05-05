import { Link, useNavigate } from "react-router-dom";
import logo from '../../../images/Logo.png';
import './AdminHeader.css';



function AdminHeader() {

  const navigate = useNavigate();

  function handleLogout() {
    const id = localStorage.getItem('id');
    if (id) {
      fetch(`http://localhost:4000/Auth/logout/${id}`, {
        method: 'PUT',
      })
      .then(response => {
        if (response.ok) {
          navigate('/login');
        } else {
          throw new Error('Logout failed');
        }
      })
      .catch(error => {
        console.error(error);
        // Handle error
      });
    } else {
      console.error('No user ID found in localStorage');
      // Handle error
    }
  }
  
  return (
    <div className="header">
      <img src={logo} alt="Logo" className="logo" />

      <div className="buttons">
      <button className="buttons2"><Link to={"/AdminDashboard"} className='buttons2'>Home</Link></button>
      <button className="buttons2"><Link to={"/RegistrationReq"} className='buttons2'>Registration Requests</Link></button>
      <button className="buttons2"><Link to={"/BorrowingReq"} className='buttons2'>Borrowing Requests</Link></button>
      
      <button className="sidebar-button sidebar-logout"  onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

export default AdminHeader;
