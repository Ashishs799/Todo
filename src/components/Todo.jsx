import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import "./Todo.css";
import { FaRegCircle } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import { Button } from "./Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { nanoid } from "nanoid";

export const Todo = () => {
  const [list, setList] = useState([]);
  const [newList, setNewList] = useState("");

  const handleComplete = (id) => {
    const updatedList = list.map((item) => {
      if (item.id === id) {
        return { ...item, isDone: !item.isDone };
      }
      return item;
    });
    setList(updatedList);
  };

  const handleclick = (event) => {
    if (newList.trim() === "") {
      toast.error("Add some tasks...");
      return; // Exit the function if input is empty
    }
    setList((prevList) => [
      ...prevList,
      { id: nanoid(), text: newList, isDone: false },
    ]);
    // setNewList("");
  };

  useEffect(() => {
    console.log("Lists \n", list);
  }, [list]);
  useEffect(() => {
    setList(JSON.parse(localStorage.getItem("lists")));
  }, []);
  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("lists", JSON.stringify(list));
    }, 100);
  }, [list]);

  const handleChange = (event) => {
    setNewList(event.target.value);
  };

  const removeItem = (id) => {
    console.log(id);
    const removedList = list.filter((item) => item.id !== id);
    setList(removedList);
  };
  return (
    <section>
      <div className="wrapper">
        <form className="todo_form">
          <div className="input-group input-group-sm mb-3 flex">
            <input
              type="text"
              name="array"
              value={newList}
              className="form-control input"
              placeholder="Set your next goal"
              onChange={handleChange}
              style={{ outline: "none" }}
            />
            <Button handleclick={handleclick} />
          </div>
        </form>

        <ul className="list-group">
          {list.map((text, index) => (
            <div
              className="todo-lists"
              style={{ display: "flex" }}
              key={text.id}
            >
              {text.isDone ? (
                <FaCircleCheck
                  style={{
                    fontSize: "14px",
                    cursor: "pointer",
                    color: "red",
                  }}
                  onClick={() => handleComplete(text.id)}
                />
              ) : (
                <FaRegCircle
                  style={{
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleComplete(text.id)}
                />
              )}
              <li
                className={"list-group-item "}
                key={text.id}
                style={{
                  textDecoration: text.isDone ? "line-through" : " none",
                  color: text.isDone ? "red" : " #fff",
                }}
              >
                {text.text}
              </li>

              <MdCancel
                onClick={() => {
                  removeItem(text.id);
                }}
                // style={{ color: "#ff0c0c" }}
              />
            </div>
          ))}
        </ul>
      </div>
    </section>
  );
};
