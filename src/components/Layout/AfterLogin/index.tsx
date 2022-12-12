import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../../../hooks";
import ChangePassword from "../../../pages/ChangePassword";
import AwaitSigning from "../../../pages/Document/AwaitSigning";
import History from "../../../pages/Document/History";
import PersonalDoc from "../../../pages/Document/PersonalDoc";
import SharedDoc from "../../../pages/Document/SharedDoc";
import Template from "../../../pages/Template/TemplateList";
import { setLocation } from "../../../slices/location";
import { LocationIndex } from "../../../utils/constants";
import AlertPopup from "../../AlertPopup";
// import DesktopOnly from "../DesktopOnly";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

const {
  TEMPLATE,
  ACCOUNT,
  AWAITSIGNING,
  DEPARTMENT,
  HISTORY,
  PERSONAL,
  POSITION,
  SHARED,
  CHANGEPASSWORD
} = LocationIndex;

const Layout: React.FC = () => {
  const dispatch = useDispatch();
  const { locationIndex } = useSelector((state) => state.location);
  
  useEffect(() => {
    dispatch(
      setLocation({
        locationIndex: LocationIndex.TEMPLATE,
      })
    );
  }, [dispatch]);
  // const { innerWidth } = window;
  const switchTab = () => {
    switch (locationIndex) {
      case DEPARTMENT:
        return <></>;
      case POSITION:
        return <></>;
      case ACCOUNT:
        return <></>;
      case TEMPLATE:
        return <Template />;
      case AWAITSIGNING:
        return <AwaitSigning/>;
      case PERSONAL:
        return <PersonalDoc/>;
      case SHARED:
        return <SharedDoc/>;
      case CHANGEPASSWORD:
        return <ChangePassword/>;
      default:
        return <History/>;
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
