import React from "react";
import "../App.css";

function Header(props) {
  return (
    <div
      className="App-header"
      id="list2"
      style={props.login ? { display: "block" } : { display: "none" }}
    >
      <p style={{ margin: "0rem" }}>Chat members</p>
      <div
        id="userList"
        style={{
          FlexDirection: "column",
          borderStyle: "inset",
          borderWidth: "1px",
          width: "6rem",
          borderRadius: "8px",
          height: "3rem",
          overflow: "auto",
          background: "black",
        }}
      ></div>
    </div>
  );
}
export default Header;
