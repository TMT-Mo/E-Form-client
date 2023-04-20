import { useEffect } from "react";
import DataTable from "components/DataTable";
import { getDocumentHistory } from "slices/document";
import { useDispatch, useSelector } from "hooks";
import { useTranslation } from "react-i18next";
import { DataTableHeader } from "utils/constants";
import { DateFilter } from "models/mui-data";

const { UPDATED_AT, STATUS, TYPE_DOCUMENT_HISTORY } =
  DataTableHeader;

const History = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { filter, sorter } = useSelector((state) => state.filter);
  const { searchItemValue, currentPage } = useSelector(
    (state) => state.document
  );
  useEffect(() => {
    const getDocumentHistoryList = dispatch(
      getDocumentHistory({
        documentName_contains: searchItemValue || undefined,
        _page: currentPage,
        _size: 10,
        _sort: sorter ? `${sorter?.field}:${sorter?.sort}` : undefined,
        updateAt_lte:
          filter?.field === UPDATED_AT
            ? (filter?.value as DateFilter).endDate
            : undefined,
        updateAt_gte:
          filter?.field === UPDATED_AT
            ? (filter?.value as DateFilter).startDate
            : undefined,
        status_eq:
          filter?.field === STATUS ? (filter.value as number) : undefined,
        typeName_eq:
          filter?.field === TYPE_DOCUMENT_HISTORY
            ? (filter.value as string)
            : undefined,
      })
    );

    getDocumentHistoryList.unwrap();
    return () => {
      getDocumentHistoryList.abort();
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

export default History;
