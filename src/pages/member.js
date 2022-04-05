import React from "react";
import { Modal } from "bootstrap";
import axios from "axios";
import "../App.css"
import { Row, Col } from 'react-bootstrap'

import { baseUrl, authorization } from "../config";
class Member extends React.Component {
    constructor() {
        super()
        this.state = {
            members: [],
            masterPack:[],
            search:"",
            id_member: "",
            nama: "",
            alamat: "",
            telepon: "",
            jenis_kelamin: "",
            action: "", /* utk menyimpan aksi dari tambah atau ubah data */
            role: "",
            visible: ""

        }
        if (!localStorage.getItem("token")) {
            window.location.href = "/login"
        }
    }

    tambahData() {
        // memunculkan modal
        this.modalMember = new Modal(document.getElementById("modal-member"))
        this.modalMember.show()

        // mengosongkan inputannya
        this.setState({
            nama: "", alamat: "", telepon: "", jenis_kelamin: "", id_member: Math.random(1, 1000000), action: "tambah"
        })
    }

    simpanData(ev) {
        ev.preventDefault()
        // mencegah berjalannya aksi default dari form submit
        // menghilangkan modal nya
        this.modalMember.hide()
        // cek aksi tambah atau ubah
        if (this.state.action === "tambah") {
            let endpoint = `${baseUrl}/member`
            // menampung data dari pengguna
            let newMember = {
                id_member: this.state.id_member,
                nama: this.state.nama,
                alamat: this.state.alamat,
                telepon: this.state.telepon,
                jenis_kelamin: this.state.jenis_kelamin
            }

            let temp = this.state.members
            temp.push(newMember)

            // this.setState({members : temp })
            axios.post(endpoint, newMember, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
        } else if (this.state.action === "ubah") {
            this.modalMember.hide();
            let endpoint = `${baseUrl}/member/` + this.state.id_member
            let newMember = {
                id_member: this.state.id_member,
                nama: this.state.nama,
                alamat: this.state.alamat,
                telepon: this.state.telepon,
                jenis_kelamin: this.state.jenis_kelamin
            }

            axios.put(endpoint, newMember, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
        }

    }
    ubahData(id_member) {
        this.modalMember = new Modal(document.getElementById("modal-member"))
        this.modalMember.show()

        // mencari posisi index dari data member berdasarkan id_member nya pada array 'members'
        let index = this.state.members.findIndex(
            member => member.id_member === id_member
        )
        this.setState({
            id_member: this.state.members[index].id_member,
            nama: this.state.members[index].nama,
            alamat: this.state.members[index].alamat,
            jenis_kelamin: this.state.members[index].jenis_kelamin,
            telepon: this.state.members[index].telepon,
            action: "ubah"
        })

    }


    hapusData(id_member) {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            // mencari posisi index dari data yang akan dihapus
            let endpoint = `${baseUrl}/member/` + id_member
            // let temp = this.state.members
            // let index = temp.findIndex(
            //     member => member.id_member === id_member
            // )
            // // menghapus data pada array
            // temp.splice(index, 1)

            // this.setState({members: temp})
            axios.delete(endpoint, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
        }
    }

    getData() {
        let endpoint = `${baseUrl}/member`
        axios.get(endpoint, authorization)
            .then(response => {
                this.setState({ members: response.data })
                this.setState({masterPack: response.data})
            })
            .catch(error => console.log(error))
    }

    searching(ev){
        let code = ev.keyCode;
        if(code === 13){
            let data = this.state.masterPack;
            let found = data.filter( it =>
                it.nama.toLowerCase().includes(this.state.search.toLocaleLowerCase()))
                this.setState({members : found});
        }
    }
    componentDidMount() {
        // fungsi ini dijalankan setelah fungsi render berjalan
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
    showAddButton() {
        if (this.state.role === 'admin' || this.state.role === 'kasir') {
            return (
                <button type="button" id="tambah" class="btn"
                    onClick={() => this.tambahData()}>
                    Tambah Data Member
                </button>
            )
        }
    }
    render() {
        return (
            <div className="container-fluid" id="style-container">

                <Row>
                    <Col>
                        <h4 className="text-center display-2">Member Data</h4>
                    </Col>
                </Row>
                <div className="card-body">
                    <div className="row">
                        <div className="col-4">
                            <input className="form-control" type="text" placeholder="Cari Data Member" value={this.state.search} onChange={ev => this.setState({ search: ev.target.value })}
                                onKeyUp={(ev) => this.searching(ev)} ></input>
                        </div>
                        <div className="col-4"></div>
                        <div className="col-4">
                            <div className="float-end">
                                <button className={`btn mx-2.5 mb-3 ${this.state.visible ? `` : `d-none`}`} id="tambah" onClick={() => this.tambahData()}><i class="fa-solid fa-plus" id="iconTambah"></i>Tambah Data</button>
                                {this.showAddButton}
                            </div>
                        </div>
                    </div>

                    <div>

                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    </div>
                    <div className="row">
                        {this.state.members.map(member => (
                            <div className="col-lg-6">
                                <div className="card" id="cardMember">
                                    <Row>
                                        {/* icon */}
                                        <div className="col-lg-2" >
                                            <i id="icnMember" class="fa-solid fa-circle-user"></i>
                                        </div>
                                        {/* bagian untuk nama */}
                                        <div className="col-lg-4" id="dataMember">
                                            <strong className="judul">Nama</strong> <br />
                                            {member.nama} <br />
                                            {/* bagian untuk alamat */}
                                            <strong className="judul">Alamat</strong> <br />
                                            {member.alamat}
                                        </div>
                                        {/* bagian untuk jenis_kelamin */}
                                        <div className="col-lg-4" id="dataMember">
                                            <strong className="judul">Gender</strong> <br />
                                            {member.jenis_kelamin}<br />
                                            {/* bagian untuk telepon */}
                                            <strong className="judul">Telepon</strong> <br />
                                            {member.telepon}
                                        </div>
                                        {/* bagian untuk button */}
                                        <div className="col-lg-2">
                                            <button id="ubah" className={`btn btn-warning mx-2 mt-4 ${this.state.visible ? `` : `d-none`}`} onClick={() => this.ubahData(member.id_member)}>
                                                <i class="fa-solid fa-pen-to-square"></i>

                                            </button>
                                            <button id="delete" className={`btn mx-2 mt-4 ${this.state.visible ? `` : `d-none`}`} onClick={() => this.hapusData(member.id_member)}>
                                                <i class="fa-solid fa-trash-can"></i></button>
                                        </div>
                                    </Row>


                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                {/* form modal member */}
                <div className="modal" id="modal-member">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header" id="container-member">
                                <h4 className="title">
                                    Form Member
                                </h4>
                            </div>
                            <div className="modal-body" >
                                <form onSubmit={ev => this.simpanData(ev)}>
                                    <div className="trans-detail">
                                    <span className="details">Nama</span>
                                    <input type="text" className="form-control  input" minLength={10} maxLength={25} placeholder="10 to 25 characters"
                                        value={this.state.nama} onChange={ev => this.setState({ nama: ev.target.value })}
                                        required />
                                    <div className="input-box">
                                        <span className="details">Alamat</span>
                                            <input type="text" className="form-control input" minLength={10} maxLength={25} placeholder="10 to 25 characters"
                                            value={this.state.alamat} onChange={ev => this.setState({ alamat: ev.target.value })}
                                            required />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">Telepon</span>
                                            <input type="text" className="form-control  input" minLength={12} maxLength={12} placeholder="12 characters"
                                            value={this.state.telepon} onChange={ev => this.setState({ telepon: ev.target.value })}
                                            required />
                                    </div>
                                    </div>
                                    Jenis Kelamin
                                    <select required
                                    className="form-control mb-2"
                                    value={this.state.jenis_kelamin}
                                    onChange={(ev) => this.setState({ jenis_kelamin: ev.target.value })}>
                                        <option value=""> Pilih Gender</option>
                                        <option value="Pria">Pria</option>
                                        <option value="Wanita">Wanita</option>
                                    </select>


                                    <button className="btn btn-success btn-sm" type="submit">Simpan</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Member