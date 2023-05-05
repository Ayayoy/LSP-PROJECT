import React from "react";

import './Contact.css';

function ContactForm() {



  return (
    <div className='contact'>
    
        <div className="contact-form-container">
      <div className="contact-form">
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />

          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message"></textarea>

          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  
    </div>

  );
}

export default ContactForm;
