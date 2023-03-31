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
  Avatar,
  Paper,
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
import Divider from "@mui/material/Divider";
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
  color: "#6F7276",
});

const StackStyled = styled(Stack)({
  color: "#6F7276",
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
        <Paper elevation={3} sx={{ background: "#fff", borderRadius: "15px", p: 5 }}>
      <Stack spacing={3} >
          {/* <TypographyStyled>Create account</TypographyStyled> */}
          <Box
            sx={{
              borderRadius: "15px",
              height: "200px",
              background:
                "linear-gradient(159deg, rgba(233,241,255,1) 9%, rgba(115,152,221,1) 95%)",
              position: "relative",
            }}
          ></Box>
          <Stack
            direction="row"
            spacing={5}
            sx={{
              transform: "translate(0, -60%)",
              padding: "30px 30px 0 30px",
            }}
          >
            <Avatar
              sx={{
                width: 150,
                height: 150,
              }}
              alt="Cindy Baker"
              src="https://mui.com/static/images/avatar/1.jpg"
            />
            <Stack
              spacing={1}
              justifyContent="end"
              sx={{ width: "fit-content" }}
            >
              <Typography variant="h4">Profile</Typography>
              <Typography whiteSpace="nowrap">
                Update your photo and personal detail.
              </Typography>
            </Stack>
            <Stack
              sx={{ width: "100%" }}
              direction="row"
              justifyContent="end"
              alignItems="end"
            >
              <SaveLoadingBtn
                loading={isCreateAccountLoading}
                disabled={isDisabledSave}
                sx={{ height: "fit-content", width: "fit-content" }}
                // onClick={onCreateAccount}
              >
                Save
              </SaveLoadingBtn>
            </Stack>
          </Stack>
          <Stack
            spacing={3}
            sx={{ transform: "translateY(-10%)", paddingRight: "100px" }}
          >
            {/* <Stack spacing={10} direction="row">
              <Stack
                direction="row"
                width="50%"
                justifyContent="space-between"
                alignItems="center"
              >
                <TypographyStyled>First name</TypographyStyled>
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
              <Stack
                direction="row"
                width="50%"
                justifyContent="space-between"
                alignItems="center"
              >
                <TypographyStyled>Last name</TypographyStyled>
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
            </Stack> */}
            <Stack
              direction="row"
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <TypographyStyled>ID</TypographyStyled>

              <Typography id="component-outlined" sx={{ width: "50%" }}>
                9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
              </Typography>
              {/* <FormHelperText id="component-error-text">Error</FormHelperText> */}
            </Stack>
            <Divider />

            <Stack
              direction="row"
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <TypographyStyled>First name</TypographyStyled>
              <TextField
                id="component-outlined"
                // placeholder="Composed TextField"
                label="Username"
                sx={{ width: "50%" }}
                // onChange={(value) =>
                //   setAccount({
                //     ...account,
                //     userName: value.target.value,
                //   })
                // }
              />
            </Stack>
            <Divider />

            <Stack
              direction="row"
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <TypographyStyled>Last name</TypographyStyled>
              <TextField
                id="component-outlined"
                sx={{ width: "50%" }}
                // placeholder="Composed TextField"
                label="Password"
                defaultValue={account.password}
                disabled
              />
              {/* <FormHelperText id="component-error-text">Error</FormHelperText> */}
            </Stack>
            <Divider />

            <Stack
              direction="row"
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <TypographyStyled>Username</TypographyStyled>
              <TextField
                id="component-outlined"
                // placeholder="Composed TextField"
                label="Username"
                sx={{ width: "50%" }}
                // onChange={(value) =>
                //   setAccount({
                //     ...account,
                //     userName: value.target.value,
                //   })
                // }
              />
            </Stack>
            <Divider />
            <Stack
              direction="row"
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <TypographyStyled>Password</TypographyStyled>
              <Box width="50%">
                <SaveLoadingBtn
                  loading={isCreateAccountLoading}
                  disabled={isDisabledSave}
                  sx={{ height: "fit-content", width: "fit-content", px: 3 }}
                  // onClick={onCreateAccount}
                >
                  Change Password
                </SaveLoadingBtn>
              </Box>
            </Stack>
            <Divider />

            <Stack
              direction="row"
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <TypographyStyled>Your avatar</TypographyStyled>
              <Stack width="50%" direction="row" justifyContent="space-between">
                <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                  }}
                  alt="Cindy Baker"
                  src="https://mui.com/static/images/avatar/1.jpg"
                />
                <SaveLoadingBtn
                  loading={isCreateAccountLoading}
                  disabled={isDisabledSave}
                  sx={{ height: "fit-content", width: "fit-content", px: 2 }}
                  // onClick={onCreateAccount}
                >
                  Upload
                </SaveLoadingBtn>
              </Stack>
              {/* <FormHelperText id="component-error-text">Error</FormHelperText> */}
            </Stack>
            <Divider />

            {/* Department */}
            <Stack
              direction="row"
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <TypographyStyled>Department</TypographyStyled>
              <TextField
                id="component-outlined"
                // placeholder="Composed TextField"
                label="Department"
                helperText='Please contact to admin to make any changes!'
                sx={{ width: "50%" }}
                // onChange={(value) =>
                //   setAccount({
                //     ...account,
                //     userName: value.target.value,
                //   })
                // }
              />
            </Stack>
            <Divider />

            {/* Role */}
            <Stack
              direction="row"
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <TypographyStyled>Role</TypographyStyled>
              <TextField
                id="component-outlined"
                // placeholder="Composed TextField"
                label="Role"
                helperText='Please contact to admin to make any changes!'
                sx={{ width: "50%" }}
                // onChange={(value) =>
                //   setAccount({
                //     ...account,
                //     userName: value.target.value,
                //   })
                // }
              />
            </Stack>
            <Divider />
          </Stack>
        </Stack>
        </Paper>
    </Container>
  );
};
