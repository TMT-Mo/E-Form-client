import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "15px",
};

interface Props {
  children: string;
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

const TransitionsModal: React.FC<Props> = (props) => {
  const { children, handleOpen, handleClose, open } = props;
  const [firstText, setFirstText] = React.useState('')
  const [secondText, setSecondText] = React.useState('')

  const onSubmit = (e: any) =>{
    e.preventDefault();
    console.log(firstText)
  }
  
  return (
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
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {children}
          </Typography>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col space-y-10 w-full">
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                fullWidth
                margin="normal"
                value={firstText}
                onChange={(e)=>setFirstText(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="Filled"
                variant="filled"
                fullWidth
                value={secondText}
                onChange={(e)=>setSecondText(e.target.value)}
              />
            </div>
            <button
            >
              Save
            </button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};
export default TransitionsModal;
