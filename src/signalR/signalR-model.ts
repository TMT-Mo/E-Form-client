interface Notification{
    title: string,
    description: string
}

export interface sendSignalRArgs{
    userId: number[],
    notification: Notification,
    departmentId: number[]
}