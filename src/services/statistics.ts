import {
  GetStatisticsDocumentOfDepartmentResponse,
  GetStatisticsDocumentOfUserResponse,
  GetStatisticsIncomingDocumentResponse,
  GetStatisticsTemplateOfDepartmentResponse,
} from "models/statistics";
import { apiPaths, httpClient } from "utils";

const getStatisticsDocumentOfDepartment =
  async (): Promise<GetStatisticsDocumentOfDepartmentResponse> => {
    const response = await httpClient.get({
      url: apiPaths.statistics.getStatisticsDocumentOfDepartment,
    });
    return response.data as GetStatisticsDocumentOfDepartmentResponse;
  };
const getStatisticsTemplateOfDepartment =
  async (): Promise<GetStatisticsTemplateOfDepartmentResponse> => {
    const response = await httpClient.get({
      url: apiPaths.statistics.getStatisticsTemplateOfDepartment,
    });
    return response.data as GetStatisticsTemplateOfDepartmentResponse;
  };
const getStatisticsDocumentOfUser =
  async (): Promise<GetStatisticsDocumentOfUserResponse> => {
    const response = await httpClient.get({
      url: apiPaths.statistics.getStatisticsDocumentOfUser,
    });
    return response.data as GetStatisticsDocumentOfUserResponse;
  };
const getStatisticsIncomingDocument =
  async (): Promise<GetStatisticsIncomingDocumentResponse> => {
    const response = await httpClient.get({
      url: apiPaths.statistics.getStatisticsIncomingDocument,
    });
    return response.data as GetStatisticsIncomingDocumentResponse;
  };

export const statisticsServices = {
  getStatisticsDocumentOfDepartment,
  getStatisticsDocumentOfUser,
  getStatisticsIncomingDocument,
  getStatisticsTemplateOfDepartment,
};
