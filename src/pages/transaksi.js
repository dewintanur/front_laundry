import React from "react";
import axios from "axios";
import { baseUrl } from "../config";
import { authorization } from "../config";
import logo from "../img/logBran.png"
import domToPdf from "dom-to-pdf"
import moment from "moment";

export default class Transaksi extends React.Component {
    constructor() {
        super()
        this.state = {
            masterPack: [],
            transaksi: [],
            role: "",
            visible: "",
            search:""

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
                for (let i = 0; i < dataTransaksi.length; i++) {
                    let total = 0;
                    for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
                        let harga = dataTransaksi[i].detail_transaksi[j].paket.harga
                        let qty = dataTransaksi[i].detail_transaksi[j].qty

                        total += (harga * qty)
                    }
                    // key total
                    dataTransaksi[i].total = total
                }
                this.setState({ transaksi: dataTransaksi })
                this.setState({ masterPack: response.data })
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getData()
        let user = JSON.parse(localStorage.getItem("user"))
        this.setState({
            role: user.role
        })
        // cara kedua
        if (user.role === 'admin' || user.role === 'kasir') {
            this.setState({
                visible: true
            })
        } else {
            this.setState({
                visible: false
            })
        }

    }

    convertStatus(id_transaksi, status) {
        if (status === 1) {
            return (
                <div className="badge" id="transBaru">
                    Transaksi Baru
                    <a className={`badge ${this.state.visible ? `` : `d-none`}`} onClick={() => this.changeStatus(id_transaksi, 2)}>
                        <i class="fa-solid fa-arrow-right" id="iconBayar"></i>
                    </a>
                </div>

            )
        } else if (status === 2) {
            return (
                <div className="badge" id="transProses">
                    Sedang diproses
                    <a onClick={() => this.changeStatus(id_transaksi, 3)} className={`badge ${this.state.visible ? `` : `d-none`}`} >
                        <i class="fa-solid fa-arrow-right" id="iconBayar"></i>
                    </a>
                </div>
            )
        } else if (status === 3) {
            return (
                <div className="badge" id="transSiap">
                    Siap Diambil
                    <a onClick={() => this.changeStatus(id_transaksi, 4)} className={`badge ${this.state.visible ? `` : `d-none`}`} >
                        <i class="fa-solid fa-arrow-right" id="iconBayar"></i>
                    </a>
                </div>
            )
        } else if (status === 4) {
            return (
                <div className="badge" id="transTelah">
                    Telah Diambil
                </div>
            )
        }
    }
    searching(ev) {
        let code = ev.keyCode;
        if (code === 13) {
            let data = this.state.masterPack;
            let found = data.filter(it =>
                it.members.nama.toLowerCase().includes(this.state.search.toLowerCase()))
            this.setState({ transaksi: found });
        }
    }
    changeStatus(id, status) {
        if (window.confirm(`Apakah anda yakin ingin mengganti status transaksi ini?`)) {
            let endpoint = `${baseUrl}/transaksi/status/${id}`
            let data = {
                status: status
            }
            axios.post(endpoint, data, authorization)
                .then(response => {
                    window.alert(`status telah diubah`)
                    this.getData()
                })
                .catch(error => console.log(error))
        }
    }
    convertStatusBayar(id_transaksi, dibayar) {
        if (dibayar == 0) {
            return (
                <div className="badge" id="statusBelum">
                    Belum Dibayar
                    <a className={`badge ${this.state.visible ? `` : `d-none`}`} onClick={() => this.changeStatusBayar(id_transaksi, 1)}>
                        <i class="fa-solid fa-arrow-right" id="iconBayar"></i>
                    </a>
                </div>
            )
        } else if (dibayar == 1) {
            return (
                <div className="badge" id="statusSudah">
                    Sudah Dibayar
                </div>
            )
        }
    }
    changeStatusBayar(id, dibayar) {
        if (window.confirm(`Apakah anda yakin ingin mengubah status pembayaran ini ?`)) {
            let endpoint = `${baseUrl}/transaksi/bayar/${id}`
            axios.get(endpoint, authorization)
                .then(response => {
                    window.alert(`Status pembayaran telah diubah`)
                    this.getData()
                })
                .catch(error => console.log(error))
        }
    }
    deleteTransaksi(id) {
        if (window.confirm(`Apakah anda yakin menghapus data tersebut?`)) {
            let endpoint = ` ${baseUrl}/transaksi/${id}`
            axios.delete(endpoint, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
        }
    }
    convertPdf(){
        let element = document.getElementById(`target`);
        let options = {
            filename: "Laporan.pdf"
        };
        domToPdf(element, options, () => {
            window.alert("Laporan akan dicetak")
        })
    }
    printStruk(id) {
        var element = document.getElementById(`struk ${id}`);
        var options = {
            filename: `struk-${id}.pdf`,
        };
        domToPdf(element, options, function (pdf) {
            window.alert(`Struk Will Be Ready`)
        });
    }

    render() {
        return (
            <div className="container-fluid" id="style-container">
                <div>
                    <div>
                        <div id="target">
                            <h3 className="display-2 text-center mb-10">  Transaction</h3>
                            <div className="row">
                                <div className="col-3" id="searching">
                                    <input className="form-control" type="text" placeholder="Cari Data Transaksi" value={this.state.search} onChange={ev => this.setState({ search: ev.target.value })}
                                        onKeyUp={(ev) => this.searching(ev)} ></input>
                                </div>
                                <div className="col-4"></div>
                                <div className="col-4">
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end" id="cetakLaporan"><button className="btn btn-danger"  onClick={() => this.convertPdf()}>Cetak Laporan</button></div>
                                </div>
                            </div>
                            {this.state.transaksi.map(trans => (
                                <div className="card" id="card-tabel">
                                    <div id="id-trans">
                                        <h3>LO0{trans.id_transaksi}</h3>
                                    </div>
                                    <div className="col-lg-4">
                                        {/* struk area */}
                                        <div style={{ display: 'none' }} >
                                            <div className="col-lg-12 p-3 " id={`struk ${trans.id_transaksi}`}>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <img src={logo} class="img-struk" />
                                                    </div>
                                                    <div className="col-lg-6" >
                                                        <h3 id="id-struk">LO0{trans.id_transaksi}</h3>
                                                    </div>
                                                </div>
                                                <h3 className="text-center" id="cetak-struk">
                                                    EIA Laundry
                                                </h3>
                                                <h5 className="text-center" id="cetak-tgl">
                                                    Jalan Slamet Wardoyo No.123 Sawojajar Malang
                                                    <br />
                                                    Telp. 0334 - 2345 - 2893 || IG : @EIA LaunDry
                                                </h5>

                                                <h5 id="ctk-member">Member : {trans.members.nama}</h5>
                                                <h5 id="">Tgl : {moment(trans.tgl).format("L")}</h5>
                                                <table className="table table-hover" id="cetak-struk">
                                                    <thead>
                                                        <tr>
                                                            <th>Paket</th>
                                                            <th>Qty</th>
                                                            <th>Harga Satuan</th>
                                                            <th>Subtotal</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {trans.detail_transaksi.map(item => (
                                                            <tr>
                                                                <td >
                                                                    {item.paket.jenis_paket}
                                                                </td>
                                                                <td >
                                                                    {item.qty}
                                                                </td>
                                                                <td >
                                                                    Rp {item.paket.harga}
                                                                </td>
                                                                <td >
                                                                    {item.paket.harga * item.qty}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                    <tr>
                                                        <th colspan="2"></th>
                                                        <th >Total</th>
                                                        <td >Rp {trans.total}</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <table className="table table-borderless" id="tabel-trans">
                                        <div>
                                            <tr>
                                                <th id="tbl-member">Member</th>
                                                <td colSpan="2" >{trans.members.nama}</td>
                                                <th id="tbl-order">Order Date</th>
                                                <td >{moment(trans.tgl).format("L")}</td>
                                                <th id="tbl-pay"> Pay Date</th>
                                                <td>{moment(trans.tgl_bayar).format("L")}</td>
                                                <th colSpan="3"></th>
                                            </tr>
                                            <tr>
                                                <th colspan="3"></th>
                                                <th id="tbl-order"> Commitment-date</th>
                                                <td>{moment(trans.batas_waktu).format("L")}</td>
                                                <th id="tbl-pay">Payment State</th>
                                                <td>{this.convertStatusBayar(trans.id_transaksi, trans.dibayar)}</td>
                                                <td id="tbl-action">
                                                    <div className=" d-grid gap-2 d-md-flex justify-content-md-end">
                                                        {/* button struk */}
                                                        <button id="btn-struk" className="btn " onClick={() => this.printStruk(trans.id_transaksi)}>
                                                            <i class="fa-solid fa-print mt-2 mx-2"></i>
                                                        </button>
                                                        {/* button delete */}
                                                        <button id="delete-trans" className={`btn ${this.state.visible ? `` : `d-none`}`} onClick={() => this.deleteTransaksi(trans.id_transaksi)}>
                                                            <i class="fa-solid fa-trash-can  mx-1"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th colspan="5"></th>
                                                <th id="tbl-pay">State</th>
                                                <td>{this.convertStatus(trans.id_transaksi, trans.status)}</td>
                                            </tr>
                                        </div>
                                    </table>
                                    <br></br>

                                    {/* area detail transaksi  */}
                                    <h5 className="text-secondary" id="detail-transaksi">Detail Transaksi</h5>
                                    <hr />
                                    <table className="table table-hover" id="tbl-detail">
                                        {/* area nama paket col-3 */}
                                        <thead>
                                            <tr>
                                                <th>Package</th>
                                                <th>Qty</th>
                                                <th>Price</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {trans.detail_transaksi.map(detail => (
                                                <tr>
                                                    <td>{detail.paket.jenis_paket}</td>
                                                    <td>{detail.qty}</td>
                                                    <td>@ Rp  {detail.paket.harga}</td>
                                                    <td>Rp {detail.paket.harga * detail.qty}</td>
                                                </tr>
                                            ))
                                            }
                                            <tr>
                                                <th colspan="2"></th>
                                                <th >Total</th>
                                                <td >Rp {trans.total}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
