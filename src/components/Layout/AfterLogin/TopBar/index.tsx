import React from "react";
import hamburger from "../../../../assets/hamburger.svg";
import userIcon from "../../../../assets/user.svg";
import LanguageSelect from "../../../LanguageSelect";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Popover,
  Typography,
} from "@mui/material";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { useAuth, useDispatch } from "../../../../hooks";
import { styled } from "@mui/system";
import { setLocation } from "../../../../slices/location";

const StyledMenu = styled(Menu)({
  "& .MuiPaper-root": {
    padding: "20px 0",
  },
  "& .MuiMenu-list": {
    width: "300px",
  },
  "& .MuiMenuItem-root": {
    marginTop: "10px",
    // borderBottom: '1px solid #000'
  },
});

const TopBar: React.FC = () => {
  const dispatch = useDispatch()
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOutHandler = () => {
    logout();
  };

  return (
    <div className="flex py-6 px-20 space-x-20 justify-between items-center bg-white">
      <img src={hamburger} alt="logo" className="scale-75 w-fit" />
      <div className="flex space-x-2">
        <LanguageSelect />
        <div>
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <NotificationsIcon className="fill-blue-config" />
          </IconButton>
          <StyledMenu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Typography variant="h6" ml={2} fontWeight={600} mb={2} component='h1'>
              Notifications
            </Typography>
            <Divider />
            <MenuItem onClick={handleClose}>Notification 1</MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>Notification 2</MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>Notification 3</MenuItem>
            <Divider />
          </StyledMenu>
        </div>
        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <div>
              <IconButton  {...bindTrigger(popupState)}>
                <AccountCircleIcon className="fill-blue-config"/>
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
                      <ListItemText onClick={() => dispatch(setLocation({locationIndex: 8}))}>Change password</ListItemText>
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
      </div>
    </div>
  );
};

export default TopBar;
