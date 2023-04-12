import {
  GetStatisticsDocumentResponse,
  GetStatisticsDocumentOfUserResponse,
  GetStatisticsIncomingDocumentResponse,
  GetStatisticsTemplateResponse,
} from "models/statistics";
import { apiPaths, httpClient } from "utils";

const getStatisticsDocument =
  async (): Promise<GetStatisticsDocumentResponse[]> => {
    const response = await httpClient.get({
      url: apiPaths.statistics.getStatisticsDocument,
    });
    return response.data as GetStatisticsDocumentResponse[];
  };
const getStatisticsTemplate =
  async (): Promise<GetStatisticsTemplateResponse[]> => {
    const response = await httpClient.get({
      url: apiPaths.statistics.getStatisticsTemplate,
    });
    return response.data as GetStatisticsTemplateResponse[];
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
  getStatisticsDocument,
  getStatisticsDocumentOfUser,
  getStatisticsIncomingDocument,
  getStatisticsTemplate,
};
