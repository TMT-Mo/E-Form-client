import styled from "@emotion/styled";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector, useSignalR } from "hooks";
import { Role } from "models/system";
import { useTranslation } from "react-i18next";
import { WhiteBtn, SaveLoadingBtn } from "components/CustomStyled";
import { createRole, editRole, getRoleList } from "slices/system";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CloseIcon from "@mui/icons-material/Close";

const CustomBox = styled(Box)({
  padding: "20px 40px",
  backgroundColor: "#fff",
  width: "100%",
  borderRadius: "15px",
  lineHeight: "50px",
  filter:
    "drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))",
});

export const RoleSystem = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isGetRoleLoading, roleList, isEditRoleLoading, isCreateRoleLoading } =
    useSelector((state) => state.system);
  const [modifyRole, setModifyRole] = useState<Role>();
  const [selectedRole, setSelectedRole] = useState<Role>();
  const [newRole, setNewRole] = useState<string>();
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [isViewingRole, setIsViewingRole] = useState(false);
  const {sendSignalREditSystem} = useSignalR()

  const onEditRole = async () => {
    const { roleName, id } = modifyRole!;
    const editRoleHandle = dispatch(editRole({ roleName, roleId: id }));
    await editRoleHandle.unwrap();
    sendSignalREditSystem({ roleName: selectedRole?.roleName });
    const getRole = dispatch(getRoleList());
    await getRole.unwrap();

    setIsEditingRole(false);
  };

  const onCreateRole = async () => {
    const createRoleHandler = dispatch(createRole({ roleName: newRole! }));
    await createRoleHandler.unwrap();

    const getRole = dispatch(getRoleList());
    await getRole.unwrap();

    setIsAddingRole(false);
  };

  useEffect(() => {
    if (!isEditingRole) {
      setModifyRole(undefined);
    }
  }, [isEditingRole]);

  useEffect(() => {
    if (!isAddingRole) {
      setNewRole(undefined);
    }
  }, [isAddingRole]);

  return (
    <>
      <CustomBox sx={{w: 1/4}}>
      <Stack
          direction="row"
          // spacing={25}
          justifyContent="space-between"
          alignItems="center"
        >
        <Stack
          direction="column"
          // justifyContent="space-between"
          // alignItems="center"
        >
          <Typography
            variant="h6"
            component="h1"
            style={{ paddingBottom: "10px" }}
            fontWeight="bold"
          >
            Role
          </Typography>
          {!isGetRoleLoading && (
            <Typography variant="h2" component="h1">
              {roleList?.length}
            </Typography>
          )}
        {isGetRoleLoading && <CircularProgress />}
        </Stack>
        
          
          {!isGetRoleLoading && (
            <Stack direction="column">
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={() => setIsAddingRole((prevState) => !prevState)}
              >
                <AddBoxIcon sx={{ fill: "#fdcb6e" }} />
              </IconButton>
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={() => setIsEditingRole((prevState) => !prevState)}
              >
                <DriveFileRenameOutlineIcon sx={{ fill: "#00b894" }} />
              </IconButton>
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={() => setIsViewingRole((prevState) => !prevState)}
              >
                <ListAltIcon sx={{ fill: "#0984e3" }} />
              </IconButton>
            </Stack>
          )}
        </Stack>
      </CustomBox>
      <Dialog open={isEditingRole}>
        <DialogContent>
          <Box minWidth="500px">
            <Stack spacing={3}>
              <Typography variant="h5" component="h1" alignSelf="center">
                {t("Edit Role")}
              </Typography>
              <Autocomplete
                id="asynchronous-demo"
                onChange={(e, value) => {
                  setModifyRole(value!);
                  setSelectedRole(value!);
                }}
                isOptionEqualToValue={(option, value) =>
                  option.roleName === value.roleName
                }
                getOptionLabel={(option) => t(option.roleName)}
                options={roleList}
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
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("Select Role")}
                    sx={{ color: "#000" }}
                    InputProps={{
                      ...params.InputProps,

                      startAdornment: (
                        <React.Fragment>
                          {isGetRoleLoading ? (
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
                <Typography>{t("Modify Role")}</Typography>
                <TextField
                  fullWidth
                  value={modifyRole?.roleName}
                  disabled={!modifyRole}
                  onChange={(value) =>
                    setModifyRole({
                      ...modifyRole!,
                      roleName: value.target.value,
                    })
                  }
                />
              </Stack>
              <DialogActions>
                <WhiteBtn onClick={() => setIsEditingRole(false)} size="small">
                  {t("Cancel")}
                </WhiteBtn>
                <SaveLoadingBtn
                  size="small"
                  loading={isEditRoleLoading}
                  loadingIndicator={
                    <CircularProgress color="inherit" size={16} />
                  }
                  variant="outlined"
                  onClick={onEditRole}
                  disabled={!modifyRole}
                >
                  {t("Save")}
                </SaveLoadingBtn>
              </DialogActions>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog open={isAddingRole}>
        <DialogContent>
          <Box minWidth="500px">
            <Stack spacing={3}>
              <Typography variant="h5" component="h1" alignSelf="center">
                {t("Add Role")}
              </Typography>
              <Stack spacing={1}>
                <Typography>{t("Input role")}</Typography>
                <TextField
                  fullWidth
                  value={newRole}
                  onChange={(value) => setNewRole(value.target.value)}
                />
              </Stack>
              <DialogActions>
                <WhiteBtn onClick={() => setIsAddingRole(false)} size="small">
                  {t("Cancel")}
                </WhiteBtn>
                <SaveLoadingBtn
                  size="small"
                  loading={isCreateRoleLoading}
                  loadingIndicator={
                    <CircularProgress color="inherit" size={16} />
                  }
                  variant="outlined"
                  onClick={onCreateRole}
                >
                  {t("Save")}
                </SaveLoadingBtn>
              </DialogActions>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog open={isViewingRole}>
        <DialogContent>
          <Box minWidth="500px">
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5" component="h1" alignSelf="center">
                  {t("Role List")}
                </Typography>
                <IconButton onClick={() => setIsViewingRole(false)}>
                  <CloseIcon />
                </IconButton>
              </Stack>
              {roleList?.map((role) => (
                <TextField key={role.id} value={role.roleName} disabled />
              ))}
              <DialogActions>
                <WhiteBtn onClick={() => setIsViewingRole(false)} size="small">
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


