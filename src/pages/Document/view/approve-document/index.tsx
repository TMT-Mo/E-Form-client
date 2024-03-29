import {
  Divider,
  CircularProgress,
  TextField,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  LinearProgress,
  Typography,
  Stack,
} from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import WebViewer, { Core } from "@pdftron/webviewer";
import AlertPopup from "components/AlertPopup";
import { useDispatch, useSelector, useSignalR } from "hooks";
import { useTranslation } from "react-i18next";
import { helpers } from "utils";
import { approveDocument } from "slices/document";
import { DeviceWidth, Permissions, StatusDocument } from "utils/constants";
import { getSignature } from "slices/auth";
import { WhiteBtn, SaveLoadingBtn, RejectBtn } from "components/CustomStyled";
import StatusTag from "components/StatusTag";
import { RequiredPermission } from "components/RequiredPermission";

const { APPROVED_DOCUMENT, REJECTED_DOCUMENT } = StatusDocument;
const ViewApproveDocument: React.FC = () => {
  const { t, i18n } = useTranslation();
  const viewer = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { documentDetail, isApproveDocumentLoading } = useSelector(
    (state) => state.document
  );
  const { userInfo, signature, isGetSignatureLoading } = useSelector(
    (state) => state.auth
  );
  const { sendSignalNotification } = useSignalR();
  const {
    createdAt,
    createdBy,
    description,
    documentName,
    xfdfString,
    link,
    departmentName,
    typeName,
    id,
    signatoryList,
    documentDescription
  } = documentDetail!;
  const [isAccepting, setIsAccepting] = useState<boolean>(true);
  const [reason, setReason] = useState<string | undefined>();
  const [openDialog, setOpenDialog] = useState(false);
  const [initialXfdfString, setInitialXfdfString] = useState<any[] | null>();
  const [annotationList, setAnnotationList] = useState<
    Core.Annotations.Annotation[]
  >([]);
  const [newXfdfString, setNewXfdfString] = useState<string | undefined>();
  const [isDisable, setIsDisable] = useState(true);
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
      <div className="flex space-x-2 items-center">
        <h4>{t("Department")}:</h4>
        <span className="text-white text-base break-words">
          {signer.departmentName}
        </span>
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
  const onApproveDocument = async () => {
    await dispatch(
      approveDocument({
        userId: +userInfo?.userId!,
        documentId: id,
        xfdfString: !isAccepting ? xfdfString : newXfdfString!,
        statusDocument: isAccepting ? APPROVED_DOCUMENT : REJECTED_DOCUMENT,
        comment: reason,
      })
    ).unwrap();
    if (isAccepting) {
      const newSignerList = signatoryList?.filter(
        (signer) => signer.id !== +userInfo?.userId!
      )!;
      const nextSigner = newSignerList.find(
        (signer) => signer.status === StatusDocument.PROCESSING_DOCUMENT
      );
      nextSigner &&
        sendSignalNotification({
          userIds: [nextSigner?.id],
          notify: {
            isChecked: false,
            description: `You have a new document waiting for an approval!`,
          },
        });
    }
    if (+userInfo?.userId! === signatoryList?.[signatoryList.length - 1].id) {
      sendSignalNotification({
        userIds: [createdBy.id],
        notify: {
          isChecked: false,
          description: `${documentName} has been ${
            isAccepting ? "approved" : "rejected"
          }!`,
        },
      });
    }
    navigate("/user");
  };

  useEffect(() => {
    const onGetSignature = dispatch(
      getSignature({ userId: +userInfo?.userId! })
    );
    onGetSignature.unwrap();
    return () => onGetSignature.abort();
  }, [dispatch, userInfo?.userId]);

  useEffect(() => {
    if (annotationList?.length === 0) return;

    const checkCondition = i18n.language === "en" ? "Signature" : "Chữ ký";
    for (let i = 0; i < annotationList.length; i++) {
      const currentAnnot = annotationList[i];

      if (
        currentAnnot.Subject === checkCondition &&
        currentAnnot.Author === userInfo?.userId!.toString()
      ) {
        setIsDisable(false);
        break;
      }

      if (i === annotationList.length - 1) {
        console.log("final check");
        setIsDisable(true);
      }
    }
  }, [
    annotationList,
    annotationList.length,
    i18n.language,
    isDisable,
    userInfo?.userId,
  ]);

  useEffect(() => {
    signature &&
      WebViewer(
        {
          path: "/webviewer/lib",
          initialDoc: link!,
          disabledElements: [
            // "toolbarGroup-Insert",
            "toolbarGroup-Forms",
            "downloadButton",
            "styling-button",
            "toolStylePopup",
            "languageButton",
          ],
          annotationUser: userInfo?.userId!.toString(),
          css: "/webviewer/lib/ui/style.css",
        },
        viewer.current!
      ).then(async (inst) => {
        const { documentViewer, annotationManager } = inst.Core;
        inst.UI.setLanguage(i18n.language === "vn" ? "vi" : "en");
        window.innerWidth < DeviceWidth.IPAD_WIDTH && inst.UI.disableElements([ 'textSelectButton', 'panToolButton' ]);
        inst.UI.disableElements(["add-attachment"]);
        const signatureTool = documentViewer.getTool(
          "AnnotationCreateSignature"
        ) as Core.Tools.SignatureCreateTool;

        inst.UI.enableFeatures([inst.UI.Feature.Initials]);

        inst.UI.setHeaderItems(function (header) {
          header.push({
            type: "actionButton",
            img: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20"><path d="M19 9h-4V3H9v6H5l7 8zM4 19h16v2H4z"></path></svg>',
            onClick: async () =>
              await inst.UI.downloadPdf({
                filename: documentName.replace(/.docx|.doc/g, ""),
                xfdfString,
              }),
          });
        });

        documentViewer.addEventListener("documentLoaded", async () => {
          await documentViewer.getDocument().getDocumentCompletePromise();
          await annotationManager.importAnnotations(xfdfString);

          signatureTool.importSignatures([signature!]);
          setInitialXfdfString(annotationManager.getAnnotationsList());
          documentViewer.updateView();
          annotationManager.setAnnotationDisplayAuthorMap((userId) => {
            if (userId === userInfo?.userId!.toString()) {
              return userInfo?.userName!;
            } else if (userId !== "System") {
              return userId;
            }
            return "System";
          });
          annotationManager.addEventListener(
            "annotationChanged",
            async (annotations, action, { imported }) => {
              const annots = (
                await annotationManager.exportAnnotations({
                  useDisplayAuthor: true,
                })
              ).replaceAll(/\\&quot;/gi, "");
              setNewXfdfString(annots);

              const annotList = annotationManager.getAnnotationsList();
              setAnnotationList(annotList);
              console.log(annotList);
            }
          );
        });
      });
  }, [
    documentName,
    link,
    signature,
    userInfo?.userId,
    userInfo?.userName,
    xfdfString,
    i18n.language,
  ]);

  return (
    <Fragment>
      <div className="bg-blue-config px-20 py-6 flex space-x-4 items-center">
        <Link to="/user">
          <ArrowBackIosIcon fontSize="small" className="fill-white" />
        </Link>
        <span className="text-white">{t("Approve Document")}</span>
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
                {departmentName}
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
            <RequiredPermission permission={Permissions.APPROVE_DOCUMENT}>
              <Stack spacing={3}>
                <div className="flex items-center">
                  <Switch
                    checked={isAccepting}
                    onClick={() => setIsAccepting((prevState) => !prevState)}
                    sx={{
                      "& .MuiSwitch-track": {
                        backgroundColor: "#ff5252",
                      },
                      "& .MuiSwitch-thumb": {
                        backgroundColor: `${!isAccepting && "#ff5252"}`,
                      },
                    }}
                  />
                  <h4>{isAccepting ? [t("Approve")] : [t("Reject")]}</h4>
                </div>
                {!isAccepting ? (
                  <div className="flex flex-col space-y-4">
                    <h4 className="whitespace-nowrap">{t("Reason")}:</h4>
                    <TextField
                      id="outlined-multiline-flexible"
                      sx={{
                        border: "1px solid #fff",
                        borderRadius: "5px",
                        textarea: {
                          color: "#fff",
                        },
                      }}
                      multiline
                      minRows={4}
                      maxRows={4}
                      color="primary"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                    <RejectBtn
                      size="small"
                      variant="outlined"
                      onClick={() => setOpenDialog(true)}
                      disabled={!reason}
                    >
                      {t("Reject")}
                    </RejectBtn>
                  </div>
                ) : (
                  <SaveLoadingBtn
                    size="small"
                    variant="outlined"
                    onClick={() => setOpenDialog(true)}
                    disabled={isDisable}
                  >
                    {t("Approve")}
                  </SaveLoadingBtn>
                )}
              </Stack>
            </RequiredPermission>
          </div>
        </div>
        <div className="webviewer w-full h-screen" ref={viewer}></div>
      </div>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t("Notification")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {isAccepting
              ? [t("Are you sure you want to approve this document?")]
              : [t("Are you sure you want to reject this document?")]}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <WhiteBtn onClick={() => setOpenDialog(false)} size="small">
            {t("Cancel")}
          </WhiteBtn>
          <SaveLoadingBtn
            size="small"
            loading={isApproveDocumentLoading}
            loadingIndicator={<CircularProgress color="inherit" size={16} />}
            variant="outlined"
            onClick={onApproveDocument}
          >
            {t('Save')}
          </SaveLoadingBtn>
        </DialogActions>
      </Dialog>
      <AlertPopup
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
      />
    </Fragment>
  );
};

export default ViewApproveDocument;
