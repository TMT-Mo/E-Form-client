import { Typography, Divider, MenuItem, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../../../hooks";
import { checkNotification } from "../../../../../slices/notification";
import { MenuNotification, StyledMenu } from "../../../../CustomStyled";

interface Props {
  open: boolean;
  handleClose: () => void;
  anchorEl: null | HTMLElement;
}

export const Notification = (props: Props) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { notificationList, isGetNotification } = useSelector(
    (state) => state.notification
  );
  const { open, anchorEl, handleClose } = props;

  useEffect(() => {
    if (open && notificationList)
      dispatch(
        checkNotification({
          notificationId: notificationList.map((noti) => noti.id),
        })
      ).unwrap();
  }, [dispatch, notificationList, open]);

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
      {isGetNotification && <CircularProgress />}
      {notificationList &&
        notificationList.map((notification) => (
          <>
            <MenuNotification onClick={handleClose} key={notification.id}>
                <span className="font-bold text-xl">{notification.title}</span>
                <p>{notification.description}</p>
                <Divider />
            </MenuNotification>
          </>
        ))}
    </StyledMenu>
  );
};
