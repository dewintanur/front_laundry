import React from "react";
import axios from "axios";
import { baseUrl } from "../config";
import { authorization } from "../config";

export default class Transaksi extends React.Component {
    constructor() {
        super()
        this.state = {
            transaksi: []
        }
        if (!localStorage.getItem("token")) {
            window.location.href = "/login"
        }
    }

    getData() {
        let endpoint = `${baseUrl}/transaksi`
        axios.get(endpoint, authorization)
            .then(response => {
                let dataTransaksi = response.data
                for (let i = 0; i < dataTransaksi.length; i++){
                    let total = 0;
                    for (let j =0; j< dataTransaksi[i].detail_transaksi.length; j++){
                        let harga = dataTransaksi[i].detail_transaksi[j].paket.harga
                        let qty = dataTransaksi[i].detail_transaksi[j].qty

                        total += (harga * qty)
                    }
                    // key total
                    dataTransaksi[i].total = total
                }
                this.setState({ transaksi: dataTransaksi })
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getData()
    }


    convertStatus(id_transaksi,status) {
        if (status === 1) {
            return (
                <div className="badge bg-info">
                    Transaksi Baru
                   <br/> <a onClick={() => this.changeStatus(id_transaksi,2)} className="text-danger">
                        Click Here to The Next Level
                    </a>
                </div>
            )
        } else if (status === 2) {
            return (
                <div className="badge bg-warning">
                    Sedang diproses
                    <br /> <a onClick={() => this.changeStatus(id_transaksi, 3)} className="text-danger">
                        Click Here to The Next Level
                    </a>
                </div>
            )
        } else if (status === 3) {
            return (
                <div className="badge bg-secondary">
                    Siap Diambil
                    <br /> <a onClick={() => this.changeStatus(id_transaksi, 4)} className="text-danger">
                        Click Here to The Next Level
                    </a>
                </div>
            )
        } else if (status === 4) {
            return (
                <div className="badge bg-success">
                    Telah Diambil
                </div>
            )
        }
    }
    changeStatus(id, status){
        if(window.confirm(`Apakah anda yakin ingin mengganti status transaksi ini?`)){
            let endpoint =`${baseUrl}/transaksi/status/${id}`
            let data ={
                status:status
            }
            axios.post(endpoint, data, authorization)
             .then(response => {
                 window.alert(`status telah diubah`)
                 this.getData()
             })
             .catch(error => console.log(error))
        }
    }
    convertStatusBayar(id_transaksi,dibayar){
        if(dibayar == 0){
            return(
                <div className="badge bg-danger text-white">
                    Belum Dibayar
                    <br /><a className="text-primary" onClick={() => this.changeStatusBayar(id_transaksi,1)}>
                        Click here to change paid status
                    </a>
                </div>
            )
        } else if (dibayar == 1){
            return(
                <div className="badge bg-success text-white">
                    Sudah Dibayar
                </div>
            )
        }
    }
    changeStatusBayar(id,status){
        if(window.confirm(`Apakah anda yakin ingin mengubah status pembayaran ini ?`)){
            let endpoint=`${baseUrl}/transaksi/bayar/${id}`
            axios.get(endpoint, authorization)
            .then( response => {
                window.alert(`Status pembayaran telah diubah`)
                this.getData()
            })
            .catch(error => console.log(error))
        }
    }
    deleteTransaksi(id){
        if(window.confirm(`Apakah anda yakin menghapus data tersebut?`)){
            let endpoint = ` ${baseUrl}/transaksi/${id}`
            axios.delete(endpoint, authorization)
            .then(response =>{
                window.alert(response.data.message)
                this.getData()
            })
            .catch(error =>console.log(error))
        }
    }
    render() {
        return (
            <div className="container-fluid" id="style-container">
                <div className="card">
                    <div className="card-header" id="bg-cardHeader">
                        <h4> List Transaksi</h4>
                    </div>
                    <div className="card-body">
                        <ul className="list-group">
                            {this.state.transaksi.map(trans => (
                                <li className="list-group-item mt-3">
                                    <div className="row" id="style-listGroupTrans">
                                        {/* this is member area */}
                                        <div className="col-lg-4">
                                            <div><small className="text-body fw-bold">
                                                Member
                                            </small> <br /></div>
                                            {trans.members.nama}
                                        </div>
                                        {/* tanggal transaksi */}
                                        <div className="col-lg-4">
                                            <small className="text-body fw-bold">
                                                Tgl. Transaksi
                                            </small> <br />
                                            {trans.tgl}
                                        </div>
                                        {/* Batas Waktu */}
                                        <div className="col-lg-4">
                                            <small className="text-body fw-bold">
                                                Batas Waktu
                                            </small> <br />
                                            {trans.batas_waktu}
                                        </div>
                                        <div className="col-lg-4"></div>
                                        {/* tanggal bayar */}
                                        <div className="col-lg-4">
                                            <small className="text-body fw-bold">
                                                Tanggal Bayar
                                            </small> <br />
                                            {trans.tgl_bayar}
                                        </div>
                                        {/* status */}
                                        <div className="col-lg-3">
                                            <small className="text-body fw-bold">
                                                Status
                                            </small> <br />
                                            {this.convertStatus(trans.id_transaksi, trans.status)}
                                        </div>
                                        {/* status */}
                                        <div className="col-lg-3">
                                            <small className="text-body fw-bold">
                                                Status Pembayaran
                                            </small> <br />
                                            {this.convertStatusBayar(trans.id_transaksi,trans.dibayar)}
                                        </div>
                                        {/* area total */}
                                        <div className="col-lg-3">
                                            <small className="text-info">
                                                Total
                                            </small> <br/>
                                            Rp {trans.total}
                                        </div>
                                        {/* delete button */}
                                        <div className="col-lg-3">
                                            <small className="text-info">
                                                Action
                                            </small><br></br>
                                            <button className="btnbtn-sm btn-danger" onClick={()=>this.deleteTransaksi(trans.id_transaksi)}>
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                    <br></br>
                                    {/* area detail transaksi  */}
                                    <hr />
                                    <h5 className="text-secondary" id="style-listGroupTrans">Detail Transaksi</h5>
                                    {trans.detail_transaksi.map(detail => (
                                        <div className="row" id="style-listGroupTrans" >
                                            {/* area nama paket col-3 */}
                                            <div className="col-lg-3">
                                                <small className="fw-bold"> Jenis Paket</small> <br />
                                                {detail.paket.jenis_paket}
                                            </div>
                                            {/* area Quantitiy col-2*/}
                                            <div className="col-lg-3">
                                                <small className="fw-bold"> Qty </small> <br />
                                                {detail.qty}
                                            </div>
                                            {/* area harga paket col-3*/}
                                            <div className="col-lg-3">
                                                <small className="fw-bold">Harga</small> <br />
                                                @ Rp  {detail.paket.harga}
                                            </div>
                                            {/* area harga total col-4*/}
                                            <div className="col-lg-3">
                                                <small className="fw-bold">Total</small> <br />
                                                Rp {detail.paket.harga * detail.qty}
                                            </div>
                                        </div>
                                    ))}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}