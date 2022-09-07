export interface QuestionResponse {
  _id: string;
  question: string;
  status_question: string | undefined;
  type_name: string;
  username_questioner: string;
  members_star: string;
  createdAt: string;
  approvedAt: string;
  responsedAt: string;
  id_question: number;
  __v: number | undefined;
  username_approver: string;
  answer: string;
  username_respondent: string;
}
