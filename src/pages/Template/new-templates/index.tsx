import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase, Paper } from "@mui/material";
import React, { useEffect } from "react";
import DataTable from "../../../components/DataTable";
import { useDispatch, useSelector } from "../../../hooks";
import {
  getTemplates,
  searchTemplate,
} from "../../../slices/template";
import { DataTableHeader, StatusTemplate } from "../../../utils/constants";

const { TYPE, IS_ENABLE, TYPE_TEMPLATE, DEPARTMENT, CREATED_BY } = DataTableHeader;

const NewTemplates = () => {
  const dispatch = useDispatch();
  const { searchItemValue, currentPage, filter, sorter } = useSelector(
    (state) => state.template
  );

  useEffect(() => {
    const getTemplateList = dispatch(
      getTemplates({
        templateName_contains: searchItemValue || undefined,
        _page: currentPage,
        _size: 10,
        _sort: sorter ? `${sorter?.field}:${sorter?.sort}` : undefined,
        status_eq: StatusTemplate.NEW_TEMPLATE,
        typeName_eq:
          filter?.field === TYPE_TEMPLATE
            ? (filter.value as string)
            : undefined,
        createdBy_eq: filter?.field === CREATED_BY
        ? (filter.value as number)
        : undefined,
      })
    )
    //
    getTemplateList.unwrap()
    return () => { getTemplateList.abort()}
  }, [currentPage, dispatch, filter?.field, filter?.value, searchItemValue, sorter]);

  return (
    <div className="flex flex-col px-20 py-10 space-y-6">
      <h2>New Templates</h2>
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
        </div>
        <DataTable />
      </div>
    </div>
  );
};

export default NewTemplates;
