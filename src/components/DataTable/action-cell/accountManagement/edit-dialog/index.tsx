import {
  Dialog,
  DialogContent,
  Box,
  Stack,
  Typography,
  TextField,
  IconButton,
  Autocomplete,
  Chip,
  CircularProgress,
  DialogActions,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { t } from "i18next";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "hooks";
import { Department, Permission, Role } from "models/system";
import {
  clearUserList,
  editAccount,
  getRoleList,
  getUserList,
} from "slices/system";
import { PhotoCamera } from "@mui/icons-material";
import { AccountStatus, AccountStatusTag } from "utils/constants";
import { DummyPermissions, FixedDummyPermissions } from "utils/dummy-data";
import { TextFieldStyled, SaveLoadingBtn } from "components/CustomStyled";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getSignature } from "slices/auth";
import CloseIcon from "@mui/icons-material/Close";
import { handleError } from "slices/alert";
import Resizer from "react-image-file-resizer";
import { useTranslation } from "react-i18next";

interface Props {
  isOpen: boolean;
  handleToggleDialog: () => void;
}

interface AccountStatusOptions {
  statusId: number;
  statusTag: string;
}

interface AccountState {
  idUser: number;
  userName?: string;
  password?: string;
  signature?: string;
  status?: AccountStatusOptions;
  firstName: string;
  lastName: string;
}

const statusOptions: AccountStatusOptions[] = [
  {
    statusId: AccountStatus.ENABLE,
    statusTag: AccountStatusTag.ENABLE,
  },
  {
    statusId: AccountStatus.DISABLE,
    statusTag: AccountStatusTag.DISABLE,
  },
];

