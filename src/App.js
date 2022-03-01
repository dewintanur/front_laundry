import React from "react";
import NotFound from "./notfound";
import Member from "./pages/member";
import User from "./pages/user";
import Paket from "./pages/paket"
import Transaksi from "./pages/transaksi";
import FormTransaksi from "./pages/formTransaksi";
import Login from "./pages/login";
import Header from "./header";
import Footer from "./footer";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
// import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./App.css";
import logo from "./logoo.png"
import Navbar from "./navbar";
import Dashboard from "./pages/dashboard";

export default function App() {
  return (
    <BrowserRouter>
      {/* <div> */}
        {/* <Navbar bg="nAvbar">
          <Navbar.Brand  className="logo">
            <img src={logo} class="img"/>

          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/" className="fw-bold">Home</Nav.Link>
            <Nav.Link href="/member" className="fw-bold">Member</Nav.Link>
            <Nav.Link href="/user" className="fw-bold">User</Nav.Link>
            <Nav.Link href="/paket" className="fw-bold">Paket</Nav.Link>
            <NavDropdown className="fw-bold" title="Transaksi">
              <NavDropdown.Item href="/transaksi" className="fw-bold">Transaksi </NavDropdown.Item>
              <NavDropdown.Item href="/formTransaksi" className="fw-bold">Tambah </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar>
        <Routes>
          <Route exact path="/" element={App}></Route>
          <Route path="/member" element={<Member></Member>} />
          <Route path="/user" element={<User></User>} />
          <Route path="/paket" element={<Paket></Paket>} />
          <Route path="/transaksi" element={<Transaksi></Transaksi>} />
          <Route path="/formtransaksi" element={<FormTransaksi></FormTransaksi>} />
          <Route component={NotFound} />
        </Routes> */}
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route exact path="/" element={<Navbar><Dashboard/></Navbar>}></Route>
          <Route path="/member" element={<Navbar><Member /></Navbar>} />
          <Route path="/user" element={<Navbar><User /></Navbar>} />
          <Route path="/paket" element={<Navbar><Paket /></Navbar>} />
          <Route path="/transaksi" element={<Navbar><Transaksi /></Navbar>} />
          <Route path="/formtransaksi" element={<Navbar><FormTransaksi/></Navbar>} />
          <Route component={NotFound} />
        </Routes>

      {/* </div> */}
    </BrowserRouter>
  );
}
