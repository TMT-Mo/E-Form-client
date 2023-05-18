import {
  Divider,
  CircularProgress,
  TextField,
  Switch,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import WebViewer from "@pdftron/webviewer";
import AlertPopup from "components/AlertPopup";
import { useDispatch, useSelector, useSignalR } from "hooks";
import { approveTemplate } from "slices/template";
import { DeviceWidth, StatusTemplate } from "utils/constants";
import { useTranslation } from "react-i18next";
import { helpers } from "utils";
import { WhiteBtn, SaveLoadingBtn, RejectBtn } from "components/CustomStyled";

const { APPROVED_TEMPLATE, REJECTED_TEMPLATE } = StatusTemplate;

const ViewApproveTemplate: React.FC = () => {
  const viewer = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isApproveTemplateLoading, templateDetail } = useSelector(
    (state) => state.template
  );
  const {sendSignalNotification} = useSignalR()
  const { userInfo } = useSelector((state) => state.auth);
  const {
    createdAt,
    createdBy,
    departmentName,
    description,
    templateName,
    typeName,
    signatoryList,
    link,
    id,
  } = templateDetail!;
  const [isAccepting, setIsAccepting] = useState<boolean>(true);
  const [reason, setReason] = useState<string | undefined>();
  const [openDialog, setOpenDialog] = useState(false);
  const { t, i18n } = useTranslation();

  const signers = signatoryList.map((signer) => (
    <div className="flex flex-col space-y-3 rounded-md border border-solid border-white p-4">
      <div className="flex space-x-2 items-center ">
        <h4>{t("Signer")}:</h4>
        <Typography className="text-white">{signer.userName}</Typography>
      </div>
      <div className="flex space-x-2 items-center ">
        <h4>{t("Department")}:</h4>
        <Typography className="text-white">{signer.departmentName}</Typography>
      </div>
      <div className="flex space-x-2 items-center">
        <h4>{t("Role")}:</h4>
        <Typography className="text-white">{signer.roleName}</Typography>
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
          'downloadButton',
          'languageButton'
        ],
      },
      viewer.current!
    ).then(async (instance) => {
      const { documentViewer } = instance.Core;
      instance.UI.setLanguage(i18n.language === 'vn' ? 'vi' : 'en');
      window.innerWidth < DeviceWidth.IPAD_WIDTH && instance.UI.disableElements([ 'textSelectButton', 'panToolButton' ]);
      const annotManager = documentViewer.getAnnotationManager();
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
      annotManager.enableReadOnlyMode();
      documentViewer.addEventListener("documentLoaded", async () => {
        await documentViewer.getDocument().getDocumentCompletePromise();
        documentViewer.updateView();
      });
    });
  }, [link, templateName, i18n.language]);

  const onApproveTemplate = async () => {
    await dispatch(
      approveTemplate({
        userId: +userInfo?.userId!,
        templateId: id,
        statusTemplate: isAccepting ? APPROVED_TEMPLATE : REJECTED_TEMPLATE,
        reason: `${!isAccepting ? reason : undefined}`,
      })
    ).unwrap();
    sendSignalNotification({
      userIds: [createdBy.id],
      notify: {
        isChecked: false,
        description: `${templateName} has been ${isAccepting ? 'accepted':'rejected'} by ${userInfo?.userName}!`,
      },
    });
    navigate("/user", {replace: true});
  };
  return (
    <Fragment>
      <div className="bg-blue-config px-20 py-6 flex space-x-4 items-center">
        <Link to="/user">
          <ArrowBackIosIcon fontSize="small" className="fill-white" />
        </Link>
        <span className="text-white">{t("Approve template")}</span>
      </div>
      <div className="flex flex-col-reverse md:flex-row">
        <div className="flex flex-col bg-dark-config min-h-screen px-10 pt-12 space-y-8 pb-8 md:w-80 md:pb-0">
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
            <div className="flex items-center">
              <Switch
                checked={isAccepting}
                onClick={() => setIsAccepting((prevState) => !prevState)}
                sx={{
                  "&	.MuiSwitch-track": {
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
              <SaveLoadingBtn
                size="small"
                variant="outlined"
                onClick={() => setOpenDialog(true)}
              >
                {t("Approve")}
              </SaveLoadingBtn>
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
              ? [t("Are you sure you want to approve this template?")]
              : [t("Are you sure you want to reject this template?")]}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <WhiteBtn onClick={() => setOpenDialog(false)} size="small">
            {t("Cancel")}
          </WhiteBtn>
          <SaveLoadingBtn
            size="small"
            loading={isApproveTemplateLoading}
            loadingIndicator={<CircularProgress color="inherit" size={16} />}
            variant="outlined"
            onClick={onApproveTemplate}
          >
            {t("Save")}
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

export default ViewApproveTemplate;
