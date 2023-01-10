import {
  Divider,
  CircularProgress,
  TextField,
  Switch,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  LinearProgress,
} from "@mui/material";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import WebViewer, { Core, WebViewerInstance } from "@pdftron/webviewer";
import { LoadingButton } from "@mui/lab";
import AlertPopup from "../../../../components/AlertPopup";
import { useDispatch, useSelector } from "../../../../hooks";
import { useTranslation } from "react-i18next";
import { helpers } from "../../../../utils";
import { approveDocument } from "../../../../slices/document";
import { StatusDocument } from "../../../../utils/constants";
import { getSignature } from "../../../../slices/auth";

const img =
  "data:image/png;base64,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";
const LoadingBtn = styled(
  LoadingButton,
  {}
)({
  backgroundColor: "#407AFF",
  borderRadius: "5px",
  color: "#fff",
  padding: "5px",
  textTransform: "unset",
  // fontSize: '15px',
  // width: 'fit-content',
  ":hover": { backgroundColor: "#578aff" },
  "&.MuiLoadingButton-loading": {
    backgroundColor: "#fff",
    borderColor: "#407AFF",
  },
});

const CancelBtn = styled(
  Button,
  {}
)({
  backgroundColor: "#fff",
  borderRadius: "5px",
  color: "#407AFF",
  padding: "5px",
  textTransform: "unset",
  // ":hover": { backgroundColor: "#407AFF", color: "#fff", },
});

const ApproveBtn = styled(
  Button,
  {}
)({
  backgroundColor: "#407AFF",
  borderRadius: "5px",
  color: "#fff",
  paddingTop: "10px",
  paddingBottom: "10px",
  ":hover": { backgroundColor: "#fff", color: "#407AFF" },
  "&.Mui-disabled": {
    color: "#F2F2F2",
    backgroundColor: "#6F7276",
  },
});
const RejectBtn = styled(
  Button,
  {}
)({
  backgroundColor: "#ff5252",
  borderRadius: "5px",
  color: "#fff",
  paddingTop: "10px",
  paddingBottom: "10px",
  ":hover": { backgroundColor: "#fff", color: "#407AFF" },
  "&.Mui-disabled": {
    color: "#F2F2F2",
    backgroundColor: "#6F7276",
  },
});

const { APPROVED_DOCUMENT, REJECTED_DOCUMENT } = StatusDocument;
const ViewApproveDocument: React.FC = () => {
  const [t] = useTranslation();
  const viewer = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { documentDetail, isApproveDocumentLoading } = useSelector(
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
    id,
  } = documentDetail!;
  const [isAccepting, setIsAccepting] = useState<boolean>(true);
  const [reason, setReason] = useState<string | undefined>();
  const [openDialog, setOpenDialog] = useState(false);
  const [initialXfdfString, setInitialXfdfString] = useState<any[] | null>();
  const [annotationList, setAnnotationList] = useState<any[] | null>();
  const [newXfdfString, setNewXfdfString] = useState<string | undefined>();
  // if using a class, equivalent of componentDidMount

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
    signature &&
      WebViewer(
        {
          path: "/webviewer/lib",
          initialDoc: link!,
          disabledElements: [
            "toolbarGroup-Insert",
            "toolbarGroup-Forms",
            "downloadButton",
          ],
          annotationUser: userInfo?.userId!.toString(),
        },
        viewer.current!
      ).then(async (inst) => {
        const { documentViewer, annotationManager } = inst.Core;
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
          signatureTool.importSignatures([signature!]);
          await annotationManager.importAnnotations(xfdfString);
          setInitialXfdfString(annotationManager.getAnnotationsList());
          await documentViewer.getDocument().getDocumentCompletePromise();
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

              // console.log(checkAnnotExists)
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
        <div className="flex flex-col bg-dark-config min-h-screen px-10 pt-12 space-y-8 pb-8 md:w-80 md:pb-0">
          <div className="flex flex-col space-y-8 text-white">
            <div className="flex flex-col space-y-2">
              <h4>{t("File name")}:</h4>
              <span className="text-white text-base break-words w-60">
                {documentName}
              </span>
            </div>

            <div className="flex flex-col space-y-2">
              <h4>{t("Description")}:</h4>
              <span className="text-white text-base break-words w-60">
                {description}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <h4 className="whitespace-nowrap">{t("Type")}:</h4>
              <span className="text-white text-base break-words w-60">
                {typeName}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <h4>{t("Department")}:</h4>
              <span className="text-white text-base break-words w-60">
                {departmentName}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <h4>{t("Created By")}:</h4>
              <span className="text-white text-base break-words w-60">
                {createdBy.username}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <h4>{t("Created At")}:</h4>
              <span className="text-white text-base break-words w-60">
                {helpers.addHours(new Date(createdAt), 7)}
              </span>
            </div>
            <Divider className="bg-white" />
            <div className="flex items-center">
              <Switch
                defaultChecked={isAccepting}
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
                <h4>{t("Reason")}:</h4>
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
              <ApproveBtn
                size="small"
                variant="outlined"
                onClick={() => setOpenDialog(true)}
                disabled={
                  annotationList
                    ? annotationList.every((annot) =>
                        initialXfdfString?.includes(annot)
                      )
                    : true
                }
              >
                {t("Approve")}
              </ApproveBtn>
            )}
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
          <CancelBtn onClick={() => setOpenDialog(false)} size="small">
            {t("Cancel")}
          </CancelBtn>
          <LoadingBtn
            size="small"
            loading={isApproveDocumentLoading}
            loadingIndicator={<CircularProgress color="inherit" size={16} />}
            variant="outlined"
            onClick={onApproveDocument}
          >
            Save
          </LoadingBtn>
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
