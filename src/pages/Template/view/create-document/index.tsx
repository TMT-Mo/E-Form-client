import {  CircularProgress} from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import WebViewer from "@pdftron/webviewer";
import { LoadingButton } from "@mui/lab";
import AlertPopup from "../../../../components/AlertPopup";
import { useDispatch, useSelector } from "../../../../hooks";
import { createDocument } from "../../../../slices/document";

const SendBtn = styled(
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

const ViewCreateDocument: React.FC = () => {
  const viewer = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { templateDetail } = useSelector((state) => state.template);
  const { isCreateDocumentLoading } = useSelector((state) => state.document);
  const { userInfo } = useSelector((state) => state.auth);
  const {
    departmentName,
    description,
    templateName,
    typeName,
    link,
    id,
  } = templateDetail!;
  const [xfdfString, setXfdfString] = useState<string | undefined>();

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
      // annotManager.enableReadOnlyMode();
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
            const checkAnnotExists = annotationManager.getAnnotationsList()[0];

            // const xfdfString = annotationManager.exportAnnotationCommand();
            // console.log((await xfdfString).toString());
            const annots = (
              await annotationManager.exportAnnotations()
            ).replaceAll(/\\&quot;/gi, "");

            checkAnnotExists ? setXfdfString(annots) : setXfdfString(undefined);
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

  const onCreateTemplate = async () => {
    await dispatch(
      createDocument({
        createdBy: +userInfo?.userId!,
        idTemplate: id,
        xfdfString: xfdfString!,
      })
    ).unwrap();
    navigate('/user')
  };

  return (
    <Fragment>
      <div className="bg-blue-config px-20 py-6 flex space-x-4 items-center">
        <Link to="/user">
          <ArrowBackIosIcon fontSize="small" className="fill-white" />
        </Link>
        <span className="text-white">Create await signing document</span>
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
            <SendBtn
              size="small"
              loading={isCreateDocumentLoading}
              loadingIndicator={<CircularProgress color="inherit" size={16} />}
              variant="outlined"
              onClick={onCreateTemplate}
              disabled={!xfdfString}
            >
              Send
            </SendBtn>
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

export default ViewCreateDocument;
