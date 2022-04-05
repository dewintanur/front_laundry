import { Modal } from "bootstrap";
import React from "react";
import axios from "axios";
import { baseUrl, authorization } from '../config'
import { Row, Col } from 'react-bootstrap'
class User extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [
        {
          id_user: "1111",
          nama: "mawar eva",
          username: "MawaarEva",
          password: "1234",
          role: "kasir",
        },
        {
          id_user: "1112",
          nama: "Farrel N",
          username: "FarrelN",
          password: "1232",
          role: "kasir",
        },
        {
          id_user: "1113",
          nama: "Bunga Melati",
          username: "MelatiBung",
          password: "1534",
          role: "kasir",
        },
      ],
      id_user: "",
      nama: "",
      username: "",
      password: "",
      role: "",
      action: "",
      fillPassword: true,
    };
  }
  tambahData() {
    this.modalUser = new Modal(document.getElementById("modal-user"));
    this.modalUser.show();

    this.setState({
      nama: "",
      username: "",
      password: "",
      role: " ",
      id_user: Math.random(1, 1000),
      action: "tambah",
      fillPassword: true
      // harus diisi
    });
    if (!localStorage.getItem("token")) {
      window.location.href = "/login"
    }
  }

  simpanData(ev) {
    ev.preventDefault();

    this.modalUser.hide();

    if (this.state.action === "tambah") {
      let endpoint = `${baseUrl}/users`
      let newUser = {
        id_user: this.state.id_user,
        nama: this.state.nama,
        username: this.state.username,
        password: this.state.password,
        role: this.state.role,
      };
      // let temp = this.state.users;
      // temp.push(newUser);

      // this.setState({ users: temp });
      axios.post(endpoint, newUser, authorization)
        .then(response => {
          window.alert(response.data.message)
          this.getData()
        })
        .catch(error => console.log(error))
    } else if (this.state.action === "ubah") {
      this.modalUser.hide();
      let endpoint = "http://localhost:8000/users/" + this.state.id_user
      let newUser = {
        id_user: this.state.id_user,
        nama: this.state.nama,
        username: this.state.username,
        role: this.state.role,
      }

      if (this.state.fillPassword === true) {
        newUser.password = this.state.password
      }
      axios.put(endpoint, newUser, authorization)
        .then(response => {
          window.alert(response.data.message)
          this.getData()
        })
        .catch(error => console.log(error))
    }
  }


  ubahData(id_user) {
    this.modalUser = new Modal(document.getElementById("modal-user"));
    this.modalUser.show();

    // mencari posisi index dari data user berdasarkan id_user nya pada array 'users'
    let index = this.state.users.findIndex(
      (user) => user.id_user === id_user
    );
    this.setState({
      id_user: id_user,
      nama: this.state.users[index].nama,
      username: this.state.users[index].username,
      password: "",
      action: "ubah",
      role: this.state.users[index].role,
      visible: true,
      fillPassword: false,
    });
  }

  hapusData(id_user) {
    if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
      let endpoint = `${baseUrl}/users/` + id_user
      axios.delete(endpoint, authorization)
        .then(response => {
          window.alert(response.data.message)
          this.getData()
        })
        .catch(error => console.log(error))
      // mencari posisi index dari data yang akan dihapus
      // let temp = this.state.users;
      // let index = temp.findIndex((user) => user.id_user === id_user);
      // // menghapus data pada array
      // temp.splice(index, 1);

      // this.setState({ users: temp });
    }
  }
  getData() {
    let endpoint = `${baseUrl}/users`
    axios.get(endpoint, authorization)
      .then(response => {
        this.setState({ users: response.data })
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
    if (user.role === 'admin' || user.role === 'Admin') {
      this.setState({
        visible: true
      })
    } else {
      this.setState({
        visible: false
      })
    }
    if (user.role !== 'admin') {
      window.alert(`Maaf anda tidak berhak untuk mengakses halaman ini`)
      window.location.href = "/"
    }
  }


  showPassword() {
    if (this.state.fillPassword === true) {
      return (
        <div>
          <span className="details">Password</span>

          <input type="password" className="form-control mb-1 input" required value={this.state.password} minLength={5} maxLength={8}
            placeholder="5 to 8 Characters" onChange={ev => this.setState({ password: ev.target.value })}>

          </input>
        </div>
      )
    } else {
      return (
        <button className="mb-1 btn text-white" id="change-password" onClick={() => this.setState({ fillPassword: true })}
          minLength={5} maxLength={8} placeholder="5 to 8 Characters">
          Change Password
        </button>
      )
    }
  }

  render() {
    return (
      <div className="container-fluid" id="style-container">
        <Row>
          <Col>
            <h4 className="text-center display-2">User Data</h4>
          </Col>
        </Row>
        <div className="card-body">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              id="tambah" className={`btn mx-2.5 mb-3  ${this.state.visible ? `` : `d-none`}`}
              onClick={() => this.tambahData()}> <i class="fa-solid fa-plus" id="iconTambah"></i>Tambah User </button>
          </div>
          <div className="row">
            {this.state.users.map((user) => (
              <div className="col-lg-4">
                <div className="card" id="cardUser">
                  <Row>
                    <div className="col-lg-2" >
                      <i id="iconUser" class="fa-solid fa-user-group"></i>
                    </div>
                    {/* bagian untuk nama */}
                    <div className="col-lg-3" id="dataUser">
                      <strong className="judul">Name </strong> <br />
                      {/* bagian untuk username */}
                      <strong className="judul">Username</strong><br />
                      {/* bagian untuk role */}
                      <strong className="judul">Role </strong>
                    </div>
                    <div className="col-lg-5" id="dataUser">
                      <small className="isi"> : {user.nama} </small><br />
                      <small className="isi"> : {user.username}</small><br />
                      <small className="isi"> : {user.role}</small>
                    </div>
                    {/* bagian untuk button */}
                    <div className="col-lg-2">
                      <div className="ubahHapus">
                        <button
                          id="ubah" className={`btn  ${this.state.visible ? `` : `d-none`}`}
                          onClick={() => this.ubahData(user.id_user)}>
                          <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                          id="delete" className={`btn mt-3 mb-3 ${this.state.visible ? `` : `d-none`}`}
                          onClick={() => this.hapusData(user.id_user)}>
                          <i class="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </div>
                  </Row>
                </div>
              </div>
            ))}
          </div>


          {/* form modal user */}
          <div className="modal" id="modal-user">
            <div className="modal-dialog modal-md">
              <div className="modal-content">
                <div className="modal-header" id="container-user">
                  <h4 className="text-body">Form User</h4>
                </div>
                <div className="modal-body">
                  <form onSubmit={(ev) => this.simpanData(ev)}>
                    <div className="user-detail">

                      <span className="details">Name</span>
                      <input required
                        type="text"
                        className="form-control mb-2 input"
                        value={this.state.nama} placeholder="5 to 14 characters" maxLength={14} minLength={5}
                        onChange={(ev) => this.setState({ nama: ev.target.value })}
                      />
                    </div>
                    <span className="details">Username</span>
                    <input required
                      type="text" placeholder="3 to 5 characters" minLength={3} maxLength={5}
                      className="form-control mb-2 input"
                      value={this.state.username}
                      onChange={(ev) =>
                        this.setState({ username: ev.target.value })
                      }
                    />
                    {this.showPassword()} <br></br>

                    Role
                    <select required
                      className="form-control mb-2"
                      value={this.state.role}
                      onChange={(ev) => this.setState({ role: ev.target.value })}>
                      <option value="">Pilih Role</option>
                      <option value="kasir">Kasir</option>
                      <option value="admin">Admin</option>
                      <option value="owner">Owner</option>
                    </select>
                    <button className="btn btn-success btn-sm" type="submit">
                      Simpan
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User