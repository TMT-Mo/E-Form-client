export enum SignalRMethod{
    receiveNotification = 'ReceiveMessage',
    sendNotification = 'SendMessage',
    receiveNotificationByPermission = 'ReceiveMessageByPermission',
    sendNotificationByPermission = 'SendMessageByPermission',
    editSystem = 'EditSystem',
}

export enum SignalRState{
    connected = 'Connected'
}