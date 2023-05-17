import { Stack, Paper, IconButton, InputBase, Popover, TextField } from "@mui/material";
import { GridToolbarFilterButton } from "@mui/x-data-grid";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { searchTemplate } from "slices/template";
import SearchIcon from "@mui/icons-material/Search";
import { RequiredPermission } from "components/RequiredPermission";
import { setViewerLocation } from "slices/location";
import {
  DeviceWidth,
  Permissions,
  ViewerLocationIndex,
} from "utils/constants";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const { IPAD_WIDTH } = DeviceWidth;
export const TemplateManagementToolbar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { innerWidth } = window;

  const { ADD_TEMPLATE } = Permissions;

  const { ADD_TEMPLATE_INDEX } = ViewerLocationIndex;
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
            placeholder={t("Search Template")}
            onChange={(e) =>
              dispatch(searchTemplate({ value: e.target.value }))
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
          placeholder={t("Search Template")}
          onChange={(e) => dispatch(searchTemplate({ value: e.target.value }))}
        />
      </Popover>
      <Stack direction="row" spacing={3} alignItems="center">
        <GridToolbarFilterButton sx={{
          "&.MuiButton-text": {
            fontSize: 0,
          },
          '&.MuiButton-root': {
              mr: -3,
          },
        }}/>
        <RequiredPermission permission={ADD_TEMPLATE}>
          <Link
            to="/viewer"
            className="no-underline"
            onClick={() =>
              dispatch(
                setViewerLocation({
                  viewerLocationIndex: ADD_TEMPLATE_INDEX,
                })
              )
            }
          >
            <Stack
              sx={{
                backgroundColor: "#407aff",
                px: 1.5,
                py: 1,
                color: "#fff",
                borderRadius: 2,
              }}
              direction="row"
              whiteSpace="nowrap"
              alignItems="center"
            >
              <AddIcon className="md:mr-2" />
              {innerWidth > IPAD_WIDTH && t("Add New")}
            </Stack>
          </Link>
        </RequiredPermission>
      </Stack>
    </Stack>
  );
};
