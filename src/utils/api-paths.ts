
const apiHead = 'https://documentcapstone.azurewebsites.net/'

const apiPaths = {
    auth:{
        login: `${apiHead}api/Users/login`,
        changePassword: `${apiHead}api/Users/changePassword`,
        extractToken: `${apiHead}`,
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
        getUserList: `${apiHead}api/Users/getUserList`,
        getSigner: `${apiHead}api/Users/getSigner`
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
        getNotificationList: `${apiHead}api/notification/getNotificationList`,
        checkNotification: `${apiHead}api/notification/checkNotification`,
    }
}

export default apiPaths