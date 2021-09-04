import React from "react";
import "./Homepage.css";

function Homepage(props) {

    function logout() {
        props.setLoginUser();
    }

    return (<div className="Homepage">
        <h1>Hello {
            props.name
        }</h1>
        <button type="button"
            onClick={logout}>Log out</button>
    </div>)

}

export default Homepage;
