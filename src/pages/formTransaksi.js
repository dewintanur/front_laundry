import axios from "axios";
import React from "react";
import { Modal } from "bootstrap";
import "../App.css"
import { baseUrl, authorization } from "../config";
import Moment from 'moment';

export default class FormTransaksi extends React.Component {
    constructor() {
        super()
        this.state = {
            id_member: "",
            tgl: "",
            batas_waktu: "",
            tgl_bayar: "",
            dibayar: false,
            id_user: "",
            detail_transaksi: [],
            members: [],
            pakets: [],
            id_paket: "",
            qty: 0,
            jenis_paket: "",
            harga: 0
        }


    }

    getMember() {
        let endpoint = `${baseUrl}/member`
        axios.get(endpoint, authorization)
            .then(response => {
                this.setState({ members: response.data })
            })
            .catch(error => console.log(error))
    }
    getPaket() {
        let endpoint = `${baseUrl}/paket`
        axios.get(endpoint, authorization)
            .then(response => {
                this.setState({ pakets: response.data })
            })
            .catch(error => console.log(error))
    }
    componentDidMount() {
        this.getMember()
        this.getPaket()

        let user = JSON.parse(localStorage.getItem("user"))
        if (user.role !== 'admin' && user.role !== 'kasir' && user.role !== 'Kasir') {
            window.alert(`Maaf anda tidak berhak untuk mengakses halaman ini`)
            window.location.href = "/"
        }
    }

