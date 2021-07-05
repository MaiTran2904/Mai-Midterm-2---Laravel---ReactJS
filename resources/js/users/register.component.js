import React, { Component } from 'react'
import {ModalHeader,ModalBody,ModalFooter, Button, FormGroup, Label, Input, Alert} from 'reactstrap';
import { Link } from "react-router-dom";
import axios from "axios";

class Register extends Component {
    constructor(props) {
        super(props)

        this.state={
			file:null,
			name:'',
			email:'',
			password:'',
			repassword:'',
            err: null,
            message: null,
		}
    }

   

    watchPassword = () => {
        var x = document.getElementById("repassword");
        var y = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
            y.type = "text";
        } else {
            x.type = "password";
            y.type = "password";
        }
    };

    register = (e) => {
        e.preventDefault();
        if (this.state.password != this.state.repassword) {
            let error = {
                confirm: "Password does not match!",
            };
            this.setState({
                err: error,
            });
        } else {
            this.setState({
                err: null,
            });
            let form = new FormData();
            form.append("email", this.state.email);
            form.append("name", this.state.name);
            form.append("password", this.state.password);
            form.append("repassword", this.state.repassword);
            axios
                .post("http://127.0.0.1:8000/api/register", form)
                .then((reponse) => {
                    if (reponse.data.success == 1) {
                        alert("Register successfully!");
                        window.location.href = "http://localhost:8000/";
                    }
                    this.setState({
                        err: reponse.data.errors,
                    });
                });
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

                
                <form onSubmit={this.register} encType="multipart/form-data" method="post">
                    {this.state.err != null && (
                            <Alert color="danger">{this.state.err.register}</Alert>
                        )}

                    <ModalHeader >Welcome</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Full name*</Label>
                            <Input type="text" name="name" id="name"onChange={this.onChangeInput}/>
                            {this.state.err != null && (
                                <span className="text-danger">{this.state.err.name}</span>
                            )}
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email*</Label>
                            <Input type="text" name="email" id="email" onChange={this.onChangeInput}/>
                            {this.state.err != null && (
                                <span className="text-danger">{this.state.err.email}</span>
                            )}
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password*</Label>
                            <Input type="password" name="password" id="password" onChange={this.onChangeInput}/>
                            {this.state.err != null && (
                                <span className="text-danger">{this.state.err.password}</span>
                            )}
                        </FormGroup>
                        <FormGroup>
                            <Label for="repassword">Repassword*</Label>
                            <Input type="password" name="repassword" id="repassword"onChange={this.onChangeInput}/>
                            {this.state.err != null && (
                                <span className="text-danger">{this.state.err.repassword}</span>
                            )}
                        </FormGroup>
                        <input type="checkbox" onClick={this.watchPassword} />
                        &ensp; Show Password 
                    </ModalBody>
                        
                    <ModalFooter>
                    < Link to="/">Back</Link>
                    &ensp;
                    <Button type="submit" color="primary" >Register</Button>
                     <br/>
                     
                    </ModalFooter>
                    <b>Do you have an account?<Link to="/login">Login now</Link> </b>
                </form>
			
      </div> 
        )
    }
}

export default Register