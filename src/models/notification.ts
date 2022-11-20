import { NotificationStatus } from "../utils/constants";

export interface Notification {
  status?: NotificationStatus.SUCCESS | NotificationStatus.ERROR;
  message?: string;
  errorMessage?: string;
  duration?: number;
  isOpen: boolean;
}

export interface ValidationErrors {
  errorMessage: string;
}
