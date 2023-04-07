import { Box, Dialog, DialogTitle, IconButton, Tab, Tabs } from "@mui/material";
import { TouchRippleActions } from "@mui/material/ButtonBase/TouchRipple";
import { GridRenderCellParams } from "@mui/x-data-grid";
import React, { useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link } from "react-router-dom";
import { setViewerLocation } from "slices/location";
import {
  Permissions,
  ShareTabIndex,
  StatusDocument,
  ViewerLocationIndex,
} from "utils/constants";
import { useDispatch } from "hooks";
import { getDocumentDetail } from "slices/document";
import ShareIcon from "@mui/icons-material/Share";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/system";
import DepartmentTab from "./department-tab";
import { Document } from "models/document";
import UserTab from "./user-tab";
import { RequiredPermission } from "components/RequiredPermission";

const StyledDialog = styled(Dialog)({
  width: "100vw",
});

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const PersonalDocumentActionCell = (
  props: GridRenderCellParams<Date>
) => {
  const { hasFocus, row } = props;
  const buttonElement = React.useRef<HTMLButtonElement | null>(null);
  const rippleRef = React.useRef<TouchRippleActions | null>(null);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const { id, status } = row as Document;
  const {DEPARTMENT, USER} = ShareTabIndex
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  React.useLayoutEffect(() => {
    if (hasFocus) {
      const input = buttonElement.current?.querySelector("input");
      input?.focus();
    } else if (rippleRef.current) {
      // Only available in @mui/material v5.4.1 or later
      rippleRef.current.stop({} as any);
    }
  }, [hasFocus]);

  const createTab = () => {
    switch (value) {
      case DEPARTMENT:
        return <DepartmentTab
        onOpen={() => setOpen((prevState) => !prevState)}
        value={value}
        idDocument={id}
      />
    
      default:
        return <UserTab
        onOpen={() => setOpen((prevState) => !prevState)}
        value={value}
        idDocument={id}
      />
    }
  }

  // * Clear data

  return (
    <div>
      <IconButton
        aria-label="delete"
        onClick={() => {
          dispatch(getDocumentDetail({ document: row }));
          dispatch(
            setViewerLocation({
              viewerLocationIndex:
                ViewerLocationIndex.VIEW_PERSONAL_DOCUMENT_INDEX,
            })
          );
        }}
      >
        <Link to="/viewer" >
          <BorderColorIcon fontSize="small" />
        </Link>
      </IconButton>
      {status === StatusDocument.APPROVED_DOCUMENT && (
        <RequiredPermission permission={Permissions.SHARE_DOCUMENT}>
          <IconButton
          aria-label="delete"
          onClick={() => setOpen((prevState) => !prevState)}
        >
          <ShareIcon fontSize="small" />
        </IconButton>
        </RequiredPermission>
      )}
      <StyledDialog
        open={open}
        onClose={() => setOpen((prevState) => !prevState)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <DialogTitle id="alert-dialog-title">{t('Share Document')}</DialogTitle>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Department" {...a11yProps(DEPARTMENT)} />
            <Tab label="User" {...a11yProps(USER)} />
            {/* <Tab label="User" {...a11yProps(2)} /> */}
          </Tabs>
        </Box>

        {createTab()}
        
      </StyledDialog>
    </div>
  );
};
