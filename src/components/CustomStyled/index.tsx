import { styled } from "@mui/system";
import { Button, Menu, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import MenuItem from "@mui/material/MenuItem";

export const TransparentBtn = styled(
  Button,
  {}
)({
  backgroundColor: "transparent",
  borderRadius: "5px",
  color: "#fff",
  padding: "5px",
  textTransform: "unset",
  ":hover": { backgroundColor: "#fff", color: "#000" },
});

export const WhiteBtn = styled(
  Button,
  {}
)({
  backgroundColor: "#fff",
  borderRadius: "5px",
  color: "#407AFF",
  padding: "5px",
  textTransform: "unset",
  // ":hover": { backgroundColor: "#407AFF", color: "#fff", },
});

export const TextFieldStyled = styled(TextField)({
  color: "#fff",
  input: {
    color: "#fff",
  },
  "& .MuiSvgIcon-root": {
    fill: "#fff",
  },
});

export const SaveLoadingBtn = styled(
  LoadingButton,
  {}
)({
  backgroundColor: "#407AFF",
  borderRadius: "5px",
  color: "#fff",
  padding: "5px",
  textTransform: "unset",
  ":hover": { backgroundColor: "#578aff" },
  "&.Mui-disabled": {
    color: "#F2F2F2",
    backgroundColor: "#6F7276",
  },
  "&.MuiLoadingButton-loading": {
    backgroundColor: "#fff",
    borderColor: "#407AFF",
  },
});

export const RejectBtn = styled(
  Button,
  {}
)({
  backgroundColor: "#ff5252",
  borderRadius: "5px",
  color: "#fff",
  paddingTop: "10px",
  paddingBottom: "10px",
  ":hover": { backgroundColor: "#fff", color: "#407AFF" },
  "&.Mui-disabled": {
    color: "#F2F2F2",
    backgroundColor: "#6F7276",
  },
});

export const StyledMenu = styled(Menu)({
  "& .MuiPaper-root": {
    padding: "20px 0px",
  },
  "& .MuiMenu-list": {
    width: "350px",
    minHeight: '150px',
    maxHeight: '300px'
  },
  "& .MuiMenuItem-root": {
    marginTop: "10px",
    // borderBottom: '1px solid #000'
  },
});

export const StyledAddBtn = styled(Button)({
  backgroundColor: "#407AFF",
  borderRadius: "10px",
  color: "#fff",
  padding: "0px 15px",
  height: "80%",
  alignItems: "center",
  ":hover": {
    color: "#407AFF",
  },
});

export const MenuNotification = styled(MenuItem)({
  display: "flex",
  alignItems: 'center'
});

