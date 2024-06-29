import React from "react";
import "../Style/Contact.css";

const Contact = () => {
  return (
    <>
      <img src="./contact.jpg" alt=" contact jpg " />
      <div id="main">
        <div id="contact-info">
        <img src="/telecall.png" />
          <p>
          <b>Phone:</b> &nbsp; +91 8000081161 <br /><br />  
          </p>
          <p>
          <b>Email:</b> &nbsp; laxmopump@gmail.com <br /><br />
          </p>
          <p>
            <b>Address:</b> &nbsp; Kevadiya Farm,<br /> 
          
          </p>
          <p>
            Nr. Sahaj Imperia, Dabholi,
            </p>
         
          <p>Surat, 395004, Gujarat, India</p>
        </div>
        <div id="get-in-touch">
          <h3 className="title">Get In Touch</h3>
          <div id="form">
            <form>
              <div className="input">
                <label htmlFor="Fullname">Full Name</label>
                <input type="text" name="fullname" id="Fullname" />
              </div>
              <div className="input">
                <label htmlFor="Email">Email</label>
                <input type="email" name="email" id="Email" />
              </div>
              <div className="input">
                <label htmlFor="number">Number</label>
                <input type="phone" name="number" id="Number" />
              </div>
              <div className="input">
                <label htmlFor="message">Your Message</label>
                <input type="text" name="message" id="message" />
              </div>
              <button id="submit-btn" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <div id="map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3808200.7768138624!2d72.843364!3d21.233987!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f7c994f768d%3A0x45b3b521ee85ed72!2sLaxmo%20Technology!5e0!3m2!1sen!2sus!4v1719376786736!5m2!1sen!2sus" allowfullscreen="" id="map-iframe" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </>
  );
};

export default Contact;

