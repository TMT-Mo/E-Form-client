import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase, Paper, Button } from "@mui/material";
import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import DataTable from "../../../components/DataTable";
import { useDispatch, useSelector } from "../../../hooks";
import { getTemplates, searchTemplate } from "../../../slices/template";
import { setViewerLocation } from "../../../slices/location";
import {
  DataTableHeader,
  Permissions,
  ViewerLocationIndex,
} from "../../../utils/constants";
import { RequiredPermission } from "../../../components/RequiredPermission";
import { useTranslation } from "react-i18next";
import { DateFilter } from "../../../models/mui-data";

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

const { ADD_TEMPLATE } = Permissions;

const { ADD_TEMPLATE_INDEX } = ViewerLocationIndex;
const { TYPE, TYPE_TEMPLATE, STATUS, CREATED_AT, UPDATED_AT } = DataTableHeader;
const TemplateHistory = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.filter);
  const { searchItemValue, currentPage, sorter } = useSelector(
    (state) => state.template
  );
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const getTemplateList = dispatch(
      getTemplates({
        templateName_contains: searchItemValue || undefined,
        _page: currentPage,
        _size: 10,
        _sort: sorter ? `${sorter?.field}:${sorter?.sort}` : undefined,
        type_eq: filter?.field === TYPE ? (filter.value as string) : undefined,
        createdBy_eq: userInfo?.userId,
        status_eq:
          filter?.field === STATUS ? (filter.value as number) : undefined,
        typeName_eq:
          filter?.field === TYPE_TEMPLATE
            ? (filter.value as string)
            : undefined,
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
    getTemplateList.unwrap();
    return () => {
      getTemplateList.abort();
    };
  }, [
    currentPage,
    dispatch,
    filter?.field,
    filter?.value,
    searchItemValue,
    sorter,
    userInfo?.userId,
  ]);
  const { t } = useTranslation();
  return (
    <div className="flex flex-col px-20 py-10 space-y-6">
      <h2>{t("History")}</h2>
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
              placeholder={t("Search Template")}
              onChange={(e) =>
                dispatch(searchTemplate({ value: e.target.value }))
              }
            />
          </Paper>
          <RequiredPermission permission={ADD_TEMPLATE}>
            <div className="flex space-x-8">
              <Link
                to="/viewer"
                className="no-underline"
                onClick={() =>
                  dispatch(
                    setViewerLocation({
                      viewerLocationIndex: ADD_TEMPLATE_INDEX,
                    })
                  )
                }
              >
                <StyledAddBtn
                  variant="outlined"
                  size="small"
                  className="shadow-md"
                  startIcon={<AddIcon />}
                >
                  {t("Add New")}
                </StyledAddBtn>
              </Link>
            </div>
          </RequiredPermission>
        </div>
        <DataTable />
      </div>
    </div>
  );
};

export default TemplateHistory;
