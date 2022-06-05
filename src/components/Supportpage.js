import React from "react";
import AddText from "./AddText";
import List from "./List";
import { collection, query, onSnapshot, doc, deleteDoc, } from "firebase/firestore";
import { db } from "../firebase";
import Header from "./Header";

export default function Supportpage() {

    const [list, setList] = React.useState([]);

    React.useEffect(() => {
      const q = query(collection(db, "text"));
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
  
    const handleDelete = async(id) => {
      await deleteDoc(doc(db, "text", id));
    };

  return (
    <div className="supportpage">
      <Header />
      <div>
        <h1>Support Group</h1>
        <p>Welcome to the Support Group page! Joining a support group to meet and talk to others who have similar experiences can be one way of getting over your addiction.</p>
        <p>Feel free to leave positive comments or use it as a real-time chat with other users. Please be respectful!</p>
      </div>
      <div className="chat-container">
        {list.map((list) => (
          <List key={list.id} list={list} handleDelete={handleDelete} />
        ))}
      </div>
      <div className="chattext">
        <AddText />
      </div>
    </div>
  );
}
