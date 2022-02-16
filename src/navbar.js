import React from "react";
import { Link } from "react-router-dom";

function Logout() {
    // remove data token dan user dari local storage
    localStorage.removeItem("user")
    localStorage.removeItem("token")
}

export default function Navbar(props) {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    {/* brand */}
                    <a href="/"className="navbar-brand">LONDREE</a>

                    {/* button toggler */}
                    <button className="navbar-toggler"
                        data-bs-toggle="collapse" data-bs-target="#myNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* define menus */}
                    <div className="collapse navbar-collapse" id="myNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/Member" className="nav-link" >
                                    Member
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/User" className="nav-link" >
                                    User
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/Paket" className="nav-link" >
                                    Package
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/Transaksi" className="nav-link" >
                                    Transaction
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/FormTransaksi" className="nav-link" >
                                    New Transaction
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    to="/Login" className="nav-link"
                                    onClick={() => Logout()} >
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {props.children}
        </div>
    )
}
// import React from "react";
// import { Link } from "react-router-dom";

// function Logout(){
//     localStorage.removeItem("user")
//     localStorage.removeItem("token")

// }
// export default function Navbar(props){
//     return(
//         <div>
//             <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//                 <div className="container-fluid">
//                     <a className="navbar-brand">
//                         Dew Laundry
//                     </a>
//                     {/* togler */}
//                     <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#myNav">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     {/* define menus */}
//                     <div className="collapse navbar-collapse" id="myNav">
//                         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                             <li className="nav-item">
//                                 <Link to="/member" className="nav-link">
//                                     Member
//                                 </Link>
//                             </li>
//                             <li>
//                                 <Link to="/paket" className="nav-link">
//                                     paket
//                                 </Link>
//                                 </li>
//                                 <li>
//                                 <Link to="/transaksi" className="nav-link">
//                                     transaksi
//                                 </Link>
//                                 </li>
//                                 <li>
//                                 <Link to="/user" className="nav-link">
//                                     user
//                                 </Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link to ="/login" className="nav-link" onClick={() => Logout()}>

//                                 </Link>

//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//             {props.childern}
//         </div>
//     )
// }