import React, { useEffect } from "react";
import LanguageSelect from "../../../LanguageSelect";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
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
import { useAuth, useDispatch, useSelector } from "hooks";
import { setLocation } from "slices/location";
import { LocationIndex } from "utils/constants";
import { Notification } from "./notification";
import {
  getNotification,
} from "slices/notification";
import Badge from "@mui/material/Badge";
import { useTranslation } from "react-i18next";

interface Props {
  handleDrawerOpen: () => void;
  isOpen: boolean;
}

const TopBar: React.FC<Props> = (props) => {
  const { t} = useTranslation()
  const { handleDrawerOpen, isOpen } = props;
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const { userInfo } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { notificationList, hasNewNotification } = useSelector(
    (state) => state.notification
  );

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
  }, [notificationList]);

  return (
    <div className="flex py-6 px-8 justify-between items-center  md:px-36">
      <IconButton
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="end"
        sx={{
          // marginLeft: 15,
          ...(isOpen && { opacity: "0", cursor: "unset" }),
          fill: "#000",
          scale: '120%'
        }}

      >
        <MenuIcon/>
      </IconButton>
      <div className="flex space-x-5 scale-110">
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
              <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                  }}
                  alt="Cindy Baker"
                  src={userInfo?.avatar}
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
                        {t('Change password')}
                      </ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={signOutHandler}>
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>{t('Sign out')}</ListItemText>
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
