import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../../../hooks";
import ChangePassword from "../../../pages/ChangePassword";
import AwaitSigning from "../../../pages/Document/AwaitSigning";
import DocumentHistory from "../../../pages/Document/History";
import PersonalDoc from "../../../pages/Document/PersonalDoc";
import SharedDoc from "../../../pages/Document/SharedDoc";
import TemplateHistory from "../../../pages/Template/template-history";
import Template from "../../../pages/Template/template";
import { setLocation } from "../../../slices/location";
import { LocationIndex } from "../../../utils/constants";
import AlertPopup from "../../AlertPopup";
// import DesktopOnly from "../DesktopOnly";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import NewTemplates from "../../../pages/Template/new-templates";
import { clearTemplates } from "../../../slices/template";

const {
  TEMPLATE,
  ACCOUNT,
  AWAIT_SIGNING,
  SYSTEM,
  PERSONAL,
  NEW_TEMPLATE,
  SHARED,
  CHANGE_PASSWORD,
  DOCUMENT_HISTORY,
  TEMPLATE_HISTORY
} = LocationIndex;

const Layout: React.FC = () => {
  const dispatch = useDispatch();
  const { locationIndex } = useSelector((state) => state.location);
  
  useEffect(() => {
    !locationIndex && dispatch(
      setLocation({
        locationIndex: LocationIndex.TEMPLATE,
      })
    );
  }, [dispatch, locationIndex]);

  useEffect(() => {
    return () => {
      dispatch(clearTemplates())
    }
  }, [dispatch]);
  // const { innerWidth } = window;
  const switchTab = () => {
    switch (locationIndex) {
      case SYSTEM:
        return <></>;
      case NEW_TEMPLATE:
        return <NewTemplates/>;
      case ACCOUNT:
        return <></>;
      case TEMPLATE:
        return <Template />;
      case TEMPLATE_HISTORY:
        return <TemplateHistory/>;
      case AWAIT_SIGNING:
        return <AwaitSigning/>;
      case PERSONAL:
        return <PersonalDoc/>;
      case SHARED:
        return <SharedDoc/>;
      case CHANGE_PASSWORD:
        return <ChangePassword/>;
      case DOCUMENT_HISTORY:
        return <DocumentHistory/>;
      default:
        return <></>;
    }
  };
  
  return (
    <div className="flex bg-blue-light-config">
      <SideBar />
      <div className="w-full">
        <TopBar />
        {/* <Outlet /> */}
        {switchTab()}
        {/* <TemplateManagement/> */}
      </div>
      <AlertPopup anchorOrigin={{vertical: "top", horizontal:"right"}} autoHideDuration={3000}/>
    </div>
  );
};

export default Layout;
