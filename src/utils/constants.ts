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
