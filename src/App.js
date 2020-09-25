import React, { Component, useState } from "react";
import "./App.css";
import Messages from "./Messages";
import Input from "./Input";
import Emitter from "./utils/emitter";
import NameInput from "./components/nameinput";
import $ from "jquery";
import { TriggerPHP } from "./data/data_transfer";
import Header from "./components/chatHeader";
import TypeIndicator from "./components/typeIndicator";

function handleMemberLogin(loggedInMember) {
  const userList = document.getElementById("userList");
  const d = document.createElement("div");
  const s = document.createElement("span");
  s.className = "userOnlineIndicatorDot";
  d.innerText = loggedInMember;
  d.append(s);
  userList.appendChild(d);

  let memberLoginNotification = loggedInMember.concat(" has logged in");

  this.setState({ loggedInMember: memberLoginNotification });

  setTimeout(() => {
    this.setState({ loggedInMember: "" });
  }, 2000);
}

function checkTyping(member) {
  let currentMember = { ...this.state.member };
  if (!(member.clientData.username === currentMember.username)) {
    this.setState({ loggedInMember: member.clientData.username });
  }
}

function randomColor(value) {
  let color;
  if (value) {
    color = "#00ffee";
  } else {
    color = "#" + Math.floor(Math.random() * 0xffffff).toString(16);
  }
  return color;
}

class App extends Component {
  state = {
    messages: [],
    user: "",
    loggedInMember: "",
    avatarColor: "",
    member: {
      color: randomColor(),
      login: "false",
      username: "",
      memberTyping: "false",
    },
  };

  constructor() {
    super();

    checkTyping = checkTyping.bind(this);
    handleMemberLogin = handleMemberLogin.bind(this);
  }

  register(currentUser) {
    const member = { ...this.state.member };
    member.username = currentUser;
    this.setState({ member });
    this.setState({ user: currentUser });
    this.deployDrone(member);
  }

  deployDrone(member) {
    this.drone = new window.Scaledrone("DJHRuXNgQyi58qY0", {
      data: member,
    });
    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }

      member.id = this.drone.clientId;
    });

    const room = this.drone.subscribe("observable-room");

    room.on("data", (data, member) => {
      //check for typing event
      const messages = this.state.messages;
      if (data === "__//*//_") {
       
        this.setState({ avatarColor: member.clientData.color });
        checkTyping(member);
      } else {
        this.setState({ loggedInMember: "" });

        messages.push({ member, text: data });
        this.setState({ messages });
      }
    });

    //send member join note to user
    room.on("member_join", function (member) {
      let loggedInMember = member.clientData.username;
      handleMemberLogin(loggedInMember);
    });

    room.on("message", (message) => {
      const { data, id, timestamp, clientId, member } = message;
      const milliseconds = timestamp * 1000;
      const dateObject = new Date(milliseconds);
      const formattedDateFormat = dateObject.toLocaleString();
    });
    //send joined member list to user

    room.on("members", function (members) {
      if (members.length == 2) {
        /*TO DO inform users*/
      }
      const userList = document.getElementById("userList");
      let cnt = 0;
      members.forEach((element) => {
        const d = document.createElement("div");
        const s = document.createElement("span");
        s.className = "userOnlineIndicatorDot";
        d.innerHTML = members[cnt].clientData.username;
        d.append(s);
        userList.append(d);
        cnt++;
      });
    });
  }

  componentDidMount() {
    // Runs after the first render() lifecycle

    Emitter.on("INPUT_FROM_USERNAME", (currentUser) => {
      this.setState({ login: "true" });
      this.register(currentUser);
      TriggerPHP(currentUser);
    });

    //checks fro typing note from user
    Emitter.on("USER TYPING", (UserTyping) => {
      //send clien data from here---To DO

      let currentMember = { ...this.state.member };
    });
  }

  render() {
    return (
      <div className="App">
        <Header login={this.state.login} />

        <Messages
          typing={this.state.loggedInMember}
          messages={this.state.messages}
          currentMember={this.state.member}
        />

        <TypeIndicator
          loggedInMember={this.state.loggedInMember}
          avatarColor={this.state.avatarColor}
        />
        <div
          style={this.state.login ? { display: "none" } : { display: "block" }}
        >
          <NameInput />
        </div>
        <div
          style={
            this.state.login
              ? {
                  display: "flex",
                  justifyContent: "center",
                  background: " #262626",
                  padding: "5px",
                }
              : { display: "none" }
          }
        >
          <Input
            onSendMessage={this.onSendMessage}
            userName={this.state.user}
            drone={this.drone}
          />
        </div>
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message,
    });
  };
}

export default App;
