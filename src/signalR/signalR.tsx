import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "../hooks";
import { handleSuccess } from "../slices/alert";
import { apiPaths } from "../utils";

export const SignalR = () => {
  const [connection, setConnection] = useState<null | HubConnection>(null);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");

  const sendMessage = useCallback(async () => {
    console.log("Im in");
    try {
      await connection!.invoke("SendMessage");
    } catch (error) {
      console.log(error);
    }
  }, [connection]);

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(apiPaths.signalR.test)
      .withAutomaticReconnect()
      .build();

    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log(connection?.state);
          console.log(connection.connectionId)
          connection.on("ReceiveMessage", (message) => {
            console.log(message)
            // if (message === +userInfo?.userId!) {
            //   dispatch(handleSuccess({message: 'Hello World!'}))
            // }
          });

          connection.onclose((e) => { });
        })
        .catch((error) => console.log(error));
    }
  }, [connection, dispatch, sendMessage, userInfo?.userId]);

  useEffect(() => {
    connection?.state === "Connected" && sendMessage();
  }, [connection?.state, sendMessage]);

  return (
    <>
      {/* <button onClick={() => sendMessage()}>test</button> */}
    </>
  );
};
