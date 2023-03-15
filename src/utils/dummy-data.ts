import { Notification } from "../models/notification";

interface User {
  username: string;
  id: number;
}

export const DummyUserList: User[] = [
  {
    username: "tu@gmail.com",
    id: 1,
  },
  {
    username: "triet@gmail.com",
    id: 2,
  },
  {
    username: "thai@gmail.com",
    id: 3,
  },
  {
    username: "trung@gmail.com",
    id: 4,
  },
  {
    username: "dat@gmail.com",
    id: 5,
  },
  {
    username: "duc@gmail.com",
    id: 6,
  },
  {
    username: "diemanh@gmail.com",
    id: 7,
  },
  {
    username: "admin@gmail.com",
    id: 8,
  },
];

export const DummyNotificationList: Notification[] = [
  {
    title: "Noti 1",
    description: "Some stupid descriptions you have ever seen :( .",
    id: 1,
    isChecked: false
  },
  {
    title: "Noti 2",
    description: "Some stupid descriptions you have ever seen :( .",
    id: 2,
    isChecked: false
  },
  {
    title: "Noti 3",
    description: "Some stupid descriptions you have ever seen :( .",
    id: 3,
    isChecked: true
  },
  {
    title: "Noti 4",
    description: "Some stupid descriptions you have ever seen :( .",
    id: 4,
    isChecked: true
  },
];
