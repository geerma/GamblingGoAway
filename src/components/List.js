import React from "react";

export default function List({
  list,
  handleDelete,
}) {
  
  return (
    <div className="list">
      <div className="individual-chats">
        {list.text}
        <button onClick={() => handleDelete(list.id)}></button>
      </div>
      
    </div>
  );
}
