import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "./img/logBran.png"
import './App.css'

function Logout() {
    // remove data token dan user dari local storage
    localStorage.removeItem("user")
    localStorage.removeItem("token")
}

export default function Navbar(props) {
    let halo = JSON.parse(localStorage.getItem(`user`));
    return (
        <div>
            <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">
                        <img src={logo} class="img" /></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#myNav" aria-controls="myNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="myNav">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <NavLink className="nav-link" to="/Member">Member</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/User">User</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/Paket">Package</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/Transaksi">Transaction</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link " to="/FormTransaksi">New Transaction</NavLink>
                            </li>
                        </ul>

                        <form class="d-flex">
                            <h6 className="mt-2"><i class="fa-solid fa-user-group"></i> {halo.role} {halo.username}</h6>
                            <Link
                                to="/Login" className="nav-link text-dark"
                                onClick={() => Logout()} ><i class="fa-solid fa-right-to-bracket"></i>
                            </Link>
                        </form>
                    </div>
                </div>
            </nav>
            {props.children}
        </div>
    )
}