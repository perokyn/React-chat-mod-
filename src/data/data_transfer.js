import React from "react";
import $ from "jquery";

export function TriggerPHP(currentUser) {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;

  let data = {
    do: 1, //for future developments
    user: currentUser,
    logintime: dateTime,
  };

  console.log("data form object:", data.action1);
  // php -S localhost:8001
  //testing url: //localhost:8001/index.php
  $.ajax({
    type: "POST",
    url: "/reactchat/index.php",
    data: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
    success: function successCallback(response) {
      console.log("Post success", response);
    },
    error: function (xhr, status, error) {
      console.log(xhr.responseText);
    },
  });
}

export const triggerPHPMessage = (name, email, message) => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;

  let data = {
    do: 2, //for future developments
    user: name,
    logintime: dateTime,
    message: message,
    email: email,
  };


  //$ php -S localhost:8001

  //testing url: //localhost:8001/index.php
  $.ajax({
    type: "POST",
    url: "/reactchat/index.php",
    //dataType: "txt",
    data: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
    success: function successCallback(response) {},
    error: function (xhr, status, error) {
      console.log(xhr.responseText);
    },
  });
};
