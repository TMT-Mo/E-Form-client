import SearchIcon from "@mui/icons-material/Search";
import {
  IconButton,
  InputBase,
  Paper,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
import UploadIcon from '@mui/icons-material/Upload';
import AddIcon from '@mui/icons-material/Add';
import { styled } from "@mui/system";
import DataTable from "../../../components/DataTable";
import { getDocumentHistory } from "../../../slices/document";
import { useDispatch, useSelector } from "../../../hooks";

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

const History = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {filter, sorter} = useSelector(state => state.filter)
  const { searchItemValue, currentPage} = useSelector(state => state.document)
  useEffect(() => {
    const getDocumentHistoryList = dispatch(
      getDocumentHistory({
        documentName_contains: searchItemValue || undefined,
        _page: currentPage,
        _size: 10,                                                                  
        _sort: sorter ? `${sorter?.field}:${sorter?.sort}` : undefined,
        createdBy_eq: userInfo?.userId,
        userId: userInfo?.userId!
        // createdAt_lte:
        //   filter?.field === CREATED_AT
        //     ? (filter?.value as DateFilter).endDate
        //     : undefined,
        // createdAt_gte:
        //   filter?.field === CREATED_AT
        //     ? (filter?.value as DateFilter).startDate
        //     : undefined,
        // updateAt_lte:
        //   filter?.field === UPDATED_AT
        //     ? (filter?.value as DateFilter).endDate
        //     : undefined,
        // updateAt_gte:
        //   filter?.field === UPDATED_AT
        //     ? (filter?.value as DateFilter).startDate
        //     : undefined,
      })
    );

    getDocumentHistoryList.unwrap()
    return () => {
      getDocumentHistoryList.abort();
    };
  }, [currentPage, dispatch, filter?.field, filter?.value, searchItemValue, sorter, userInfo?.userId]);
  return (
    <div className="flex flex-col py-10 space-y-6">
      <h2>History</h2>
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
              placeholder="Search Document"
              inputProps={{ "aria-label": "search google maps" }}
            />
          </Paper>
          <div className="flex space-x-8">
            <StyledUploadBtn size="small" className="shadow-md" variant="outlined" startIcon={<UploadIcon />}>
              Select
            </StyledUploadBtn>
          </div>
        </div>
        <DataTable />
      </div>
    </div>
  );
};

export default History;
