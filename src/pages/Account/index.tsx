import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase, Paper } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyledAddBtn } from "../../components/CustomStyled";
import DataTable from "../../components/DataTable";
import { useDispatch, useSelector } from "../../hooks";
import { DateFilter } from "../../models/mui-data";
import { getDepartmentList, getRoleList, getUserList, searchAccount } from "../../slices/system";
import { DataTableHeader, DeviceWidth, LocationIndex } from "../../utils/constants";
import AddIcon from "@mui/icons-material/Add";
import { setLocation } from "../../slices/location";

const { TYPE, CREATED_AT, CREATED_BY } = DataTableHeader;
export const Account = () => {
  const dispatch = useDispatch();
  // const { userInfo } = useSelector((state) => state.auth);
  const { filter, sorter } = useSelector((state) => state.filter);
  const { searchItemValue, currentPage, roleList } = useSelector((state) => state.system);
  const { t } = useTranslation();

  const getRoles = useCallback(async () => {
    await dispatch(getRoleList()).unwrap();
  }, [dispatch]);

  const getDepartments = useCallback(async () => {
    await dispatch(getDepartmentList()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    getRoles();
    getDepartments()
  }, [getDepartments, getRoles]);
  
  useEffect(() => {
    const getUser = dispatch(
      getUserList({
        _page: currentPage,
        _size: 10,
        _sort: sorter ? `${sorter?.field}:${sorter?.sort}` : undefined,
        type_eq: filter?.field === TYPE ? (filter.value as string) : undefined,
        createdBy_eq:
          filter?.field === CREATED_BY ? (filter.value as number) : undefined,
        createdAt_lte:
          filter?.field === CREATED_AT
            ? (filter?.value as DateFilter).endDate
            : undefined,
        createdAt_gte:
          filter?.field === CREATED_AT
            ? (filter?.value as DateFilter).startDate
            : undefined,
      })
    );

    getUser.unwrap();
    return () => {
      getUser.abort();
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
    <div className="flex flex-col py-10 space-y-6">
      <h2>{t("Account Management")}</h2>
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
              placeholder={t("Search Account")}
              inputProps={{ "aria-label": "search google maps" }}
              onChange={(e) =>
                dispatch(searchAccount({ value: e.target.value }))
              }
            />
          </Paper>
          <div className="flex">
            <StyledAddBtn
              variant="outlined"
              size="small"
              onClick={() =>
                dispatch(
                  setLocation({
                    locationIndex: LocationIndex.ADD_ACCOUNT,
                  })
                )
              }
            >
              <AddIcon className="md:mr-2" />
              {t("Add")}
            </StyledAddBtn>
          </div>
        </div>
        <DataTable />
      </div>
    </div>
  );
};
