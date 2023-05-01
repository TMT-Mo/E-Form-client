import styled from "@emotion/styled";
import {
  Typography,
  Divider,
  MenuItem,
  CircularProgress,
  Stack,
  Box,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "hooks";
import { MenuNotification, StyledMenu } from "components/CustomStyled";
import CircleIcon from "@mui/icons-material/Circle";
import { helpers } from "utils";
import { useTranslation } from "react-i18next";
import { checkNotification } from "slices/notification";

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
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    notificationList,
    isGetNotification,
    isCheckNotificationLoading,
    hasNewNotification,
  } = useSelector((state) => state.notification);
  const { userInfo } = useSelector((state) => state.auth);
  const { open, anchorEl, handleClose } = props;

  const handleCheckNotifications = () => {
    dispatch(
      checkNotification({ isChecked: true, userId: [+userInfo?.userId!] })
    ).unwrap();
  };

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
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={3}
        pb={2}
      >
        <Typography variant="h6" fontWeight={600} component="h1">
          {t("Notifications")}
        </Typography>
        <Stack direction="row" alignItems="center">
          <Button
            sx={{ textTransform: "none" }}
            onClick={handleCheckNotifications}
            disabled={!hasNewNotification}
          >
            <Typography
              fontWeight={600}
              component="h1"
              color={`${hasNewNotification ? "#407AFF" : "#707070"}`}
            >
              {t("Mark read all")}
            </Typography>
          </Button>
          {isCheckNotificationLoading && (
            <CircularProgress sx={{ fill: "#407AFF", scale: "50%" }} />
          )}
        </Stack>
      </Stack>
      <Divider />
      {isGetNotification && (
        <MenuItem sx={{ height: "100%", width: "100%", margin: "auto" }}>
          <CircularProgress />
        </MenuItem>
      )}
      {notificationList.length === 0 && !isGetNotification && (
        <MenuNotification>
          <Typography sx={{ width: "100%", textAlign: "center" }}>
            {t("Empty")}
          </Typography>
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
                {t(notification.description)}
              </Typography>
              <Typography
                color="GrayText"
                sx={{ fontSize: "14px", fontWeight: "bold", paddingTop: "4px" }}
              >
                {helpers.addHours(notification.createdAt)}
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
