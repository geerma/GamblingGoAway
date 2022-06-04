import React from 'react';
import {signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase"

import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"

export default function Welcome() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect((navigate) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate('/homepage')
            }
        });
    }, [])

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            navigate('/homepage')
        })
        .catch((err) => {
            alert(err.message)
        });
    }

    return (
        <div className="welcome">
            <h1>Welcome</h1> 
            <div className = "login-container">
                <input type = "email" onChange={handleEmailChange} value={email} />
                <input type = "password" onChange={handlePasswordChange} value={password} />
                <button onClick = {handleSignIn}>Sign In</button>
                <a href="">Create an account</a>
            </div>
        </div>
    )
}