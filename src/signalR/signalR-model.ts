
interface NotificationResponse {
    id: number,
    title: string,
    description: string,
    isChecked: boolean,
    createdAt: string,
}

interface Notification{
    title?: string,
    description: string,
    isChecked: boolean
}
export interface sendSignalNotificationArgs{
    userIds?: number[],
    notify: Notification,
    departmentId?: number[]
}

export interface receiveSignalNotification{
    userIds: number[],
    notify: NotificationResponse,
}