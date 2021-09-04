import axios from "axios";
import React, {useState} from "react";
import "./Login.css";
import {useHistory} from "react-router-dom";

function Login(props) {
    const [user, setUser] = useState({email: "", password: ""});

    const history = useHistory();

    function handleChange(event) {
        const {name, value} = event.target;

        setUser({
            ...user,
            [name]: value
        });
    }

    function login() {
        axios.post("http://localhost:4000/login", user).then(res => {
            alert(res.data.message);
            props.setLoginUser(res.data.user);
            history.push("/");
        });
    }

    function register() {
        history.push("/register");
    }

    return (<div className="Login">
        <h1>Login</h1>
        <input autoComplete="off"
            onChange={handleChange}
            value={
                user.email
            }
            type="text"
            name="email"
            placeholder="Enter your Email"></input>
        <input autoComplete="off"
            onChange={handleChange}
            value={
                user.password
            }
            type="password"
            name="password"
            placeholder="Enter your Password"></input>
        <button type="button"
            onClick={login}>Login</button>
        <br></br>
        or
        <br></br>
        <button type="button"
            onClick={register}>Register</button>
    </div>)

}

export default Login;
