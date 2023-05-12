import { Divider } from "@mui/material";
import React, { Fragment, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import WebViewer from "@pdftron/webviewer";
import { useSelector } from "hooks";
import StatusTag from "components/StatusTag";
import { useTranslation } from "react-i18next";
import { helpers } from "utils";
import { StatusDocument } from "utils/constants";

const ViewHistoryDocument: React.FC = () => {
  const viewer = useRef(null);
  const { documentDetail } = useSelector((state) => state.document);
  const { userInfo } = useSelector((state) => state.auth);
  const {
    createdAt,
    createdBy,
    description,
    documentName,
    xfdfString,
    link,
    departmentNameHistory,
    typeName,
    version,
    status,
    reason,
    documentDescription
  } = documentDetail!;
  const {t, i18n} = useTranslation();
  // if using a class, equivalent of componentDidMount

  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer/lib",
        initialDoc: link!,
        disabledElements: ["downloadButton", 'languageButton'],
        isReadOnly: true,
      },
      viewer.current!
    ).then(async (instance) => {
      const { documentViewer, annotationManager } = instance.Core;
      instance.UI.setLanguage(i18n.language === 'vn' ? 'vi' : 'en');
      instance.UI.setHeaderItems(function (header) {
        header.push({
          type: "actionButton",
          img: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20"><path d="M19 9h-4V3H9v6H5l7 8zM4 19h16v2H4z"></path></svg>',
          onClick: async () =>
            await instance.UI.downloadPdf({
              filename: documentName.replace(/.docx|.doc/g, ""),
              xfdfString,
            }),
        });
      });
      documentViewer.addEventListener("documentLoaded", async () => {
        await documentViewer.getDocument().getDocumentCompletePromise();
        await annotationManager.importAnnotations(xfdfString);
        documentViewer.updateView();
        annotationManager.setAnnotationDisplayAuthorMap((userId) => {
          if (userId === userInfo?.userId!.toString()) {
            return userInfo?.userName!;
          } else if (userId !== "System") {
            return userId;
          }
          return "System";
        });
      });
    });
  }, [documentName, i18n.language, link, userInfo?.userId, userInfo?.userName, xfdfString]);
  return (
    <Fragment>
      <div className="bg-blue-config px-20 py-6 flex space-x-4 items-center">
        <Link to="/user">
          <ArrowBackIosIcon fontSize="small" className="fill-white" />
        </Link>
        <span className="text-white">{t("History Document")}</span>
      </div>
      <div className="flex flex-col-reverse md:flex-row">
        <div className="flex flex-col bg-dark-config min-h-screen px-10 pt-12 space-y-8 pb-8 md:w-80 md:pb-0">
          <div className="flex flex-col space-y-8 text-white">
            <div className="flex flex-col space-y-2">
              <h4 className="whitespace-nowrap">{t("File name")}:</h4>
              <span className="text-white text-base break-words w-60">
                {documentName}
              </span>
            </div>

            <div className="flex flex-col space-y-2">
              <h4 className="whitespace-nowrap">{t("Description")}:</h4>
              <span className="text-white text-base break-words w-60">
                {description}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <h4 className="whitespace-nowrap">{t("The purpose of use")}:</h4>
              <span className="text-white text-base break-words w-60">
                {documentDescription}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <h4 className="whitespace-nowrap">{t("Type")}:</h4>
              <span className="text-white text-base break-words w-60">
                {typeName}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <h4 className="whitespace-nowrap">{t("Department")}:</h4>
              <span className="text-white text-base break-words w-60">
                {departmentNameHistory}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <h4 className="whitespace-nowrap">{t("Created By")}:</h4>
              <span className="text-white text-base break-words w-60">
                {createdBy.userName}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <h4 className="whitespace-nowrap">{t("Created At")}:</h4>
              <span className="text-white text-base break-words w-60">
                {helpers.addHours(createdAt, 7)}
              </span>
            </div>
            <div className="flex items-center space-x-2 w-fit">
              <h4 className="whitespace-nowrap">{t("Status")}:</h4>
              <StatusTag status={status} type="document" />
            </div>
            {status === StatusDocument.REJECTED_DOCUMENT && (
              <div className="flex flex-col space-y-2">
                <h4>{t("Reason")}:</h4>
                <span className="text-white text-base break-words w-60">
                  {reason}
                </span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <h4 className="whitespace-nowrap">{t("Version")}:</h4>
              <span className="text-white text-base break-words w-60">
                {version!}
              </span>
            </div>
            <Divider className="bg-white" />
          </div>
        </div>
        <div className="webviewer w-full min-h-screen" ref={viewer}></div>
      </div>
    </Fragment>
  );
};

export default ViewHistoryDocument;
