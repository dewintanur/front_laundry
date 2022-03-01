import React from "react";
import axios from "axios";
import { baseUrl } from "../config";
import { formatNumber,authorization } from "../config";
import '../App.css'
export default class Dashboard extends React.Component{
    constructor(){
        super()

        this.state = {
            jumlahMember:0,
            jumlahPaket: 0,
            jumlahTransaksi:0,
            income:0
        }
        if(!localStorage.getItem("token")){
            window.location.href ="/login"
        }
    }

    getSummary(){
        let endpoint = `${baseUrl}/member`
        axios.get(endpoint,authorization)
        .then(response =>{
            this.setState({jumlahMember: response.data.length})
        })
        .catch(error => console.log(error))

        // paket
       endpoint = `${baseUrl}/paket`
       axios.get(endpoint,authorization)
       .then(response => {
           this.setState({jumlahPaket: response.data.length})
       })
       .catch(error =>console.log(error))

       //transaksi
       endpoint = `${baseUrl}/transaksi`
       axios.get(endpoint,authorization)
       .then(response => {
           let dataTransaksi = response.data
           let income = 0
           for (let i = 0; i < dataTransaksi.length; i++) {
               let total = 0;
               for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
                   let harga = dataTransaksi[i].detail_transaksi[j].paket.harga
                   let qty = dataTransaksi[i].detail_transaksi[j].qty

                   total += (harga * qty)
               }
               income += total
           }
           this.setState({
               jumlahTransaksi: response.data.length,
               income: income
           })
       })
       .catch(error => console.log(error))
    }
    componentDidMount(){
        this.getSummary()
    }
     render(){
         return(
             <div className="container-fluid">
                 <div className="row">
                     <div className="col-lg-4 col-md-6">
                         <div className="card text-center m-1">
                             <div className="card-body bg-pAket">
                                 <h4 className="card-title">Jumlah Paket</h4>
                                 <h2 className="">{this.state.jumlahPaket}</h2>
                                 <h6 className="">Jenis yang tersedia</h6>
                             </div>
                         </div>
                     </div>
                     <div className="col-lg-4 col-md-6">
                         <div className="card text-center m-1">
                             <div className="card-body bg-mEmber">
                                 <h4 className="card-title text-white">Jumlah Member</h4>
                                 <h2 className="text-white">{this.state.jumlahMember}</h2>
                                 <h6 className="text-white">Jenis yang tersedia</h6>
                             </div>
                         </div>
                     </div>
                     <div className="col-lg-4 col-md-6">
                         <div className="card text-center  m-1">
                             <div className="card-body bg-tRansaksi">
                                 <h4 className="card-title text-white">Jumlah Transaksi</h4>
                                 <h2 className="text-white">{this.state.jumlahTransaksi}</h2>
                                 <h6 className="text-white">Jenis yang tersedia</h6>
                             </div>
                         </div>
                         </div>
                         <div className="col-lg-6">
                             <div className="card  m-1">
                                 <div className="card-body bg-incomE">
                                 <h4 className="card-title text-white">
                                     Income
                                 </h4>
                                 <h2 className="text-white">Rp {formatNumber(this.state.income)}</h2>
                                 </div>
                             </div>
                     </div>
                 </div>
             </div>
         )
     }
}