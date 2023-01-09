import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase, Paper, Button } from "@mui/material";
import React, { useEffect } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import { styled } from "@mui/system";
import DataTable from "../../../components/DataTable";
import { useDispatch, useSelector } from "../../../hooks";
import { getTemplates, searchTemplate } from "../../../slices/template";
import { DataTableHeader, DeviceWidth, StatusTemplate } from "../../../utils/constants";
import { useTranslation } from "react-i18next";

const StyledUploadBtn = styled(Button)({
  backgroundColor: "#fff",
  borderRadius: "10px",
  color: "#407AFF",
  padding: "0px 15px",
  display: 'flex',
  alignItems: 'center',
  height: "80%",
  ":hover": {
    backgroundColor: "#407AFF",
    color: "#fff",
  },
});
//
const { TYPE, IS_ENABLE, TYPE_TEMPLATE, DEPARTMENT, CREATED_BY } =
  DataTableHeader;

const Template = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { filter, sorter } = useSelector((state) => state.filter);
  const { searchItemValue, currentPage } = useSelector(
    (state) => state.template
  );
  const {innerWidth} = window

  useEffect(() => {
    const getTemplateList = dispatch(
      getTemplates({
        templateName_contains: searchItemValue || undefined,
        _page: currentPage,
        _size: 10,
        _sort: sorter ? `${sorter?.field}:${sorter?.sort}` : undefined,
        status_eq: StatusTemplate.APPROVED_TEMPLATE,
        type_eq: filter?.field === TYPE ? (filter.value as string) : undefined,
        typeName_eq:
          filter?.field === TYPE_TEMPLATE
            ? (filter.value as string)
            : undefined,
        isEnable_eq:
          filter?.field === IS_ENABLE ? (filter.value as boolean) : undefined,
        department_eq:
          filter?.field === DEPARTMENT ? (filter.value as string) : undefined,
        createdBy_eq:
          filter?.field === CREATED_BY ? (filter.value as number) : undefined,
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
  ]);

  return (
    <div className="flex flex-col  py-10 space-y-6">
      <h2>{t("Template Management")}</h2>
      <div className="flex flex-col rounded-md border border-gray-400 bg-white">
        <div className="flex px-2 py-6 justify-between space-x-10 scale-90 md:scale-100 md:px-10">
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
          <div className="flex items-center space-x-2 border border-blue-400">
            <StyledUploadBtn
              size="small"
              className="shadow-md"
              variant="outlined"
            >
              <UploadIcon className="md:mr-2"/>
              {innerWidth > DeviceWidth.IPAD_WIDTH && t("Upload")}
            </StyledUploadBtn>
          </div>
        </div>
        <DataTable />
      </div>
    </div>
  );
};

export default Template;
