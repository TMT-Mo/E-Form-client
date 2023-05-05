import { PhotoCamera } from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  Stack,
  Autocomplete,
  CircularProgress,
  IconButton,
  Typography,
  TextField,
  Chip,
  FormHelperText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SaveLoadingBtn, TextFieldStyled } from "components/CustomStyled";
import { useDispatch, useSelector } from "hooks";
import { handleError } from "slices/alert";
import Resizer from "react-image-file-resizer";
import { createAccount, getDepartmentList, getRoleList } from "slices/system";
import { Department, Permission, Role } from "models/system";
import {
  DummyPermissions,
  FixedDummyPermissions,
} from "utils/dummy-data";
import { DefaultValue, Permissions } from "utils/constants";

interface AccountState {
  userName?: string;
  password: string;
  signature?: string;
  status: boolean;
  firstName?: string;
  lastName?: string;
}

const {VIEW_DOCUMENT_OVERALL_STATISTICS, VIEW_DOCUMENT_STATISTICS} = Permissions

export const CreateAccount = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    isGetDepartmentsLoading,
    isGetPermissionLoading,
    isGetRoleLoading,
    departmentList,
    roleList,
    isCreateAccountLoading,
  } = useSelector((state) => state.system);
  const [account, setAccount] = useState<AccountState>();
  const [isDisabledSave, setIsDisabledSave] = useState(false);
  const [permissions, setPermissions] = useState<Permission[]>([
    ...FixedDummyPermissions,
  ]);
  const [selectedDepartment, setSelectedDepartment] = useState<Department>();
  const [selectedRole, setSelectedRole] = useState<Role>();

  const onChangeSelectedDepartment = (value: Department | null) => {
    if(!value) return
    setSelectedDepartment(value)
  };

  const onChangeSelectedRole = (value: Role | null) => {
    if(!value) return
    setSelectedRole(value)
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
          errorMessage: t("Something went wrong with uploading image!"),
        })
      );
      return;
    }
    let file = e.target.files[0];
    const image = await resizeFile(file);
    setAccount({
      ...account!,
      signature: image as string,
    });
    e.target.value = ''
  };

  const onCreateAccount = async () => {
    await dispatch(
      createAccount({
        ...account,
        idPermissions: permissions.map((p) => p.id),
        idRole: selectedRole?.id!,
        idDepartment: selectedDepartment?.id!,
        status: true,
        password: DefaultValue.PASSWORD,
      })
    ).unwrap();

    
    setAccount({
      userName: "",
      password: DefaultValue.PASSWORD,
      signature: "",
      status: true,
      firstName: "",
      lastName: "",
    });
    setSelectedDepartment(undefined)
    setSelectedRole(undefined)
    setPermissions([...FixedDummyPermissions])
  };

  const onChangeSelectedPermissions = (value: Permission[]) => {
    const hasOverallStatistics = value.find(v => v.id === VIEW_DOCUMENT_OVERALL_STATISTICS)
    const hasNormalStatistics = value.find(v => v.id === VIEW_DOCUMENT_STATISTICS)
    if(hasOverallStatistics && hasNormalStatistics){
      dispatch(handleError({errorMessage: t('You can only select VIEW_DOCUMENT_OVERALL_STATISTICS or VIEW_DOCUMENT_STATISTICS')}))
      return
    }
    setPermissions([
      ...FixedDummyPermissions,
      ...value.filter((option) => FixedDummyPermissions.indexOf(option) === -1),
    ]);
  };

  useEffect(() => {
    if(!account) return
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
    const getRole = dispatch(getRoleList());

    getDepartment.unwrap();
    getRole.unwrap();

    return () => {
      getDepartment.abort();
      getRole.abort();
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col py-10 space-y-6">
      <h2>{t("Create Account")}</h2>
      <div className="flex flex-col rounded-md border border-gray-400 bg-white m-auto p-10 drop-shadow-md">
        <Box minWidth="800px" maxWidth="500px">
          <Stack spacing={3}>
            <Typography component="h1" fontSize="2rem">
              {t("Create account")}
            </Typography>
            <Stack spacing={1} direction="row">
              <FormControl fullWidth>
                <InputLabel htmlFor="component-outlined">
                  {t("First Name")}
                </InputLabel>
                <OutlinedInput
                  id="component-outlined"
                  // placeholder="Composed TextField"
                  value={account?.firstName}
                  label={t("First Name")}
                  onChange={(value) =>
                    {
                      if(value.target.value.length === 20) return
                      setAccount({
                      ...account!,
                      firstName: value.target.value,
                    })}
                  }
                />
                <FormHelperText id="component-error-text">{t('Maximum length')}: 20</FormHelperText>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="component-outlined">
                  {t("Last Name")}
                </InputLabel>
                <OutlinedInput
                  id="component-outlined"
                  value={account?.lastName}
                  label={t("Last Name")}
                  onChange={(value) =>
                    {
                      if(value.target.value.length > 20) return
                      setAccount({
                      ...account!,
                      lastName: value.target.value,
                    })}
                  }
                />
                <FormHelperText id="component-error-text">{t('Maximum length')}: 20</FormHelperText>
              </FormControl>
            </Stack>
            <FormControl>
              <InputLabel htmlFor="component-outlined">
                {t("Username")}
              </InputLabel>
              <OutlinedInput
                id="component-outlined"
                value={account?.userName}
                label={t("Username")}
                
                onChange={(value) =>
                  {
                    if(value.target.value.length > 20) return
                    setAccount({
                    ...account!,
                    userName: value.target.value,
                  })}
                }
              />
              <FormHelperText id="component-error-text">{t('Maximum length')}: 20</FormHelperText>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-outlined">
                {t("Password")}
              </InputLabel>
              <OutlinedInput
                id="component-outlined"
                value={"P@ssw0rd"}
                label={t("Password")}
                // defaultValue={account.password}
                disabled
              />
              {/* <FormHelperText id="component-error-text">Error</FormHelperText> */}
            </FormControl>

            {/* Department */}
            <Autocomplete
              id="asynchronous-demo"
              onChange={(e, value) =>
                onChangeSelectedDepartment(value)
              }
              value={selectedDepartment ?? null}
              // isOptionEqualToValue={(option, value) =>
              //   option.departmentName === value.departmentName
              // }
              getOptionLabel={(option) => t(option.departmentName)}
              options={departmentList.filter((d) => d.departmentName !== "All")}
              loading={isGetDepartmentsLoading}
              sx={{
                ".MuiAutocomplete-clearIndicator": {
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
                  label={t("Select department")}
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

            {/* Role */}
            <Autocomplete
              id="asynchronous-demo"
              onChange={(e, value) =>
                onChangeSelectedRole(value)
              }
              value={selectedRole ?? null}
              getOptionLabel={(option) => t(option.roleName)}
              options={roleList}
              loading={isGetRoleLoading}
              sx={{
                ".MuiAutocomplete-clearIndicator": {
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
                <TextField
                  {...params}
                  label={t("Select role")}
                  sx={{
                    border: "1px solid #fff",
                    borderRadius: "5px",
                    // color: '#000'
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
                    label={t(option.permissionName)}
                    {...getTagProps({ index })}
                    disabled={FixedDummyPermissions.indexOf(option) !== -1}
                  />
                ))
              }
              limitTags={2}
              sx={{
                ".MuiAutocomplete-clearIndicator": {
                  backgroundColor: "#000",
                  fill: "#000",
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
                  label={t("Select permission")}
                  sx={{
                    border: "1px solid #fff",
                    borderRadius: "5px",
                    color: "#fff",
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
            <Typography>{t('Select signature')}</Typography>
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
              {account?.signature && <img src={account?.signature} alt=""></img>}
            </Stack>
            <SaveLoadingBtn
              loading={isCreateAccountLoading}
              disabled={isDisabledSave}
              onClick={onCreateAccount}
            >
              {t("Save")}
            </SaveLoadingBtn>
          </Stack>
        </Box>
      </div>
    </div>
  );
};
