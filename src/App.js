import React from "react";
import NotFound from "./notfound";
import Member from "./pages/member";
import User from "./pages/user";
import Paket from "./pages/paket"
import Transaksi from "./pages/transaksi";
import FormTransaksi from "./pages/formTransaksi";
import Login from "./pages/login";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Navbar from "./navbar";
import Dashboard from "./pages/dashboard";
export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navbar><Dashboard/></Navbar>}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/member" element={<Navbar><Member /></Navbar>} />
          <Route path="/user" element={<Navbar><User /></Navbar>} />
          <Route path="/paket" element={<Navbar><Paket /></Navbar>} />
          <Route path="/transaksi" element={<Navbar><Transaksi /></Navbar>} />
          <Route path="/formtransaksi" element={<Navbar><FormTransaksi/></Navbar>} />
          <Route component={NotFound} />
          <Route ></Route>
        </Routes>
    </BrowserRouter>
  );
}
