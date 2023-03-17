import React from "react";
import { useTranslation } from "react-i18next";

export const AddAccount = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col py-10 space-y-6">
      <h2>{t("Add Account")}</h2>
      <div className="flex flex-col rounded-md border border-gray-400 bg-white"></div>
    </div>
  );
};
