import {
  StatisticsDocument,
  StatisticsTemplate,
  GetStatisticsDocument,
  GetStatisticsTemplate,
} from "models/statistics";
import { apiPaths, httpClient } from "utils";

const getStatisticsDocument =
  async (args: GetStatisticsDocument): Promise<StatisticsDocument> => {
    const response = await httpClient.post({
      url: apiPaths.statistics.getStatisticsDocument,
      data: args
    });
    return response.data as StatisticsDocument;
  };
const getStatisticsTemplate =
  async (args: GetStatisticsTemplate): Promise<StatisticsTemplate> => {
    const response = await httpClient.post({
      url: apiPaths.statistics.getStatisticsTemplate,
      data: args
    });
    return response.data as StatisticsTemplate;
  };
const getStatisticsDocumentList =
  async (args: GetStatisticsDocument): Promise<StatisticsDocument[]> => {
    const response = await httpClient.post({
      url: apiPaths.statistics.getStatisticsDocument,
      data: args
    });
    return response.data as StatisticsDocument[];
  };
const getStatisticsTemplateList =
  async (args: GetStatisticsTemplate): Promise<StatisticsTemplate[]> => {
    const response = await httpClient.post({
      url: apiPaths.statistics.getStatisticsTemplate,
      data: args
    });
    return response.data as StatisticsTemplate[];
  };

export const statisticsServices = {
  getStatisticsDocument,
  getStatisticsTemplate,
  getStatisticsDocumentList,
  getStatisticsTemplateList
};
