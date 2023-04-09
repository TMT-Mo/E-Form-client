import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "components/DataTable";
import { useDispatch, useSelector } from "hooks";
import { DateFilter } from "models/mui-data";
import { getTemplates } from "slices/template";
import { DataTableHeader, StatusTemplate } from "utils/constants";

const { TYPE_TEMPLATE, CREATED_BY, CREATED_AT } =
  DataTableHeader;

const NewTemplates = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {filter, sorter} = useSelector(state => state.filter)
  const { searchItemValue, currentPage } = useSelector(
    (state) => state.template
  );

  useEffect(() => {
    const getTemplateList = dispatch(
      getTemplates({
        templateName_contains: searchItemValue || undefined,
        _page: currentPage,
        _size: 10,
        _sort: sorter ? `${sorter?.field}:${sorter?.sort}` : undefined,
        status_eq: StatusTemplate.NEW_TEMPLATE,
        typeName_eq:
          filter?.field === TYPE_TEMPLATE
            ? (filter.value as string)
            : undefined,
        createdBy_eq:
          filter?.field === CREATED_BY ? (filter.value as number) : undefined,
        createdAt_lte:
          filter?.field === CREATED_AT ?
          (filter.value as DateFilter).endDate : undefined,
        createdAt_gte:
          filter?.field === CREATED_AT ?
          (filter.value as DateFilter).startDate : undefined,
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
    <div className="flex flex-col py-10 space-y-6">
      <h2>{t("New Templates")}</h2>
      <div className="flex flex-col rounded-md border border-gray-400 bg-white">
        <DataTable />
      </div>
    </div>
  );
};

export default NewTemplates;
