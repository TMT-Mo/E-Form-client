
import { StatisticsDocument } from "models/statistics";
import { Permission } from "models/system";

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
    id: 17,
    permissionName: 'SYSTEM_MANAGEMENT'
  },
  {
    id: 18,
    permissionName: 'ANALYTICS_DASHBOARD_MANAGEMENT'
  },
  {
    id: 19,
    permissionName: 'ANALYTICS_ACTIVITIES_MANAGEMENT'
  },
  {
    id: 20,
    permissionName: 'SHARE_DOCUMENT'
  },
  {
    id: 21,
    permissionName: 'VIEW_ACCOUNT_LIST'
  },
  {
    id: 22,
    permissionName: 'VIEW_DOCUMENT_STATISTICS'
  },
  {
    id: 23,
    permissionName: 'VIEW_DOCUMENT_OVERALL_STATISTICS'
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
  {
    id: 19,
    permissionName: 'ANALYTICS_ACTIVITIES_MANAGEMENT'
  },
  {
    id: 20,
    permissionName: 'SHARE_DOCUMENT'
  },
]

export const DummyStatistics: StatisticsDocument[] = [
  {
    total: 100,
    waiting: 30,
    approved: 35,
    rejected: 35,
    departmentId: 1,
    departmentName: 'IT'
  },
]
