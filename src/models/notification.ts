import { NotificationStatusArg } from "../utils/constants";

export interface NotificationStatus{
    success?: NotificationStatusArg.SUCCESS,
    error?: NotificationStatusArg.ERROR,
}