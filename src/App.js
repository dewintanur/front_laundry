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

// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;
// import React from "react";
// import Trial from "./components/trial"

// class App extends React.Component{
//   constructor(){
//     // fungsi yang pertama kali dijlankan saat pemanggilan komponen
//     // pemanggilan komponen
//     super()
//     this.state={
//       label: "Title of Trial",
//       subtitle: "Subtitle of trial",
//       color:"success",
//       students: [
//         {nis: "111", nama: "Rena", kota:"Malang"},
//         {nis: "112", nama: "dew", kota:"Sidoarjo"},
//         {nis: "113", nama: "Fit", kota:"Lumajang"},


//       ]
//     }
//   }
//   render(){
//     return(
//       <div >
//         <Trial title={this.state.label} subtitle={this.state.subtitle} bgColor={this.state.color} titleColor="secondary"/>
//         Text of Label
//         <input type ="text" className="form-control" value={this.state.label}
//         onChange={ev => this.setState({label: ev.target.value})}/>

//         Text for Subtitile
//         <input type="text" className="form-control"
//         value={this.state.subtitle}
//         onChange={ev => this.setState({subtitle: ev.target.value})}/>

//         Color for Trial
//         <select className="form-control" value={this.state.color} onChange={ev => this.setState({color: ev.target.value})}>
//           <option value="danger">Danger</option>
//           <option value="warning">warning</option>
//           <option value="success">success</option>
//           <option value="secondary">secondary</option>
//           </select>

//           List of students
//           <ul className="list-group">
//             {this.state.students.map(siswa => (
//               <li className="list-group-item">
//               <div className="row">
//                 <div className="col-lg-3">
//                   <small className="text-primary">NIS</small> <br/>
//                   <h5>{siswa.nis}</h5>
//                 </div>
//                 <div className="col-lg-4">
//                    <small className="text-primary">NAMA</small> <br/>
//                   <h5>{siswa.nama}</h5>
//                 </div>
//                 <div className="col-lg-5">
//                    <small className="text-primary">KOTA</small> <br/>
//                   <h5>{siswa.kota}</h5>
//                 </div>

//               </div>
//             </li>
//             ))}

//           </ul>
//               </div>
//     )
//   }
// }


// export default App