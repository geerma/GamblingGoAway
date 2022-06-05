import React from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, rtdb } from "../firebase";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { uid } from "uid";
import { set, ref, onValue, increment } from "firebase/database";
import Header from "./Header";

export default function Slotmachine() {
  const navigate = useNavigate();
  const [slotOne, setSlotOne] = useState(0);
  const [slotTwo, setSlotTwo] = useState(0);
  const [slotThree, setSlotThree] = useState(0);
  const [winner, setWinner] = useState(false);
  const [money, setMoney] = useState(0);
  const [winnings, setWinnings] = useState(0);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // Retrieves from the real-time database. Will retrieve the amount of Money the user has spent.
        onValue(ref(rtdb, `/${auth.currentUser.uid}`), (snapshot) => {
          const data = snapshot.val(); // Retrieves data in the form of an Object called data
          if (data !== null) {
            //console.log(Object.values(data)); //Console logs the data object
            setMoney(data.money.money); // Sets Money equal to the 'money' value from the database
            setWinnings(data.winnings.winnings);
            //console.log(data.winnings.winnings);

            // If data is undefined, set amount to show zero
            if (data.money.money === undefined) setMoney(0);
            if (data.winnings.winnings === undefined) setWinnings(0);
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  // When slotOne, slotTwo, and slotThree change values, useEffect will check if the three values are equal. If so, then user has won.
  useEffect(() => {
    if (
      slotOne === slotTwo &&
      slotTwo === slotThree &&
      slotOne === slotThree &&
      slotOne !== 0
    ) {
      setWinner(true);
      winMoney();
      console.log(slotOne);
      console.log(slotTwo);
      console.log(slotThree);
    }
  }, [slotOne, slotTwo, slotThree]);

  // Spins the slot machine as long as the user is not a winner. Sets each slot a random integer value.
  // Also the payMoney() function serves as a way to simulate virtual payment when using the slot machine.
  const handleSlotMachine = () => {
    if (winner === false) {
      setSlotOne(getRandomInt(4));
      setSlotTwo(getRandomInt(4));
      setSlotThree(getRandomInt(4));
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

  const winMoney = async () => {
    await set(ref(rtdb, `/${auth.currentUser.uid}/winnings`), {
      winnings: increment(7),
    });
  };

  return (
    <div
      className={winner === false ? "slotmachinepage" : "slotmachinepage-win"}
    >
      <Header />
      <h1> Slot Machine</h1>
      <div>
        <p>
          Welcome to the Slot Machine! Spin the slot machine, and if each slot
          will roll a random number from 1 to 5!
        </p>
        <p>
          Each spin costs $1. If all three slots are the same number, then you
          win $7!
        </p>
        <p>
          (For demo purposes, winning has been made easier to showcase winning
          mechanism)
        </p>
      </div>
      <div className="slotmachine">
        <p className="slots">{slotOne} </p>
        <p className="slots">{slotTwo} </p>
        <p className="slots">{slotThree} </p>
      </div>

      <div>
        <button className="slotbutton" onClick={handleSlotMachine}>
          Spin Slot Machine
        </button>
      </div>

      <div>
        {winner ? (
          <div>
            <p className="winning-text">
              Congratulations!{" "}
              <button
                className="continuebutton"
                onClick={() => setWinner(false)}
              >
                Click here to spin again
              </button>
            </p>
          </div>
        ) : (
          <p></p>
        )}
      </div>
      <h4>You have spent: ${money}</h4>
      <h4>You have earned: ${winnings}</h4>
    </div>
  );
}
