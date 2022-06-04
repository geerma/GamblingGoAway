import React from "react";

export default function List({
  list,
  handleDelete,
}) {
  
  return (
    <div className="list">
      <div>
        {list.text}
      </div>
      <div>
        <button onClick={() => handleDelete(list.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
