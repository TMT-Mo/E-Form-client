import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect } from "react";
import { useAuth, useDispatch, useSelector } from "hooks";
import { handleInfo } from "slices/alert";
import { getNewNotification, getNotification } from "slices/notification";
import { setHubConnection } from "slices/signalR";
import { apiPaths } from "utils";
import { SignalRMethod } from "./signalR-constant";
import {
  editSystemSignalR,
  receiveSignalNotification,
  receiveSignalNotificationByPermission,
} from "./signalR-model";
import { useTranslation } from "react-i18next";

export const SignalR = () => {
  const { t } = useTranslation();
  const { userInfo } = useSelector((state) => state.auth);
  const { connection } = useSelector((state) => state.signalR);
  const { message } = useSelector((state) => state.alert);
  const { logout } = useAuth();
  const dispatch = useDispatch();
  const { receiveNotification, receiveNotificationByPermission, editSystem } =
    SignalRMethod;

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
          console.log(connection.state);

          // * ReceiveMessage
          connection.on(
            receiveNotification,
            async (response: receiveSignalNotification) => {
              console.log(response);
              if (message) return;
              if (
                response.userIds?.includes(+userInfo?.userId!) ||
                response.departmentNames?.includes(userInfo?.departmentName!)
              ) {
                dispatch(handleInfo({ message: t(response.notify.description) }));
                dispatch(getNewNotification({ hasNewNotification: true }));
                await dispatch(
                  getNotification({ userId: +userInfo?.userId! })
                ).unwrap();
              }
            }
          );

          // * ReceiveMessageByPermission
          connection.on(
            receiveNotificationByPermission,
            async (response: receiveSignalNotificationByPermission) => {
              console.log("By Permission", response);
              if (message) return;
              if (
                response.userIds?.includes(+userInfo?.userId!) ||
                response.departmentNames?.includes(userInfo?.departmentName!)
              ) {
                dispatch(handleInfo({ message: t(response.notify.description) }));
                dispatch(getNewNotification({ hasNewNotification: true }));
                await dispatch(
                  getNotification({ userId: +userInfo?.userId! })
                ).unwrap();
              }
            }
          );

          // * EditSystem
          connection.on(editSystem, async (response: editSystemSignalR) => {
            console.log(response);
            const { departmentName, idUser, roleName } = response;
            if (idUser === userInfo?.userId) {
              dispatch(
                handleInfo({
                  message: t(
                    "Your account just got edited by Admin. Please login again or contact Admin for more information!"
                  ),
                })
              );
              logout();
            }
            if (departmentName === userInfo?.departmentName) {
              dispatch(
                handleInfo({
                  message: t(
                    "Your account just got edited by Admin. Please login again or contact Admin for more information!"
                  ),
                })
              );
              logout();
            }
            if (roleName === userInfo?.roleName) {
              dispatch(
                handleInfo({
                  message: t(
                    "Your account just got edited by Admin. Please login again or contact Admin for more information!"
                  ),
                })
              );
              logout();
            }
          });

          connection.onclose(async (e) => {});
        })
        .catch((error) => console.log(error));
    }
  }, [
    connection,
    dispatch,
    editSystem,
    logout,
    message,
    receiveNotification,
    receiveNotificationByPermission,
    t,
    userInfo?.departmentName,
    userInfo?.roleName,
    userInfo?.userId,
  ]);

  return <></>;
};
