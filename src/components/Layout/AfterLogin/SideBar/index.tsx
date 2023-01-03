import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React from "react";
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
import { LocationIndex, Permissions } from "../../../../utils/constants";
import { useTranslation } from "react-i18next";
import { clearTemplates } from "../../../../slices/template";
import { RequiredPermission } from "../../../RequiredPermission";
import { clearDocuments } from "../../../../slices/document";
import { clearFilter } from "../../../../slices/filter";

const StyledListBtn = styled(ListItemButton)({
  borderRadius: "5px",
  "&.Mui-selected": {
    backgroundColor: "#22394f",
  },
});

const {
  TEMPLATE,
  ACCOUNT,
  AWAIT_SIGNING,
  SYSTEM,
  DOCUMENT_HISTORY,
  PERSONAL,
  TEMPLATE_HISTORY,
  SHARED,
  NEW_TEMPLATE,
} = LocationIndex;

const {
  VIEW_AWAIT_SIGNING_DOCUMENT,
  VIEW_DOCUMENT_HISTORY,
  VIEW_NEW_TEMPLATE,
  VIEW_PERSONAL_DOCUMENT,
  VIEW_SHARED_DOCUMENT,
  VIEW_TEMPLATE_HISTORY,
  VIEW_TEMPLATE_MANAGEMENT,
} = Permissions;

const SideBar: React.FC = () => {
  const { locationIndex } = useSelector((state) => state.location);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    dispatch(
      setLocation({
        locationIndex: index,
      })
    );
    if (locationIndex !== index) {
      dispatch(clearTemplates());
      dispatch(clearDocuments());
      dispatch(clearFilter())
    }
  };

  return (
    <div className="flex flex-col bg-dark-config min-h-screen items-center px-10 pt-8 space-y-8 w-80">
      <img src={logo} alt="" />
      <div className="flex flex-col space-y-3 items-center w-full">
        <AccountCircleIcon className="fill-white" />
        <h4 className="font-semibold text-white">{userInfo?.userName}</h4>
      </div>
      <Divider className="bg-gray-config" flexItem />
      <Box sx={{ width: "100%", maxWidth: 360, color: "#fff" }}>
        <List component="nav" aria-label="main mailbox folders">
          <h5 className="pb-3 text-blue-config">{t("System")}</h5>

          <StyledListBtn
            selected={locationIndex === SYSTEM}
            onClick={(event) => handleListItemClick(event, SYSTEM)}
          >
            <ListItemIcon>
              <RecentActorsIcon className="fill-white" />
            </ListItemIcon>
            <ListItemText primary={t("System")} />
          </StyledListBtn>

          <StyledListBtn
            selected={locationIndex === ACCOUNT}
            onClick={(event) => handleListItemClick(event, ACCOUNT)}
          >
            <ListItemIcon>
              <ManageAccountsIcon className="fill-white" />
            </ListItemIcon>
            <ListItemText primary={t("Account List")} />
          </StyledListBtn>
        </List>
        <List component="nav" aria-label="main mailbox folders">
          <h5 className="pb-3 text-blue-config">{t("Template")}</h5>

          <RequiredPermission permission={VIEW_NEW_TEMPLATE}>
            <StyledListBtn
              selected={locationIndex === NEW_TEMPLATE}
              onClick={(event) => handleListItemClick(event, NEW_TEMPLATE)}
            >
              <ListItemIcon>
                <WorkspacesIcon className="fill-white" />
              </ListItemIcon>
              <ListItemText primary={t ("Unapproved")} />
            </StyledListBtn>
          </RequiredPermission>

          <RequiredPermission permission={VIEW_TEMPLATE_MANAGEMENT}>
            <StyledListBtn
              selected={locationIndex === TEMPLATE}
              onClick={(event) => handleListItemClick(event, TEMPLATE)}
            >
              <ListItemIcon>
                <UploadFileIcon className="fill-white" />
              </ListItemIcon>
              <ListItemText primary={t("Template")} />
            </StyledListBtn>
          </RequiredPermission>

          <RequiredPermission permission={VIEW_TEMPLATE_HISTORY}>
            <StyledListBtn
              selected={locationIndex === TEMPLATE_HISTORY}
              onClick={(event) => handleListItemClick(event, 4)}
            >
              <ListItemIcon>
                <WorkspacesIcon className="fill-white" />
              </ListItemIcon>
              <ListItemText primary={t("History")} />
            </StyledListBtn>
          </RequiredPermission>
        </List>
        <List component="nav" aria-label="main mailbox folders">
          <h5 className="pb-3 text-blue-config">{t("Document")}</h5>
          <RequiredPermission permission={VIEW_AWAIT_SIGNING_DOCUMENT}>
            <StyledListBtn
              selected={locationIndex === AWAIT_SIGNING}
              onClick={(event) => handleListItemClick(event, AWAIT_SIGNING)}
            >
              <ListItemIcon>
                <AssignmentIcon className="fill-white" />
              </ListItemIcon>
              <ListItemText primary={t("Await Signing")} />
            </StyledListBtn>
          </RequiredPermission>
          <RequiredPermission permission={VIEW_PERSONAL_DOCUMENT}>
            <StyledListBtn
              selected={locationIndex === PERSONAL}
              onClick={(event) => handleListItemClick(event, PERSONAL)}
            >
              <ListItemIcon>
                <ListAltIcon className="fill-white" />
              </ListItemIcon>
              <ListItemText primary={t("Personal")} />
            </StyledListBtn>
          </RequiredPermission>
          <RequiredPermission permission={VIEW_SHARED_DOCUMENT}>
            <StyledListBtn
              selected={locationIndex === SHARED}
              onClick={(event) => handleListItemClick(event, SHARED)}
            >
              <ListItemIcon>
                <FolderSharedIcon className="fill-white" />
              </ListItemIcon>
              <ListItemText primary={t("Shared")} />
            </StyledListBtn>
          </RequiredPermission>
          <RequiredPermission permission={VIEW_DOCUMENT_HISTORY}>
            <StyledListBtn
              selected={locationIndex === DOCUMENT_HISTORY}
              onClick={(event) => handleListItemClick(event, DOCUMENT_HISTORY)}
            >
              <ListItemIcon>
                <HistoryEduIcon className="fill-white" />
              </ListItemIcon>
              <ListItemText primary={t("History")} />
            </StyledListBtn>
          </RequiredPermission>
        </List>
      </Box>
      <div className="flex flex-col justify-self-end items-center space-y-6 text-white w-full">
        <Divider flexItem className="bg-white " />
        <div className="flex items-center space-x-2">
          <span> {t("Need help")}</span> <HelpIcon />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
