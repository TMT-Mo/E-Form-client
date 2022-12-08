import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
import { useTranslation } from "react-i18next";

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
  const {t} = useTranslation()

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
      <AccountCircleIcon className="fill-white"/>
        <h5 className="font-semibold text-white">Username</h5>
        <span className="text-gray-config">abc@gmail.com</span>
      </div>
      <Divider className="bg-gray-config" flexItem />
      <Box sx={{ width: "100%", maxWidth: 360, color: "#fff" }}>
        <List component="nav" aria-label="main mailbox folders" >
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
            <ListItemText primary={t('Template')} />
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
            <ListItemText primary={t('Await Signing')} />
          </StyledListBtn>
          <StyledListBtn
            selected={locationIndex === PERSONAL}
            onClick={(event) => handleListItemClick(event, 5)}
          >
            <ListItemIcon>
              <ListAltIcon className="fill-white" />
            </ListItemIcon>
            <ListItemText primary="Personal" />
          </StyledListBtn>
          <StyledListBtn
            selected={locationIndex === SHARED}
            onClick={(event) => handleListItemClick(event, 6)}
          >
            <ListItemIcon>
              <FolderSharedIcon className="fill-white" />
            </ListItemIcon>
            <ListItemText primary="Shared" />
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
