import { httpClient } from "../utils/http-client";
import { QuestionResponse } from "../models/questions";
import { apiPaths } from "../utils/api-paths";

const getQuestionList = async (): Promise<QuestionResponse[]> => {
    const response = await httpClient.get({url:apiPaths.student.questionList})
    return response.data as QuestionResponse[]
}

export const questionServices = {
    getQuestionList
}