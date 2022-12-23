import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "../../../hooks";
import ChangePassword from "../../../pages/ChangePassword";
import AwaitSigning from "../../../pages/Document/AwaitSigning";
import DocumentHistory from "../../../pages/Document/History";
import PersonalDoc from "../../../pages/Document/PersonalDoc";
import SharedDoc from "../../../pages/Document/SharedDoc";
import TemplateHistory from "../../../pages/Template/template-history";
import Template from "../../../pages/Template/template";
import { setLocation } from "../../../slices/location";
import { LocationIndex, ViewerLocationIndex } from "../../../utils/constants";
import AlertPopup from "../../AlertPopup";
// import DesktopOnly from "../DesktopOnly";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import NewTemplates from "../../../pages/Template/new-templates";
import ViewAddTemplate from "../../../pages/Template/view/add-template";
import ViewCreateDocument from "../../../pages/Template/view/create-document";
import { clearTemplateDetail } from "../../../slices/template";
import ViewApproveTemplate from "../../../pages/Template/view/approve-template";
import ViewTemplateHistory from "../../../pages/Template/view/template-history";

const {
    ADD_TEMPLATE_INDEX,
    APPROVING_DOCUMENT_INDEX,
    APPROVING_TEMPLATE_INDEX,
    CREATE_DOCUMENT_INDEX,
    CREATE_PERSONAL_DOCUMENT_INDEX,
    VIEW_DOCUMENT_INDEX,
    VIEW_DOCUMENT_HISTORY_INDEX,
    VIEW_TEMPLATE_HISTORY_INDEX
} = ViewerLocationIndex;

const Viewer: React.FC = () => {
  const dispatch = useDispatch();
  const { viewerLocationIndex } = useSelector((state) => state.location);

  // const { innerWidth } = window;
  const switchTab = () => {
    switch (viewerLocationIndex) {
      case ADD_TEMPLATE_INDEX:
        return <ViewAddTemplate/>;
      case VIEW_TEMPLATE_HISTORY_INDEX:
        return <ViewTemplateHistory/>;
      case APPROVING_DOCUMENT_INDEX:
        return <></>;
      case CREATE_DOCUMENT_INDEX:
        return <ViewCreateDocument/>;
      case VIEW_DOCUMENT_INDEX:
        return <Template />;
      case CREATE_PERSONAL_DOCUMENT_INDEX:
        return <TemplateHistory />;
      case APPROVING_TEMPLATE_INDEX:
        return <ViewApproveTemplate />;
      case VIEW_DOCUMENT_HISTORY_INDEX:
        return <PersonalDoc />;
      default:
        return <></>;
    }
  };

  useEffect(() => {
    return () => {dispatch(clearTemplateDetail())}
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
