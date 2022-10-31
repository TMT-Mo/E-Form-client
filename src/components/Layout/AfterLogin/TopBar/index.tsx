import React from "react";
import { useNavigate } from "react-router-dom";
import hamburger from "../../../../assets/hamburger.svg";
import bell from "../../../../assets/notification.svg";
import userIcon from "../../../../assets/user.svg";
import LanguageSelect from "../../../LanguageSelect";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popover,
} from "@mui/material";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

const TopBar: React.FC = () => {
  const navigate = useNavigate();

  const signOutHandler = () =>{
    navigate('/login')
  }
  
  return (
    <div className="flex py-6 px-20 space-x-20 justify-between items-center bg-white">
      <img src={hamburger} alt="logo" className="scale-75 w-fit" />
      <div className="flex space-x-2">
        <LanguageSelect />
        <img src={bell} alt="" />
        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <div>
              <Button variant="text" {...bindTrigger(popupState)}>
                <img src={userIcon} alt="" />
              </Button>
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
                      <ListItemText>Change password</ListItemText>
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