    tambahPaket(e) {
        e.preventDefault()
        // tutup modal
        this.modal.hide()
        // utk menyimpan data paket yg dipilih beserta jumlahnya ke dalam array detail-transaksi
        let idPaket = this.state.id_paket

        let selectedPaket = this.state.pakets.find(
            paket => paket.id_paket == idPaket
        )
        let newPaket = {
            id_paket: this.state.id_paket,
            qty: this.state.qty,
            jenis_paket: selectedPaket.jenis_paket,
            harga: selectedPaket.harga
        }
        // amnil array detail_transaksi nya
        let temp = this.state.detail_transaksi
        temp.push(newPaket)
        this.setState({ detail_transaksi: temp })
    }
    addPaket() {
        // menampilkan form modal utk memilih paket
        this.modal = new Modal(document.getElementById('modal-paket')
        )
        this.modal.show()

        // kosongkan form nya
        this.setState({
            id_paket: "",
            qty: 0,
            jenis_paket: "",
            harga: 0
        })
    }
    hapusData(id_paket) {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini ?")) {

            //mencari posisi index dari data yang akan dihapus
            let temp = this.state.detail_transaksi
            let index = temp.findIndex(detail => detail.id_paket === id_paket)

            //menghapus data pada array
            temp.splice(index, 1)

            this.setState({ detail: temp })
        }
    }
    simpanTransaksi() {
        if (document.getElementById("member").value == "") {
            alert("missing member");
            return;
        }
        if (document.getElementById("tgl").value == "") {
            alert("missing tanggal transaksi");
            return;
        }
        if (document.getElementById("batas_waktu").value == "") {
            alert("missing batas waktu");
            return;
        }
        if (document.getElementById("status").value == "") {
            alert("missing status");
            return;
        }
        if (this.state.detail_transaksi.length == 0) {
            alert("Missing Paket");
            return;
        }
        if (this.state.detail_transaksi.length == 0) {
            alert("Missing Paket");
            return;
        }
        let endpoint = `${baseUrl}/transaksi`
        let user = JSON.parse(localStorage.getItem("user"))
        let newData = {
            id_member: this.state.id_member,
            tgl: this.state.tgl,
            batas_waktu: this.state.batas_waktu,
            tgl_bayar: this.state.tgl_bayar,
            dibayar: this.state.dibayar,
            id_user: user.id_user,
            detail_transaksi: this.state.detail_transaksi
        }
        axios.post(endpoint, newData, authorization)
            .then(response => {
                window.alert(response.data.message)
                window.location.href = "/transaksi"

            })
            .catch(error => console.log(error))
    }
    render() {
        return (
            <div className="bg-formTrans" id="">
                <div className="container-trans">
                    <h4 className="title" >
                        Form Transaction
                    </h4>
                    <div className="trans-detail">
                        <div className="input-box">
                            <span className="details">Member</span>
                            <select id="member" className="form-control mb-2 input" value={this.state.id_member} onChange={e => this.setState({ id_member: e.target.value })}>
                               <option value="">=== Choose Member === </option>
                                {this.state.members.map(member => (
                                    <option value={member.id_member}>
                                        {member.nama}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="input-box">
                            <span className="details"> Order Date</span>
                            <input id="tgl" type="date" className="form-control mb-2 input" value={this.state.tgl}
                                onChange={e => this.setState({ tgl: e.target.value })} />
                        </div>
                        <div className="input-box">
                            <span className="details">Commitment Date</span>
                            <input id="batas_waktu" type="date" className="form-control mb-2 input" value={this.state.batas_waktu}
                                onChange={e => this.setState({ batas_waktu: e.target.value })} />
                        </div>
                        <div className="input-box">
                            <span className="details"> Pay Date</span>
                        <input id="tgl_bayar" type="date" className="form-control mb-2 input" value={this.state.tgl_bayar}
                            onChange={e => this.setState({ tgl_bayar: e.target.value })} />
                            </div>
                            <div className="input-box">
                            <span className="details">Payment State</span>
                        <select id="status" className="form-control mb-2 input" value={this.state.dibayar}
                                onChange={e => this.setState({ dibayar: e.target.value })}>
                                    <option value={false}>Pilih Status Bayar </option>
                            <option value={1}>Sudah Dibayar</option>
                            <option value={0}>Belum Dibayar</option>
                        </select>
                        </div>
                        <div className="input-box">
                            <button id="tambahPaket" className="btn input" onClick={() => this.addPaket()}>Tambah Paket
                            </button>
                            </div>
                    </div>



                        {/* tampilkan isi detail */}
                        <h5>Detail Transaction</h5>
                        {this.state.detail_transaksi.map(detail => (
                            <div className="row">
                                {/* area nama paket col-3 */}
                                <div className="col-lg-3">
                                    {detail.jenis_paket}
                                </div>
                                {/* area Quantitiy col-2*/}
                                <div className="col-lg-2">
                                    Qty : {detail.qty}
                                </div>
                                {/* area harga paket col-3*/}
                                <div className="col-lg-3">
                                    @ Rp  {detail.harga}
                                </div>
                                {/* area harga total col-4*/}
                                <div className="col-lg-2">
                                    Rp {detail.harga * detail.qty}
                                </div>
                                <div className="col-lg-2" >
                                    <button id="delete" className="btn btn-danger btn-sm mt-2"
                                        onClick={() => this.hapusData(detail.id_paket)}>
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        ))}
                    <div className="col-lg-3 justify-content-center">
                        <button className="btn btn-paket" onClick={() => this.simpanTransaksi()}>
                            <p className="simpan">Simpan Transaksi</p>
                        </button>
                    </div>
                        {/* modal untuk pilihan paket */}
                        <div className="modal" id="modal-paket">
                            <div className="modal-dialog modal-md">
                                <div className="modal-content">
                                    <div className="modal-header bg-light">
                                        <h4 className="text-body">Pilih Paket</h4>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={(e) => this.tambahPaket(e)}>
                                            Pilih Paket
                                            <select className="form-control mb-2" value={this.state.id_paket}
                                                onChange={e => this.setState({ id_paket: e.target.value })}>
                                                <option value="">Pilih Paket</option>
                                                {this.state.pakets.map(paket => (
                                                    <option value={paket.id_paket}>
                                                        {paket.jenis_paket}
                                                    </option>
                                                ))}
                                            </select>
                                            Jumlah
                                            <input type="number" className="form-control mb-2" value={this.state.qty}
                                                onChange={e => this.setState({ qty: e.target.value })} />

                                            <button type="submit" id="tambah" className="btn btn-success">
                                                Tambah
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                </div>
            </div>
        )
    }
}

// import axios from "axios";
// import React from "react";
// import { Modal } from "bootstrap";
// import "../App.css"
// import { baseUrl,authorization } from "../config";

// export default class FormTransaksi extends React.Component {
//     constructor() {
//         super()
//         this.state = {
//             id_member: "",
//             tgl: "",
//             batas_waktu: "",
//             tgl_bayar: "",
//             dibayar: 0,
//             id_user: "",
//             detail_transaksi: [],
//             members: [],
//             pakets: [],
//             id_paket: "",
//             qty: 0,
//             jenis_paket: "",
//             harga: 0
//         }


//     }

//     getMember() {
//         let endpoint = `${baseUrl}/member`
//         axios.get(endpoint, authorization)
//             .then(response => {
//                 this.setState({ members: response.data })
//             })
//             .catch(error => console.log(error))
//     }
//     getPaket() {
//         let endpoint = `${baseUrl}/paket`
//         axios.get(endpoint, authorization)
//             .then(response => {
//                 this.setState({ pakets: response.data })
//             })
//             .catch(error => console.log(error))
//     }
//     componentDidMount() {
//         this.getMember()
//         this.getPaket()

//         let user = JSON.parse(localStorage.getItem("user"))
//         if (user.role !== 'admin' && user.role !== 'kasir' && user.role !== 'Admin'){
//             window.alert(`Maaf anda tidak berhak untuk mengakses halaman ini`)
//         window.location.href="/"
//         }
//     }

//     tambahPaket(e) {
//         e.preventDefault()
//         // tutup modal
//         this.modal.hide()
//         // utk menyimpan data paket yg dipilih beserta jumlahnya ke dalam array detail-transaksi
//         let idPaket = this.state.id_paket

//         let selectedPaket = this.state.pakets.find(
//             paket => paket.id_paket == idPaket
//         )
//         let newPaket = {
//             id_paket: this.state.id_paket,
//             qty: this.state.qty,
//             jenis_paket: selectedPaket.jenis_paket,
//             harga: selectedPaket.harga
//         }
//         // amnil array detail_transaksi nya
//         let temp = this.state.detail_transaksi
//         temp.push(newPaket)
//         this.setState({ detail_transaksi: temp })
//     }
//     addPaket() {
//         // menampilkan form modal utk memilih paket
//         this.modal = new Modal(document.getElementById('modal-paket')
//         )
//         this.modal.show()

//         // kosongkan form nya
//         this.setState({
//             id_paket: "",
//             qty: 0,
//             jenis_paket: "",
//             harga: 0
//         })
//     }
//     hapusData(id_paket) {
//         if (window.confirm("Apakah anda yakin ingin menghapus data ini ?")) {

//             //mencari posisi index dari data yang akan dihapus
//             let temp = this.state.detail_transaksi
//             let index = temp.findIndex(detail => detail.id_paket === id_paket)

//             //menghapus data pada array
//             temp.splice(index, 1)

//             this.setState({ detail: temp })
//         }
//     }
//     simpanTransaksi() {
//         if (document.getElementById("member").value == "") {
//             alert("missing member");
//             return;
//         }
//         if (document.getElementById("tgl").value == "") {
//             alert("missing tanggal transaksi");
//             return;
//         }
//         if (document.getElementById("batas_waktu").value == "") {
//             alert("missing batas waktu");
//             return;
//         }
//         if (document.getElementById("status").value == "") {
//             alert("missing status");
//             return;
//         }
//         let endpoint = `${baseUrl}/transaksi`
//         let user = JSON.parse(localStorage.getItem("user"))
//         let newData = {
//             id_member: this.state.id_member,
//             tgl: this.state.tgl,
//             batas_waktu: this.state.batas_waktu,
//             tgl_bayar: this.state.tgl_bayar,
//             dibayar: this.state.dibayar,
//             id_user: user.id_user,
//             detail_transaksi: this.state.detail_transaksi
//         }
//         axios.post(endpoint, newData, authorization)
//             .then(response => {
//                 window.alert(response.data.message)
//                 window.location.href = "/transaksi"

//             })
//             .catch(error => console.log(error))
//     }
//     render() {
//         return (
//             <div className="container-trans">
//                     <h4 className="title" >
//                             Form Transaksi
//                         </h4>
//                     <form >
//                         <div className="trans-detail">
//                     <div className="input-box"> <span className="details">Member</span>
//                         <select id="member" className="form-control mb-2 input" value={this.state.id_member} onChange={e => this.setState({ id_member: e.target.value })}>
//                             <option value=""> Pilih Member </option>
//                             {this.state.members.map(member => (
//                                 <option value={member.id_member}>
//                                     {member.nama}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="input-box">
//                         <span className="details"> Tanggal Transaksi</span>
//                         <input id="tgl" type="date" className="form-control mb-2 input" value={this.state.tgl}
//                             onChange={e => this.setState({ tgl: e.target.value })} />
//                     </div>
//                     <div className="input-box"><span className="details">Batas Waktu Transaksi</span>
//                         <input id="batas_waktu" type="date" className="form-control mb-2 input" value={this.state.batas_waktu}
//                             onChange={e => this.setState({ batas_waktu: e.target.value })} />
//                     </div>
//                     <div className="input-box">
//                         <span className="details">Tanggal Bayar</span>
//                         <input id="tgl_bayar" type="date" className="form-control mb-2 input" value={this.state.tgl_bayar}
//                             onChange={e => this.setState({ tgl_bayar: e.target.value })} />
//                     </div>
//                     <div className="input-box">
//                         <span className="details">Status Bayar</span>
//                         <select id="status" className="form-control mb-2" value={this.state.dibayar}
//                             onChange={e => this.setState({ dibayar: e.target.value })}>
//                             <option value={1}>Sudah Dibayar</option>
//                             <option value={0}>Belum Dibayar</option>
//                         </select>
//                     </div>
//                     </div>
//                         <button id="tambah"className="btn" onClick={() => this.addPaket()}>Tambah Paket
//                         </button>
//                         {/* tampilkan isi detail */}
//                         <h5>Detail Transaksi</h5>
//                         {this.state.detail_transaksi.map(detail => (
//                             <div className="row">
//                                 {/* area nama paket col-3 */}
//                                 <div className="col-lg-3">
//                                     {detail.jenis_paket}
//                                 </div>
//                                 {/* area Quantitiy col-2*/}
//                                 <div className="col-lg-2">
//                                     Qty : {detail.qty}
//                                 </div>
//                                 {/* area harga paket col-3*/}
//                                 <div className="col-lg-3">
//                                     @ Rp  {detail.harga}
//                                 </div>
//                                 {/* area harga total col-4*/}
//                                 <div className="col-lg-2">
//                                     Rp {detail.harga * detail.qty}
//                                 </div>
//                                 <div className="col-lg-2" >
//                                     <button id="delete"className="btn btn-danger btn-sm"
//                                         onClick={() => this.hapusData(detail.id_paket)}>
//                                         Hapus
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                         <div className="col-lg-3">
//                             <button className="btn btn-paket " onClick={() => this.simpanTransaksi()}>
//                             <p className="simpan">Simpan Transaksi</p>
//                             </button>
//                         </div>

//                         {/* modal untuk pilihan paket */}
//                         <div className="modal" id="modal-paket">
//                             <div className="modal-dialog modal-md">
//                                 <div className="modal-content">
//                                     <div className="modal-header bg-light">
//                                         <h4 className="text-body">Pilih Paket</h4>
//                                     </div>
//                                     <div className="modal-body">
//                                         <form onSubmit={(e) => this.tambahPaket(e)}>
//                                             Pilih Paket
//                                             <select className="form-control mb-2" value={this.state.id_paket}
//                                                 onChange={e => this.setState({ id_paket: e.target.value })}>
//                                                 <option value="">Pilih Paket</option>
//                                                 {this.state.pakets.map(paket => (
//                                                     <option value={paket.id_paket}>
//                                                         {paket.jenis_paket}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                             Jumlah
//                                             <input type="number" className="form-control mb-2" value={this.state.qty}
//                                                 onChange={e => this.setState({ qty: e.target.value })} />

//                                             <button type="submit" id="tambah"className="btn btn-success">
//                                                 Tambah
//                                             </button>
//                                         </form>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                     </form>
//             </div>
//         )
//     }
// }