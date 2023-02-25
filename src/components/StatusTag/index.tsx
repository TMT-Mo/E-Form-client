import React from "react";
import { useTranslation } from "react-i18next";
import {
  StatusDocument,
  StatusTemplate,
  StatusTemplateTag,
  StatusDocumentTag,
} from "../../utils/constants";

const { APPROVED_TEMPLATE, NEW_TEMPLATE } = StatusTemplate;
const { APPROVED_TEMPLATE_TAG, NEW_TEMPLATE_TAG, REJECTED_TEMPLATE_TAG } =
  StatusTemplateTag;

const {
  APPROVED_DOCUMENT,
  NOT_YET_DOCUMENT,
  PROCESSING_DOCUMENT,
} = StatusDocument;

const {
  APPROVED_DOCUMENT_TAG,
  NOT_YET_DOCUMENT_TAG,
  PROCESSING_DOCUMENT_TAG,
  REJECTED_DOCUMENT_TAG,
} = StatusDocumentTag;

interface Props {
  status: StatusDocument | StatusTemplate;
  type: "document" | "template";
}

const StatusTag = (props: Props) => {
  const { status, type } = props;
  const {t} = useTranslation()
  const createTemplateStatus = () => {
    if (status === APPROVED_TEMPLATE) {
      return (
        <span className="w-full max-w-fit px-3 py-1 rounded-md bg-green-100 text-green-600 text-xs border-green-400 border border-solid">
          {t(APPROVED_TEMPLATE_TAG)}
        </span>
      );
    } else if (status === NEW_TEMPLATE) {
      return (
        <span className="w-full max-w-fit px-3 py-1 rounded-md bg-blue-100 text-blue-600 text-xs border-blue-400 border border-solid">
          {t(NEW_TEMPLATE_TAG)}
        </span>
      );
    } else {
      return (
        <span className="w-full max-w-fit px-3 py-1 rounded-md bg-red-100 text-red-600 text-xs border-red-400 border border-solid">
          {t(REJECTED_TEMPLATE_TAG)}
        </span>
      );
    }
  };

  const createDocumentStatus = () => {
    if (status === APPROVED_DOCUMENT) {
      return (
        <span className="w-full px-3 py-1 rounded-md bg-green-100 text-green-600 text-xs border-green-400 border border-solid">
          {t(APPROVED_DOCUMENT_TAG)}
        </span>
      );
    } else if (status === PROCESSING_DOCUMENT) {
      return (
        <span className="w-full px-3 py-1 rounded-md bg-blue-100 text-blue-600 text-xs border-blue-400 border border-solid">
          {t(PROCESSING_DOCUMENT_TAG)}
        </span>
      );
    } else if (status === NOT_YET_DOCUMENT) {
      return (
        <span className="w-full px-3 py-1 rounded-md bg-slate-100 text-slate-600 text-xs border-slate-400 border border-solid">
          {t(NOT_YET_DOCUMENT_TAG)}
        </span>
      );
    } else {
      return (
        <span className="w-full px-3 py-1 rounded-md bg-red-100 text-red-600 text-xs border-red-400 border border-solid">
          {t(REJECTED_DOCUMENT_TAG)}
        </span>
      );
    }
  };
  return <>{type === "document" ? createDocumentStatus() : createTemplateStatus()}</>;
};

export default StatusTag;
