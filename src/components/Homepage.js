import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();

    const goList = () => {
        navigate("/listpage");
    }

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
      <button onClick={goList}>List Page</button>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
