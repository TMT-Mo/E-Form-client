import { httpClient, apiPaths } from "../utils";
import { DummyNotificationList } from "../utils/dummy-data";
import {
    CheckNotificationArgs,
  CheckNotificationResponse,
  GetNotificationArgs,
  GetNotificationResponse,
} from "./../models/notification";

const getNotificationList = async (
  args: GetNotificationArgs
): Promise<GetNotificationResponse> => {
//   const response = await httpClient.post({
//     url: apiPaths.notification.getNotificationList,
//     params: args,
//   });
// return response.data as GetNotificationResponse;
const response: GetNotificationResponse = {notificationList: DummyNotificationList}
return response
};

const checkNotification = async (
  args: CheckNotificationArgs
): Promise<CheckNotificationResponse> => {
  const response = await httpClient.post({
    url: apiPaths.notification.checkNotification,
    data: args,
  });
  return response.data as CheckNotificationResponse;
};

export const notificationServices = {
  getNotificationList,
  checkNotification
};
