import React from 'react';
import '../style/Footer.css';

function Footer() {
    return (
      <div className="footer">
        <p>&copy; 2023 MyCompany, Inc.</p>
        <div className="social-links">
          <a href="https://twitter.com/mycompany"><i className="fab fa-twitter"></i></a>
          <a href="https://www.facebook.com/mycompany"><i className="fab fa-facebook"></i></a>
          <a href="https://www.instagram.com/mycompany"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    );
  }

export default Footer;
  