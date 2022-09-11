import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "../../hooks";
import Snackbar from "@mui/material/Snackbar";
import { handleClose } from "../../slices/notification";

export default function Notification() {
  const dispatch = useDispatch();
  const { status, message, isOpen } = useSelector(
    (state) => state.notification
  );

  const onCloseHandler = () => {
    dispatch(handleClose());
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={2000}
      onClose={onCloseHandler}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={status} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
