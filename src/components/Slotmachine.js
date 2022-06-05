import React from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, rtdb } from "../firebase";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { uid } from "uid";
import { set, ref, onValue, remove } from "firebase/database";

export default function Slotmachine() {
  const navigate = useNavigate();
  const [slotOne, setSlotOne] = useState(getRandomInt(50));
  const [slotTwo, setSlotTwo] = useState(getRandomInt(50));
  const [slotThree, setSlotThree] = useState(getRandomInt(50));
  const [winner, setWinner] = useState(false);

  useEffect((navigate) => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    if(slotOne === slotTwo && slotTwo === slotThree && slotOne === slotThree) {
        setWinner(true);
        console.log(slotOne);
        console.log(slotTwo);
        console.log(slotThree);
    }
  }, [slotOne])

  const handleSlotMachine = () => {
      setWinner(false);
      setSlotOne(getRandomInt(3));
      setSlotTwo(getRandomInt(2));
      setSlotThree(getRandomInt(2));
  }

  function getRandomInt(max) {
      return Math.floor(Math.random() * max)
  }

  return (
    <div>
      <h1> Slot Machine</h1>
      <div className="slotmachine">
      <p className="slots">Slot 1: {slotOne} </p>
      <p className="slots">Slot 2: {slotTwo} </p>
      <p className="slots">Slot 3: {slotThree} </p>
      </div>
      <button onClick = {handleSlotMachine}>Spin Slot Machine</button>
      <div>
          {winner ? <p className="winning-text">You won!!! Boo! Hehehehehehehe</p> : <p>.</p>}
      </div>
    </div>
  );
}
