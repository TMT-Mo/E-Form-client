import React, { useEffect, useState } from "react";
import LanguageSelect from "../../../LanguageSelect";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popover,
} from "@mui/material";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { useAuth, useDispatch, useSelector } from "../../../../hooks";
import { setLocation } from "../../../../slices/location";
import { toggleSideBar } from "../../../../slices/ui-control";
import { LocationIndex } from "../../../../utils/constants";
import { Notification } from "./notification";
import { getNotification } from "../../../../slices/notification";
import Badge from "@mui/material/Badge";

const TopBar: React.FC = () => {
  const dispatch = useDispatch();
  const { isSideBarVisible } = useSelector((state) => state.uiControl);
  const { logout } = useAuth();
  const { userInfo } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [badge, setBadge] = useState<number>();
  const { notificationList, hasNewNotification } = useSelector((state) => state.notification);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOutHandler = () => {
    logout();
  };

  useEffect(() => {
    if (!userInfo?.userId) return;
    const handleNotification = dispatch(
      getNotification({ userId: +userInfo?.userId })
    );
    handleNotification.unwrap();

    return () => handleNotification.abort();
  }, [dispatch, userInfo?.userId]);

  useEffect(() => {
    if (!notificationList) return;
    const badgeNumber = notificationList.filter(
      (notification) => notification.isChecked === false
    );
    setBadge(badgeNumber.length);
  }, [notificationList]);

  return (
    <div className="flex py-6 px-4 justify-between items-center bg-white md:px-20">
      <IconButton onClick={() => dispatch(toggleSideBar())}>
        {!isSideBarVisible ? (
          <MenuIcon fontSize="small" />
        ) : (
          <ArrowBackIosNewIcon fontSize="small" />
        )}
      </IconButton>
      <div className="flex space-x-5">
        <LanguageSelect />
        <IconButton id="basic-button" onClick={handleClick}>
          <Badge variant="dot" color="error" invisible={!hasNewNotification}>
            <NotificationsIcon className="fill-blue-config" fontSize="medium" />
          </Badge>
        </IconButton>

        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <div>
              <IconButton {...bindTrigger(popupState)}>
                <AccountCircleIcon
                  className="fill-blue-config"
                  fontSize="medium"
                />
              </IconButton>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Paper sx={{ width: 220, maxWidth: "100%" }}>
                  <MenuList>
                    <MenuItem>
                      <ListItemIcon>
                        <LockPersonIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        onClick={() =>
                          dispatch(
                            setLocation({
                              locationIndex: LocationIndex.CHANGE_PASSWORD,
                            })
                          )
                        }
                      >
                        Change password
                      </ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={signOutHandler}>
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Sign out</ListItemText>
                    </MenuItem>
                  </MenuList>
                </Paper>
              </Popover>
            </div>
          )}
        </PopupState>
        <Notification
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
};

export default TopBar;
