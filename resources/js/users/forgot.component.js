import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Input, Alert} from 'reactstrap';

class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            err: null,
            open:false
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    reset = (e) => {
        e.preventDefault();
        let form = new FormData();
        console.log('oke')
        form.append("email", this.state.email);

        axios.post("http://127.0.0.1:8000/api/forgot", form).then((response) => {

            if(response.data.success==1){
                
                this.setState({
                    
                    open:true
                })
                alert("Send email successfully!")
            }
            else{
                this.setState({
                    err:response.data.errors
                })
            }
            
        });
    };
    render() {
        return (
            <div id="logreg-forms">
                <form onSubmit={this.reset}>
                    <h1>
                        Reset password
                    </h1>
                    {this.state.err!=null && <Alert color="danger">{this.state.err.message}</Alert>}
                    <Input
                        type="email"
                        name="email"
                        id="resetEmail"
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Email address"
                    />
                    {this.state.err!=null && <Alert color="danger">{this.state.err.email}</Alert>}
                    <br/>
                    <Button className="btn btn-primary btn-block" type="submit">
                        Send
                    </Button>
                    <Link to='/'>Back</Link>
                    <br/>
                    <b><Link to="/login">Login now</Link> </b>

                </form>
            </div>
        );
    }
}

export default Forgot;