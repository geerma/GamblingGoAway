import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Lottery() {
  const navigate = useNavigate();

  useEffect((navigate) => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      }
    });
  }, []);

  return (
    <div>
      <h1> Lottery Here Boo!!!!!!! </h1>
    </div>
  );
}
