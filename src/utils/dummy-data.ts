import { UserInfo } from "../models/auth";
import { Notification } from "../models/notification";

export interface User {
  username: string;
  id: number;
  status: number;
  departmentName: string;
  roleName: string;
}

export const DummyUserList: User[] = [
  {
    username: "tu@gmail.com",
    id: 1,
    departmentName: 'IT',
    roleName: 'Admin',
    status: 1
  },
  {
    username: "triet@gmail.com",
    id: 2,
    departmentName: 'IT',
    roleName: 'Admin',
    status: 1
  },
  {
    username: "thai@gmail.com",
    id: 3,
    departmentName: 'IT',
    roleName: 'Admin',
    status: 1
  },
  {
    username: "trung@gmail.com",
    id: 4,
    departmentName: 'IT',
    roleName: 'Admin',
    status: 1
  },
  {
    username: "dat@gmail.com",
    id: 5,
    departmentName: 'IT',
    roleName: 'Admin',
    status: 1
  },
  {
    username: "duc@gmail.com",
    id: 6,
    departmentName: 'IT',
    roleName: 'Admin',
    status: 1
  },
  {
    username: "diemanh@gmail.com",
    id: 7,
    departmentName: 'IT',
    roleName: 'Admin',
    status: 1
  },
  {
    username: "admin@gmail.com",
    id: 8,
    departmentName: 'IT',
    roleName: 'Admin',
    status: 1
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
