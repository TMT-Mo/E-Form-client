import {
  HubConnectionBuilder,
} from "@microsoft/signalr";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../hooks";
import { handleInfo } from "../slices/alert";
import { getNewNotification, getNotification } from "../slices/notification";
import { setHubConnection } from "../slices/signalR";
import { apiPaths } from "../utils";
import { SignalRMethod } from "./signalR-constant";
import { receiveSignalNotification } from "./signalR-model";

export const SignalR = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { connection } = useSelector((state) => state.signalR);
  const dispatch = useDispatch();
  const { receiveNotification } = SignalRMethod;

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(apiPaths.signalR.hubURL)
      .withAutomaticReconnect()
      .build();

    dispatch(setHubConnection({ incomingConnection: connect }));
  }, [dispatch]);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log(connection.state)
          connection.on(receiveNotification, async (response: receiveSignalNotification) => {
            console.log(response);
            if (response.userIds.includes(+userInfo?.userId!)) {
              dispatch(handleInfo({message: response.notify.description}))
              dispatch(getNewNotification({hasNewNotification: true}))
              await dispatch(getNotification({userId: +userInfo?.userId!})).unwrap()
            }
          });

          connection.onclose((e) => {});
        })
        .catch((error) => console.log(error));
    }
  }, [connection, dispatch, receiveNotification, userInfo?.userId]);

  return <></>;
};
