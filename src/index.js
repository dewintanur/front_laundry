import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
// import Trial from './components/trial';

import Member from './pages/member';
import User from './pages/user';
import Paket from './pages/paket';
import Transaksi from './pages/transaksi';
import FormTransaksi from './pages/formTransaksi';

import "bootstrap/dist/css//bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"

import Login from "./pages/login"

ReactDOM.render(
  // Routing,
  <React.StrictMode>
    {/* <Trial title="Hallo Mokleters" subtitle=""/>
    <Trial title="Hallo HAI" subtitle="OMAYGAT"/>
    <Trial title="Hallo HIHI"/> */}
    <App />
    {/* <Login /> */}
    {/* <Member/> */}
    {/* <User /> */}
    {/* <Paket /> */}
    {/* <Transaksi /> */}
    {/* <FormTransaksi/> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
