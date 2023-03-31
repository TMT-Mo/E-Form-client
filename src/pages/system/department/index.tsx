import styled from "@emotion/styled";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Autocomplete,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useDispatch, useSelector } from "../../../hooks";
import CircularProgress from "@mui/material/CircularProgress";
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import { t } from "i18next";
import {
  SaveLoadingBtn,
  TextFieldStyled,
  WhiteBtn,
} from "../../../components/CustomStyled";
import { Department } from "../../../models/system";
import { useTranslation } from "react-i18next";
import { editDepartment } from "../../../slices/system";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CloseIcon from "@mui/icons-material/Close";

const CustomBox = styled(Box)({
  padding: "20px 40px",
  backgroundColor: "#fff",
  width: "100%",
  borderRadius: "15px",
  lineHeight: "50px",
  filter: 'drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))'
});

export const DepartmentSystem = () => {
  const dispatch = useDispatch();
  const { isGetDepartmentsLoading, departmentList, isEditDepartmentLoading } =
    useSelector((state) => state.system);
  const [modifyDepartment, setModifyDepartment] = useState<Department>();
  const [newDepartment, setNewDepartment] = useState<string>();
  const [isAddingDepartment, setIsAddingDepartment] = useState(false);
  const [isEditingDepartment, setIsEditingDepartment] = useState(false);
  const [isViewingDepartment, setIsViewingDepartment] = useState(false);
  const { t } = useTranslation();

  const onEditDepartment = () => {
    const { departmentName, id } = modifyDepartment!;
    dispatch(editDepartment({ departmentId: id, departmentName }));
  };
  return (
    <>
      <CustomBox>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h6"
            component="h2"
            // style={{ paddingBottom: "10px" }}
            fontWeight="bold"
          >
            Department
          </Typography>
          {!isGetDepartmentsLoading && (
            <Stack direction="row">
              <IconButton
                onClick={() => setIsAddingDepartment((prevState) => !prevState)}
                type="button"
                aria-label="search"
              >
                <AddBoxIcon sx={{ fill: "#fdcb6e" }} />
              </IconButton>
              <IconButton
                onClick={() =>
                  setIsEditingDepartment((prevState) => !prevState)
                }
                type="button"
                // sx={{ p: "10px" }}
                aria-label="search"
              >
                <DriveFileRenameOutlineIcon sx={{ fill: "#00b894" }} />
              </IconButton>
              <IconButton
                onClick={() =>
                  setIsViewingDepartment((prevState) => !prevState)
                }
                type="button"
                // sx={{ p: "10px" }}
                aria-label="search"
              >
                <ListAltIcon sx={{ fill: "#0984e3" }} />
              </IconButton>
            </Stack>
          )}
        </Stack>

        {isGetDepartmentsLoading && <CircularProgress />}
        {!isGetDepartmentsLoading && (
          <Stack
            direction="row"
            spacing={25}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h2" component="h1">
              {departmentList.length}
            </Typography>
          </Stack>
        )}
      </CustomBox>
      <Dialog open={isEditingDepartment}>
        <DialogContent>
          <Box minWidth="500px">
            <Stack spacing={3}>
              <Typography variant="h5" component="h1" alignSelf="center">
                Edit Department
              </Typography>
              <Autocomplete
                id="asynchronous-demo"
                onChange={(e, value) => setModifyDepartment(value!)}
                isOptionEqualToValue={(option, value) =>
                  option.departmentName === value.departmentName
                }
                getOptionLabel={(option) => t(option.departmentName)}
                options={departmentList}
                sx={{
                  ".MuiAutocomplete-clearIndicator": {
                    backgroundColor: "#bdc3c7",
                    scale: "75%",
                  },
                  ".MuiAutocomplete-popupIndicator": {
                    backgroundColor: "#DBEAFE",
                    scale: "75%",
                  },
                  ".MuiAutocomplete-popupIndicatorOpen": {
                    backgroundColor: "#2563EB",
                    scale: "75%",
                  },
                  color: "#000",
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select department"
                    sx={{ color: "#000" }}
                    InputProps={{
                      ...params.InputProps,

                      startAdornment: (
                        <React.Fragment>
                          {isGetDepartmentsLoading ? (
                            <CircularProgress color="primary" size={20} />
                          ) : null}
                          {params.InputProps.startAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
              <Stack spacing={1}>
                <Typography>Modify department</Typography>
                <TextField
                  fullWidth
                  value={modifyDepartment?.departmentName}
                  disabled={!modifyDepartment}
                  onChange={(value) =>
                    setModifyDepartment({
                      ...modifyDepartment!,
                      departmentName: value.target.value,
                    })
                  }
                />
              </Stack>
              <DialogActions>
                <WhiteBtn
                  onClick={() => setIsEditingDepartment(false)}
                  size="small"
                >
                  {t("Cancel")}
                </WhiteBtn>
                <SaveLoadingBtn
                  size="small"
                  // loading={isApproveTemplateLoading}
                  loadingIndicator={
                    <CircularProgress color="inherit" size={16} />
                  }
                  variant="outlined"
                  // onClick={onApproveTemplate}
                >
                  {t("Save")}
                </SaveLoadingBtn>
              </DialogActions>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog open={isAddingDepartment}>
        <DialogContent>
          <Box minWidth="500px">
            <Stack spacing={3}>
              <Typography variant="h5" component="h1" alignSelf="center">
                Add Department
              </Typography>
              <Stack spacing={1}>
                <Typography>Input department</Typography>
                <TextField
                  fullWidth
                  value={newDepartment}
                  onChange={(value) => setNewDepartment(value.target.value)}
                />
              </Stack>
              <DialogActions>
                <WhiteBtn
                  onClick={() => setIsAddingDepartment(false)}
                  size="small"
                >
                  {t("Cancel")}
                </WhiteBtn>
                <SaveLoadingBtn
                  size="small"
                  loading={isEditDepartmentLoading}
                  loadingIndicator={
                    <CircularProgress color="inherit" size={16} />
                  }
                  variant="outlined"
                  onClick={onEditDepartment}
                  disabled={!modifyDepartment}
                >
                  {t("Save")}
                </SaveLoadingBtn>
              </DialogActions>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog open={isViewingDepartment}>
        <DialogContent>
          <Box minWidth="500px">
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5" component="h1" alignSelf="center">
                  Department List
                </Typography>
                <IconButton onClick={() => setIsViewingDepartment(false)}>
                  <CloseIcon />
                </IconButton>
              </Stack>
              {departmentList!.map((department) => (
                <TextField
                  key={department.id}
                  value={department.departmentName}
                  disabled
                />
              ))}
              <DialogActions>
                <WhiteBtn
                  onClick={() => setIsViewingDepartment(false)}
                  size="small"
                >
                  {t("Cancel")}
                </WhiteBtn>
              </DialogActions>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
