import React, { useRef, useEffect, useState } from "react";
import WebViewer from "@pdftron/webviewer";
import "./style.css";
// import imgBase from "./assets/foggy-4564618_1920.jpg";
const url = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Wikipedia_Logo_1.0.png/220px-Wikipedia_Logo_1.0.png";


const Document = () => {
  const [image, setImage] = useState(null);
//   const convertBase64 = async (e) => {
//     const response = await fetch(url);
//     const blob = await response.blob();
//     const newBlob = new Blob([blob], { type: "image/png" });
//     console.log(newBlob);
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImage(reader.result.toString());
//     };
//     reader.readAsDataURL(newBlob);
//   };
  const viewer = useRef(null);

//   useEffect(() => {
//     convertBase64(imgBase);
//   }, []);
  console.log(image);
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
          initialDoc:
            "https://cdn1.sportngin.com/attachments/document/24ef-2284916/Are_you_hosting_an_event_at_LNHS___Contact_Information_for_Set_Up.docx.pdf",
          disabledElements: [
            // 'viewControlsButton',
            // 'leftPanel'
            // 'viewControlsOverlay'
            // 'toolbarGroup-Annotate'
          ],
        },
        viewer.current!
      ).then(async (instance) => {
        const { documentViewer } = instance.Core;
        const signatureTool = documentViewer.getTool("AnnotationCreateSignature");
  
        // instance.UI.disableElements([ 'leftPanel', 'leftPanelButton' ]);
        instance.UI.disableElements(["", ""]);
        // instance.UI.enableFeatures([instance.UI.Feature.Initials]);
  
        documentViewer.addEventListener("documentLoaded", async () => {
          await documentViewer.getDocument().documentCompletePromise();
        //   await signatureTool.importSignatures([image]);
  
          documentViewer.updateView();
  
          await documentViewer.getDocument().applyTemplateValues(jsonData);
        });
      });
    }
  , []);

  //

  return (
    <div className="App">
      <div className="header">React sample</div>
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default Document;
