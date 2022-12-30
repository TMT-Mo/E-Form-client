import { CircularProgress } from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import WebViewer from "@pdftron/webviewer";
import { LoadingButton } from "@mui/lab";
import AlertPopup from "../../../../components/AlertPopup";
import { useDispatch, useSelector } from "../../../../hooks";
import { createDocument } from "../../../../slices/document";
import { useTranslation } from "react-i18next";
import {v4 as uuidv4} from 'uuid'

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
    isEnable,
  } = templateDetail!;
  const [xfdfString, setXfdfString] = useState<string | undefined>();
  const [enableSend, setEnableSend] = useState<boolean>(false);
  const { t } = useTranslation();


  // if using a class, equivalent of componentDidMount

  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer/lib",
        initialDoc: link!,
        disabledElements: [
          'toolbarGroup-Insert',
          'toolbarGroup-Forms'
        ],
        annotationUser: userInfo?.userId!.toString()
      },
      viewer.current!
    ).then(async (instance) => {
      const { documentViewer, annotationManager, Annotations } = instance.Core;
      documentViewer.addEventListener("documentLoaded", async () => {
        await documentViewer.getDocument().getDocumentCompletePromise();
        documentViewer.updateView();
        documentViewer.addEventListener("annotationsLoaded", () => {
          const annot = new Annotations.FreeTextAnnotation(
            Annotations.FreeTextAnnotation.Intent.FreeText,
            {
              PageNumber: 1,
              TextAlign: "center",
              TextVerticalAlign: "center",
              TextColor: new Annotations.Color(255, 0, 0, 1),
              StrokeColor: new Annotations.Color(0, 255, 0, 0),
            }
          );

          annot.setPathPoint(0, 100, 25); // Callout ending (start)
          // annot.setPathPoint(1, 425, 75);  // Callout knee
          // annot.setPathPoint(2, 300, 75);  // Callout joint
          // annot.setPathPoint(3, 100, 50);  // Top-left point
          // annot.setPathPoint(4, 300, 100); // Bottom-right point

          annot.setContents(`${typeName}_${departmentName}_1`);
          annot.Author = uuidv4()
          
          annotationManager.addAnnotation(annot);
          annotationManager.redrawAnnotation(annot);
        });
        // annotationManager.setPermissionCheckCallback((author, annotation) => {
        //   const defaultPermission = annotation.Author === annotationManager.getCurrentUser();
        // })
        annotationManager.setAnnotationDisplayAuthorMap((userId) => {
          if(userId === userInfo?.userId!.toString()){
            return userInfo?.userName!
          }
          return 'Admin'
        });
        annotationManager.addEventListener(
          "annotationChanged",
          async (annotations, action, { imported }) => {
            const annots = (
              await annotationManager.exportAnnotations({useDisplayAuthor: true, })
            ).replaceAll(/\\&quot;/gi, "");
            setXfdfString(annots);

            const checkAnnotExists = annotationManager.getAnnotationsList();
            // console.log(checkAnnotExists);
            checkAnnotExists.length >= 2
              ? setEnableSend(true)
              : setEnableSend(false);
          }
        );
        
      });
    });
  }, [departmentName, link, typeName, userInfo?.userId, userInfo?.userName]);

  const onCreateTemplate = async () => {
    await dispatch(
      createDocument({
        createdBy: +userInfo?.userId!,
        idTemplate: id,
        xfdfString: xfdfString!,
      })
    ).unwrap();
    navigate("/user");
  };

  return (
    <Fragment>
      <div className="bg-blue-config px-20 py-6 flex space-x-4 items-center">
        <Link to="/user">
          <ArrowBackIosIcon fontSize="small" className="fill-white" />
        </Link>
        <span className="text-white">{t("Create await signing document")}</span>
      </div>
      <div className="flex">
        <div className="flex flex-col bg-dark-config min-h-screen px-10 pt-12 space-y-8 w-80">
          <div className="flex flex-col space-y-8 text-white">
            <div className="flex flex-col space-y-2">
              <h4>{t("File name")}:</h4>
              <span className="text-white text-base break-words w-60">
                {templateName}
              </span>
            </div>

            <div className="flex flex-col space-y-2">
              <h4>{t("Description")}:</h4>
              <span className="text-white text-base break-words w-60">
                {description}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <h4>Type:</h4>
              <span className="text-white text-base break-words w-60">
                {typeName}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <h4>Department:</h4>
              <span className="text-white text-base break-words w-60">
                {departmentName}
              </span>
            </div>
            {isEnable && (
              <SendBtn
                size="small"
                loading={isCreateDocumentLoading}
                loadingIndicator={
                  <CircularProgress color="inherit" size={16} />
                }
                variant="outlined"
                onClick={onCreateTemplate}
                disabled={!enableSend}
              >
                Send
              </SendBtn>
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

export default ViewCreateDocument;
