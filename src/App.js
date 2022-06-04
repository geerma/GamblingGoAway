import './App.css';
import React from 'react';
import Title from './components/Title';
import AddText from './components/AddText';
import List from './components/List';
import { collection, query, onSnapshot, doc, deleteDoc, } from "firebase/firestore";
import { db } from "./firebase";

function App() {

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
    <div className="App">
      <div>
        <Title />
      </div>
      <div>
        <AddText />
      </div>
      <div className="list_container">
        {list.map((list) => (
          <List
            key={list.id}
            list={list}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
