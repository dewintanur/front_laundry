import { Modal } from "bootstrap";
import React from "react";
import axios from "axios";
import { baseUrl, authorization } from '../config'

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
    };
  }
  tambahData() {
    this.modalUser = new Modal(document.getElementById("modal-user"));
    this.modalUser.show();

    this.setState({
      nama: "",
      username: "",
      password: "",
      role: "",
      id_user: Math.random(1, 1000),
      action: "tambah",
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
      let temp = this.state.users;
      temp.push(newUser);

      // this.setState({ users: temp });
      axios.post(endpoint, newUser, authorization)
        .then(response => {
          window.alert(response.data.message)
          this.getData()
        })
        .catch(error => console.log(error))
    } else if (this.state.action === "ubah") {
      this.modalUser.hide();
      let endpoint = `${baseUrl}/users/` + this.state.id_user
      let newUser = {
        id_user: this.state.id_user,
        nama: this.state.nama,
        username: this.state.username,
        password: this.state.password,
        role: this.state.role,
      };
      axios.put(endpoint, newUser, authorization)
        .then(response => {
          window.alert(response.data.message)
          this.getData()
        })
        .catch(error => console.log(error))

      // mencari posisi index dari data user berdasarkan id_user nya pada array 'users'
      // let index = this.state.users.findIndex(
      //   (user) => user.id_user === this.state.id_user
      // );
      // let temp = this.state.users;
      // temp[index].nama = this.state.nama;
      // temp[index].username = this.state.username;
      // temp[index].password = this.state.password;
      // temp[index].role = this.state.role;

      // this.setState({ users: temp });
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
      id_user: this.state.users[index].id_user,
      nama: this.state.users[index].nama,
      username: this.state.users[index].username,
      password: this.state.users[index].password,
      action: "ubah",
      role: "",
      visible: ""
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
  render() {
    return (
      <div className="container-fluid" id="style-container">
        <div className="card">
          <div className="card-header" id="bg-cardHeader">
            <h4 className="text-body">List Data User</h4>
          </div>
          <div className="card-body">
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                className={`btn btn-success mx-2.5 mb-3  ${this.state.visible ? `` : `d-none`}`}
                onClick={() => this.tambahData()}> Tambah User </button>
            </div>
            <ul className="list-group">
              {this.state.users.map((user) => (
                <li className="list-group-item mb-3">
                  <div className="row" id="style-listGroup">
                    {/* bagian untuk nama */}
                    <div className="col-lg-3">
                      <small className="text-info">Nama</small> <br />
                      {user.nama}
                    </div>
                    {/* bagian untuk username */}
                    <div className="col-lg-3">
                      <small className="text-info">Username</small> <br />
                      {user.username}
                    </div>
                    {/* bagian untuk password */}
                    <div className="col-lg-2">
                      <small className="text-info">password</small> <br />
                      {user.password}
                    </div>
                    {/* bagian untuk role */}
                    <div className="col-lg-2">
                      <small className="text-info">role</small> <br />
                      {user.role}
                    </div>
                    {/* bagian untuk button */}
                    <div className="col-lg-2">
                      <button
                        className={`btn btn-warning mx-2 mt-1.75 ${this.state.visible ? `` : `d-none`}`}
                        onClick={() => this.ubahData(user.id_user)}
                      >
                        Ubah
                      </button>
                      <button
                        className={`btn btn-danger mx-2 mt-1.75  ${this.state.visible ? `` : `d-none`}`}
                        onClick={() => this.hapusData(user.id_user)}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* form modal user */}
          <div className="modal" id="modal-user">
            <div className="modal-dialog modal-md">
              <div className="modal-content">
                <div className="modal-header" id="bg-cardHeaderForm">
                  <h4 className="text-body">Form User</h4>
                </div>
                <div className="modal-body">
                  <form onSubmit={(ev) => this.simpanData(ev)}>
                    Nama
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={this.state.nama}
                      onChange={(ev) => this.setState({ nama: ev.target.value })}
                    />
                    Username
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={this.state.username}
                      onChange={(ev) =>
                        this.setState({ username: ev.target.value })
                      }
                    />
                    Password
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={this.state.password}
                      onChange={(ev) =>
                        this.setState({ password: ev.target.value })
                      }
                    />
                    Role
                    <select
                      className="form-control mb-2"
                      value={this.state.role}
                      onChange={(ev) => this.setState({ role: ev.target.value })}>
                      <option value="Kasir">Kasir</option>
                      <option value="Admin">Admin</option>
                      <option value="Owner">Owner</option>
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