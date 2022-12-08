import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import HelpIcon from "@mui/icons-material/Help";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import ListAltIcon from "@mui/icons-material/ListAlt";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { styled } from "@mui/system";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import WebViewer, { Core } from "@pdftron/webviewer";
import Document from "../../components/DocumentManagement/ViewTemplate";
// import imgBase from '../../../assets/logos_typescript-icon.png'
const url =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Wikipedia_Logo_1.0.png/220px-Wikipedia_Logo_1.0.png";

const a = `<?xml version="1.0" encoding="UTF-8" ?><xfdf xmlns="http://ns.adobe.com/xfdf/" xml:space="preserve"><pdf-info xmlns="http://www.pdftron.com/pdfinfo" version="2" import-version="4" /><fields /><annots><freetext page="0" rect="330.920,702.430,483.590,741.110" flags="print" name="62416ebe-0280-929c-b34f-2c88cf1fb0b2" title="Guest" subject="Free Text" date="D:20221206102619+07'00'" width="0" creationdate="D:20221206102612+07'00'" TextColor="#000000" FontSize="12"><trn-custom-data bytes="{&quot;trn-wrapped-text-lines&quot;:&quot;[asdadad ]&quot;}"/><contents>asdadad</contents><contents-richtext><body><p><span>asdadad</span></p></body></contents-richtext><defaultappearance>0 0 0 rg /Helvetica 12 Tf</defaultappearance><defaultstyle>font: Helvetica 12pt; text-align: left; text-vertical-align: top; color: #000000</defaultstyle></freetext></annots><pages><defmtx matrix="1,0,0,-1,0,792" /></pages></xfdf>`;
//

const StyledListBtn = styled(ListItemButton)({
  borderRadius: "5px",
  "&.Mui-selected": {
    backgroundColor: "#22394f",
  },
});

const ViewAddTemplate: React.FC = () => {
  const viewer = useRef(null);
  const navigate = useNavigate();
  
  // const [image, setImage] = useState<string | null>(null);
  //   const convertBase64 = async (e: any) => {
  //     const response = await fetch(url);
  //     const blob = await response.blob();
  //     const newBlob = new Blob([blob], { type: "image/png" });
  //     console.log(newBlob);
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImage(reader.result!.toString());
  //       console.log(reader.result!.toString())
  //     };
  //     reader.readAsDataURL(newBlob);
  //   };

  //   useEffect(() => {
  //     convertBase64(imgBase);
  //   }, []);
  // console.log(image);
  // console.log(imgBase);

  const jsonData = {
    COMPANYNAME: "PDFTron",
    CUSTOMERNAME: "Andrey Safonov",
    CompanyAddressLine1: "838 W Hastings St 5th floor",
    CompanyAddressLine2: "Vancouver, BC V6C 0A6",
    CustomerAddressLine1: "123 Main Street",
    CustomerAddressLine2: "Vancouver, BC V6A 2S5",
    Date: "Nov 5th, 2021",
    ExpiryDate: "Dec 5th, 2021",
    QuoteNumber: "134",
    WEBSITE: "www.pdftron.com",
    // billed_items: {
    //   insert_rows: [
    //     ["Apples", "3", "$5.00", "$15.00"],
    //     ["Oranges", "2", "$5.00", "$10.00"],
    //   ],
    // },
    days: "30",
    total: "$25.00",
  };

  // if using a class, equivalent of componentDidMount
  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer/lib",
        initialDoc: "https://pdftron.s3.amazonaws.com/downloads/pl/report.docx",
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
      annotManager.enableReadOnlyMode()
      documentViewer.addEventListener("documentLoaded", async () => {
        await documentViewer.getDocument().getDocumentCompletePromise();
        //   await signatureTool.importSignatures([image]);
        await annotationManager.importAnnotations(a);
        // const annotations = annotationManager.importAnnotationCommand(a);
        // (await annotations).forEach((annotation) => {
        //   annotationManager.redrawAnnotation(annotation);
        // });
        documentViewer.updateView();
        console.log(annotationManager.getAnnotationsList());
        annotationManager.addEventListener(
          "annotationChanged",
          async (annotations, action, { imported }) => {
            const annots = annotationManager.getAnnotationsList()[0];

            console.log(annots);
            console.log(annotations);
            // If the event is triggered by importing then it can be ignored
            // This will happen when importing the initial annotations
            // from the server or individual changes from other users

            console.log(imported);
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
  }, []);
  return (
    <Fragment>
      <div className="bg-blue-config px-20 py-6">
        <ArrowBackIosIcon fontSize="small" className="fill-white" onClick={()=> navigate(-1)}/>
      </div>
      <div className="flex">
        <div className="flex flex-col bg-dark-config min-h-screen items-center px-10 pt-8 space-y-8 w-80">
          <div className="flex flex-col space-y-3 items-center w-full">
            <AccountCircleIcon className="fill-white"/>
            <h5 className="font-semibold text-white">Username</h5>
            <span className="text-gray-config">abc@gmail.com</span>
          </div>
          <Divider className="bg-gray-config" flexItem />
          <Box sx={{ width: "100%", maxWidth: 360, color: "#fff" }}></Box>
          <div className="flex flex-col justify-self-end items-center space-y-6 text-white w-full">
            <Divider flexItem className="bg-white " />
            <div className="flex items-center space-x-2">
              <span>Need help</span> <HelpIcon />
            </div>
          </div>
        </div>
        <div className="webviewer w-full" ref={viewer}></div>
      </div>
    </Fragment>
  );
};

export default ViewAddTemplate;
