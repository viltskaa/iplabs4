import React from 'react';
import {AuthReq} from "../utils/Requests";

const Registration : React.FC = ({ setToken }) => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const {
            username, password, passwordConfirm
        } = form;

        if (password.value !== passwordConfirm.value) return;

        await AuthReq.registration(
            username.value,
            password.value,
            passwordConfirm.value
        );
        setToken(null);
    }

    const onCancel = (e) => {
        setToken(null);
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
                <div className="mb-3">
                    <label htmlFor="passwordConfirm" className="form-label">Password Confirm</label>
                    <input type="password"
                           className="form-control"
                           id="passwordConfirm"
                           name="passwordConfirm"
                    />
                </div>
                <div className="w-100" role="group" aria-label="Basic example">
                    <button type="submit" className="btn btn-primary me-1">Sign In</button>
                    <button className="btn btn-danger me-1" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default Registration;