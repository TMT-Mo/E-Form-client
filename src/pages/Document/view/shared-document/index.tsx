import {
    Divider,
    Box,
    LinearProgress,
    Typography,
  } from "@mui/material";
  import React, { Fragment, useEffect, useRef } from "react";
  import { Link } from "react-router-dom";
  import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
  import WebViewer, { Core } from "@pdftron/webviewer";
  import AlertPopup from "components/AlertPopup";
  import { useSelector } from "hooks";
  import { useTranslation } from "react-i18next";
  import { helpers } from "utils";
import StatusTag from "components/StatusTag";
  
  const ViewShareDocument: React.FC = () => {
    const {t, i18n} = useTranslation();
    const viewer = useRef(null);
    const { documentDetail } = useSelector(
      (state) => state.document
    );
    const { userInfo, signature, isGetSignatureLoading } = useSelector(
      (state) => state.auth
    );
    const {
      createdAt,
      createdBy,
      description,
      documentName,
      xfdfString,
      link,
      departmentName,
      typeName,
      signatoryList,
    } = documentDetail!;
    // if using a class, equivalent of componentDidMount
  
    const signers = signatoryList!.map((signer, index) => (
      <div
        className="flex flex-col space-y-3 rounded-md border border-solid border-white p-4"
        key={index}
      >
        <div className="flex space-x-2 items-center ">
          <h4>{t("Signer")}:</h4>
          <span className="text-white text-base break-words">
            {signer.userName}
          </span>
        </div>
        <div className="flex space-x-2">
          <h4>Department:</h4>
          <span className="text-white text-base break-words">{signer.departmentName}</span>
        </div>
        <div className="flex space-x-2 items-center">
          <h4>{t("Role")}:</h4>
          <span className="text-white text-base break-words">
            {signer.roleName}
          </span>
        </div>
        <div className="flex space-x-2 items-center">
        <h4>{t("Status")}:</h4>
        <Typography className="text-white">
          <StatusTag status={signer.status} type="document" />
        </Typography>
      </div>
      </div>
    ));
  
    useEffect(() => {
        WebViewer(
          {
            path: "/webviewer/lib",
            initialDoc: link!,
            disabledElements: [
              "toolbarGroup-Insert",
              "toolbarGroup-Forms",
              "downloadButton",
              'languageButton'
            ],
            annotationUser: userInfo?.userId!.toString(),
            isReadOnly: true,
          },
          viewer.current!
        ).then(async (inst) => {
          const { documentViewer, annotationManager } = inst.Core;
          inst.UI.setLanguage(i18n.language === 'vn' ? 'vi' : 'en');
          const signatureTool = documentViewer.getTool(
            "AnnotationCreateSignature"
          ) as Core.Tools.SignatureCreateTool;
          inst.UI.enableFeatures([inst.UI.Feature.Initials]);
  
          documentViewer.addEventListener("documentLoaded", async () => {
            await documentViewer.getDocument().getDocumentCompletePromise();
            signatureTool.importSignatures([signature!]);
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
    }, [documentName, i18n.language, link, signature, userInfo?.userId, userInfo?.userName, xfdfString]);
    return (
      <Fragment>
        <div className="bg-blue-config px-20 py-6 flex space-x-4 items-center">
          <Link to="/user">
            <ArrowBackIosIcon fontSize="small" className="fill-white" />
          </Link>
          <span className="text-white">{t("Shared Document")}</span>
        </div>
        {isGetSignatureLoading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        <div className="flex flex-col-reverse md:flex-row">
          <div className="flex flex-col bg-dark-config min-h-screen px-10 pt-12 space-y-8 pb-8 md:w-80">
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
              <div className="flex items-center space-x-1">
                <h4 className="whitespace-nowrap">{t("Type")}:</h4>
                <span className="text-white text-base break-words w-60">
                  {t(typeName)}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <h4 className="whitespace-nowrap">{t("Department")}:</h4>
                <span className="text-white text-base break-words w-60">
                  {t(departmentName)}
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
              <Divider className="bg-white" />
              <div className="flex justify-center">
                <h4 className="whitespace-nowrap">{t("Signer List")}:</h4>
              </div>
              {signers}
            </div>
          </div>
          <div className="webviewer w-full min-h-screen" ref={viewer}></div>
        </div>
        <AlertPopup
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={3000}
        />
      </Fragment>
    );
  };
  
  export default ViewShareDocument;
  