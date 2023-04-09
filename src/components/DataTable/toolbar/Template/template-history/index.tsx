import { Stack, Paper, IconButton, InputBase } from "@mui/material";
import { GridToolbarFilterButton } from "@mui/x-data-grid";
import { StyledAddBtn } from "components/CustomStyled";
import { RequiredPermission } from "components/RequiredPermission";
import { useDispatch } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { setViewerLocation } from "slices/location";
import { searchTemplate } from "slices/template";
import { DeviceWidth, Permissions, ViewerLocationIndex } from "utils/constants";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

const { ADD_TEMPLATE } = Permissions;

const { ADD_TEMPLATE_INDEX } = ViewerLocationIndex;

export const TemplateHistoryToolBar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { innerWidth } = window;
  return (
    <Stack justifyContent="space-between" padding={3} direction="row">
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 300,
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
      <Stack direction="row" spacing={3} alignItems='center'>
        <GridToolbarFilterButton />
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
              <StyledAddBtn
                variant="outlined"
                size="small"
                className="shadow-md"
                sx={{py: 1}}
              >
                <AddIcon className="md:mr-2" />
                {innerWidth > DeviceWidth.IPAD_WIDTH && t("Add New")}
              </StyledAddBtn>
            </Link>
        </RequiredPermission>
      </Stack>
    </Stack>
  );
};

