import { AddNewTemplateArgs, AddNewTemplateResponse } from './../models/template';
import { TemplateListResponse } from "../models/template"
import { apiPaths, httpClient } from "../utils"

const getTemplates = async (): Promise<TemplateListResponse> => {
    const response = await httpClient.get({url: apiPaths.template.getTemplates})
    return response.data as TemplateListResponse
}

const addNewTemplate = async (data: AddNewTemplateArgs): Promise<AddNewTemplateResponse> => {
    const response = await httpClient.post({url: apiPaths.template.addNewTemplate, data})
    return response.data as AddNewTemplateResponse
}

export const templateServices = {
    getTemplates,
    addNewTemplate
}