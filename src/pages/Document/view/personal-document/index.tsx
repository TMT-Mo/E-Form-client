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
  const [isAccepting, setIsAccepting] = useState<boolean>(true);
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
        <Typography className="text-white">---</Typography>
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
          // 'viewControlsButton',
          // 'leftPanel'
          // 'viewControlsOverlay'
          // 'toolbarGroup-Annotate'
        ],
        isReadOnly: true
      },
      viewer.current!
    ).then(async (instance) => {
      const { documentViewer, annotationManager } = instance.Core;

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
  }, [link, userInfo?.userId, userInfo?.userName, xfdfString]);
  return (
    <Fragment>
      <div className="bg-blue-config px-20 py-6 flex space-x-4 items-center">
        <Link to="/user">
          <ArrowBackIosIcon fontSize="small" className="fill-white" />
        </Link>
        <span className="text-white">{t ("Personal Document")}</span>
      </div>
      <div className="flex">
        <div className="flex flex-col bg-dark-config min-h-screen px-10 pt-12 space-y-8 w-80">
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
                {new Date(createdAt).toUTCString().replace('GMT','')}
              </span>
            </div>
            <Divider className="bg-white" />
            <div className="flex justify-center">
              <h4>{t ("Signer List")}:</h4>
            </div>
            {signers}
          </div>
        </div>
        <div className="webviewer w-full" ref={viewer}></div>
      </div>
    </Fragment>
  );
};

export default ViewPersonalDocument;
