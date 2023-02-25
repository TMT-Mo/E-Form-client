import { GridRenderCellParams } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";

export const TranslateContent = (params: GridRenderCellParams) => {
  const { t } = useTranslation();
  const content = params.value!
  // console.log(params)
  return (
    <div className="w-fit">{t(content)}</div>
  );
};
