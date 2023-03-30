import {
  Box,
  Stack,
  Typography,
  InputLabel,
  TextField,
  Autocomplete,
  CircularProgress,
  Chip,
  Container,
} from "@mui/material";
import { t } from "i18next";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { TextFieldStyled, SaveLoadingBtn } from "../../components/CustomStyled";
import { useDispatch, useSelector } from "../../hooks";
import { Permission } from "../../models/system";
import { DefaultValue, AccountStatus } from "../../utils/constants";
import {
  DummyRoles,
  DummyPermissions,
  FixedDummyPermissions,
} from "../../utils/dummy-data";
import Divider from '@mui/material/Divider';
import styled from "@emotion/styled";


interface AccountState {
  userName?: string;
  password: string;
  permissions: Permission[];
  idDepartment?: number;
  idRole?: number;
  signature?: string;
  status: number;
  firstName?: string;
  lastName?: string;
}

const TypographyStyled = styled(Typography)({
  color: '#6F7276'
});

export const MyAccount = () => {
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
  const { userInfo } = useSelector((state) => state.auth);
  const [account, setAccount] = useState<AccountState>({
    userName: undefined,
    password: DefaultValue.PASSWORD,
    idDepartment: undefined,
    permissions: [...FixedDummyPermissions],
    idRole: undefined,
    signature: undefined,
    status: AccountStatus.ENABLE,
    firstName: undefined,
    lastName: undefined,
  });
  const [isDisabledSave, setIsDisabledSave] = useState(false);
  return (
    <Container sx={{ py: 10 }}>
      <Box sx={{ background: "#fff", borderRadius: "15px", p: 5 }}>
        <Stack spacing={3}>
          <TypographyStyled >
            Create account
          </TypographyStyled>
          <Stack spacing={10} direction="row">
            <Stack direction="row" width='50%' justifyContent='space-between' alignItems='center'>
              <TypographyStyled >First name</TypographyStyled>
              <TextField
                id="component-outlined"
                // placeholder="Composed TextField"
                label="First Name"
                // onChange={(value) =>
                //   setAccount({
                //     ...account,
                //     firstName: value.target.value,
                //   })
                // }
              />
            </Stack>
            <Stack direction="row" width='50%' justifyContent='space-between' alignItems='center'>
              <TypographyStyled >Last name</TypographyStyled>
              <TextField
                id="component-outlined"
                // placeholder="Composed TextField"
                label="Last Nname"
                // onChange={(value) =>
                //   setAccount({
                //     ...account,
                //     lastName: value.target.value,
                //   })
                // }
              />
            </Stack>
          </Stack>
          <Stack direction="row" width='100%' justifyContent='space-between' alignItems='center'>
            <TypographyStyled >Username</TypographyStyled>
            <TextField
              id="component-outlined"
              // placeholder="Composed TextField"
              label="Username"
              sx={{width: '50%'}}
              // onChange={(value) =>
              //   setAccount({
              //     ...account,
              //     userName: value.target.value,
              //   })
              // }
            />
            {/* <FormHelperText id="component-error-text">Error</FormHelperText> */}
          </Stack>
          <Divider />

          <Stack direction='row' width='100%' justifyContent='space-between' alignItems='center'>
            <TypographyStyled >Password</TypographyStyled>
            <TextField
              id="component-outlined"
              sx={{width: '50%'}}
              // placeholder="Composed TextField"
              label="Password"
              defaultValue={account.password}
              disabled
            />
            {/* <FormHelperText id="component-error-text">Error</FormHelperText> */}
          </Stack>
          <Divider />

          {/* Department */}
          <Stack direction="row" width='100%' justifyContent='space-between' alignItems='center'>
            <TypographyStyled >Department</TypographyStyled>
            <Autocomplete
              id="asynchronous-demo"
              // onChange={(e, value) =>
              //   setAccount({ ...account, idDepartment: value?.id })
              // }
              // isOptionEqualToValue={(option, value) =>
              //   option.departmentName === value.departmentName
              // }
              // getOptionLabel={(option) => t(option.departmentName)}
              options={departmentList.filter((d) => d.departmentName !== "All")}
              loading={isGetDepartmentsLoading}
              sx={{
                width: '50%',
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
          </Stack>
          <Divider />

          {/* Role */}
          <Stack direction="row" width='100%' justifyContent='space-between' alignItems='center'>
            <TypographyStyled >Role</TypographyStyled>
          <Autocomplete
            id="asynchronous-demo"
            // onChange={(e, value) =>
            //   setAccount({ ...account, idRole: value?.id })
            // }
            // isOptionEqualToValue={(option, value) =>
            //   option.roleName === value.roleName
            // }
            // getOptionLabel={(option) => t(option.roleName)}
            options={DummyRoles}
            loading={isGetRoleLoading}
            sx={{
              width: '50%',
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
                label="Select role"
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
          </Stack>
          <Divider />
          {/* Permission */}
          {/* <Stack direction="row" width='100%' justifyContent='space-between' alignItems='center'>
            <TypographyStyled >Password</TypographyStyled>
          <Autocomplete
            id="asynchronous-demo"
            multiple
            // onChange={(e, value) => onChangeSelectedPermissions(value)}
            // isOptionEqualToValue={(option, value) =>
            //   option.permissionName === value.permissionName
            // }
            // getOptionLabel={(option) => t(option.permissionName)}
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
              width: '50%',
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
                label="Select permission"
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
          </Stack> */}
          {/* <Stack
            direction="row"
            justifyContent="start"
            alignItems="center"
            minHeight="150px"
          >
            {account.signature && <img src={account.signature} alt=""></img>}
          </Stack> */}
          <SaveLoadingBtn
            loading={isCreateAccountLoading}
            disabled={isDisabledSave}
            // onClick={onCreateAccount}
          >
            Save
          </SaveLoadingBtn>
        </Stack>
      </Box>
    </Container>
  );
};
