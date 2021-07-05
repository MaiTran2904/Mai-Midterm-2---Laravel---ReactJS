import React, { Component } from 'react'
// import { Route } from 'react-router';
import {ModalHeader,ModalBody,ModalFooter, Button, FormGroup, Label, Input, Alert} from 'reactstrap';
import axios from "axios";
import { Link } from "react-router-dom";
import cookie from "react-cookies"


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            err: null,
            message: null,
        };
    }
 

    login = (e) => {
        e.preventDefault();
        let form = new FormData();
        form.append("email", this.state.email);
        form.append("password", this.state.password);
        axios.post("http://127.0.0.1:8000/api/login", form).then((reponse) => {
            console.log(reponse.data);
            if (reponse.data.success == 1) {
                cookie.save("user", reponse.data.user);
                alert("Login successfully!");
                window.location.href = "http://localhost:8000/";
            } else {
                this.setState({
                    err: reponse.data.errors,
                });
            }
        });
    };

    watchPassword = () => {
        var y = document.getElementById("password");
        if (y.type === "password") {
            y.type = "text";
        } else {
            y.type = "password";
        }
    };

    onChangeInput = (e) => {
		this.setState({
            [e.target.name]: e.target.value
        });
	}

    render() {
        return (
            <div className="container">

                <form onSubmit={this.login} encType="multipart/form-data" method="post">
                    {this.state.err != null && (
                            <Alert color="danger">{this.state.err.login}
                            
                            </Alert>
                        )}

                    <ModalHeader >Login now</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="email">Email*</Label>
                            <Input type="text" name="email" placeholder="Email address" id="email" onChange={this.onChangeInput}/>
                            {this.state.err != null && (
                                <span className="text-danger">{this.state.err.email}</span>
                            )}
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password*</Label>
                            <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChangeInput}/>
                            {this.state.err != null && (
                                <span className="text-danger">{this.state.err.password}</span>                           
                            )}
                        </FormGroup>
                        <input type="checkbox" onClick={this.watchPassword} />
                        &ensp; Show Password
                        <br/>
                       
                    </ModalBody>
                    <ModalFooter>
                    <Link to="/">Back</Link> &ensp;
                    <Button type="submit" color="primary" >Login</Button>
                    
                    </ModalFooter>
                    <b>Do you have an account?<Link to="/register">Register now</Link> </b>
                    <br/>
                    <Link to="/forgot">Forgot password</Link>
                </form>
			
            
      </div> 
        )
    }
}

export default Login