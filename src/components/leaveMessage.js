import React, { useState } from "react";
import { triggerPHPMessage } from "../data/data_transfer";

function LeaveMessage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    triggerPHPMessage(
      document.getElementById("name").value,
      document.getElementById("email").value,
      document.getElementById("message").value
    );

    setMessageSent({ messageSent: true });
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
  };

  const hideElement = (e) => {
    const submitted = document.getElementById("submit_success");

    submitted.style.display = "none";
  };

  return (
    <div style={{ margin: " 0 auto" }}>
      <div
        id="submit_success"
        style={
          messageSent
            ? {
                display: "block",
                position: "absolute",
                background: "black",
                borderStyle: "inset",
                borderColor: "white",
                borderRadius: "10px",
                borderWidth: "2px",
                padding: "5px",
              }
            : { display: "none" }
        }
      >
        <div
          onClick={(e) => hideElement(e)}
          style={{
            fontSize: "1rem",
            paddingRight: "5px",
            textAlign: "right",
            color: "gray",
            marginBottom: "8px",
          }}
        >
          <span
            style={{
              borderStyle: "inset",
              borderColor: "white",
              borderRadius: "30%",
              borderWidth: "1px",
              padding: "2px",
            }}
          >
            x
          </span>
        </div>
        <div
          style={{
            textAlign: "center",
            fontSize: "2rem",
            padding: "10px",
            borderStyle: "inset",
            borderColor: "white",
            borderWidth: "1px",
            borderRadius: "10px",
          }}
        >
          Message submitted
        </div>
      </div>
      <p style={{ padding: "1em" }}>
        Unfortunately you have missed my up time. <br />
        It is normally wihtin 8am-10pm EDT.
        <br />
        But I would definetly would love to hear from you so please
        <br />
        go ahead and leave a message, Ill will respond frist thing in the
        morning!
      </p>
      <form
        onSubmit={(e) => onSubmit(e)}
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          margin: "0 auto",
        }}
      >
        <label> Name </label>
        <p>
          <input id="name" required={true}></input>
        </p>
        <label>eMail</label>
        <p>
          <input id="email" required={true}></input>
        </p>
        <label>Message</label>
        <p>
          <textarea
            id="message"
            required={true}
            type="text"
            placeholder="Enter your message"
            autoFocus={true}
          ></textarea>
        </p>
        <p>
          <button
            style={{
              marginBottom: "2rem",
              borderStyle: "inset",
              borderBlockColor: "white",
              borderWidth: "2px",
            }}
          >
            Send
          </button>
        </p>
      </form>
    </div>
  );
}

export default LeaveMessage;
