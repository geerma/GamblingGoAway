import React from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, rtdb } from "../firebase";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { uid } from "uid";
import { set, ref, onValue, remove, increment } from "firebase/database";

export default function Slotmachine() {
  const navigate = useNavigate();
  const [slotOne, setSlotOne] = useState(getRandomInt(99));
  const [slotTwo, setSlotTwo] = useState(getRandomInt(99));
  const [slotThree, setSlotThree] = useState(getRandomInt(99));
  const [winner, setWinner] = useState(false);
  const [money, setMoney] = useState(0);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // Retrieves from the real-time database. Will retrieve the amount of Money the user has spent.
        onValue(ref(rtdb, `/${auth.currentUser.uid}`), (snapshot) => {
          const data = snapshot.val(); // Retrieves data in the form of an Object called data
          if (data !== null) {
            //console.log(Object.values(data)); //Console logs the data object
            setMoney(data.money.money); // Sets Money equal to the 'money' value from the database
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  // When slotOne, slotTwo, and slotThree change values, useEffect will check if the three values are equal. If so, then user has won.
  useEffect(() => {
    if (slotOne === slotTwo && slotTwo === slotThree && slotOne === slotThree) {
      setWinner(true);
      console.log(slotOne);
      console.log(slotTwo);
      console.log(slotThree);
    }
  }, [slotOne, slotTwo, slotThree]);

  // Spins the slot machine as long as the user is not a winner. Sets each slot a random integer value. 
  // Also the payMoney() function serves as a way to simulate virtual payment when using the slot machine.
  const handleSlotMachine = () => {
    if (winner === false) {
      setSlotOne(getRandomInt(3));
      setSlotTwo(getRandomInt(3));
      setSlotThree(getRandomInt(3));
      payMoney();
    }
  };

  // Returns a random integer.
  function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
  }

  // Increment values in real-time database V9. For usage to increment "money" by 1.
  const payMoney = async () => {
    await set(ref(rtdb, `/${auth.currentUser.uid}/money`), {
      money: increment(1),
    });
  };

  return (
    <div className="slotmachinepage">
      <h1> Slot Machine</h1>
      <div className="slotmachine">
        <p className="slots">Slot 1: {slotOne} </p>
        <p className="slots">Slot 2: {slotTwo} </p>
        <p className="slots">Slot 3: {slotThree} </p>
      </div>
      <button onClick={handleSlotMachine}>Spin Slot Machine</button>
      <h4>You have spent: {money}</h4>
      <div>
        {winner ? (
          <div>
            <p className="winning-text">You won!!! Boo! Hehehehehehehe</p>
            <button onClick={() => setWinner(false)}>Continue</button>
          </div>
        ) : (
          <p>.</p>
        )}
      </div>
    </div>
  );
}
