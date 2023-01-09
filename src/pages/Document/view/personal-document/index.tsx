import {
  Divider,
  Switch,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import WebViewer from "@pdftron/webviewer";
import { useSelector } from "../../../../hooks";
import StatusTag from "../../../../components/StatusTag";
import { useTranslation } from "react-i18next";
import { helpers } from "../../../../utils";

const ViewPersonalDocument: React.FC = () => {
  const viewer = useRef(null);
  const { documentDetail } = useSelector((state) => state.document);
  const { userInfo } = useSelector((state) => state.auth);
  const {
    createdAt,
    createdBy,
    description,
    documentName,
    xfdfString,
    signatoryList,
    link,
    departmentName,
    typeName
  } = documentDetail!;
  const [ t ] = useTranslation();
  const signers = signatoryList.map((signer) => (
    <div className="flex flex-col space-y-3 rounded-md border border-solid border-white p-4">
      <div className="flex space-x-2 items-center ">
        <h4>{t ("Signer")}:</h4>
        <Typography className="text-white">{signer.username}</Typography>
      </div>
      <div className="flex space-x-2 items-center">
        <h4>{t ("Role")}:</h4>
        <Typography className="text-white">{signer.roleName}</Typography>
      </div>
      <div className="flex space-x-2 items-center">
        <h4>{t ("Status")}:</h4>
        <Typography className="text-white"><StatusTag status={signer.status} type='document'/></Typography>
      </div>
      <div className="flex space-x-2 items-center">
        <h4>{t ("Date modified")}:</h4>
        <Typography className="text-white">{helpers.addHours(new Date(signer.updateAt)) ?? '---'}</Typography>
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
        isReadOnly: true
      },
      viewer.current!
    ).then(async (instance) => {
      const { documentViewer, annotationManager } = instance.Core;
      instance.UI.setHeaderItems(function (header) {
        header.push({
          type: "actionButton",
          img: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20"><path d="M19 9h-4V3H9v6H5l7 8zM4 19h16v2H4z"></path></svg>',
          onClick: async () =>
            await instance.UI.downloadPdf({
              filename: documentName.replace(/.docx|.doc/g, ""),
              xfdfString
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
          }
          else if(userId !== 'System'){
            return userId
          }
          return "System";
        });
      });
    });
  }, [documentName, link, userInfo?.userId, userInfo?.userName, xfdfString]);
  return (
    <Fragment>
      <div className="bg-blue-config px-20 py-6 flex space-x-4 items-center">
        <Link to="/user">
          <ArrowBackIosIcon fontSize="small" className="fill-white" />
        </Link>
        <span className="text-white">{t ("Personal Document")}</span>
      </div>
      <div className="flex flex-col-reverse md:flex-row">
        <div className="flex flex-col bg-dark-config min-h-screen px-10 pt-12 space-y-8 pb-8 md:w-80 md:pb-0">
          <div className="flex flex-col space-y-8 text-white">
            <div className="flex flex-col space-y-2">
              <h4>{t ("File name")}:</h4>
              <span className="text-white text-base break-words w-60">
                {documentName}
              </span>
            </div>

            <div className="flex flex-col space-y-2">
              <h4>{t ("Description")}:</h4>
              <span className="text-white text-base break-words w-60">
                {description}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <h4>{t ("Type")}:</h4>
              <span className="text-white text-base break-words w-60">
                {typeName}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <h4>{t ("Department")}:</h4>
              <span className="text-white text-base break-words w-60">
                {departmentName}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <h4>{t ("Created By")}:</h4>
              <span className="text-white text-base break-words w-60">
                {createdBy.username}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <h4>{t ("Created At")}:</h4>
              <span className="text-white text-base break-words w-60">
                {helpers.addHours(new Date(createdAt), 7)}
              </span>
            </div>
            <Divider className="bg-white" />
            <div className="flex justify-center">
              <h4>{t ("Signer List")}:</h4>
            </div>
            {signers}
          </div>
        </div>
        <div className="webviewer w-full h-screen" ref={viewer}></div>
      </div>
    </Fragment>
  );
};

export default ViewPersonalDocument;
