import React from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();

  useEffect((navigate) => {
    auth.onAuthStateChanged(user => {
        if(!user) {
            navigate('/')
        }
    })
  }, [])

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <h1> Home Page</h1>
      <button onClick={() => navigate("/listpage")}>List Page</button>
      <button onClick={() => navigate("/lottery")}>Lottery Page</button>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
