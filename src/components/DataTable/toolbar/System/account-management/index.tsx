import { Stack, Paper, IconButton, InputBase, Popover, TextField } from "@mui/material";
import { GridToolbarFilterButton } from "@mui/x-data-grid";
import { StyledAddBtn } from "components/CustomStyled";
import { RequiredPermission } from "components/RequiredPermission";
import { useDispatch, useSelector } from "hooks";
import { useTranslation } from "react-i18next";
import { setLocation } from "slices/location";
import { DeviceWidth, LocationIndex, Permissions } from "utils/constants";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { searchAccount } from "slices/system";
import React from "react";

const { ADD_TEMPLATE } = Permissions;
const { SYSTEM } = LocationIndex;

export const AccountManagementToolBar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { locationIndex } = useSelector((state) => state.location);
  const {searchItemValue} = useSelector(state => state.system)
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
            value={searchItemValue}
          placeholder={t("Search Account")}
          onChange={(e) => dispatch(searchAccount({ value: e.target.value }))}
          />
        </Paper>
      )}
      {/* <Paper
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
          inputProps={{ "aria-label": "search google maps" }}
          value={searchItemValue}
          placeholder={t("Search Account")}
          onChange={(e) => dispatch(searchAccount({ value: e.target.value }))}
        />
      </Paper> */}
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
          placeholder={t("Search Account")}
          onChange={(e) => dispatch(searchAccount({ value: e.target.value }))}
        />
      </Popover>
      <Stack direction="row" spacing={3} alignItems="center">
        <GridToolbarFilterButton sx={{
          "&.MuiButton-text": {
            fontSize: 0,
          },
          "&.MuiButton-root": {
            mr: -3,
          },
        }}/>
        {locationIndex === SYSTEM && (
          <RequiredPermission permission={ADD_TEMPLATE}>
            <StyledAddBtn
              variant="outlined"
              size="small"
              onClick={() =>
                dispatch(
                  setLocation({
                    locationIndex: LocationIndex.ADD_ACCOUNT,
                  })
                )
              }
            >
              <AddIcon className="md:mr-2" />
              {window.innerWidth > DeviceWidth.IPAD_WIDTH && t("Add")}
            </StyledAddBtn>
          </RequiredPermission>
        )}
      </Stack>
    </Stack>
  );
};
