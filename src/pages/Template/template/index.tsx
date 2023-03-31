import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase, Paper } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import DataTable from "components/DataTable";
import { useDispatch, useSelector } from "hooks";
import { getTemplates, searchTemplate } from "slices/template";
import {
  DataTableHeader,
  Permissions,
  StatusTemplate,
} from "utils/constants";
import { useTranslation } from "react-i18next";
import { helpers } from "utils";

const { TYPE, IS_ENABLE, TYPE_TEMPLATE, DEPARTMENT, CREATED_BY } =
  DataTableHeader;

const { ENABLE_TEMPLATE } = Permissions;

const Template = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { filter, sorter } = useSelector((state) => state.filter);
  const { searchItemValue, currentPage } = useSelector(
    (state) => state.template
  );

  const checkEnablePermission = useCallback(
    () => {
      const {checkHideColumnFromPermission} = helpers
      if(!checkHideColumnFromPermission(ENABLE_TEMPLATE)){
        return true
      }
      if(filter?.field === IS_ENABLE) return (filter?.value as boolean)
      return undefined
    },
    [filter?.field, filter?.value],
  )
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
          checkEnablePermission(),
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
  }, [checkEnablePermission, currentPage, dispatch, filter?.field, filter?.value, searchItemValue, sorter]);

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
        </div>
        <DataTable />
      </div>
    </div>
  );
};

export default Template;
