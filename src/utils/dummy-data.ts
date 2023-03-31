import { UserInfo } from "models/auth";
import { Notification } from "models/notification";
import { Permission, Role } from "models/system";

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
    isChecked: false,
    createdAt: 'abc'
  },
  {
    title: "Noti 2",
    description: "Some stupid descriptions you have ever seen :( .",
    id: 2,
    isChecked: false,
    createdAt: 'abc'
  },
  {
    title: "Noti 3",
    description: "Some stupid descriptions you have ever seen :( .",
    id: 3,
    isChecked: true,
    createdAt: 'abc'
  },
  {
    title: "Noti 4",
    description: "Some stupid descriptions you have ever seen :( .",
    id: 4,
    isChecked: true,
    createdAt: 'abc'
  },
];

// VIEW_TEMPLATE_HISTORY = 1,
// ADD_TEMPLATE = 2,
// VIEW_TEMPLATE_MANAGEMENT = 3,
// ENABLE_TEMPLATE = 4,
// CREATE_DOCUMENT = 5,
// CREATE_PERSONAL_DOCUMENT = 6,
// VIEW_NEW_TEMPLATE = 7,
// APPROVE_TEMPLATE = 8,
// VIEW_AWAIT_SIGNING_DOCUMENT = 9,
// APPROVE_DOCUMENT = 10,
// VIEW_PERSONAL_DOCUMENT = 11,
// LOCK_DOCUMENT = 12,
// GROUP_VIEWER = 13,
// VIEW_SHARED_DOCUMENT = 14,
// VIEW_DOCUMENT_HISTORY = 15,

export const DummyPermissions: Permission[] = [
  {
    id: 1,
    permissionName: 'VIEW_TEMPLATE_HISTORY'
  },
  {
    id: 2,
    permissionName: 'ADD_TEMPLATE'
  },
  {
    id: 3,
    permissionName: 'VIEW_TEMPLATE_MANAGEMENT'
  },
  {
    id: 4,
    permissionName: 'ENABLE_TEMPLATE'
  },
  {
    id: 5,
    permissionName: 'CREATE_DOCUMENT'
  },
  {
    id: 6,
    permissionName: 'CREATE_PERSONAL_DOCUMENT'
  },
  {
    id: 7,
    permissionName: 'VIEW_NEW_TEMPLATE'
  },
  {
    id: 8,
    permissionName: 'APPROVE_TEMPLATE'
  },
  {
    id: 9,
    permissionName: 'VIEW_AWAIT_SIGNING_DOCUMENT'
  },
  {
    id: 10,
    permissionName: 'APPROVE_DOCUMENT'
  },
  {
    id: 11,
    permissionName: 'VIEW_PERSONAL_DOCUMENT'
  },
  {
    id: 12,
    permissionName: 'LOCK_DOCUMENT'
  },
  {
    id: 13,
    permissionName: 'GROUP_VIEWER'
  },
  {
    id: 14,
    permissionName: 'VIEW_SHARED_DOCUMENT'
  },
  {
    id: 15,
    permissionName: 'VIEW_DOCUMENT_HISTORY'
  },
  {
    id: 15,
    permissionName: 'ACCOUNT_MANAGEMENT'
  },
  {
    id: 15,
    permissionName: 'SYSTEM_MANAGEMENT'
  },
]

export const FixedDummyPermissions: Permission[] = [
  {
    id: 3,
    permissionName: 'VIEW_TEMPLATE_MANAGEMENT'
  },
  {
    id: 5,
    permissionName: 'CREATE_DOCUMENT'
  },
  {
    id: 11,
    permissionName: 'VIEW_PERSONAL_DOCUMENT'
  },
  {
    id: 14,
    permissionName: 'VIEW_SHARED_DOCUMENT'
  },
]

export const DummyRoles: Role[] = [
  {
    id: 1,
    roleName: 'Admin'
  },
  {
    id: 2,
    roleName: 'Employee'
  },
  {
    id: 3,
    roleName: 'Head Office'
  },
  {
    id: 4,
    roleName: 'Assistant'
  },
]