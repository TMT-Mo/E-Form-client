export enum SessionStorage {
  LOCATION = "location",
  TOKEN_NAME = "token"
}
export enum AlertStatus {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info"
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
  ADD_ACCOUNT = 10,
  MY_ACCOUNT = 11,
  DASHBOARD = 12,
  ACTIVITIES = 13,
}

export enum ViewerLocationIndex {
  ADD_TEMPLATE_INDEX = 0,
  APPROVING_TEMPLATE_INDEX = 1,
  CREATE_DOCUMENT_INDEX = 2,
  CREATE_PERSONAL_DOCUMENT_INDEX = 3,
  APPROVING_DOCUMENT_INDEX = 4,
  VIEW_PERSONAL_DOCUMENT_INDEX = 5,
  VIEW_DOCUMENT_HISTORY_INDEX = 6,
  VIEW_TEMPLATE_HISTORY_INDEX = 7,
  VIEW_SHARED_DOCUMENT_INDEX = 8,
 
}

export enum TypeFile {
  DOC = ".doc",
  DOCX = ".docx",
  PDF = ".pdf",
}

export enum StatusTemplate {
  NEW_TEMPLATE = 1,
  APPROVED_TEMPLATE = 2,
  REJECTED_TEMPLATE = 3,
}

export enum StatusTemplateTag {
  NEW_TEMPLATE_TAG = "New",
  APPROVED_TEMPLATE_TAG = "Approved",
  REJECTED_TEMPLATE_TAG = "Rejected",
}

export enum StatusDocument {
  PROCESSING_DOCUMENT = 1,
  APPROVED_DOCUMENT = 2,
  REJECTED_DOCUMENT = 3,
  NOT_YET_DOCUMENT = 4,
}

export enum StatusDocumentTag {
  PROCESSING_DOCUMENT_TAG = "Processing",
  APPROVED_DOCUMENT_TAG = "Approved",
  REJECTED_DOCUMENT_TAG = "Rejected",
  NOT_YET_DOCUMENT_TAG = "Not Yet",
}

export enum DataTableHeader {
  TYPE = "type",
  STATUS = "status",
  IS_ENABLE = "isEnable",
  TYPE_TEMPLATE = "typeName",
  DEPARTMENT = "departmentName",
  DEPARTMENT_HISTORY = "departmentNameHistory",
  TEMPLATE_NAME = "templateName",
  DESCRIPTION = "description",
  ACTION = "action",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updateAt",
  CREATED_BY = "createdBy",
  DOCUMENT_NAME = "documentName",
  IS_LOCKED = "isLocked",
  TYPE_DOCUMENT = "typeName",
  ID_USER = 'id',
  USERNAME = 'userName',
  ROLE_NAME = 'roleName',
  VERSION = 'version'
}

export enum Permissions {
  // PROFILE_MANAGEMENT = 20,
  ANALYTICS_DASHBOARD_MANAGEMENT = 18,
  ANALYTICS_ACTIVITIES_MANAGEMENT = 19,
  VIEW_NEW_TEMPLATE = 7,
  VIEW_TEMPLATE_MANAGEMENT = 3,
  VIEW_TEMPLATE_HISTORY = 1,
  ADD_TEMPLATE = 2,
  ENABLE_TEMPLATE = 4,
  APPROVE_TEMPLATE = 8,
  VIEW_AWAIT_SIGNING_DOCUMENT = 9,
  VIEW_PERSONAL_DOCUMENT = 11,
  VIEW_SHARED_DOCUMENT = 14,
  SHARE_DOCUMENT = 20,
  VIEW_DOCUMENT_HISTORY = 15,
  CREATE_DOCUMENT = 5,
  APPROVE_DOCUMENT = 10,
  LOCK_DOCUMENT = 12,
  GROUP_VIEWER = 13,
  // ACCOUNT_MANAGEMENT = 16,
  SYSTEM_MANAGEMENT = 17,
  VIEW_ACCOUNT_LIST = 21,
  VIEW_DOCUMENT_FILTER_STATISTICS = 22,
  VIEW_DOCUMENT_STATISTICS = 23,
}

export enum PermissionTag {
  VIEW_TEMPLATE_HISTORY_TAG = "VIEW_TEMPLATE_HISTORY",
  ADD_TEMPLATE_TAG = "Add New Template",
  VIEW_TEMPLATE_MANAGEMENT_TAG = "View Template Management",
  ENABLE_TEMPLATE_TAG = "Enable Template",
  CREATE_DOCUMENT_TAG = "Create Document",
  // CREATE_PERSONAL_DOCUMENT_TAG = "Create Personal Document",
  VIEW_NEW_TEMPLATE_TAG = "View New Template",
  APPROVE_TEMPLATE_TAG = "Approve Template",
  VIEW_AWAIT_SIGNING_DOCUMENT_TAG = "View Await Signing Document",
  APPROVE_DOCUMENT_TAG = "Approve Document",
  VIEW_PERSONAL_DOCUMENT_TAG = "View Personal Document",
  LOCK_DOCUMENT_TAG = "Lock Document",
  GROUP_VIEWER_TAG = "Group Viewer",
  VIEW_SHARED_DOCUMENT_TAG = "View Shared Document",
  VIEW_DOCUMENT_HISTORY_TAG = "View Document History",
  SYSTEM_MANAGEMENT_TAG = "System Management",
  ANALYTICS_DASHBOARD_MANAGEMENT_TAG = 'Analytics Dashboard Management',
  ANALYTICS_ACTIVITIES_MANAGEMENT_TAG = 'Analytics Activities Management',
  SHARE_DOCUMENT_TAG = 'Share Document'
}

export enum DeviceType {
  MOBILE = 1,
  IPAD = 2,
  LAPTOP = 3,
}

export enum DeviceWidth {
  MOBILE_WIDTH = 380,
  IPAD_WIDTH = 768,
  LAPTOP_WIDTH = 1440,
}

export enum ShareTabIndex{
  DEPARTMENT = 0,
  USER = 1
}

export enum AccountStatus{
  ENABLE = 1,
  DISABLE = 2
}
export enum AccountStatusTag{
  ENABLE = 'Enable',
  DISABLE = 'Disable'
}

export enum DefaultValue{
  PASSWORD = 'P@ssw0rd'
} 