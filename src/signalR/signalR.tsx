import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "../hooks";

export const SignalR = () => {
  const [connection, setConnection] = useState<null | HubConnection>(null);
  const [inputText, setInputText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl("https://localhost:51130/hubs/notifications")
      .withAutomaticReconnect()
      .build();

    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("ReceiveMessage", (message) => {
            // dispatch(handleSuccess({message: 'Connected'}))
            console.log(message);
          });
        })
        .catch((error) => console.log(error));
    }
  }, [connection, dispatch]);

  const sendMessage = useCallback(
    async () => {
        if (connection) await connection.send("SendMessage", 'Hi');
      },
    [connection],
  )
  
  useEffect(() => {
    sendMessage()
  }, [sendMessage]);

  return <></>;
};
