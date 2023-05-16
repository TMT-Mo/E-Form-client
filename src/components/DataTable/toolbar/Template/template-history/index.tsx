import { Stack, Paper, IconButton, InputBase } from "@mui/material";
import { GridToolbarFilterButton } from "@mui/x-data-grid";
import { useDispatch } from "hooks";
import { useTranslation } from "react-i18next";
import { searchTemplate } from "slices/template";
import SearchIcon from "@mui/icons-material/Search";



export const TemplateHistoryToolBar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <Stack justifyContent="space-between" padding={3} direction="row">
      <Paper
        // component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: `${window.innerWidth < 720 ? '200px' : '300px'}`,
        }}
        variant="outlined"
      >
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={t("Search Template")}
          onChange={(e) => dispatch(searchTemplate({ value: e.target.value }))}
        />
      </Paper>
      <GridToolbarFilterButton />
    </Stack>
  );
};

