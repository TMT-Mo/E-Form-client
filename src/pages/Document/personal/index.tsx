import SearchIcon from "@mui/icons-material/Search";
import {
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import React, { useEffect } from "react";
import DataTable from "../../../components/DataTable";
import { getDocuments, searchDocument } from "../../../slices/document";
import { useDispatch, useSelector } from "../../../hooks";
import { useTranslation } from "react-i18next";
import { DataTableHeader } from "../../../utils/constants";
import { DateFilter } from "../../../models/mui-data";

const { TYPE, TYPE_TEMPLATE, STATUS, CREATED_AT, UPDATED_AT } = DataTableHeader;
const PersonalDoc = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {filter, sorter} = useSelector(state => state.filter)
  const { searchItemValue, currentPage} = useSelector(state => state.document)
  const { t } = useTranslation();

  useEffect(() => {
    const getDocumentList = dispatch(
      getDocuments({
        documentName_contains: searchItemValue || undefined,
        _page: currentPage,
        _size: 10,                                                                  
        _sort: sorter ? `${sorter?.field}:${sorter?.sort}` : undefined,
        createdBy_eq: userInfo?.userId,
        createdAt_lte:
          filter?.field === CREATED_AT
            ? (filter?.value as DateFilter).endDate
            : undefined,
        createdAt_gte:
          filter?.field === CREATED_AT
            ? (filter?.value as DateFilter).startDate
            : undefined,
        updateAt_lte:
          filter?.field === UPDATED_AT
            ? (filter?.value as DateFilter).endDate
            : undefined,
        updateAt_gte:
          filter?.field === UPDATED_AT
            ? (filter?.value as DateFilter).startDate
            : undefined,
      })
    );

    getDocumentList.unwrap()
    return () => {
      getDocumentList.abort();
    };
  }, [currentPage, dispatch, filter?.field, filter?.value, searchItemValue, sorter, userInfo?.userId]);
  
  return (
    <div className="flex flex-col px-20 py-10 space-y-6">
      <h2>{t ("Personal Document")}</h2>
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
              placeholder={t ("Search Document")}
              inputProps={{ "aria-label": "search google maps" }}
              onChange={(e) =>
                dispatch(searchDocument({ value: e.target.value }))
              }
            />
          </Paper>
        </div>
        <DataTable />
      </div>
    </div>
  );
};

export default PersonalDoc;
