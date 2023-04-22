import {
  StatisticsDocument,
  StatisticsTemplate,
} from "models/statistics";
import { apiPaths, httpClient } from "utils";

const getStatisticsDocument =
  async (): Promise<StatisticsDocument[]> => {
    const response = await httpClient.get({
      url: apiPaths.statistics.getStatisticsDocument,
    });
    return response.data as StatisticsDocument[];
  };
const getStatisticsTemplate =
  async (): Promise<StatisticsTemplate[]> => {
    const response = await httpClient.get({
      url: apiPaths.statistics.getStatisticsTemplate,
    });
    return response.data as StatisticsTemplate[];
  };

export const statisticsServices = {
  getStatisticsDocument,
  getStatisticsTemplate,
};
