import { Stack, Paper, IconButton, InputBase,  } from "@mui/material";
import { GridToolbarFilterButton } from "@mui/x-data-grid";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { searchTemplate } from "slices/template";
import SearchIcon from "@mui/icons-material/Search";
import { RequiredPermission } from "components/RequiredPermission";
import { setViewerLocation } from "slices/location";
import { DeviceWidth, Permissions, ViewerLocationIndex } from "utils/constants";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

export const TemplateManagementToolbar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { innerWidth } = window;

  const { ADD_TEMPLATE } = Permissions;

  const { ADD_TEMPLATE_INDEX } = ViewerLocationIndex;
  return (
    <Stack justifyContent="space-between" padding={3} direction="row">
      <Paper
        // component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: `${window.innerWidth < 720 ? "150px" : "300px"}`,
        }}
        variant="outlined"
      >
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={t("Search Template")}
          onChange={(e) => {
            dispatch(searchTemplate({ value: e.target.value }));
          }}
        />
      </Paper>
      <Stack direction="row" spacing={3} alignItems="center">
        <GridToolbarFilterButton
        />
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
                px: 1,
                py: 1,
                color: "#fff",
                borderRadius: 2,
              }}
              direction="row"
              whiteSpace="nowrap"
              alignItems="center"
            >
              <AddIcon className="md:mr-2" />
              {innerWidth > DeviceWidth.IPAD_WIDTH && t("Add New")}
            </Stack>
          </Link>
        </RequiredPermission>
      </Stack>
    </Stack>
  );
};
