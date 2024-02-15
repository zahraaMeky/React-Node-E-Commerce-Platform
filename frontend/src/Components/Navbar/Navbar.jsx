import React, { useState,useContext } from 'react';
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from "react-router-dom";
import './Navbar.css';
import { ShopContext } from "../Context/ShopContext";
function Navbar() {
    const [menu, setMenu] = useState("shop");
    const {getTotalCartItem} = useContext(ShopContext);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container">
    <Link className="navbar-brand" to="/">
      <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/>
      <span className='text-uppercase logo-text'>Shopper</span>
    </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active text-capitalize" onClick={()=>setMenu("shop")} to="/">
            shop {menu==='shop'?<hr/>:<></>}
            
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-capitalize" onClick={()=>setMenu("men")} to="/mens">
                mens {menu==='men'?<hr/>:<></>}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-capitalize" onClick={()=>setMenu("women")} to="/womens">
                womens {menu==='women'?<hr/>:<></>}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-capitalize" onClick={()=>setMenu("kids")} to="/kids">
                kids {menu==='kids'?<hr/>:<></>}
            </Link>
          </li>
        </ul>
        <div className="d-flex">
        {
            localStorage.getItem('auth-token') ? (
                <button className="btn btn-sm btn-outline-secondary login-btn me-3 text-capitalize" onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Log Out</button>
            ) : (
                <Link to="/login">
                    <button className="btn btn-sm btn-outline-secondary login-btn me-3 text-capitalize" type="button">Login</button>
                </Link>
            )
        }

       
          <Link className="position-relative my-2" to="/cart">
            <img src={cart_icon} alt="cart_icon"/>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {getTotalCartItem()}
            </span>
            </Link>
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Navbar
