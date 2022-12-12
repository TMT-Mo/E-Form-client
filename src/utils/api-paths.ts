
const apiHead = 'https://documentcapstone.azurewebsites.net/'

const apiPaths = {
    auth:{
        login: `${apiHead}api/Users/login`,
        extractToken: `${apiHead}`
    },
    template:{
        getTemplates: `${apiHead}api/Template/getTemplates`,
        searchTemplate: `${apiHead}api/Template?templateName_eq=test`,
        addNewTemplate: `${apiHead}api/Template/create`,
        test: ''
    },
    system:{
        getDepartmentList: `${apiHead}api/Department/getDepartments`,
        getUserListByDepartmentID: `${apiHead}api/Users/getUsers?departmentId_eq=`,
        getTemplateTypeList: `${apiHead}api/Category/getCategories`
    }
}

export default apiPaths