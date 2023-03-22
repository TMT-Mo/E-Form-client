import { PhotoCamera } from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  OutlinedInput,
  Stack,
  Autocomplete,
  CircularProgress,
  IconButton,
  Typography,
  Chip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SaveLoadingBtn,
  TextFieldStyled,
} from "../../../components/CustomStyled";
import { useDispatch, useSelector } from "../../../hooks";
import { handleError } from "../../../slices/alert";
import Resizer from "react-image-file-resizer";
import { createAccount, getDepartmentList } from "../../../slices/system";
import { Account, Permission } from "../../../models/system";
import {
  DummyPermissions,
  FixedDummyPermissions,
} from "../../../utils/dummy-data";
import { Permissions } from "../../../utils/constants";

interface AccountState {
  username?: string;
  password?: string;
  permissions: Permission[];
  idDepartment?: number;
  idRole?: number;
  signature?: string;
  isEnable: boolean;
}

export const CreateAccount = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    isGetDepartmentsLoading,
    isGetPermissionLoading,
    isGetRoleLoading,
    departmentList,
    roleList,
    permissionList,
    isCreateAccountLoading,
  } = useSelector((state) => state.system);
  const [account, setAccount] = useState<AccountState>({
    username: undefined,
    password: undefined,
    idDepartment: undefined,
    permissions: [...FixedDummyPermissions],
    idRole: undefined,
    signature: undefined,
    isEnable: true,
  });
  const [isDisabledSave, setIsDisabledSave] = useState(false);

  const resizeFile = (file: File) =>
    new Promise((resolve) => {
      const fileName = file.name.slice(file.name.lastIndexOf(".") + 1);
      Resizer.imageFileResizer(
        file,
        300,
        300,
        fileName,
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
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

  const onCreateAccount = () => {
    const createNewAccount = dispatch(createAccount({ account: {...account, idPermissions: account.permissions.map(p => p.id)} }));
    createNewAccount.unwrap();
    return () => createNewAccount.abort();
  };

  const onChangeSelectedPermissions = (value: Permission[]) => {
    setAccount({
      ...account,
      permissions: [
        ...FixedDummyPermissions,
        ...value.filter(
          (option) => FixedDummyPermissions.indexOf(option) === -1
        ),
      ],
    })
  }

  useEffect(() => {
    let check = false;
    Object.values(account).forEach((value) => {
      if (!value) {
        check = true;
      }
    });
    check ? setIsDisabledSave(true) : setIsDisabledSave(false);
  }, [account]);

  useEffect(() => {
    const getDepartment = dispatch(getDepartmentList());
    getDepartment.unwrap();

    return () => getDepartment.abort();
  }, [dispatch]);

  return (
    <div className="flex flex-col py-10 space-y-6">
      <h2>{t("Add Account")}</h2>
      <div className="flex flex-col rounded-md border border-gray-400 bg-white m-auto p-10">
        <Box minWidth="500px" maxWidth="500px">
          <Stack spacing={3}>
            <Typography component="h1" fontSize="2rem">
              Create account
            </Typography>
            <FormControl>
              <InputLabel htmlFor="component-outlined">Name</InputLabel>
              <OutlinedInput
                id="component-outlined"
                placeholder="Composed TextField"
                label="Name"
              />
              {/* <FormHelperText id="component-error-text">Error</FormHelperText> */}
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-outlined">Password</InputLabel>
              <OutlinedInput
                id="component-outlined"
                placeholder="Composed TextField"
                label="Password"
              />
              {/* <FormHelperText id="component-error-text">Error</FormHelperText> */}
            </FormControl>

            {/* Department */}
            <Autocomplete
              id="asynchronous-demo"
              onChange={(e, value) =>
                setAccount({ ...account, idDepartment: value?.id })
              }
              isOptionEqualToValue={(option, value) =>
                option.departmentName === value.departmentName
              }
              getOptionLabel={(option) => t(option.departmentName)}
              options={departmentList}
              loading={isGetDepartmentsLoading}
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
              }}
              renderInput={(params) => (
                <TextFieldStyled
                  {...params}
                  label="Select department"
                  color="primary"
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

            {/* Role */}
            <Autocomplete
              id="asynchronous-demo"
              onChange={(e, value) =>
                setAccount({ ...account, idRole: value?.id })
              }
              isOptionEqualToValue={(option, value) =>
                option.roleName === value.roleName
              }
              getOptionLabel={(option) => t(option.roleName)}
              options={roleList}
              disabled={!account.idDepartment}
              loading={isGetRoleLoading}
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
              }}
              renderInput={(params) => (
                <TextFieldStyled
                  {...params}
                  label="Select role"
                  sx={{
                    border: "1px solid #fff",
                    borderRadius: "5px",
                  }}
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

            {/* Permission */}
            <Autocomplete
              id="asynchronous-demo"
              multiple
              onChange={(e, value) =>
                onChangeSelectedPermissions(value)
              }
              isOptionEqualToValue={(option, value) =>
                option.permissionName === value.permissionName
              }
              getOptionLabel={(option) => t(option.permissionName)}
              options={DummyPermissions}
              loading={isGetPermissionLoading}
              value={account.permissions}
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
                  fill: "#000",
                },
              }}
              renderInput={(params) => (
                <TextFieldStyled
                  {...params}
                  label="Select permission"
                  sx={{
                    border: "1px solid #fff",
                    borderRadius: "5px",
                  }}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <React.Fragment>
                        {isGetPermissionLoading ? (
                          <CircularProgress color="primary" size={20} />
                        ) : null}
                        {params.InputProps.startAdornment}
                      </React.Fragment>
                    ),
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
              {account.signature && <img src={account.signature} alt=""></img>}
            </Stack>
            <SaveLoadingBtn
              loading={isCreateAccountLoading}
              disabled={isDisabledSave}
              onClick={onCreateAccount}
            >
              Save
            </SaveLoadingBtn>
          </Stack>
        </Box>
      </div>
    </div>
  );
};
