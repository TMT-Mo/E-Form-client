import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "components/DataTable";
import { useDispatch, useSelector } from "hooks";
import { DateFilter } from "models/mui-data";
import { getUserList } from "slices/system";
import { DataTableHeader } from "utils/constants";

const { TYPE, CREATED_AT, CREATED_BY, ROLE_NAME, DEPARTMENT, STATUS } = DataTableHeader;
export const Account = () => {
  const dispatch = useDispatch();
  // const { userInfo } = useSelector((state) => state.auth);
  const { filter, sorter } = useSelector((state) => state.filter);
  const { searchItemValue, currentPage,  } = useSelector((state) => state.system);
  const { t } = useTranslation();
  
  useEffect(() => {
    const getUser = dispatch(
      getUserList({
        userName_contains: searchItemValue,
        _page: currentPage,
        _size: 10,
        _sort: sorter ? `${sorter?.field}:${sorter?.sort}` : undefined,
        roleId_eq: filter?.field === ROLE_NAME ? (filter.value as number) : undefined,
        departmentId_eq: filter?.field === DEPARTMENT ? (filter.value as number) : undefined,
        status_eq:
          filter?.field === STATUS ? (filter.value as number) : undefined,
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
    // return () => {
    //   getUser.abort();
    // };
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
        <DataTable />
      </div>
    </div>
  );
};
