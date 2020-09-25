import React, { useState, useEffect } from "react";
import Emitter from "../utils/emitter";
import "../App.css";
import LeaveMessage from "./leaveMessage";
import $ from "jquery";

function NameInput(props) {
  const [text, setText] = useState("");
  const today = new Date();

  const onSubmit = (e) => {
    e.preventDefault();
    Emitter.emit("INPUT_FROM_USERNAME", text.text);
  };

  const onChange = (e) => {
    setText({ text: e.target.value });
  };

  return (
    <div className="nameInput">
      <div
        style={
          today.getHours({ hour: "numeric", hour12: false }) >= 22 &&
          today.getHours({ hour: "numeric", hour12: false }) < 8
            ? { display: "flex", justifyContent: "center", color: "white" }
            : { display: "none" }
        }
      >
        <LeaveMessage />
      </div>
      <div
        style={
          today.getHours({ hour: "numeric", hour12: false }) < 22 &&
          today.getHours({ hour: "numeric", hour12: false }) >= 8
            ? { display: "block" }
            : { display: "none" }
        }
      >
        <div className="welcomeText">
          <p>
            Welcome to my personal chat room
            <br />
            As soon as you log in I will recieve a note <br />
            on my Andorid app that is built specificially for this purpose. See
            it in details in the porfolio!
            <br />
            Allow me half a minute to login :)
            <br />
            Looking forward to our conversation!
            <br />
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <form onSubmit={(e) => onSubmit(e)}>
            <input
              style={{
                marginBottom: "2rem",
                borderStyle: "inset",
                borderColor: "white",
                borderWidth: "2px",
              }}
              onChange={(e) => onChange(e)}
              required={true}
              type="text"
              placeholder="Please enter your name"
              autoFocus={true}
            />
            <button
              style={{
                marginBottom: "2rem",
                borderStyle: "inset",
                borderColor: "white",
                borderWidth: "2px",
              }}
            >
              OK
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NameInput;
