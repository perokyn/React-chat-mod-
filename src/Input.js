import { Component } from "react";
import React from "react";
import Emitter from "./utils/emitter";

function iLogin() {
  this.setState({ login: true });
  Emitter.emit("INPUT_FROM_LOGIN", this.state.login);
}

function typeNoptification() {
  const drone = this.props.drone;
  drone.publish({
    room: "observable-room",
    message: "__//*//_",
  });
}

class Input extends Component {
  state = {
    text: "",
    typed: false,
    username: this.props.userName,
  };
  constructor(props) {
    super(props);
    iLogin = iLogin.bind(this);
    typeNoptification = typeNoptification.bind(this);
  }

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  componentDidMount() {
    Emitter.on("USER TYPING", () => {
      if (this.state.text.length > 0 && this.state.text.length < 2) {
        typeNoptification();
      }
    });
  }

  onKeyDown(e) {
    /*TO DO emit event to app to set user typing note*/
    Emitter.emit("USER TYPING", this.props.userName);
  }

  onSubmit(e) {
    e.preventDefault();
    if (!this.state.text) {
      const input = document.getElementById("input");
      input.placeholder = this.props.userName.concat(" please type a message");
      return;
    }
    this.setState({ text: "" });
    this.setState({ typed: true });
    this.props.onSendMessage(this.state.text);
    iLogin();
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.onSubmit(e)}>
          <input
            id="input"
            onChange={(e) => this.onChange(e)}
            onKeyDown={(e) => this.onKeyDown(e)}
            value={this.state.text}
            type="text"
            placeholder={
              !this.state.typed
                ? "Hi " +
                  this.props.userName +
                  "! " +
                  " Enter your message and press ENTER"
                : "Eneter a message"
            }
            autoFocus={true}
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default Input;
