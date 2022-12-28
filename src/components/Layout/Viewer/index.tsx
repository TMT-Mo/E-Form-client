import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "../../../hooks";
import TemplateHistory from "../../../pages/Template/template-history";
import Template from "../../../pages/Template/template";
import AlertPopup from "../../AlertPopup";
// import DesktopOnly from "../DesktopOnly";
import ViewAddTemplate from "../../../pages/Template/view/add-template";
import ViewCreateDocument from "../../../pages/Template/view/create-document";
import { clearTemplateDetail } from "../../../slices/template";
import ViewApproveTemplate from "../../../pages/Template/view/approve-template";
import ViewTemplateHistory from "../../../pages/Template/view/template-history";
import { ViewerLocationIndex } from "../../../utils/constants";
import ViewApproveDocument from "../../../pages/Document/view/approve-document";
import { clearDocumentDetail } from "../../../slices/document";
import ViewPersonalDocument from "../../../pages/Document/view/personal-document";

const {
  ADD_TEMPLATE_INDEX,
  APPROVING_DOCUMENT_INDEX,
  APPROVING_TEMPLATE_INDEX,
  CREATE_DOCUMENT_INDEX,
  CREATE_PERSONAL_DOCUMENT_INDEX,
  VIEW_PERSONAL_DOCUMENT_INDEX,
  VIEW_SHARED_DOCUMENT_INDEX,
  VIEW_DOCUMENT_HISTORY_INDEX,
  VIEW_TEMPLATE_HISTORY_INDEX,
} = ViewerLocationIndex;

const Viewer: React.FC = () => {
  const dispatch = useDispatch();
  const { viewerLocationIndex } = useSelector((state) => state.location);

  // const { innerWidth } = window;
  const switchTab = () => {
    switch (viewerLocationIndex) {
      case ADD_TEMPLATE_INDEX:
        return <ViewAddTemplate />;
      case VIEW_TEMPLATE_HISTORY_INDEX:
        return <ViewTemplateHistory />;
      case APPROVING_DOCUMENT_INDEX:
        return <ViewApproveDocument />;
      case CREATE_DOCUMENT_INDEX:
        return <ViewCreateDocument />;
      case VIEW_PERSONAL_DOCUMENT_INDEX:
        return <ViewPersonalDocument />;
      case CREATE_PERSONAL_DOCUMENT_INDEX:
        return <TemplateHistory />;
      case APPROVING_TEMPLATE_INDEX:
        return <ViewApproveTemplate />;
      case VIEW_DOCUMENT_HISTORY_INDEX:
        return <></>;
      default:
        return <></>;
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearTemplateDetail());
      dispatch(clearDocumentDetail())
    };
  }, [dispatch]);

  return (
    <Fragment>
      {switchTab()}
      <AlertPopup
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
      />
    </Fragment>
  );
};

export default Viewer;
