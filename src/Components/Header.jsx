import React, { useState, useContext } from "react";
import "../Style/Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import myContext from "../Context/myContext";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const context = useContext(myContext);
  const { getAllProduct } = context;

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filterSearchData = getAllProduct.filter((obj) =>
    obj.title.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 8);

  return (
    <header id="header">
      <NavLink to="/">
        <img id="logo" src="/logo2.png" alt="logo" />
      </NavLink>
      <nav className={isMobileMenuOpen ? "mobile-menu-open" : ""}>
        <menu className={isMobileMenuOpen ? "mobile-menu-open" : ""}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </menu>
      </nav>
      <div id="icons">
        <div className="search-container">
          <div className="search-bar-container">
            <div className="input-container">
              <input
                type="text"
                value={search}
                placeholder="Search here"
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
              <i className="icons fa-xl fa-solid fa-magnifying-glass search-icon"></i>
            </div>
            <div className="dropdown-container">
              {search && (
                <div className="search-dropdown">
                  {filterSearchData.length > 0 ? (
                    filterSearchData.map((item, index) => (
                      <div
                        key={index}
                        className="dropdown-item"
                        onClick={() => navigate(`/productinfo/${item.id}`)}
                      >
                        <div className="item-content">
                          <img className="item-image" src={item.imgurl1} alt="" />
                          {item.title}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-results">
                      <img
                        className="no-results-image"
                        src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png"
                        alt="No results"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="hamburger-menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        <i className="fa fa-bars"></i>
      </div>
    </header>
  );
};

export default Header;
