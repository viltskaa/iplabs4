import React from 'react';
import {AuthReq, getJwtToken} from "../utils/Requests";
import {useNavigate} from "react-router-dom";

const Login : React.FC = ({ setToken }) => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        await AuthReq.auth(
            form.username.value,
            form.password.value
        );
        setToken(getJwtToken());
    }

    const onSignUp = (e) => {
        setToken("reg");
    }

    return (
        <div className="w-100 d-flex justify-content-center align-items-center bg-dark" style={{
            height : '100vh'
        }}>
            <form className="w-25 text-white" onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="login" className="form-label">Login</label>
                    <input type="text"
                           className="form-control"
                           id="login"
                           name="username"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password"
                           className="form-control"
                           id="password"
                           name="password"
                    />
                </div>
                <div className="w-100" role="group" aria-label="Basic example">
                    <button type="submit" className="btn btn-primary me-1">Sign In</button>
                    <button className="btn btn-success ms-1" onClick={onSignUp}>Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default Login;