import SearchIcon from "@mui/icons-material/Search";
import {
  IconButton,
  InputBase,
  Paper,
  Button,
} from "@mui/material";
import React from "react";
import UploadIcon from '@mui/icons-material/Upload';
import AddIcon from '@mui/icons-material/Add';
import { styled } from "@mui/system";
import DataTable from "../../components/DataTable";

const StyledUploadBtn = styled(Button)({
  backgroundColor: '#fff',
  borderRadius: '10px',
  color: '#407AFF',
  padding: '0px 15px',
  height: '80%',
  ':hover':{
    backgroundColor: '#407AFF',
    color: '#fff'
  }
})

const StyledAddBtn = styled(Button)({
  backgroundColor: '#407AFF',
  borderRadius: '10px',
  color: '#fff',
  padding: '0px 15px',
  height: '80%',
  ':hover':{
    color: '#407AFF'
  }
})

const ChangePassword = () => {
  return (
    <div>Change Password</div>
  );
};

export default ChangePassword;
