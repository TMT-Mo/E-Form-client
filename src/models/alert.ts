import { AlertStatus } from "../utils/constants";

export interface Alert {
  status?: AlertStatus.SUCCESS | AlertStatus.ERROR;
  message?: string;
  errorMessage?: string;
  duration?: number;
  isOpen: boolean;
}

export interface ValidationErrors {
  errorMessage: string;
}
