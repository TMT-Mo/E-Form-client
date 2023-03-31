import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import WebViewer from "@pdftron/webviewer";
import { useDispatch, useSelector } from "hooks";
import { useTranslation } from "react-i18next";
import { helpers } from "utils";
import { Document } from "models/document";
import { StatusDocument } from "utils/constants";
import { IUser } from "models/system";
import { clearUserList, getSigner } from "slices/system";
import {
  TransparentBtn,
  WhiteBtn,
  SaveLoadingBtn,
} from "components/CustomStyled";
import ChangeSigner from "./ChangeSigner";
import StatusTag from "components/StatusTag";
import { changeSignerDocument } from "slices/document";

const ViewPersonalDocument: React.FC = () => {
  const viewer = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { documentDetail, isChangeSignerDocumentLoading } = useSelector(
    (state) => state.document
  );
  const { userInfo } = useSelector((state) => state.auth);
  const { userList } = useSelector((state) => state.system);
  const [isChangingSigner, setIsChangingSigner] = useState(false);
  const [isOpenSignerList, setIsOpenSignerList] = useState(false);
  const [indexOpenSigner, setIndexOpenSigner] = useState<null | number>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const {
    id,
    createdAt,
    createdBy,
    description,
    documentName,
    xfdfString,
    signatoryList,
    link,
    departmentName,
    status,
    reason,
    typeName,
    departmentId,
  } = (documentDetail as Document)!;
  const { t, i18n } = useTranslation();
  const [signerList, setSignerList] = useState([...signatoryList!]);

  const onOpenSignerList = (index?: number) => {
    setIsOpenSignerList((prevState) => !prevState);
    index !== undefined && setIndexOpenSigner(index);
  };

  const onChangeSigner = (value: IUser, index: number) => {
    if (value) {
      const newSignerList = [...signerList];
      newSignerList[index] = value;
      setSignerList(newSignerList);
      return;
    }
  };

  const onCancelChangeSigner = () => {
    setIsChangingSigner(false);
    setSignerList([...signatoryList!]);
  };

  const handleChangeSigner = async () => {
    // const storageRef = ref(storage, `/file/${file!.name}`);
    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    await dispatch(
      changeSignerDocument({
        idDocument: id,
        signatoryList: signerList.map((signer) => signer.id),
      })
    ).unwrap();
    navigate("/user");
  };

  useEffect(() => {
    if (isChangingSigner && !userList) {
      dispatch(getSigner({ departmentId_eq: departmentId })).unwrap();
    }
  }, [departmentId, dispatch, isChangingSigner, userList]);

  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer/lib",
        initialDoc: link!,
        disabledElements: ["downloadButton", "languageButton"],
        isReadOnly: true,
      },
      viewer.current!
    ).then(async (instance) => {
      const { documentViewer, annotationManager } = instance.Core;
      instance.UI.setLanguage(i18n.language === "vn" ? "vi" : "en");
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
  }, [
    documentName,
    link,
    userInfo?.userId,
    userInfo?.userName,
    xfdfString,
    i18n,
  ]);

  useEffect(() => {
    return () => {
      dispatch(clearUserList());
    };
  }, [dispatch]);

  return (
    <Fragment>
      <div className="bg-blue-config px-20 py-6 flex space-x-4 items-center">
        <Link to="/user">
          <ArrowBackIosIcon fontSize="small" className="fill-white" />
        </Link>
        <span className="text-white">{t("Personal Document")}</span>
      </div>
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
                {createdBy.username}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <h4 className="whitespace-nowrap">{t("Created At")}:</h4>
              <span className="text-white text-base break-words w-60">
                {helpers.addHours(createdAt, 7)}
              </span>
            </div>
            <div className="flex space-x-2 items-center">
              <h4>{t("Status")}:</h4>
              <Typography className="text-white">
                <StatusTag status={status} type="document" />
              </Typography>
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
            <ChangeSigner
              isOpenSignerList={isOpenSignerList}
              onOpenSignerList={onOpenSignerList}
              indexOpenSigner={indexOpenSigner}
              isChangingSigner={isChangingSigner}
              signerList={signerList}
              onChangeSigner={onChangeSigner}
            />
            {status === StatusDocument.PROCESSING_DOCUMENT &&
              !isChangingSigner && (
                <SaveLoadingBtn
                  size="small"
                  // loading={isApproveDocumentLoading}
                  loadingIndicator={
                    <CircularProgress color="inherit" size={16} />
                  }
                  variant="outlined"
                  onClick={() => setIsChangingSigner((prevState) => !prevState)}
                >
                  Change Signer
                </SaveLoadingBtn>
              )}
            {isChangingSigner && (
              <div className="flex justify-center space-x-10">
                <TransparentBtn
                  size="small"
                  variant="outlined"
                  onClick={onCancelChangeSigner}
                >
                  Cancel
                </TransparentBtn>
                <SaveLoadingBtn
                  size="small"
                  // loading={isApproveDocumentLoading}
                  loadingIndicator={
                    <CircularProgress color="inherit" size={16} />
                  }
                  variant="outlined"
                  onClick={() => setOpenDialog(true)}
                >
                  Save
                </SaveLoadingBtn>
              </div>
            )}
          </div>
        </div>
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {t("Are you sure you want to save this form ?")}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t("Are you sure you want to change signer list?")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <WhiteBtn onClick={() => setOpenDialog(false)} size="small">
              {t("Cancel")}
            </WhiteBtn>
            <SaveLoadingBtn
              size="small"
              loading={isChangeSignerDocumentLoading}
              loadingIndicator={<CircularProgress color="inherit" size={16} />}
              variant="outlined"
              onClick={handleChangeSigner}
            >
              {t("Save")}
            </SaveLoadingBtn>
          </DialogActions>
        </Dialog>
        <div className="webviewer w-full h-screen" ref={viewer}></div>
      </div>
    </Fragment>
  );
};

export default ViewPersonalDocument;
