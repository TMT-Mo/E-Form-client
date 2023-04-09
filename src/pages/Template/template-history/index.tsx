import { useEffect } from "react";
import DataTable from "../../../components/DataTable";
import { useDispatch, useSelector } from "../../../hooks";
import { getTemplates } from "../../../slices/template";
import {
  DataTableHeader,
} from "../../../utils/constants";
import { useTranslation } from "react-i18next";
import { DateFilter } from "../../../models/mui-data";

const { TYPE, TYPE_TEMPLATE, STATUS, CREATED_AT, UPDATED_AT } = DataTableHeader;
const TemplateHistory = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { filter, sorter } = useSelector((state) => state.filter);
  const { searchItemValue, currentPage } = useSelector(
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

  return (
    <div className="flex flex-col py-10 space-y-6">
      <h2>{t("History")}</h2>
      <div className="flex flex-col rounded-md border border-gray-400 bg-white">
        <DataTable />
      </div>
    </div>
  );
};

export default TemplateHistory;
