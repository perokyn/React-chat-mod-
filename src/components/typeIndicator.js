import React from "react";
import "../App.css";

function TypeIndicator(props) {
  return (
    <div
      style={
        props.loggedInMember
          ? { display: "block", padding: "3px" }
          : { display: "none" }
      }
    >
      <span
        className="avatar"
        style={{
          backgroundColor: props.avatarColor,
          textAlign: "center",
          padding: "1px",
          fontFamily: "Courier New",
          fontSize: "23px",
          fontWeight: "bold",
          color: "white",
        }}
      >
        {" "}
        {props.loggedInMember.charAt(0)}
      </span>
      <span>{props.loggedInMember}</span>
      <div className="typeIndicator">
        <span className="typeIndicatorDot" />
        <span className="typeIndicatorDot" />
        <span className="typeIndicatorDot" />
      </div>
    </div>
  );
}

export default TypeIndicator;
