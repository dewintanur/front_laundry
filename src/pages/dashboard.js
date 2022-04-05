import React from "react";
import axios from "axios";
import { baseUrl } from "../config";
import { formatNumber, authorization } from "../config";
import {Row,Col,Image, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";

import '../App.css'
import gambar from "../img/LP.png"
import { CardHeader } from "@mui/material";

export default class Dashboard extends React.Component {
    constructor() {
        super()

        this.state = {
            jumlahMember: 0,
            jumlahPaket: 0,
            jumlahTransaksi: 0,
            income: 0
        }
        if (!localStorage.getItem("token")) {
            window.location.href = "/login"
        }
    }

    getSummary() {
        let endpoint = `${baseUrl}/member`
        axios.get(endpoint, authorization)
            .then(response => {
                this.setState({ jumlahMember: response.data.length })
            })
            .catch(error => console.log(error))

        // paket
        endpoint = `${baseUrl}/paket`
        axios.get(endpoint, authorization)
            .then(response => {
                this.setState({ jumlahPaket: response.data.length })
            })
            .catch(error => console.log(error))

        //transaksi
        endpoint = `${baseUrl}/transaksi`
        axios.get(endpoint, authorization)
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
    componentDidMount() {
        this.getSummary()
    }
    render() {
        return (
            <div className="container-fluid"id="style-container" >
                <Row className="landing">
                    <Col>
                        <h2 id="textDB" class="display-2">You Don't have Time for LaunDry?
                        </h2>
                        <Button id="btnTambahTrans" className="btn rounded-pill ">
                            <Link to="/FormTransaksi" id="tambahTransaksi" >
                                Leave It To Me
                            </Link>
                        </Button>
                    </Col>
                    <Col>
                        <Image src={gambar} thumbnail style={{ border: "none" }}></Image>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="row" id="dashboard" >
                            <div class="col-sm-5 col-xl-4">
                                <div class="d-flex align-items-center p-3 bg-pAket rounded-3">

                                    <div class="ms-2 h6 fw-normal">
                                        <a href="/paket" id="iconMember" class="display-5"><i class="fa-solid fa-box-open"></i></a>
                                        <div class="d-flex">
                                            <h5 class="purecounter mb-0 fw-bold" >Jumlah Paket</h5>
                                        </div>
                                        <p class="mb-0">{this.state.jumlahPaket}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-5 col-xl-4">
                                <div class="d-flex align-items-center p-3 bg-mEmber rounded-3">
                                    <div class="ms-2 h6 fw-normal">
                                        <a href="/member" id="iconMember" class="display-5"><i class="fas fa-user-tie"></i></a>
                                        <div class="d-flex">
                                            <h5 class="purecounter mb-0 fw-bold" >Jumlah Member</h5>
                                        </div>
                                        <p class="mb-0">{this.state.jumlahMember}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-5 col-xl-4">
                                <div class="d-flex  align-items-center p-3 bg-tRansaksi rounded-3">
                                    <div class="ms-1 h6 fw-normal">
                                        <a href="/transaksi" id="iconMember" className="display-5"><i class="fa-solid fa-file-invoice-dollar"></i></a>
                                        <div class="d-flex">
                                            <h5 class="purecounter mb-0 fw-bold" >Jumlah Transaksi</h5>
                                        </div>
                                        <p class="mb-0">{this.state.jumlahTransaksi}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Row>
                        <div class="col-sm-12">
                            <div class="d-flex  align-items-center p-3 bg-incomE rounded-3">
                                <div class="ms-1 h6 fw-normal">
                                    <span id="iconMember" className="display-5"><i class="fa-solid fa-cash-register"></i></span>
                                    <div class="d-flex">
                                        <h5 class="purecounter mb-0 fw-bold" >Income</h5>
                                    </div>
                                    <p class="mb-0">Rp {formatNumber(this.state.income)}</p>
                                </div>
                            </div>
                        </div>
                    </Row>
                </Row>
                {/* <Row>
                    <h4 className="display-3 text-center mt-5 fw-bold"> Our Service</h4>
                    <Col>
                        <div>
                            <div className="card col-xl-4">
                                <div className="card-header"> Dry Cleaning</div>
                                <div className="card-body">
                                    Mencuci dengan air minimal
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <div className="card col-xl-4">
                                <div className="card-header"> Dry Cleaning</div>
                                <div className="card-body">
                                    Mencuci dengan air minimal
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <div className="card col-xl-4">
                                <div className="card-header"> Dry Cleaning</div>
                                <div className="card-body">
                                    Mencuci dengan air minimal
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row> */}
            </div>
        )
    }
}