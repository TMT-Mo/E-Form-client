import { TemplateListResponse } from "../models/template"
import { apiPaths, httpClient } from "../utils"

const getTemplates = async (): Promise<TemplateListResponse> => {
    const response = await httpClient.get({url: apiPaths.employee.getTemplates})
    return response.data as TemplateListResponse
}

export const templateServices = {
    getTemplates
}