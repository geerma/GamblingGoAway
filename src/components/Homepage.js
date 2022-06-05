import React from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, rtdb } from "../firebase";
import support from "../images/support.png";
import slotmachine from "../images/slot-machine.png";
import lotto from "../images/lotto.png";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { uid } from "uid";
import { set, ref, onValue, remove } from "firebase/database";
import Header from "./Header";

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
      <Header />
      <h1> Home Page </h1>
      <p>Welcome to our site, Gamble Go Away. This site contains simulated gambling games, a support group/chat, and a personal note-pad to help jot down your emotions/thoughts!</p>
      <p>This site will take in money, but after the end of a session / month, it will reimburse the user so that no money is lost. (Not implemented for hackathon purposes)</p>
      <div className="flex-container">
      <div className="image-links">
        <h2>Links</h2>
        <a href="/slotmachine" title="slot icons from flaticon">
          <img className="images" src={slotmachine} />
        </a>
        <a href="/lottery" title="lotto icons from flaticon">
          <img className="images" src={lotto} />
        </a>
        <a href="/supportpage" title="team icons from flaticon">
          <img className="images" src={support} />
        </a>
      </div>
      <div className="personal-container">
        <h2>Personal Notes:</h2>
        <div>
          {personalDatas.map((personalData) => (
            <div key={personalData.uidd}>
                {personalData.personalData === undefined ? <p></p> : <h2 className="individual-personal">{personalData.personalData}</h2>}
            </div>
          ))}
        </div>
        <div>
          <input
            type="text"
            value={personalData}
            onChange={(e) => setPersonalData(e.target.value)}
          />

          <button onClick={writeToDatabase}>Add</button>
        </div>
      </div>
      </div>
      <footer className="footer">©2022 Copyright by geerma lilyyao14. All Rights Reserved. Images from https://www.flaticon.com</footer>
    </div>
  );
}
