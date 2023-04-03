import RemoveFromQueueIcon from "@mui/icons-material/RemoveFromQueue";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
const CustomNoRow = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full flex justify-center items-center h-full">
      <div className="flex flex-col items-center space-y-3">
        <RemoveFromQueueIcon fontSize="large" />
        <Box>{t("No data in table")}</Box>
      </div>
    </div>
  );
};

export default CustomNoRow;
