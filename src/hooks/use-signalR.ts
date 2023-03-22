import { SignalRMethod } from "./../signalR/signalR-constant";

import React, { useCallback } from "react";
import { sendSignalNotificationArgs, sendSignalNotificationByPermissionArgs } from "../signalR/signalR-model";
import { useDispatch } from "./use-dispatch";
import { useSelector } from "./use-selector";

interface UseSignalR {
  sendSignalNotification: (args: sendSignalNotificationArgs) => void;
  sendSignalNotificationByPermission: (args: sendSignalNotificationByPermissionArgs) => void;
}

export const useSignalR = (): UseSignalR => {
  const { userInfo } = useSelector((state) => state.auth);
  const { connection } = useSelector((state) => state.signalR);
  const dispatch = useDispatch();

  const sendSignalNotification = useCallback(
    async (args: sendSignalNotificationArgs) => {
      try {
        await connection!.invoke(SignalRMethod.sendNotification, args);
      } catch (error) {
        console.log(error);
      }
    },
    [connection]
  );

  const sendSignalNotificationByPermission = useCallback(
    async (args: sendSignalNotificationByPermissionArgs) => {
      try {
        await connection!.invoke(SignalRMethod.sendNotificationByPermission, args);
      } catch (error) {
        console.log(error);
      }
    },
    [connection]
  );

  return {
    sendSignalNotification,
    sendSignalNotificationByPermission
  };
};
