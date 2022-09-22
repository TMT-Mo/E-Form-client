import React, { useCallback, useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { Backdrop, Box, Fade, Modal, SnackbarOrigin } from "@mui/material";
import DataTable from "../../components/DataTable";
import { LoginArgument } from "../../models/auth";
import { useDispatch, useSelector } from "../../hooks";
import { login, setUserInfo } from "../../slices/auth";
import CircularProgress from "@mui/material/CircularProgress";
import { getToken } from "../../utils/token";
import "./Welcome.scss";
import { handleError, handleSuccess } from "../../slices/notification";
import { ResponseStatus } from "../../utils/constants";
import Notification from "../../components/Notification";
import { Link, Navigate } from "react-router-dom";

const accountLogin: LoginArgument = {
  username: "197sv00001",
  password: "VLU00001",
};

export interface State extends SnackbarOrigin {
  open: boolean;
}

const Welcome: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { isLoginLoading } = useSelector((state) => state.auth);
  const token = getToken();
  console.count();

  const handleOpen = useCallback(async () => {
    await dispatch(login(accountLogin)).then((response) => {
      if (response.meta.requestStatus === ResponseStatus.FULFILLED) {
        dispatch(handleSuccess({ message: "Login successfully!" }));
      } else {
        dispatch(handleError({ message: "failed" }));
      }
    });
  }, [dispatch]);

  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    if (token) {
      dispatch(setUserInfo({ token }));
      setOpen(true);
    }
  }, [dispatch, token]);

  return (
    <div className="w-screen h-screen flex bg-blue-300 dark">
      <LoadingButton
        loading={open! ? true : false}
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="outlined"
        onClick={handleOpen}
        style={{ background: "#000" }}
        className="h-fit bg-black text-white font-semibold"
      >
        Save
      </LoadingButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <DataTable></DataTable>
          </Box>
        </Fade>
      </Modal>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoginLoading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Notification />
      <div className="box btn-primary">aaaa</div>
        <Link to="/login" replace>jjjjj</Link>
    </div>
  );
};

export default Welcome;
