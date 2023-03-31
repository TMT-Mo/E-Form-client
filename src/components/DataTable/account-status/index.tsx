import { GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import { useTranslation } from "react-i18next";
import { AccountStatus, AccountStatusTag } from "utils/constants";

export const AccountStatusCell = (props: GridRenderCellParams<Date>) => {
  const { value } = props;
  const { t } = useTranslation();
  const status = value as unknown as AccountStatus;
  const createAccountStatus = () => {
    if (status === AccountStatus.ENABLE) {
      return (
        <span className=" px-3 py-1 rounded-md bg-green-100 text-green-600 text-xs border-green-400 border border-solid">
          {t(AccountStatusTag.ENABLE)}
        </span>
      );
    } else {
      return (
        <span className=" px-3 py-1 rounded-md bg-red-100 text-red-600 text-xs border-red-400 border border-solid">
          {t(AccountStatusTag.DISABLE)}
        </span>
      );
    }
  };
  return <div className="flex text-center">{createAccountStatus()}</div>;
};
