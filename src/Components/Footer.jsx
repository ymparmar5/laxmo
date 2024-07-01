import { Link } from "react-router-dom";
import "../Style/Footer.css"

const Footer = () => {

  return (
    <>
      <div className="footer-top" >
        <a href="/LAXMO.pdf" download="catlog-loxmo" >
          <i className="fa-solid fa-file-pdf fa-2xl"></i>
        </a>


        <a href="https://wa.me/918000081161">
          <img src="/whatsapp.png" alt="whatsapp" className="whatsapp" />
        </a>

        <p>
          Ready to get started? <br />
          feel free talk to us today
        </p>

        <Link to={"./contact"} > <button id="get-connect"  >

          GET CONNECTED</button></Link>

      </div>
      <footer>

        <div className="footer-menu"> <h3 className="footer-heading" > ABOUT US</h3>
          <ul>
            <p>
              Founded in 2010, we began our journey with a simple vision: to revolutionize the Pumps and Motors manufacturing industry by delivering high-quality, innovative products.
            </p>
          </ul></div>

        <div className="footer-menu">
          <h3 className="footer-heading" >
            IMPORTANT LINKS

          </h3>
          <ul>

            <Link to={"/privacy"} >
              <li>Privacy policy</li>
            </Link>
            <Link to={"/tandc"} ><li>Terms and condition</li>
            </Link>
            <Link to={"/about"}>   <li>About</li>
            </Link>
            <Link to={"./shop"}>
              <li  >Manufactures</li>
            </Link>
            <Link to={"./user-dashboard"} >
              <li>Track orders</li>
            </Link>




          </ul>
        </div>

        <div className="footer-menu">
          <h3 className="footer-heading" >        MY ACCOUNTS

          </h3>

          <ul>
            <li>Sign Up</li>
            <li>Login</li>
            <li>Cart</li>
            <li>wish list</li>
            <li>My account</li>

          </ul></div>
        <div className="footer-menu">
          <h3 className="footer-heading" >
            NEWS LETTERS
          </h3>
          <div id="footer-icons">
            <a href="/"> <i className="footer-icons  fa-xl fa-brands fa-telegram"></i></a>
            <a href="/"> <i className="footer-icons  fa-xl fa-solid fa-envelope"></i></a>
            <a href="/"> <i className="footer-icons  fa-xl fa-brands fa-instagram"></i></a>
            <a href="/"> <i className="footer-icons  fa-xl fa-solid fa-location-dot"></i></a>
          </div>
          <div id="footer-icons">
            <a href="/"> <i className="footer-icons  fa-xl fa-brands fa-facebook  "></i> </a>
            <a href="/"> <i className="footer-icons  fa-xl fa-brands fa-linkedin"></i> </a>
            <a href="/"> <i className="footer-icons  fa-xl fa-brands fa-whatsapp"></i> </a>
            <a href="/"> <i className="footer-icons  fa-xl fa-brands fa-youtube"></i> </a>

          </div>

        </div>
      </footer>
      <div id="madeby" >
        <p>&copy; copyright @2024 laxmopumps. all right reserved</p>
        <p>Made by Y.M.PARMAR</p>
      </div>
    </>

  );
}

export default Footer;