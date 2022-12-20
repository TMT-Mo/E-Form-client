import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase, Paper, Button } from "@mui/material";
import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import DataTable from "../../../components/DataTable";
import { useDispatch, useSelector } from "../../../hooks";
import {
  getTemplates,
  searchTemplate,
} from "../../../slices/template";
import { setViewerLocation } from "../../../slices/location";
import { DataTableHeader, ViewerLocationIndex } from "../../../utils/constants";

const StyledAddBtn = styled(Button)({
  backgroundColor: "#407AFF",
  borderRadius: "10px",
  color: "#fff",
  padding: "0px 15px",
  height: "80%",
  textDecoration: "none",
  ":hover": {
    color: "#407AFF",
  },
});

const {ADD_TEMPLATE} = ViewerLocationIndex
const { TYPE, IS_ENABLE, TYPE_TEMPLATE, DEPARTMENT, STATUS } = DataTableHeader;
const TemplateHistory = () => {
  const dispatch = useDispatch();
  const { searchItemValue, currentPage, filter } = useSelector(
    (state) => state.template
  );
  const {userInfo} = useSelector(state => state.auth)

  useEffect(() => {
    const getTemplateList = dispatch(
      getTemplates({
        templateName_contains: searchItemValue || undefined,
        _page: currentPage ,
        _size: 10,
        _sort: undefined,
        createdBy_eq: userInfo?.userId,
        status_eq: filter?.field === STATUS ? (filter.value as number) : undefined,
      })
    );
    return () => { getTemplateList.abort()}
  }, [currentPage, dispatch, filter?.field, filter?.value, searchItemValue, userInfo?.userId]);

  return (
    <div className="flex flex-col px-20 py-10 space-y-6">
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
              placeholder="Search Template"
              onChange={(e) =>
                dispatch(searchTemplate({ value: e.target.value }))
              }
            />
          </Paper>
          <div className="flex space-x-8">
            
            <Link to="/viewer" className="no-underline" onClick={() => dispatch(setViewerLocation({viewerLocationIndex: ADD_TEMPLATE}))}>
              <StyledAddBtn
                variant="outlined"
                size="small"
                className="shadow-md"
                startIcon={<AddIcon />}
              >
                Add New
              </StyledAddBtn>
            </Link>
          </div>
        </div>
        <DataTable />
      </div>
    </div>
  );
};

export default TemplateHistory;
