import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TransitionsModal from "../components/TransitionModal";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Stack from "@mui/material/Stack";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import DataTable from "../components/DataTable";
import { LoginArgument } from "../models/auth";
import { useDispatch, useSelector } from "../hooks";
import { getToken, setUserInfo } from "../slices/auth";
import CircularProgress from "@mui/material/CircularProgress";

const accountLogin: LoginArgument = {
  username: "197sv00001",
  password: "VLU00001",
};

const Welcome = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  // const { token, isLoginLoading } = useSelector((state) => state.auth);

  // const handleOpen = useCallback(async () => {
  //   await dispatch(getToken(accountLogin));
  // }, [token]);
  // const handleClose = () => setOpen(false);
  // console.log(open)

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

  console.count();

  // useEffect(() => {
  //   if (token) {
  //     dispatch(setUserInfo({ token }));
  //     setOpen(true);
  //   }
  // }, [token]);

  return (
    <div className="w-screen h-screen flex bg-blue-300">
      <LoadingButton
        loading={open! ? true : false}
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="outlined"
        // onClick={handleOpen}
        // style={{background: '#000'}}
        className="h-fit bg-black text-white font-semibold"
      >
        Save
      </LoadingButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        // onClose={handleClose}
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
      {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        // open={isLoginLoading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
    </div>
  );
};

export default Welcome;
