
const apiHead = 'https://documentcapstone.azurewebsites.net/'

const apiPaths = {
    auth:{
        login: `${apiHead}api/Users/login`,
        changePassword: `${apiHead}api/Users/updateUser`,
        getSignature: `${apiHead}api/Users/getSignature`,
    },
    template:{
        getTemplates: `${apiHead}api/Template/getTemplates`,
        searchTemplate: `${apiHead}api/Template/getTemplates?templateName_eq=test`,
        addNewTemplate: `${apiHead}api/Template/create`,
        enableTemplate: `${apiHead}api/Template/update`,
        approveTemplate: `${apiHead}api/Template/approveTemplate`,
    },
    system:{
        getDepartmentList: `${apiHead}api/Department/getDepartments`,
        getTemplateTypeList: `${apiHead}api/Category/getCategories`,
        getUserList: `${apiHead}api/Users/getUser`,
        getSigner: `${apiHead}api/Users/getSigner`,
        createAccount: `${apiHead}api/Users/createUser`,
        editAccount: `${apiHead}api/Users/updateUser`,
        getPermissionList: `${apiHead}api/System/getPermissionList`,
        getRoleList: `${apiHead}api/Role/getRoles`,
        editDepartment: `${apiHead}api/Department/updateDepartment`,
        editRole: `${apiHead}api/Role/updateRole`,
        createDepartment: `${apiHead}api/Department/createDepartment`,
        createRole: `${apiHead}api/Role/createRole`,
    },
    document:{
        createDocument: `${apiHead}api/Document/create`,
        getDocuments: `${apiHead}api/Document/getDocuments`,
        approveDocument: `${apiHead}api/Document/approveDocument`,
        getDocumentHistory: `${apiHead}api/Document/getDocumentHistory`,
        lockDocument : `${apiHead}api/Document/update`,
        changeSigner : `${apiHead}api/Document/changeSigner`,
        shareDepartments: `${apiHead}api/Document/shareDocument`,
        shareUsers: `${apiHead}api/Document/shareDocument`,
        getSharedDepartments: `${apiHead}api/Document/getDepartmentsByshareDocument`,
        getShareUsers: `${apiHead}api/Document/getUsersByshareDocument`,
    },
    notification:{
        getNotificationList: `${apiHead}api/Users/getNotificationByUser`,
        checkNotification: `${apiHead}api/Users/checkNotificationByUser`,
    },
    signalR:{
        hubURL: `${apiHead}hubs/notifications`,
    },
    statistics:{
        getStatisticsDocument: `${apiHead}api/Statistics/getStatisticsDocument`,
        getStatisticsTemplate: `${apiHead}api/Statistics/getStatisticsTemplate`,
        getStatisticsDocumentOfUser: `${apiHead}api/Statistics/getStatisticsDocumentOfUser`,
        getStatisticsIncomingDocument: `${apiHead}api/Statistics/getStatisticsIncomingDocument`,
    }
}

export default apiPaths