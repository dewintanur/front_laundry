import React from "react"
import axios from "axios"
import './login.css'
import loginn from "../img/log.png"
import background from '../img/abstract-139.png'
import { Row,Col,Image, Form, Button } from 'react-bootstrap'
class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: ""
        }
    }
    loginProcess(event) {
        event.preventDefault()
        let endpoint = "http://localhost:8000/api/auth"
        let request = {
            username: this.state.username,
            password: this.state.password
        }
        axios.post(endpoint, request)
            .then(result => {
                if (result.data.logged) {
                    //store token in local storage
                    localStorage.setItem("token", result.data.token)
                    localStorage.setItem(
                        "user", JSON.stringify(result.data.user)
                    )
                    let halo = JSON.parse(localStorage.getItem(`user`));
                    window.alert(`Selamat datang ${halo.role}:)`)
                    window.location.href = "/"

                } else {
                    window.alert("Whooops!, wrong username and password")
                }
            })
            .catch(error => console.log(error))
    }
    render() {
        return (
            <div className="backgroundd">
            <div className="container">
                <Row id="">
                    <Col>
                            <h1 class="display-1" id="judul">Sign <span id="juduL">In</span></h1>
                        <Form className="formLogin" onSubmit={ev => this.loginProcess(ev)}>
                            <Form.Group>
                                <Form.Label id="form-label"> Username</Form.Label>
                                <Form.Control type="text" id="text" className="form-control mb-2"
                                    required value={this.state.username}
                                    onChange={ev => this.setState({ username: ev.target.value })}
                                    placeholder="Type your username"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label id="form-label"> Password</Form.Label>
                                <Form.Control type="password" id="password" className="form-control mb-2"
                                    required value={this.state.password}
                                    onChange={ev => this.setState({ password: ev.target.value })}
                                    placeholder="Type your password"
                                />
                            </Form.Group>
                            <Button type="submit" id="btnLogin">Submit</Button>
                        </Form>
                    </Col>
                    <Col>
                        <Image src={loginn} thumbnail style={{ border: "none" }}></Image>
                    </Col>
                </Row>
            </div >
        </div>
        )
    }

}
export default Login
