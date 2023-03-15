export interface Notification{
    id: number,
    title: string,
    description: string,
    isChecked: boolean,
}

export interface GetNotificationArgs{
    userId: number;
}

export interface GetNotificationResponse{
    notificationList: Notification[]
}
export interface CheckNotificationArgs{
    notificationId: number[]
}
export interface CheckNotificationResponse{
}
