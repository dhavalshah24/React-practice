import React, {useState} from "react";
import "./Register.css";
import axios from "axios";
import {useHistory} from "react-router-dom";

function Register() {

    const [user, setUser] = useState({name: "", email: "", password: "", confirmPassword: ""});

    const history = useHistory();

    function handleChange(event) {
        const {name, value} = event.target;

        setUser({
            ...user,
            [name]: value
        });
    }

    function register() {
        const {name, email , password, confirmPassword} = user;
        if(name && email && password && (password === confirmPassword)) {
            axios.post("http://localhost:4000/register",user).then((res) => {
                alert(res.data.message);
                history.push("/login");
            })
        } else {
            alert("invalid input");
        }
    }

    function login() {
        history.push("/login")
    }

    return (<div className="Register">
        <h1>Register</h1>
        <input onChange={handleChange}
            value={
                user.name
            }
            type="text"
            name="name"
            autoComplete="off"
            placeholder="Enter your Name"></input>
        <input onChange={handleChange}
            value={
                user.email
            }
            type="text"
            name="email"
            autoComplete="off"
            placeholder="Enter your Email"></input>
        <input onChange={handleChange}
            value={
                user.password
            }
            type="password"
            name="password"
            autoComplete="off"
            placeholder="Enter your Password"></input>
        <input onChange={handleChange}
            value={
                user.confirmPassword
            }
            type="password"
            name="confirmPassword"
            autoComplete="off"
            placeholder="Confirm Password"></input>
        <button type="button" onClick={register}>Register</button>
        <br></br>
        or
        <br></br>
        <button type="button" onClick={login}>Login</button>
    </div>)

}

export default Register;
