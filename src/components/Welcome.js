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
      <h1>Welcome</h1>
      <div className="login-register-container">
        {isRegistering ? (
          <div>
            <input
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
            <button onClick={handleRegister}>Register</button>
            <button onClick={() => setIsRegistering(false)}>Go Back</button>
          </div>
        ) : (
          <div>
            <input type="email" onChange={handleEmailChange} value={email} />
            <input
              type="password"
              onChange={handlePasswordChange}
              value={password}
            />
            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={() => setIsRegistering(true)}>Register</button>
          </div>
        )}
      </div>
    </div>
  );
}
