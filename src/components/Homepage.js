import React from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, rtdb } from "../firebase";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { uid } from "uid";
import { set, ref, onValue, remove } from "firebase/database";

export default function Homepage() {
  const [personalData, setPersonalData] = useState("");
  const [personalDatas, setPersonalDatas] = useState([]);
  const navigate = useNavigate();

  // useEffect to ensure that when the user is logged in, it will retrieve from the real-time database (rtdb), and populate the array with data
  useEffect((navigate) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(rtdb, `/${auth.currentUser.uid}`), (snapshot) => {
          setPersonalDatas([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((personalData) => {
              setPersonalDatas((oldArray) => [...oldArray, personalData]);
            });
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

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

  // Add to Realtime Database
  const writeToDatabase = () => {
    const uidd = uid(); // Create new uidd for every data added to rtdb
    set(ref(rtdb, `/${auth.currentUser.uid}/${uidd}`), {
      personalData: personalData,
      uidd: uidd,
    });

    setPersonalData("");
  };

  // Delete from Real-time Database
  const handleDelete = (uidd) => {
    remove(ref(rtdb, `/${auth.currentUser.uid}/${uidd}`));
  };

  return (
    <div className="homepage">
      <header className="header">
        <h1>Gamble Go Away</h1>
        <h2>A site for those trying not to gamble</h2>
      </header>
      <h1> Home Page </h1>

      <button onClick={() => navigate("/slotmachine")}>Slot Machine</button>
      <button onClick={() => navigate("/listpage")}>List Page</button>
      <button onClick={() => navigate("/lottery")}>Lottery Page</button>
      <button onClick={handleSignOut}>Sign Out</button>

      <input
        type="text"
        value={personalData}
        onChange={(e) => setPersonalData(e.target.value)}
      />

      <button onClick={writeToDatabase}>Add</button>

      <div>
        {personalDatas.map((personalData) => (
          <div key={personalData.uidd}>
            <h1>{personalData.personalData}</h1>
            <button onClick={() => handleDelete(personalData.uidd)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
