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
  UPDATED_AT = 'updatedAt',
  CREATED_BY = 'createdBy',
}
