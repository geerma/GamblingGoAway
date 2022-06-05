import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function Header() {
  const navigate = useNavigate();

  // Method to sign out
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
      <header className="header">
        <h1>Gamble Go Away</h1>
        <h2>A site for those trying not to gamble</h2>
        <div className="navigation">
        <button onClick={() => navigate("/")}>Home Page</button>
          <button onClick={() => navigate("/slotmachine")}>Slot Machine</button>
          <button onClick={() => navigate("/lottery")}>Lottery Page</button>
          <button onClick={() => navigate("/supportpage")}>Support Page</button>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </header>
    </div>
  );
}
