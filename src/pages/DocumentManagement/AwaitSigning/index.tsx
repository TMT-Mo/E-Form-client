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
import DataTable from "../../../components/DataTable";

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

const AwaitSigning = () => {
  return (
    <div className="flex flex-col px-20 py-10 space-y-6">
      <h2>Await Signing</h2>
      <div className="flex flex-col rounded-md border border-gray-400 bg-white">
        <div className="flex px-10 py-6 justify-between">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 300,
            }}
            variant="outlined"
          >
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Template"
              inputProps={{ "aria-label": "search google maps" }}
            />
          </Paper>
          <div className="flex space-x-8">
            <StyledUploadBtn size="small" className="shadow-md" variant="outlined" startIcon={<UploadIcon />}>
              Upload
            </StyledUploadBtn>
            <StyledAddBtn variant="outlined" size="small" className="shadow-md" startIcon={<AddIcon />}>
              Add New
            </StyledAddBtn>
          </div>
        </div>
        <DataTable />
      </div>
    </div>
  );
};

export default AwaitSigning;