export const EditDialog = (props: Props) => {
  const { t } = useTranslation();
  const { isOpen, handleToggleDialog } = props;
  const {
    isGetDepartmentsLoading,
    isGetPermissionLoading,
    isGetRoleLoading,
    isEditAccountLoading,
    accountDetail,
    roleList,
    departmentList,
  } = useSelector((state) => state.system);
  const { signature, isGetSignatureLoading } = useSelector(
    (state) => state.auth
  );
  const [isDisabledSave, setIsDisabledSave] = useState(false);
  const dispatch = useDispatch();

  const currentPermissionList = (): Permission[] => {
    const list: Permission[] = [];
    const currentPermissions: number[] = [];
    accountDetail?.idPermissions!.forEach((p) => {
      if (FixedDummyPermissions.findIndex((f) => f.id === p) === -1) {
        currentPermissions.push(p);
      }
    });
    currentPermissions.forEach((p) =>
      list.push(DummyPermissions.find((value) => value.id === +p)!)
    );
    return list;
  };
  const [selectedDepartment, setSelectedDepartment] = useState<Department>(
    departmentList.find(
      (department) =>
        department?.departmentName === accountDetail?.departmentName
    )!
  );
  const [selectedRole, setSelectedRole] = useState<Role>(
    roleList.find(
      (role) =>
        role?.roleName === accountDetail?.roleName
    )!
  );
  const [account, setAccount] = useState<AccountState>({
    idUser: accountDetail?.id!,
    userName: accountDetail?.userName,
    password: undefined,
    firstName: accountDetail?.firstName!,
    lastName: accountDetail?.lastName!,
    signature: undefined,
    status: {
      statusId: accountDetail?.status!,
      statusTag:
        accountDetail?.status === AccountStatus.ENABLE
          ? AccountStatusTag.ENABLE
          : AccountStatusTag.DISABLE,
    },
  });
  const [permissions, setPermissions] = useState<Permission[]>([
    ...FixedDummyPermissions,
    ...currentPermissionList(),
  ]);

  const onChangeSelectedPermissions = (value: Permission[]) => {
    setPermissions([
      ...FixedDummyPermissions,
      ...value.filter((option) => FixedDummyPermissions.indexOf(option) === -1),
    ]);
  };

  const onChangeSelectedDepartment = (value: Department | null) => {
    if(!value) return
    setSelectedDepartment(value)
  };

  const onChangeSelectedRole = (value: Role | null) => {
    if(!value) return
    setSelectedRole(value)
  };

  const EditAccountHandle = async () => {
    console.log(account);
    const onEditAccount = dispatch(
      editAccount({
        ...account,
        idPermissions: permissions.map((p) => p.id),
        status:
          account.status?.statusId === AccountStatus.ENABLE ? true : false,
        signature: account.signature ?? signature,
        idDepartment: selectedDepartment.id,
        idRole: selectedRole.id
      })
    );
    await onEditAccount.unwrap();
    handleToggleDialog();
    dispatch(clearUserList());
    await dispatch(getUserList({}));

    return () => onEditAccount.abort();
  };

  const onRefreshPassword = () => {
    setAccount({ ...account, password: "P@ssw0rd" });
  };

  const handleChangeStatus = (value: AccountStatusOptions) => {
    setAccount({ ...account, status: value });
  };

  const resizeFile = (file: File) =>
    new Promise((resolve) => {
      const maxWidth = 130;
      const minWidth = 130;
      const minHeight = 100;
      const maxHeight = 100;

      const fileName = file.name.slice(file.name.lastIndexOf(".") + 1);
      Resizer.imageFileResizer(
        file,
        maxWidth,
        maxHeight,
        fileName,
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64",
        minWidth,
        minHeight
      );
    });

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      dispatch(
        handleError({
          errorMessage: "Something went wrong with uploading image!",
        })
      );
      return;
    }
    let file = e.target.files[0];
    const image = await resizeFile(file);
    setAccount({
      ...account,
      signature: image as string,
    });
  };

  return (
    <Dialog open={isOpen} onClose={handleToggleDialog}>
      <DialogContent>
        <Box minWidth="500px">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between">
              <Typography component="h1" fontSize="2rem">
                {t("Edit account")}
              </Typography>
              <IconButton onClick={handleToggleDialog}>
                <CloseIcon />
              </IconButton>
            </Stack>
            <Stack spacing={1} direction="row">
              <FormControl fullWidth>
                <InputLabel htmlFor="component-outlined">
                  {t("First Name")}
                </InputLabel>
                <OutlinedInput
                  id="component-outlined"
                  // placeholder="Composed TextField"
                  label={t("First Name")}
                  value={accountDetail?.firstName}
                  onChange={(value) =>
                    setAccount({ ...account, firstName: value.target.value })
                  }
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="component-outlined">
                  {t("Last Name")}
                </InputLabel>
                <OutlinedInput
                  id="component-outlined"
                  // placeholder="Composed TextField"
                  label={t("Last Name")}
                  value={accountDetail?.lastName}
                  onChange={(value) =>
                    setAccount({ ...account, lastName: value.target.value })
                  }
                />
              </FormControl>
            </Stack>
            <Stack spacing={0.5}>
              <Typography fontSize="0.75rem">{t("Username")}</Typography>
              <TextField
                id="component-outlined"
                defaultValue={accountDetail?.userName}
                sx={{ color: "#000" }}
                disabled
              />
            </Stack>
            <Stack direction="row" alignItems="center">
              <Stack spacing={0.5} width="100%">
                <Typography fontSize="0.75rem">{t("Password")}</Typography>
                <TextField
                  id="component-outlined"
                  sx={{ color: "#000" }}
                  disabled
                  value={account.password}
                />
                {/* <FormHelperText id="component-error-text">Error</FormHelperText> */}
              </Stack>
              <IconButton onClick={onRefreshPassword}>
                <RefreshIcon />
              </IconButton>
            </Stack>

            {/* Department */}
            <Stack spacing={0.5}>
              <Typography fontSize="0.75rem">{t("Department")}</Typography>
              <Autocomplete
                id="asynchronous-demo"
                onChange={(e, value) =>
                  onChangeSelectedDepartment(value)
                }
                isOptionEqualToValue={(option, value) =>
                  option.departmentName === value.departmentName
                }
                getOptionLabel={(option) => t(option.departmentName)}
                loading={isGetDepartmentsLoading}
                value={selectedDepartment}
                options={departmentList.filter(department => department.departmentName !== 'All')}
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
            </Stack>

            {/* Role */}
            <Stack spacing={0.5}>
              <Typography fontSize="0.75rem">{t("Role")}</Typography>
              <Autocomplete
                id="asynchronous-demo"
                onChange={(e, value) =>
                  onChangeSelectedRole(value)
                }
                isOptionEqualToValue={(option, value) =>
                  option.roleName === value.roleName
                }
                getOptionLabel={(option) => t(option.roleName)}
                loading={isGetRoleLoading}
                value={selectedRole}
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
                  color: "#000",
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
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
                )} />
            </Stack>

            {/* Permission */}
            <Autocomplete
              id="asynchronous-demo"
              multiple
              onChange={(e, value) => onChangeSelectedPermissions(value)}
              isOptionEqualToValue={(option, value) =>
                option.permissionName === value.permissionName
              }
              getOptionLabel={(option) => t(option.permissionName)}
              options={DummyPermissions}
              loading={isGetPermissionLoading}
              value={permissions}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip
                    label={option.permissionName}
                    {...getTagProps({ index })}
                    disabled={FixedDummyPermissions.indexOf(option) !== -1}
                  />
                ))
              }
              limitTags={2}
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
                "& .MuiChip-deleteIcon": {
                  fill: "#fff",
                },
              }}
              renderInput={(params) => (
                <TextFieldStyled
                  {...params}
                  label={t("Select permission")}
                  sx={{
                    border: "1px solid #fff",
                    borderRadius: "5px",
                  }}
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
            <Autocomplete
              disableClearable
              value={account.status}
              id="combo-box-demo"
              getOptionLabel={(option) => t(option.statusTag)}
              isOptionEqualToValue={(option, value) =>
                option.statusId === value.statusId
              }
              options={statusOptions}
              onChange={(e, value) => handleChangeStatus(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    backgroundColor: `${
                      account.status?.statusId === AccountStatus.ENABLE
                        ? "#7bed9f"
                        : "#ff6b81"
                    }`,
                    color: `${
                      account.status?.statusId === AccountStatus.ENABLE
                        ? "#2ed573"
                        : "#ff4757"
                    }`,
                  }}
                />
              )}
            />
            <Stack
              direction="row"
              justifyContent="start"
              alignItems="center"
              minHeight="150px"
            >
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => handleUploadImage(e)}
                />
                <PhotoCamera />
              </IconButton>
              {isGetSignatureLoading && <CircularProgress />}
              {signature && (
                <img
                  src={account.signature ?? signature}
                  width="200px"
                  alt=""
                />
              )}
            </Stack>
            {/* <Stack width="100%" alignItems="center" justifyContent="center">
            </Stack> */}
            <SaveLoadingBtn
              loading={isEditAccountLoading}
              disabled={isDisabledSave}
              onClick={EditAccountHandle}
            >
              Save
            </SaveLoadingBtn>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};
