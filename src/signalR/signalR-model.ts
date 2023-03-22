interface NotificationResponse {
  id: number;
  title: string;
  description: string;
  isChecked: boolean;
  createdAt: string;
}

interface Notification {
  title?: string;
  description: string;
  isChecked: boolean;
}
export interface sendSignalNotificationArgs {
  userIds?: number[];
  notify: Notification;
  departmentIds?: number[];
}

export interface receiveSignalNotification {
  userIds: number[] | null;
  notify: NotificationResponse;
  departmentNames: string[] | null;
}
export interface sendSignalNotificationByPermissionArgs {
  notify: Notification;
  departmentIds?: number[];
}

export interface receiveSignalNotificationByPermission {
  userIds: number[] | null;
  notify: NotificationResponse;
  departmentNames: string[] | null;
}
