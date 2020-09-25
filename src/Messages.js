import { Component } from "react";
import React from "react";

function currentIndex(index) {
  messagecount = index;
}
let messagecount = 0;

class Messages extends Component {
  constructor() {
    super();
 
    this.state = {
      currentMessage: 0,
    };
    currentIndex = currentIndex.bind(this);
  }

  componentDidUpdate() {
    const { typing } = this.props;

    const element = document.getElementById(messagecount);
    if (element && typing) {
      element.scrollIntoView({ behavior: "smooth" });
    } else if (element && !typing) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
    messagecount++;
  }

  render() {
    const { messages } = this.props;
    return (
      <ul className="Messages-list">
        {messages.map((m, index) => this.renderMessage(m, index))}
      </ul>
    );
  }

  renderMessage(message, index) {
    currentIndex(index);
    const { member, text } = message;
    const { currentMember } = this.props;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";
    return (
      <li className={className} key={index} id={index}>
        <span
          className="avatar"
          style={{
            backgroundColor: member.clientData.color,
            textAlign: "center",
            padding: "1px",
            fontFamily: "Courier New",
            fontSize: "23px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          {member.clientData.username.charAt(0)}
        </span>
        <div className="Message-content">
          <div className="username">{member.clientData.username}</div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  }
}

export default Messages;
