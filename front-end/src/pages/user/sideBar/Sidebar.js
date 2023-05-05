import React from 'react';
import './Sidebar.css';
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {

  const history = useHistory();

  function handleLogout() {

    navigate('/login');
  }

  return (
    <div className="sidebar">
      <button className="sidebar-button"><Link to={"/BorrowedBooks"} className="borrowed">Borrowed Books</Link></button>
      <button className="sidebar-button sidebar-logout"  onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default Sidebar;
