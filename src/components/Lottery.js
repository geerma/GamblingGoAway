import React from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth, rtdb } from "../firebase";

import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { set, ref, onValue, increment } from "firebase/database";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LotteryNumbers from "./LotteryNumbers";
import Header from "./Header";

export default function Lottery() {
  const navigate = useNavigate();
  const [money, setMoney] = useState(0);
  const [winnings, setWinnings] = useState(0);

  const [list, setList] = React.useState([]);
  const [numberList, setNumberList] = React.useState([]);
  const [hasNumbers, setHasNumbers] = React.useState(false);

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
            if (data.money.lotterynumbers !== undefined) {
              console.log("hello");
              setHasNumbers(true);
              setNumberList(data.money.lotterynumbers);
            }
            //console.log(data.winnings.winnings);
            // If data is undefined, set amount to show zero
            if (data.money.money === undefined) {
              setMoney(0);
            }
            if (data.winnings.winnings === undefined) {
              setWinnings(0);
            }
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  React.useEffect(() => {
    const q = query(collection(db, "lottery"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let textArray = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        textArray.push({ ...doc.data(), id: doc.id });
      });
      setList(textArray);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (
      numberList[0] === list[0] &&
      numberList[1] === list[1] &&
      numberList[2] === list[2] &&
      numberList[3] === list[3] &&
      numberList[4] === list[4] &&
      numberList[5] === list[5]
    ) {
    }
  }, [numberList]);

  //
  const handleLotteryNumber = () => {
    if (hasNumbers === false) {
      setNumberList([
        getRandomInt(50),
        getRandomInt(50),
        getRandomInt(50),
        getRandomInt(50),
        getRandomInt(50),
        getRandomInt(50),
        getRandomInt(50),
      ]);
      payMoney();
    } else {
      alert("You already have lottery numbers");
    }
  };

  // Returns a random integer.
  function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
  }

  // Increment values in real-time database V9. For usage to increment "money" by 1.
  const payMoney = async () => {
    await set(ref(rtdb, `/${auth.currentUser.uid}/money`), {
      money: increment(15),
      lotterynumbers: numberList,
    });
  };

  const winMoney = async () => {
    await set(ref(rtdb, `/${auth.currentUser.uid}/winnings`), {
      winnings: increment(7),
    });
  };

  return (
    <div className="lotterypage">
      <Header />
      <div>
        <h2> Lottery </h2>
      </div>
      <h3>Winning Numbers</h3>
      <div className="lottery-container">
        {list.map((lottery) => (
          <LotteryNumbers key={lottery.id} lottery={lottery} />
        ))}
      </div>
      <h3>Your Numbers</h3>

      <div className="lottery-container">
        {numberList.map((number) => (
          <div className="lottery-list">
            <h2>{number}</h2>
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => handleLotteryNumber()}>Random Lotto - $15</button>
      </div>
      <div>
        <h4>You have spent: ${money}</h4>
        <h4>You have earned: ${winnings}</h4>
      </div>
    </div>
  );
}
