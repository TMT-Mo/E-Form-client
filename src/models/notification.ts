export interface Notification{
    id: number,
    title: string,
    description: string,
    isChecked: boolean,
    createdAt: string,
}

export interface GetNotificationArgs{
    userId: number;
}

export interface GetNotificationResponse{

}
export interface CheckNotificationArgs{
    notificationId: number[]
}
export interface CheckNotificationResponse{
}
