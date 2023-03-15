import { Typography, Divider, MenuItem, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../../../../../hooks";
import {
  checkNotification,
  getNotification,
} from "../../../../../slices/notification";
import { StyledMenu } from "../../../../CustomStyled";

interface Props {
  open: boolean;
  handleClose: () => void;
  anchorEl: null | HTMLElement;
}

export const Notification = (props: Props) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { notificationList, isGetNotification } = useSelector((state) => state.notification);
  const { open, anchorEl, handleClose } = props;

  useEffect(() => {
    const handleNotification = dispatch(
      getNotification({ userId: userInfo?.userId! })
    );
    handleNotification.unwrap();

    return () => handleNotification.abort();
  }, [dispatch, userInfo?.userId]);

  useEffect(() => {
    notificationList &&
      dispatch(
        checkNotification({
          notificationId: notificationList.map((noti) => noti.id),
        })
      ).unwrap();
  }, [dispatch, notificationList]);

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
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <Typography variant="h6" ml={2} fontWeight={600} mb={2} component="h1">
        Notifications
      </Typography>
      <Divider />
      {isGetNotification && <CircularProgress/>}
      {notificationList && notificationList.map((notification) => (
        <>
          <MenuItem onClick={handleClose} key={notification.id}>{notification.title}</MenuItem>
          <Divider />
        </>
      ))}
    </StyledMenu>
  );
};
