import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../assets/logo-dark.svg";
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
import { useDispatch, useSelector } from "../../../../hooks";
import { setLocation } from "../../../../slices/location";
import { LocationIndex } from "../../../../utils/constants";

const StyledListBtn = styled(ListItemButton)({
  borderRadius: "5px",
  "&.Mui-selected": {
    backgroundColor: "#22394f",
  },
});

const {
  TEMPLATE,
  ACCOUNT,
  AWAITSIGNING,
  DEPARTMENT,
  HISTORY,
  PERSONAL,
  POSITION,
  SHARED,
} = LocationIndex;

const SideBar: React.FC = () => {
  const { locationIndex } = useSelector((state) => state.location);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    dispatch(
      setLocation({
        locationIndex: index,
      })
    );
  };
  return (
    <div className="flex flex-col bg-dark-config min-h-screen items-center px-10 pt-8 space-y-8 w-80">
      <img src={logo} alt="" />
      <div className="flex flex-col space-y-3 items-center w-full">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 7C13.1347 7 12.2888 7.25659 11.5694 7.73732C10.8499 8.21805 10.2892 8.90133 9.95803 9.70076C9.6269 10.5002 9.54026 11.3799 9.70907 12.2285C9.87788 13.0772 10.2946 13.8567 10.9064 14.4686C11.5183 15.0804 12.2978 15.4971 13.1465 15.6659C13.9951 15.8347 14.8748 15.7481 15.6742 15.417C16.4737 15.0858 17.157 14.5251 17.6377 13.8056C18.1184 13.0862 18.375 12.2403 18.375 11.375C18.375 10.2147 17.9141 9.10188 17.0936 8.28141C16.2731 7.46094 15.1603 7 14 7Z"
            fill="#fff"
          />
          <path
            d="M14 1.75C11.5772 1.75 9.20877 2.46845 7.19427 3.8145C5.17977 5.16054 3.60965 7.07373 2.68248 9.31213C1.75531 11.5505 1.51272 14.0136 1.98539 16.3899C2.45805 18.7661 3.62475 20.9489 5.33795 22.6621C7.05114 24.3752 9.23388 25.5419 11.6101 26.0146C13.9864 26.4873 16.4495 26.2447 18.6879 25.3175C20.9263 24.3903 22.8395 22.8202 24.1855 20.8057C25.5316 18.7912 26.25 16.4228 26.25 14C26.2463 10.7522 24.9545 7.63855 22.658 5.34203C20.3615 3.04552 17.2478 1.75371 14 1.75V1.75ZM20.993 21.8102C20.9756 20.6625 20.508 19.5676 19.6909 18.7614C18.8739 17.9552 17.7728 17.5022 16.625 17.5H11.375C10.2272 17.5022 9.12611 17.9552 8.30908 18.7614C7.49205 19.5676 7.02444 20.6625 7.00701 21.8102C5.42025 20.3934 4.30127 18.528 3.79824 16.4611C3.2952 14.3941 3.43184 12.2232 4.19006 10.2356C4.94829 8.24808 6.29232 6.53771 8.04421 5.331C9.79609 4.12428 11.8732 3.47815 14.0004 3.47815C16.1277 3.47815 18.2048 4.12428 19.9567 5.331C21.7086 6.53771 23.0526 8.24808 23.8108 10.2356C24.569 12.2232 24.7057 14.3941 24.2026 16.4611C23.6996 18.528 22.5806 20.3934 20.9939 21.8102H20.993Z"
            fill="#fff"
          />
        </svg>
        <h5 className="font-semibold text-white">Username</h5>
        <span className="text-gray-config">abc@gmail.com</span>
      </div>
      <Divider className="bg-gray-config" flexItem />
      <Box sx={{ width: "100%", maxWidth: 360, color: "#fff" }}>
        <List component="nav" aria-label="main mailbox folders">
          <h5 className="pb-3 text-blue-config">Account</h5>
          <StyledListBtn
            selected={locationIndex === DEPARTMENT}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <WorkspacesIcon className="fill-white" />
            </ListItemIcon>
            <ListItemText primary="Department" />
          </StyledListBtn>
          <StyledListBtn
            selected={locationIndex === POSITION}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <RecentActorsIcon className="fill-white" />
            </ListItemIcon>
            <ListItemText primary="Staff Position" />
          </StyledListBtn>
          <StyledListBtn
            selected={locationIndex === ACCOUNT}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemIcon>
              <ManageAccountsIcon className="fill-white" />
            </ListItemIcon>
            <ListItemText primary="Account List" />
          </StyledListBtn>
        </List>
        <List component="nav" aria-label="main mailbox folders">
          <h5 className="pb-3 text-blue-config">Template</h5>
          <StyledListBtn
            selected={locationIndex === TEMPLATE}
            onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemIcon>
              <UploadFileIcon className="fill-white" />
            </ListItemIcon>
            <ListItemText primary="Template" />
          </StyledListBtn>
        </List>
        <List component="nav" aria-label="main mailbox folders">
          <h5 className="pb-3 text-blue-config">Document</h5>
          <StyledListBtn
            selected={locationIndex === AWAITSIGNING}
            onClick={(event) => handleListItemClick(event, 4)}
          >
            <ListItemIcon>
              <AssignmentIcon className="fill-white" />
            </ListItemIcon>
            <ListItemText primary="Await Signing" />
          </StyledListBtn>
          <StyledListBtn
            selected={locationIndex === PERSONAL}
            onClick={(event) => handleListItemClick(event, 5)}
          >
            <ListItemIcon>
              <ListAltIcon className="fill-white" />
            </ListItemIcon>
            <ListItemText primary="Personal Doc" />
          </StyledListBtn>
          <StyledListBtn
            selected={locationIndex === SHARED}
            onClick={(event) => handleListItemClick(event, 6)}
          >
            <ListItemIcon>
              <FolderSharedIcon className="fill-white" />
            </ListItemIcon>
            <ListItemText primary="Shared Doc" />
          </StyledListBtn>
          <StyledListBtn
            selected={locationIndex === HISTORY}
            onClick={(event) => handleListItemClick(event, 7)}
          >
            <ListItemIcon>
              <HistoryEduIcon className="fill-white" />
            </ListItemIcon>
            <ListItemText primary="History" />
          </StyledListBtn>
        </List>
      </Box>
      <div className="flex flex-col justify-self-end items-center space-y-6 text-white w-full">
        <Divider flexItem className="bg-white " />
        <div className="flex items-center space-x-2">
          <span>Need help</span> <HelpIcon />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
