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
    userId: number[],
    isChecked: true
}
export interface CheckNotificationResponse{
}
