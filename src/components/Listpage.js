import React from "react";
import Title from "./Title";
import AddText from "./AddText";
import List from "./List";
import { collection, query, onSnapshot, doc, deleteDoc, } from "firebase/firestore";
import { db } from "../firebase";

export default function Listpage() {

    const [list, setList] = React.useState([]);

    React.useEffect(() => {
      const q = query(collection(db, "text"));
      const unsub = onSnapshot(q, (querySnapshot) => {
        let textArray = [];
        querySnapshot.forEach((doc) => {
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
    <div className="listpage">
      <div>
        <Title />
      </div>
      <div>
        <AddText />
      </div>
      <div className="list_container">
        {list.map((list) => (
          <List key={list.id} list={list} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
