import React from "react";

export default function LotteryNumbers({ lottery }) {
  return (
    <div className="lottery-list">
      <div>
        <h2>{lottery.number}</h2>
      </div>
    </div>
  );
}
