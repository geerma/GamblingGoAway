import React from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import Title from "./Title";
import AddText from "./AddText";
import List from "./List";
import { collection, query, onSnapshot, doc, deleteDoc, } from "firebase/firestore";
import { db } from "../firebase";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LotteryNumbers from "./LotteryNumbers";
import Header from "./Header";

export default function Lottery() {

  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    const q = query(collection(db, "lottery"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let textArray = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        textArray.push({ ...doc.data(), id: doc.id});
      });
      setList(textArray);
    });
    return () => unsub();
  }, []);

return (
  <div className="lotterypage">
    <Header />
    <div>
      <h2> Lottery </h2>
    </div>
    <div className="lottery-container">
      {list.map((lottery) => (
        <LotteryNumbers key={lottery.id} lottery={lottery}/>
      ))}
    </div>
  </div>
);
}