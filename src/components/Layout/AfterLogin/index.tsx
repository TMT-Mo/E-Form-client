import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../../../hooks";
import ChangePassword from "../../../pages/ChangePassword";
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
import AwaitSigning from "../../../pages/Document/await-signing";
import PersonalDoc from "../../../pages/Document/personal";
import SharedDoc from "../../../pages/Document/shared";
import History from "../../../pages/Document/history";
import { clearDocuments } from "../../../slices/document";
import { clearFilter } from "../../../slices/filter";
import { Container } from "@mui/material";

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
  TEMPLATE_HISTORY,
} = LocationIndex;

const Layout: React.FC = () => {
  const dispatch = useDispatch();
  const { locationIndex } = useSelector((state) => state.location);

  useEffect(() => {
    !locationIndex &&
      dispatch(
        setLocation({
          locationIndex: LocationIndex.TEMPLATE,
        })
      );
  }, [dispatch, locationIndex]);

  useEffect(() => {
    return () => {
      dispatch(clearDocuments());
      dispatch(clearTemplates());
      dispatch(clearFilter());
    };
  }, [dispatch]);
  // const { innerWidth } = window;
  const switchTab = () => {
    switch (locationIndex) {
      case SYSTEM:
        return <></>;
      case NEW_TEMPLATE:
        return <NewTemplates />;
      case ACCOUNT:
        return <></>;
      case TEMPLATE:
        return <Template />;
      case TEMPLATE_HISTORY:
        return <TemplateHistory />;
      case AWAIT_SIGNING:
        return <AwaitSigning />;
      case PERSONAL:
        return <PersonalDoc />;
      case SHARED:
        return <SharedDoc />;
      case CHANGE_PASSWORD:
        return <ChangePassword />;
      case DOCUMENT_HISTORY:
        return <History />;
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
        <Container maxWidth='xl'>{switchTab()}</Container>
        {/* {switchTab()} */}
        {/* <TemplateManagement/> */}
      </div>
      <AlertPopup
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
      />
    </div>
  );
};

export default Layout;
