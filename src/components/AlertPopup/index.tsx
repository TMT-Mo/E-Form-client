import React, { useEffect } from "react";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "../../hooks";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { handleClose } from "../../slices/notification";

interface Props {
  anchorOrigin: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  } | undefined;
  autoHideDuration: number | undefined;
}

const AlertPopup: React.FC<Props> = ({ anchorOrigin, autoHideDuration }) => {
  const dispatch = useDispatch();
  const { status, message, errorMessage, isOpen } = useSelector(
    (state) => state.notification
  );

  const onCloseHandler = () => {
    dispatch(handleClose());
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={autoHideDuration ?? 2000}
      onClose={onCloseHandler}
      anchorOrigin={anchorOrigin ?? { vertical: "bottom", horizontal: "right" }}
    >
      <Alert severity={status} sx={{ width: "100%" }}>
        {message ?? errorMessage}
      </Alert>
    </Snackbar>
  );
};

export default AlertPopup;
