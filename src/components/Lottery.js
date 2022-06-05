import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Lottery() {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      }
    });
  }, []);

  return (
    <div className="lotterypage">
      <h2> Lottery Here Boo!!!!!!! </h2>
    </div>
  );
}
