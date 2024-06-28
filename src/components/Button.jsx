import React from "react";
import "./Todo.css";

export const Button = ({ handleclick }) => {
  return (
    <div>
      <button type="button" className="btn " onClick={handleclick}>
        Add +
      </button>
    </div>
  );
};
