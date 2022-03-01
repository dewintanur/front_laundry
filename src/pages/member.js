import React from "react";

import { Modal } from "bootstrap";
import { event } from "jquery";
import axios from "axios";
import "../App.css"

import { baseUrl, authorization } from "../config";
class Member extends React.Component {
    constructor() {
        super()
        this.state = {
            members: [
                {
                    id_member: "111", nama: "Johnny Yes Papa",
                    alamat: "Jln. bersamamu", jenis_kelamin: "Pria", telepon: "08925293462"
                },
                {
                    id_member: "112", nama: "Mary Yes Mama",
                    alamat: "Jln. berdua", jenis_kelamin: "Wanita", telepon: "0146729003462"
                },
                {
                    id_member: "113", nama: "Suga No Papa",
                    alamat: "Jln. bersatu", jenis_kelamin: "Pria", telepon: "019874890575"
                }
            ],

            id_member: "",
            nama: "",
            alamat: "",
            telepon: "",
            jenis_kelamin: "",
            action: "", /* utk menyimpan aksi dari tambah atau ubah data */
            role: "",
            visible:""

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
            nama: "", alamat: "", telepon: "", jenis_kelamin: "Wanita", id_member: Math.random(1, 1000000), action: "tambah"
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
            //   mencari posisi index dari data member berdasarkan id_member nya pada array 'members'
            //   let index = this.state.members.findIndex(
            //     (member) => member.id_member === this.state.id_member
            //   )
            //   let temp = this.state.members
            //   temp[index].nama = this.state.nama
            //   temp[index].alamat = this.state.alamat
            //   temp[index].telepon = this.state.telepon
            //   temp[index].jenis_kelamin = this.state.jenis_kelamin

            //   this.setState({members:temp})
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
            let endpoint = `${baseUrl}/member` + id_member
            // let temp = this.state.members
            // let index = temp.findIndex(
            //     member => member.id_member === id_member
            // )
            // // menghapus data pada array
            // temp.splice(index, 1)

            // this.setState({members: temp})
            axios.delete(endpoint,authorization)
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
        if(user.role === 'admin' || user.role === 'kasir'){
            this.setState({
                visible:true
            })
        } else {
            this.setState({
                visible: false
            })
        }

    }
    showAddButton(){
        if (this.state.role === 'admin' || this.state.role ===  'kasir'){
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
                <div className="card" >
                    <div className="card-header" id="bg-cardHeader">
                        <h4 className="text-body">List Daftar Member</h4>
                    </div>
                    <div className="card-body">
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            {/* <button className="btn btn-success mx-2.5 mb-3" onClick={() => this.tambahData()}>Tambah Data</button> */}
                            {this.showAddButton}
                        </div>
                        <ul className="list-group">
                            {this.state.members.map(member => (
                                <li className="list-group-item mb-3 mt-2">
                                    <div className="row" id="style-listGroup">
                                        {/* bagian untuk nama */}
                                        <div className="col-lg-4">
                                            <small className="text-primary">Nama</small> <br />
                                            {member.nama}
                                        </div>
                                        {/* bagian untuk jenis_kelamin */}
                                        <div className="col-lg-2">
                                            <small className="text-primary">Gender</small> <br />
                                            {member.jenis_kelamin}
                                        </div>
                                        {/* bagian untuk telepon */}
                                        <div className="col-lg-4">
                                            <small className="text-primary">Telepon</small> <br />
                                            {member.telepon}
                                        </div>
                                        {/* bagian untuk button */}
                                        <div className="col-lg-2">
                                            <button id="ubah"className={`btn btn-warning mx-2 mt-4 ${this.state.visible ? `` : `d-none`}`}  onClick={() => this.ubahData(member.id_member)}>Ubah</button>
                                            <button id="delete"className={`btn mx-2 mt-4 ${this.state.visible ? `` : `d-none`}`} onClick={() => this.hapusData(member.id_member)}>Hapus</button>
                                        </div>
                                        {/* bagian untuk alamat */}
                                        <div className="col-lg-12">
                                            <small className="text-primary">Alamat</small> <br />
                                            {member.alamat}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>


                    {/* form modal member */}
                    <div className="modal" id="modal-member">
                        <div className="modal-dialog modal-md">
                            <div className="modal-content">
                                <div className="modal-header" id="bg-cardHeaderForm">
                                    <h4 className="text-body">
                                        Form Member
                                    </h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ev => this.simpanData(ev)}>
                                        Nama
                                        <input type="text" className="form-control mb-2"
                                            value={this.state.nama} onChange={ev => this.setState({ nama: ev.target.value })}
                                            required />

                                        Alamat
                                        <input type="text" className="form-control mb-2"
                                            value={this.state.alamat} onChange={ev => this.setState({ alamat: ev.target.value })}
                                            required />

                                        Telepon
                                        <input type="text" className="form-control mb-2"
                                            value={this.state.telepon} onChange={ev => this.setState({ telepon: ev.target.value })}
                                            required />

                                        Jenis Kelamin
                                        <select className="form-control mb-2" value={this.state.jenis_kelamin} onChange={ev => this.setState({ jenis_kelamin: ev.target.value })}>
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
            </div>
        )
    }
}

export default Member