import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './home.css'
class Homepage extends Component {
    
    render() {
        return (
            <div className="container" >
                <h1>Welcom to my assignment </h1>
                <p><Link to={"/login"} className="btn">           
                   <b>LOGIN</b>
                </Link></p>
                <p><Link to={"/register"} className="btn">           
                    <b>SIGNUP</b>
                </Link></p>
                
            </div>
        )
    }
}

export default Homepage