import { Divider, CircularProgress, TextField, Switch } from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import WebViewer from "@pdftron/webviewer";
import { LoadingButton } from "@mui/lab";
import AlertPopup from "../../../../components/AlertPopup";
import { useDispatch, useSelector } from "../../../../hooks";
import { approveTemplate } from "../../../../slices/template";
import { StatusTemplate } from "../../../../utils/constants";

const ApproveBtn = styled(
  LoadingButton,
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
  "&.MuiLoadingButton-loading": {
    backgroundColor: "#fff",
    borderColor: "#407AFF",
  },
});
const RejectBtn = styled(
  LoadingButton,
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
  "&.MuiLoadingButton-loading": {
    backgroundColor: "#fff",
    borderColor: "#407AFF",
  },
});

const ViewApproveTemplate: React.FC = () => {
  const viewer = useRef(null);
  const dispatch = useDispatch();
  const { isApproveTemplateLoading, templateDetail } = useSelector(
    (state) => state.template
  );
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

  const signers = signatoryList.map((signer) => (
    <div className="flex flex-col space-y-3 rounded-md border border-solid border-white p-4">
      <div className="flex space-x-2 items-center ">
        <h4>Signer:</h4>
        <span className="text-white text-base break-words">{signer.email}</span>
      </div>
      <div className="flex space-x-2">
        <h4>Department:</h4>
        <span className="text-white text-base break-words">{templateName}</span>
      </div>
      <div className="flex space-x-2 items-center">
        <h4>Role:</h4>
        <span className="text-white text-base break-words">
          {signer.roleName}
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
          // 'viewControlsButton',
          // 'leftPanel'
          // 'viewControlsOverlay'
          // 'toolbarGroup-Annotate'
        ],
      },
      viewer.current!
    ).then(async (instance) => {
      const { documentViewer, annotationManager, Annotations } = instance.Core;
      const signatureTool = documentViewer.getTool("AnnotationCreateSignature");
      const annotManager = documentViewer.getAnnotationManager();

      // instance.UI.disableElements([ 'leftPanel', 'leftPanelButton' ]);
      instance.UI.disableElements(["", ""]);
      // instance.UI.enableFeatures([instance.UI.Feature.Initials]);
      annotManager.enableReadOnlyMode();
      documentViewer.addEventListener("documentLoaded", async () => {
        await documentViewer.getDocument().getDocumentCompletePromise();
        //   await signatureTool.importSignatures([image]);
        // const annotations = annotationManager.importAnnotationCommand(a);
        // (await annotations).forEach((annotation) => {
        //   annotationManager.redrawAnnotation(annotation);
        // });
        documentViewer.updateView();
        annotationManager.addEventListener(
          "annotationChanged",
          async (annotations, action, { imported }) => {
            const annots = annotationManager.getAnnotationsList()[0];

            // If the event is triggered by importing then it can be ignored
            // This will happen when importing the initial annotations
            // from the server or individual changes from other users

            if (imported) return;
            // annots.modi

            // const xfdfString = annotationManager.exportAnnotationCommand();
            // console.log((await xfdfString).toString());
            console.log(
              (await annotationManager.exportAnnotations()).replaceAll(
                /\\&quot;/gi,
                ""
              )
            );
          }
        );
      });

      // documentViewer.addEventListener('annotationsLoaded', () => {
      //   const annot = new Annotations.FreeTextAnnotation(Annotations.FreeTextAnnotation.Intent.FreeTextCallout, {
      //     PageNumber: 1,
      //     TextAlign: 'center',
      //     TextVerticalAlign: 'center',
      //     TextColor: new Annotations.Color(255, 0, 0, 1),
      //     StrokeColor: new Annotations.Color(0, 255, 0, 1),
      //   });

      //   annot.setPathPoint(0, 500, 25);  // Callout ending (start)
      //   annot.setPathPoint(1, 425, 75);  // Callout knee
      //   annot.setPathPoint(2, 300, 75);  // Callout joint
      //   annot.setPathPoint(3, 100, 50);  // Top-left point
      //   annot.setPathPoint(4, 300, 100); // Bottom-right point

      //   annot.setContents(`Visited: ${new Date()}`);

      //   annotationManager.addAnnotation(annot);
      //   annotationManager.redrawAnnotation(annot);
      // });
      // await documentViewer.getAnnotationsLoadedPromise();
      // const xfdf = await annotationManager.exportAnnotations();
      // console.log(xfdf);
    });
  }, [link]);

  const onApproveTemplate = () => {
    dispatch(
      approveTemplate({
        userId: +userInfo?.userId!,
        templateId: id,
        statusTemplate: StatusTemplate.APPROVED,
        reason: `${!isAccepting ? reason : undefined}`,
      })
    );
  };
  return (
    <Fragment>
      <div className="bg-blue-config px-20 py-6 flex space-x-4 items-center">
        <Link to="/user">
          <ArrowBackIosIcon fontSize="small" className="fill-white" />
        </Link>
        <span className="text-white">Approve template</span>
      </div>
      <div className="flex">
        <div className="flex flex-col bg-dark-config min-h-screen px-10 pt-12 space-y-8 w-80">
          <div className="flex flex-col space-y-8 text-white">
            <div className="flex flex-col space-y-2">
              <h4>File name:</h4>
              <span className="text-white text-base break-words w-60">
                {templateName}
              </span>
            </div>

            <div className="flex flex-col space-y-2">
              <h4>Description:</h4>
              <span className="text-white text-base break-words w-60">
                {description}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <h4>Type:</h4>
              <span className="text-white text-base break-words w-60">
                {typeName}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <h4>Department:</h4>
              <span className="text-white text-base break-words w-60">
                {departmentName}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <h4>Created By:</h4>
              <span className="text-white text-base break-words w-60">
                {createdBy}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <h4>Created At:</h4>
              <span className="text-white text-base break-words w-60">
                {createdAt}
              </span>
            </div>
            <Divider className="bg-white" />
            <div className="flex justify-center">
              <h4>Signer List:</h4>
            </div>
            {signers}
            <div className="flex items-center">
              <Switch
                defaultChecked={isAccepting}
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
              <h4>{isAccepting ? "Approve" : "Reject"}</h4>
            </div>
            {!isAccepting ? (
              <div className="flex flex-col space-y-4">
                <h4>Reason:</h4>
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
                  loading={isApproveTemplateLoading}
                  loadingIndicator={
                    <CircularProgress color="inherit" size={16} />
                  }
                  variant="outlined"
                  onClick={onApproveTemplate}
                  disabled={!reason}
                >
                  Reject
                </RejectBtn>
              </div>
            ) : (
              <ApproveBtn
                size="small"
                loading={isApproveTemplateLoading}
                loadingIndicator={
                  <CircularProgress color="inherit" size={16} />
                }
                variant="outlined"
                onClick={onApproveTemplate}
              >
                Approve
              </ApproveBtn>
            )}
          </div>
        </div>
        <div className="webviewer w-full" ref={viewer}></div>
      </div>
      <AlertPopup
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
      />
    </Fragment>
  );
};

export default ViewApproveTemplate;
