import {
  Stack,
  Paper,
  IconButton,
  InputBase,
  Popover,
  TextField,
} from "@mui/material";
import { GridToolbarFilterButton } from "@mui/x-data-grid";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { searchDocument } from "slices/document";
import SearchIcon from "@mui/icons-material/Search";
import { DeviceWidth } from "utils/constants";
import { useSelector } from "hooks";
export const HistoryDocumentToolBar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { searchItemValue } = useSelector((state) => state.document);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Stack justifyContent="space-between" padding={3} direction="row">
      {window.innerWidth < DeviceWidth.IPAD_WIDTH ? (
        <Paper
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            border: 0,
          }}
          variant="outlined"
        >
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={handleClick}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      ) : (
        <Paper
          // component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: `${window.innerWidth < 720 ? "200px" : "300px"}`,
          }}
          variant="outlined"
        >
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={t("Search Document")}
            value={searchItemValue}
            onChange={(e) =>
              dispatch(searchDocument({ value: e.target.value }))
            }
          />
        </Paper>
      )}
      <Popover
        id={id}
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <TextField
          value={searchItemValue}
          placeholder={t("Search Document")}
          onChange={(e) => dispatch(searchDocument({ value: e.target.value }))}
        />
      </Popover>
      <GridToolbarFilterButton
        sx={{
          "&.MuiButton-text": {
            fontSize: 0,
          },
          "&.MuiButton-root": {
            mr: -3,
          },
        }}
      />
    </Stack>
  );
};
