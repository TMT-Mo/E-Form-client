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
    ADD_TEMPLATE,
    APPROVING_DOCUMENT,
    APPROVING_TEMPLATE,
    CREATE_DOCUMENT,
    CREATE_PERSONAL_DOCUMENT,
    VIEW_DOCUMENT,
    VIEW_DOCUMENT_HISTORY,
    VIEW_TEMPLATE_HISTORY
} = ViewerLocationIndex;

const Viewer: React.FC = () => {
  const dispatch = useDispatch();
  const { viewerLocationIndex } = useSelector((state) => state.location);

  // const { innerWidth } = window;
  const switchTab = () => {
    switch (viewerLocationIndex) {
      case ADD_TEMPLATE:
        return <ViewAddTemplate/>;
      case VIEW_TEMPLATE_HISTORY:
        return <ViewTemplateHistory/>;
      case APPROVING_DOCUMENT:
        return <></>;
      case CREATE_DOCUMENT:
        return <ViewCreateDocument/>;
      case VIEW_DOCUMENT:
        return <Template />;
      case CREATE_PERSONAL_DOCUMENT:
        return <TemplateHistory />;
      case APPROVING_TEMPLATE:
        return <ViewApproveTemplate />;
      case VIEW_DOCUMENT_HISTORY:
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
