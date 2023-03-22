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
import { useSelector } from "../../../hooks";
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

const CustomBox = styled(Box)({
  padding: "20px 40px",
  backgroundColor: "#fff",
  width: "fit-content",
  borderRadius: "15px",
  lineHeight: "50px",
});

export const DepartmentSystem = () => {
  const { isGetDepartmentsLoading, departmentList } = useSelector(
    (state) => state.system
  );
  const [modifyDepartment, setModifyDepartment] = useState<Department>();
  const [newDepartment, setNewDepartment] = useState<string>();
  const [isAddingDepartment, setIsAddingDepartment] = useState(false);
  const [isEditingDepartment, setIsEditingDepartment] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <CustomBox>
        <Typography
          variant="h6"
          component="h2"
          style={{ paddingBottom: "10px" }}
        >
          Department
        </Typography>
        {isGetDepartmentsLoading && <CircularProgress />}
        {departmentList.length !== 0 && (
          <Stack
            direction="row"
            spacing={25}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h2" component="h1">
              {departmentList.length}
            </Typography>
            <Stack spacing={1}>
              <IconButton
                onClick={() => setIsAddingDepartment((prevState) => !prevState)}
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
              >
                <AddBoxIcon />
              </IconButton>
              <IconButton
                onClick={() =>
                  setIsEditingDepartment((prevState) => !prevState)
                }
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
              >
                <DriveFileRenameOutlineIcon />
              </IconButton>
            </Stack>
          </Stack>
        )}
      </CustomBox>
      <Dialog open={isEditingDepartment}>
        <DialogContent>
          <Box minWidth="500px">
            <Stack spacing={3}>
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
                    backgroundColor: "#000",
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
              <Stack spacing={1}>
                <Typography>Add department</Typography>
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
    </>
  );
};
