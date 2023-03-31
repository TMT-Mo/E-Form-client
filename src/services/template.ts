import {
  AddNewTemplateArgs,
  AddNewTemplateResponse,
  GetTemplateArgs,
  EnableTemplateArgs,
  EnableTemplateResponse,
  ApproveTemplateArgs,
  ApproveTemplateResponse,
} from "models/template";
import { TemplateListResponse } from "models/template";
import { apiPaths, httpClient } from "utils";

const getTemplates = async (
  args: GetTemplateArgs
): Promise<TemplateListResponse> => {
  const response = await httpClient.get({
    url: apiPaths.template.getTemplates,
    params: args,
  });
  return response.data as TemplateListResponse;
};

const addNewTemplate = async (
  data: AddNewTemplateArgs
): Promise<AddNewTemplateResponse> => {
  const response = await httpClient.post({
    url: apiPaths.template.addNewTemplate,
    data,
  });
  return response.data as AddNewTemplateResponse;
};

const enableTemplate = async (
  data: EnableTemplateArgs
): Promise<EnableTemplateResponse> => {
  const response = await httpClient.patch({
    url: apiPaths.template.enableTemplate,
    data,
  });
  return response.data as EnableTemplateResponse;
};

const approveTemplate = async (
  data: ApproveTemplateArgs
): Promise<ApproveTemplateResponse> => {
  const response = await httpClient.post({
    url: apiPaths.template.approveTemplate,
    data,
  });
  return response.data as ApproveTemplateResponse;
};

export const templateServices = {
  getTemplates,
  addNewTemplate,
  enableTemplate,
  approveTemplate,
};
