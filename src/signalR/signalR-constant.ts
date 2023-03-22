export enum SignalRMethod{
    receiveNotification = 'ReceiveMessage',
    sendNotification = 'SendMessage',
    receiveNotificationByPermission = 'ReceiveMessageByPermission',
    sendNotificationByPermission = 'SendMessageByPermission'
}

export enum SignalRState{
    connected = 'Connected'
}