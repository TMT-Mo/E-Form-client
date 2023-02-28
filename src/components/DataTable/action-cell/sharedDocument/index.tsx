import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { TouchRippleActions } from "@mui/material/ButtonBase/TouchRipple";
import { GridRenderCellParams } from "@mui/x-data-grid";
import React, { useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link } from "react-router-dom";
import { setViewerLocation } from "../../../../slices/location";
import { ViewerLocationIndex } from "../../../../utils/constants";
import { useDispatch, useSelector } from "../../../../hooks";
import { getDocumentDetail } from "../../../../slices/document";
import ShareIcon from "@mui/icons-material/Share";
import { useTranslation } from "react-i18next";
import { ApproveBtn, CancelTransparentBtn, TextFieldStyled } from "../../../CustomStyled";
import { styled } from "@mui/system";
import {
  getDepartmentList,
  toggleDepartmentList,
} from "../../../../slices/system";
import { Department } from "../../../../models/system";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const StyledDialog = styled(Dialog)({
  width: "1024px",
});

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const SharedDocumentActionCell = (props: GridRenderCellParams<Date>) => {
  const { hasFocus, row } = props;
  const buttonElement = React.useRef<HTMLButtonElement | null>(null);
  const rippleRef = React.useRef<TouchRippleActions | null>(null);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isGetDepartmentsLoading, departmentList, isOpenDepartmentList } =
    useSelector((state) => state.system);
  const [value, setValue] = React.useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState<Department[]>(
    []
  );

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

  const onChangeSelectedDepartment = (value: Department) => {
    setSelectedDepartment((prevState) =>
      [...prevState, value]
    );
  };

  const getDepartmentListHandler = async () => {
    if (!departmentList) {
      await dispatch(getDepartmentList()).unwrap();
    }
    dispatch(toggleDepartmentList({ isOpen: !isOpenDepartmentList }));
  };

  return (
    <div>
      <IconButton
        aria-label="delete"
        onClick={() => {
          dispatch(getDocumentDetail({ document: row }));
          dispatch(
            setViewerLocation({
              viewerLocationIndex:
                ViewerLocationIndex.VIEW_SHARED_DOCUMENT_INDEX,
            })
          );
        }}
      >
        <Link to="/viewer" replace>
          <BorderColorIcon fontSize="small" />
        </Link>
      </IconButton>
      <IconButton
        aria-label="delete"
        onClick={() => setOpen((prevState) => !prevState)}
      >
        <ShareIcon fontSize="small" />
      </IconButton>
      <StyledDialog
        open={open}
        onClose={() => setOpen((prevState) => !prevState)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <DialogTitle id="alert-dialog-title">Share Document</DialogTitle>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            // sx={}
          >
            <Tab label="Department" {...a11yProps(0)} />
            <Tab label="Position" {...a11yProps(1)} />
            <Tab label="User" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <h4>{t("Department")}</h4>
              <Autocomplete
                id="asynchronous-demo"
                // multiple = {departmentList?.items ? true : false}
                sx={{
                  width: 300,
                  color: "#000"
                }}
                open={isOpenDepartmentList}
                onOpen={getDepartmentListHandler}
                onClose={getDepartmentListHandler}
                onChange={(e, value) => onChangeSelectedDepartment(value!)}
                isOptionEqualToValue={(option, value) =>
                  option.departmentName === value.departmentName
                }
                getOptionLabel={(option) => t(option.departmentName)}
                options={departmentList?.items!}
                loading={isGetDepartmentsLoading}
                renderInput={(params) => (
                  <TextFieldStyled
                    {...params}
                    sx={{
                      border: "1px solid #fff",
                      borderRadius: "5px",
                    }}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {isGetDepartmentsLoading ? (
                            <CircularProgress color="primary" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
              {selectedDepartment.map((department) => (
                <div className="flex flex-col">
                  <div className="flex">
                    <span>{department.departmentName}</span>
                  </div>
                </div>
              ))}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <CancelTransparentBtn onClick={() => setOpen((prevState) => !prevState)}>
              Cancel
            </CancelTransparentBtn>
            <ApproveBtn onClick={() => setOpen((prevState) => !prevState)}>
              Save
            </ApproveBtn>
          </DialogActions>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </StyledDialog>
    </div>
  );
};
