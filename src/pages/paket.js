import { Modal } from "bootstrap";
import React from "react";
import axios from "axios";
import "../App.css"
import { baseUrl, authorization } from "../config";
import { Row, Col } from 'react-bootstrap'
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
class Paket extends React.Component {
    constructor() {
        super()
        this.state = {
            pakets: [
                {
                    id_paket: "101", jenis_paket: "Cuci Kering", harga: "3000"
                },
                {
                    id_paket: "102", jenis_paket: "Cuci Kering Setrika", harga: "4000"
                },
                {
                    id_paket: "103", jenis_paket: "Setrika", harga: "2000"
                },
            ],
            id_paket: "",
            jenis_paket: "",
            harga: "",
            action: "",
            role: "",
            visible: ""
        }
        if (!localStorage.getItem("token")) {
            window.location.href = "/login"
        }
    }

    tambahData() {
        this.modalPaket = new Modal(document.getElementById("modal-paket"))
        this.modalPaket.show(

        )

        this.setState({
            jenis_paket: "", harga: "", id_paket: Math.random(1, 10), action: "tambah"
        })
    }
    simpanData(ev) {
        ev.preventDefault()
        // mencegah berjalannya aksi default dari form submit

        // menghilangkan modal nya
        this.modalPaket.hide()

        // cek aksi tambah atau ubah
        if (this.state.action === "tambah") {
            // menampung data dari pengguna
            let endpoint = `${baseUrl}/paket`
            let newPaket = {
                id_paket: this.state.id_paket,
                jenis_paket: this.state.jenis_paket,
                harga: this.state.harga
            }


            let temp = this.state.pakets
            temp.push(newPaket)

            // this.setState({pakets : temp })
            axios.post(endpoint, newPaket, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
        } else if (this.state.action === "ubah") {
            this.modalPaket.hide();
            let newPaket = {
                id_paket: this.state.id_paket,
                jenis_paket: this.state.jenis_paket,
                harga: this.state.harga
            }
            let endpoint = `${baseUrl}/paket/` + this.state.id_paket
            // this.setState({ pakets: temp });
            axios.put(endpoint, newPaket, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
        }
    }

    ubahData(id_paket) {
        this.modalPaket = new Modal(document.getElementById("modal-paket"));
        this.modalPaket.show();

        // mencari posisi index dari data paket berdasarkan id_paket nya pada array 'pakets'
        let index = this.state.pakets.findIndex(
            paket => paket.id_paket === id_paket
        );
        this.setState({
            id_paket: id_paket,
            jenis_paket: this.state.pakets[index].jenis_paket,
            harga: this.state.pakets[index].harga,
            action: "ubah",
        });
    }

    hapusData(id_paket) {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            // mencari posisi index dari data yang akan dihapus
            // let temp = this.state.pakets;
            // let index = temp.findIndex((paket) => paket.id_paket === id_paket);
            // menghapus data pada array
            // temp.splice(index, 1);

            // this.setState({ pakets: temp });
            let endpoint = `${baseUrl}/paket/` + id_paket
            axios.delete(endpoint, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
        }
    }
    getData() {
        let endpoint = `${baseUrl}/paket`
        axios.get(endpoint, authorization)
            .then(response => {
                this.setState({ pakets: response.data })
            })
            .catch(error => console.log(error))
    }
    componentDidMount() {
        // fungsi ini dijalankan setelah fungsi render berjalan
        this.getData()
        let user = JSON.parse(localStorage.getItem("user"))
        this.setState({
            role: user.role
        })
        // cara kedua
        if (user.role === 'admin') {
            this.setState({
                visible: true
            })
        } else {
            this.setState({
                visible: false
            })
        }

    }
    render() {
        return (
            <div className="background">
            <div className="container-fluid" id="style-container">
                <Row>
                    <Col>
                            <h4 className="text-center display-2">Bundle & Price</h4>
                    </Col>
                </Row>
                <div >
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end pt-4">
                        <button id="tambahPaket" className={`btn mx-2.5 mb-3 ${this.state.visible ? `` : `d-none`}`} onClick={() => this.tambahData()}>
                                <i class="fa-solid fa-plus" id="iconTambah"></i>Tambah Paket</button>
                    </div>
                    <div className="row-paket row">
                        {this.state.pakets.map((paket) => (

                            <div className="col-lg-6 my-1">
                                <div className="card" id="cardPaket">
                                    <Row>
                                        <div className="col-lg-2">
                                            <i class="fa-solid fa-shirt" id="iconBaju"></i>
                                        </div>
                                        <div className="col-lg-6 mt-3 text-center">
                                            <div className="col-lg-12">
                                                <strong className="text-paket">{paket.jenis_paket} <a></a>
                                                </strong>
                                            </div>
                                            <div className="col-lg-12">
                                                <span className="paket-harga">{paket.harga}<span className="kg">kg</span></span>
                                            </div>
                                        </div>
                                        <div className="col-lg-2">
                                            <button id="ubah" className={`btn mt-3 ${this.state.visible ? `` : `d-none`}`} onClick={() => this.ubahData(paket.id_paket)}><i class="fa-solid fa-pen-to-square"></i></button>
                                        </div>
                                        <div className="col-lg-2">
                                            <button id="delete" className={`btn mt-3 ${this.state.visible ? `` : `d-none`}`} onClick={() => this.hapusData(paket.id_paket)}><i class="fa-solid fa-trash-can mt-1"></i></button>
                                        </div>
                                    </Row>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* form modal Paket */}
                <div className="modal" id="modal-paket">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header" id="container-paket">
                                <h4 className="title">
                                    Form Paket
                                </h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.simpanData(ev)}>
                                    <div className="">
                                        <div className="details">
                                            Jenis Paket
                                            <input type="text" className="form-control mb-2"
                                                value={this.state.jenis_paket} onChange={ev => this.setState({ jenis_paket: ev.target.value })}
                                                required />
                                        </div>
                                        <div className="details">
                                            Harga
                                            <input type="text" className="form-control mb-2"
                                                value={this.state.harga} onChange={ev => this.setState({ harga: ev.target.value })}
                                                required />
                                        </div>
                                    </div>
                                    <button className="btn btn-success btn-sm">Simpan</button>
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
export default Paket


    // < div className = "card" >
    //                 <div className="card-header" id="bg-cardHeader" >
    //                     <h4 className="text-body">Daftar Paket</h4>
    //                 </div>
    //                 <div className="card-body">
    //                     <div className="d-grid gap-2 d-md-flex justify-content-md-end">
    //                         <button id="tambah"className={`btn mx-2.5 mb-3 ${this.state.visible ? `` : `d-none`}y`} onClick={() => this.tambahData()}>Tambah Paket</button>
    //                     </div>
    //                     <ul className="list-group">
    //                         {this.state.pakets.map(paket => (
    //                             <li className="list-group-item mb-3">
    //                                 <div className="row" id="style-listGroup">
    //                                     {/* bagian untuk id paket */}
    //                                     <div className="col-lg-2">
    //                                         <small className="text-primary">Id Paket</small> <br />
    //                                         {paket.id_paket}
    //                                     </div>
    //                                     {/* bagian untuk jenis_paket */}
    //                                     <div className="col-lg-4">
    //                                         <small className="text-primary">Jenis Paket</small> <br />
    //                                         {paket.jenis_paket}
    //                                     </div>
    //                                     {/* bagian untuk harga */}
    //                                     <div className="col-lg-4">
    //                                         <small className="text-primary">Harga</small> <br />
    //                                         {paket.harga}
    //                                     </div>
    //                                     <div className="col-lg-2">
    //                                         <button id="ubah" className={`btn  mx-2 mt-2 ${this.state.visible ? `` : `d-none`}`} onClick={() => this.ubahData(paket.id_paket)}>Ubah</button>
    //                                         <button id="delete" className={`btn  mx-2 mt-2  ${this.state.visible ? `` : `d-none`}`} onClick={() => this.hapusData(paket.id_paket)}>Hapus</button>
    //                                     </div>
    //                                 </div>
    //                             </li>
    //                         ))}
    //                     </ul>
    //                 </div>