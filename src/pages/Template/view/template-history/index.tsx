import { Divider } from "@mui/material";
import React, { Fragment, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import WebViewer from "@pdftron/webviewer";
import AlertPopup from "../../../../components/AlertPopup";
import { useSelector } from "../../../../hooks";
import StatusTag from "../../../../components/StatusTag";
import { useTranslation } from "react-i18next";
import { helpers } from "../../../../utils";
// const { APPROVED, NEW } = StatusTemplate;
// const { APPROVED_TAG, REJECTED_TAG, NEW_TAG } = StatusTemplateTag;

const ViewTemplateHistory: React.FC = () => {
  const viewer = useRef(null);
  const { templateDetail } = useSelector((state) => state.template);
  const {
    createdAt,
    createdBy,
    departmentName,
    description,
    templateName,
    typeName,
    signatoryList,
    link,
    status,
    reason,
  } = templateDetail!;
  const { t } = useTranslation();
  const signers = signatoryList.map((signer, index) => (
    <div
      className="flex flex-col space-y-3 rounded-md border border-solid border-white p-4"
      key={index}
    >
      <div className="flex space-x-2 items-center ">
        <h4>{t("Signer")}:</h4>
        <span className="text-white text-base break-words">
          {signer.username}
        </span>
      </div>
      <div className="flex space-x-2 items-center">
        <h4>{t("Department")}:</h4>
        <span className="text-white text-base break-words">{t(signer.departmentName)}</span>
      </div>
      <div className="flex space-x-2 items-center">
        <h4>{t("Role")}:</h4>
        <span className="text-white text-base break-words">
          {t(signer.roleName)}
        </span>
      </div>
    </div>
  ));

  // if using a class, equivalent of componentDidMount

  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer/lib",
        initialDoc: link!,
        disabledElements: [
          'downloadButton'
        ],
        filename: templateName,
      },
      viewer.current!
    ).then(async (instance) => {
      const { documentViewer } = instance.Core;
      const annotManager = documentViewer.getAnnotationManager();
      annotManager.enableReadOnlyMode();

      instance.UI.setHeaderItems(function (header) {
        header.push({
          type: "actionButton",
          img: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20"><path d="M19 9h-4V3H9v6H5l7 8zM4 19h16v2H4z"></path></svg>',
          onClick: async () =>
            await instance.UI.downloadPdf({
              filename: templateName.replace(/.docx|.doc/g, ""),
            }),
        });
      });
      documentViewer.addEventListener("documentLoaded", async () => {
        await documentViewer.getDocument().getDocumentCompletePromise();
        documentViewer.updateView();
      });
    });
  }, [link, templateName]);

  return (
    <Fragment>
      <div className="bg-blue-config px-20 py-6 flex space-x-4 items-center">
        <Link to="/user">
          <ArrowBackIosIcon fontSize="small" className="fill-white" />
        </Link>
        <span className="text-white">{t("View Template History")}</span>
      </div>
      <div className="flex flex-col-reverse  md:flex-row">
        <div className="flex flex-col bg-dark-config min-h-screen px-10 pt-12 pb-8 space-y-8 md:w-80 md:pb-0">
          <div className="flex flex-col space-y-8 text-white">
            <div className="flex flex-col space-y-2">
              <h4 className="whitespace-nowrap">{t("File name")}:</h4>
              <span className="text-white text-base break-words w-60">
                {templateName}
              </span>
            </div>

            <div className="flex flex-col space-y-2">
              <h4 className="whitespace-nowrap">{t("Description")}:</h4>
              <span className="text-white text-base break-words w-60">
                {description}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <h4 className="whitespace-nowrap">{t("Type")}:</h4>
              <span className="text-white text-base break-words w-60">
                {typeName}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <h4 className="whitespace-nowrap">{t("Department")}:</h4>
              <span className="text-white text-base break-words w-60">
                {departmentName}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <h4 className="whitespace-nowrap">{t("Created By")}:</h4>
              <span className="text-white text-base break-words w-60">
                {createdBy.username}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <h4 className="whitespace-nowrap ">{t("Created At")}:</h4>
              <span className="text-white text-base break-words w-60">
                {helpers.addHours(createdAt, 7)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <h4 className="whitespace-nowrap">{t("Status")}:</h4>
              <span className="text-white text-base break-words w-60">
                <StatusTag status={status} type="template" />
              </span>
            </div>
            {reason && (
              <div className="flex flex-col space-y-2">
                <h4 className="whitespace-nowrap">{t("Reason")}:</h4>
                <span className="text-white text-base break-words w-60">
                  {reason}
                </span>
              </div>
            )}
            <Divider className="bg-white" />
            <div className="flex justify-center">
              <h4 className="whitespace-nowrap">{t("Signer List")}:</h4>
            </div>
            {signers}
          </div>
        </div>
        <div className="webviewer w-full h-screen" ref={viewer}></div>
      </div>
      <AlertPopup
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
      />
    </Fragment>
  );
};

export default ViewTemplateHistory;
