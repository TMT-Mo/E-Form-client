import { AddNewTemplateArgs, AddNewTemplateResponse, GetTemplateArgs } from './../models/template';
import { TemplateListResponse } from "../models/template"
import { apiPaths, httpClient } from "../utils"

const getTemplates = async (args: GetTemplateArgs): Promise<TemplateListResponse> => {
    const response = await httpClient.get({url: apiPaths.template.getTemplates, params: args })
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