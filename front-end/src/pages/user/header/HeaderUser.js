import { Link, useNavigate } from "react-router-dom";
import logo from '../../../images/Logo.png';
import './HeaderUser.css';
import { removeAuthUser } from "../../Dashboard/helper/storage";


function HeaderUser() {
  const navigate = useNavigate();

  function handleLogout() {
    removeAuthUser();
    const id = localStorage.getItem('id');
    if (id) {
      fetch(`http://localhost:4000/Auth/logout/${id}`, {
        method: 'PUT',
      })
      .then(response => {
        if (response.ok) {
          localStorage.clear(); // clear local storage
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
        <button className="buttons2"><Link to={"/BookList"} className='buttons2'>Home</Link></button>
        <button className="buttons2"><Link to={"/BorrowedBooks"} className='buttons2'>Borrowed Books</Link></button>
      
        <button className="sidebar-button sidebar-logout" onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

export default HeaderUser;
