import React from "react";
import {db} from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddText() {
    const[text, setText] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (text !== "") {
            await addDoc(collection(db, "text"), {
                text,
                otherField: "Null",
            });
            setText("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
            <input
                type="text"
                placeholder="Enter text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            </div>
            <div>
                <button className = "btn_add">Add</button>
            </div>
        </form>
    )
}