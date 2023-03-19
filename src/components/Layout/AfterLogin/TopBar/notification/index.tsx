import styled from "@emotion/styled";
import {
  Typography,
  Divider,
  MenuItem,
  CircularProgress,
  ListItem,
  Stack,
  Box,
} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../../../hooks";
import { checkNotification } from "../../../../../slices/notification";
import { MenuNotification, StyledMenu } from "../../../../CustomStyled";
import CircleIcon from "@mui/icons-material/Circle";
interface Props {
  open: boolean;
  handleClose: () => void;
  anchorEl: null | HTMLElement;
}

export const BoxCustom = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const Notification = (props: Props) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { notificationList, isGetNotification } = useSelector(
    (state) => state.notification
  );
  const { open, anchorEl, handleClose } = props;

  // useEffect(() => {
  //   if (open && notificationList)
  //     dispatch(
  //       checkNotification({
  //         notificationId: notificationList.map((noti) => noti.id),
  //       })
  //     ).unwrap();
  // }, [dispatch, notificationList, open]);

  return (
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
    >
      <Typography variant="h6" mb={2} ml={2} fontWeight={600} component="h1">
        Notifications
      </Typography>
      <Divider />
      {isGetNotification && <MenuItem sx={{height: '100%', width:'100%', margin: 'auto'}}><CircularProgress /></MenuItem>}
      {notificationList.length === 0 && !isGetNotification && (
        <MenuNotification >
          <Typography sx={{ width:'100%', textAlign:'center'}}>Empty</Typography>
        </MenuNotification>
      )}
      {notificationList &&
        notificationList.map((notification) => (
          <MenuNotification onClick={handleClose} key={notification.id}>
            <Box width="25px" marginRight="15px">
              {!notification.isChecked && (
                <CircleIcon sx={{ scale: "50%", fill: "#407AFF" }} />
              )}
            </Box>
            <BoxCustom>
              <Typography
                sx={{
                  whiteSpace: "normal",
                  fontWeight: `${!notification.isChecked ? "bold" : ""}`,
                }}
              >
                {notification.description}
              </Typography>
              <Typography
                color="GrayText"
                sx={{ fontSize: "14px", fontWeight: "bold", paddingTop: "4px" }}
              >
                Tue, 19/3/2023
              </Typography>
              <Divider
                sx={{
                  backgroundColor: "#E0E0E0",
                  width: "100%",
                  marginTop: "10px",
                }}
              />
            </BoxCustom>
          </MenuNotification>
        ))}
    </StyledMenu>
  );
};
