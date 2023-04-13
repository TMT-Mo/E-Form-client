import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "components/DataTable";
import { useDispatch, useSelector } from "hooks";
import { DateFilter, GetRowIdParams } from "models/mui-data";
import {
  clearAccountPagination,
  getUserList,
  onChangeAccountPage,
} from "slices/system";
import { DataTableHeader } from "utils/constants";
import {
  DataGrid,
  viVN,
  enUS,
  GridColumnVisibilityModel,
  GridFilterModel,
  GridSortModel,
} from "@mui/x-data-grid";
import CustomNoRow from "components/CustomNoRow";
import CustomPagination from "components/DataTable/pagination";
import i18n from "i18n/i18n";
import { accountColumns } from "utils/mui-data";
import { AccountManagementToolBar } from "components/DataTable/toolbar/System/account-management";
import { setFilter, setSorter } from "slices/filter";
import React from "react";
const getRowId = (params: GetRowIdParams) => {
  return params.id;
};

const { TYPE, CREATED_AT, CREATED_BY } = DataTableHeader;
export const Account = () => {
  const dispatch = useDispatch();
  // const { userInfo } = useSelector((state) => state.auth);
  const { filter, sorter } = useSelector((state) => state.filter);
  const {
    searchItemValue,
    currentPage,
    userList,
    isGetUserListLoading,
    total,
  } = useSelector((state) => state.system);
  const { t } = useTranslation();
  const [columnVisibilityModel, setColumnVisibilityModel] =
    React.useState<GridColumnVisibilityModel>();

  useEffect(() => {
    const getUser = dispatch(
      getUserList({
        userName_eq: searchItemValue,
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

  const onFilterChange = React.useCallback(
    (filterModel: GridFilterModel) => {
      // Here you save the data you need from the filter model

      const { value, columnField } = filterModel.items[0];
      if (!value) {
        dispatch(setFilter(undefined));
        return;
      }
      dispatch(clearAccountPagination());
      dispatch(setFilter({ field: columnField as DataTableHeader, value }));
    },
    [dispatch]
  );

  const handleSortModelChange = React.useCallback(
    (sortModel: GridSortModel) => {
      // Here you save the data you need from the sort model
      if (!sortModel[0]) {
        dispatch(setSorter(undefined));
        return;
      }
      const { field, sort } = sortModel[0];
      dispatch(setSorter({ field: field as DataTableHeader, sort: sort! }));
    },
    [dispatch]
  );

  return (
    <div className="flex flex-col py-10 space-y-6">
      <h2>{t("Account Management")}</h2>
      <div className="flex flex-col rounded-md border border-gray-400 bg-white">
        <div style={{ height: 670, width: "100%" }}>
          <DataGrid
            rows={userList}
            columns={accountColumns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            loading={isGetUserListLoading}
            getRowId={getRowId}
            onFilterModelChange={onFilterChange}
            filterMode="server"
            // filterModel={data().filterModel!}
            sortingMode="server"
            localeText={
              (i18n.language === "vn" ? viVN : enUS).components.MuiDataGrid
                .defaultProps.localeText
            }
            onSortModelChange={handleSortModelChange}
            // columnVisibilityModel={
            //   columnVisibilityModel
            //     ? columnVisibilityModel
            //     : (accountColumns as GridColumnVisibilityModel)
            // }
            onColumnVisibilityModelChange={(newModel) =>
              setColumnVisibilityModel(newModel)
            }
            hideFooterPagination
            hideFooter
            components={{
              NoRowsOverlay: CustomNoRow,
              Toolbar: AccountManagementToolBar,
            }}
            componentsProps={{
              panel: {
                placement: "bottom-end",
              },
              columnsPanel: {
                sx: {
                  "& .MuiDataGrid-panelFooter button:first-child": {
                    display: "none",
                  },
                },
              },
            }}
            sx={{
              borderTop: "none",
              ".MuiDataGrid-columnHeaders": {
                borderTop: "1px solid #E0E0E0",
              },
            }}
          />
          {userList.length > 0 && (
            <CustomPagination
              currentPage={currentPage!}
              totalPages={Math.ceil(total! / 10)}
              onChangePage={(e, value) => {
                dispatch(onChangeAccountPage({ selectedPage: --value }));
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
