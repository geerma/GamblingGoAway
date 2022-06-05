import React from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect((navigate) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/homepage");
      }
    });
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/homepage");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleRegister = () => {
    if (registerInformation.email !== registerInformation.confirmEmail) {
      alert("Please confirm your email address");
      return;
    } else if (
      registerInformation.password !== registerInformation.confirmPassword
    ) {
      alert("Please confirm your password");
      return;
    }

    createUserWithEmailAndPassword(
      auth,
      registerInformation.email,
      registerInformation.password
    )
      .then(() => {
        navigate("/homepage");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="welcome">
      <header className="header">
        <h1>Gamble Go Away</h1>
        <h2>A site for those trying not to gamble</h2>
      </header>
      <div className="login-register-container">
        {isRegistering ? (
          <div className="container-register">
            <input
              className="email"
              type="email"
              placeholder="Email"
              value={registerInformation.email}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  email: e.target.value,
                })
              }
            />
            <input
              className="confirm-email"
              type="email"
              placeholder="Confirm email"
              value={registerInformation.confirmEmail}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmEmail: e.target.value,
                })
              }
            />
            <input
              className="password"
              type="password"
              placeholder="Password"
              value={registerInformation.password}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  password: e.target.value,
                })
              }
            />
            <input
              className="confirm-password"
              type="password"
              placeholder="Confirm Password"
              value={registerInformation.confirmPassword}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmPassword: e.target.value,
                })
              }
            />
            <button className ="button-register" onClick={handleRegister}>Register</button>
            <button  className ="button-back" onClick={() => setIsRegistering(false)}>Go Back</button>
          </div>
        ) : (
          <div className="container-login">
            <input
              className="email"
              type="email"
              placeholder="Email"
              onChange={handleEmailChange}
              value={email}
            />
            <input
              className="password"
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
              value={password}
            />
            <button className="button-login" onClick={handleSignIn}>
              Sign In
            </button>
            <button
              className="button-register"
              onClick={() => setIsRegistering(true)}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
