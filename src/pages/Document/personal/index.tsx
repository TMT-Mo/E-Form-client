import { useEffect } from "react";
import DataTable from "components/DataTable";
import { getDocuments } from "slices/document";
import { useDispatch, useSelector } from "hooks";
import { useTranslation } from "react-i18next";
import { DataTableHeader } from "utils/constants";
import { DateFilter } from "models/mui-data";

const { CREATED_AT, UPDATED_AT, STATUS, IS_LOCKED, TYPE_DOCUMENT } =
  DataTableHeader;
const PersonalDoc = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { filter, sorter } = useSelector((state) => state.filter);
  const { searchItemValue, currentPage } = useSelector(
    (state) => state.document
  );
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
            typeName_eq:
              filter?.field === TYPE_DOCUMENT
                ? (filter.value as string)
                : undefined,
        status_eq:
          filter?.field === STATUS ? (filter.value as number) : undefined,
        isLocked_eq:
          filter?.field === IS_LOCKED ? (filter.value as boolean) : undefined,
      })
    );

    getDocumentList.unwrap();
    return () => {
      getDocumentList.abort();
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
      <h2>{t("Personal Document")}</h2>
      <div className="flex flex-col rounded-md border border-gray-400 bg-white">
        <DataTable />
      </div>
    </div>
  );
};

export default PersonalDoc;
