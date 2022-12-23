export const TOKEN_NAME = "token";

export enum NotificationStatus {
  SUCCESS = "success",
  ERROR = "error",
}

export enum ResponseStatus {
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

export enum Roles {}
// STUDENT = "Sinh Viên"

export enum LocationIndex {
  SYSTEM = 0,
  ACCOUNT = 1,
  NEW_TEMPLATE = 2,
  TEMPLATE = 3,
  TEMPLATE_HISTORY = 4,
  AWAIT_SIGNING = 5,
  PERSONAL = 6,
  SHARED = 7,
  DOCUMENT_HISTORY = 8,
  CHANGE_PASSWORD = 9,
}

export enum ViewerLocationIndex {
  ADD_TEMPLATE = 0,
  APPROVING_TEMPLATE = 1,
  CREATE_DOCUMENT = 2,
  CREATE_PERSONAL_DOCUMENT = 3,
  APPROVING_DOCUMENT = 4,
  VIEW_DOCUMENT = 5,
  VIEW_DOCUMENT_HISTORY = 6,
  VIEW_TEMPLATE_HISTORY = 7
}

export enum TypeFile {
  DOC = ".doc",
  DOCX = ".docx",
  PDF = ".pdf",
}

export enum StatusTemplate{
  NEW = 1,
  APPROVED = 2,
  REJECTED = 3,
}

export enum StatusTemplateTag{
  NEW_TAG = 'New',
  APPROVED_TAG = 'Approved',
  REJECTED_TAG = 'Rejected',
}

export enum DataTableHeader{
  TYPE = 'type',
  STATUS = 'status',
  IS_ENABLE = 'isEnable',
  TYPE_TEMPLATE = 'typeName',
  DEPARTMENT = 'departmentName',
  TEMPLATE_NAME = 'templateName',
  DESCRIPTION = 'description',
  ACTION = 'action',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updateAt',
  CREATED_BY = 'createdBy',
}

export enum Permissions{
  VIEW_TEMPLATE_HISTORY = 1,
  ADD_TEMPLATE = 2,
  VIEW_TEMPLATE_MANAGEMENT = 3,
  ENABLE_TEMPLATE = 4,
  CREATE_DOCUMENT = 5,
  CREATE_PERSONAL_DOCUMENT = 6,
  VIEW_NEW_TEMPLATE = 7,
  APPROVE_TEMPLATE = 8,
  VIEW_AWAIT_SIGNING_DOCUMENT = 9,
  APPROVE_DOCUMENT = 10,
  VIEW_PERSONAL_DOCUMENT = 11,
  LOCK_DOCUMENT = 12,
  GROUP_VIEWER = 13,
  VIEW_SHARED_DOCUMENT = 14,
  VIEW_DOCUMENT_HISTORY = 15
}

export enum PermissionTag{
  VIEW_TEMPLATE_HISTORY_TAG = 'View Template History',
  ADD_TEMPLATE_TAG = 'Add New Template',
  VIEW_TEMPLATE_MANAGEMENT_TAG = 'View Template Management',
  ENABLE_TEMPLATE_TAG = 'Enable Template',
  CREATE_DOCUMENT_TAG = 'Create Document',
  CREATE_PERSONAL_DOCUMENT_TAG = 'Create Personal Document',
  VIEW_NEW_TEMPLATE_TAG = 'View New Template',
  APPROVE_TEMPLATE_TAG = 'Approve Template',
  VIEW_AWAIT_SIGNING_DOCUMENT_TAG = 'View Await Signing Document',
  APPROVE_DOCUMENT_TAG = 'Approve Document',
  VIEW_PERSONAL_DOCUMENT_TAG = 'View Personal Document',
  LOCK_DOCUMENT_TAG = 'Lock Document',
  GROUP_VIEWER_TAG = 'Group Viewer',
  VIEW_SHARED_DOCUMENT_TAG = 'View Shared Document',
  VIEW_DOCUMENT_HISTORY_TAG = 'View Document History'
}


