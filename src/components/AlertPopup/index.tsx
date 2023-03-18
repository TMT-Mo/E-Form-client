import React from "react";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "../../hooks";
import Snackbar from "@mui/material/Snackbar";
import { handleClose } from "../../slices/alert";
import { useTranslation } from "react-i18next";

interface Props {
  anchorOrigin: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  } | undefined;
  autoHideDuration: number | undefined;
}

const AlertPopup: React.FC<Props> = ({ anchorOrigin, autoHideDuration }) => {
  const {t} = useTranslation()
  const dispatch = useDispatch();
  const { status, message, errorMessage, isOpen } = useSelector(
    (state) => state.alert
  );

  const onCloseHandler = () => {
    dispatch(handleClose());
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={5000}
      onClose={onCloseHandler}
      anchorOrigin={anchorOrigin ?? { vertical: "bottom", horizontal: "right" }}
    >
      <Alert severity={status} sx={{ width: "100%", backgroundColor:'#fff' }} variant="outlined">
        {t(message ?? errorMessage!)}
      </Alert>
    </Snackbar>
  );
};

export default AlertPopup;
