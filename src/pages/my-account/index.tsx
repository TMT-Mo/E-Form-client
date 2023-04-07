import {
  Box,
  Stack,
  Typography,
  TextField,
  CircularProgress,
  Container,
  Avatar,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SaveLoadingBtn } from "../../components/CustomStyled";
import { useDispatch, useSelector } from "../../hooks";
import { LocationIndex } from "../../utils/constants";
import Divider from "@mui/material/Divider";
import styled from "@emotion/styled";
import { getSignature } from "slices/auth";
import { setLocation } from "slices/location";



interface AccountState {
  idUser: number;
  userName?: string;
  idDepartment?: number;
  idRole?: number;
  firstName: string;
  lastName: string;
}

const TypographyStyled = styled(Typography)({
  color: "#6F7276",
});


export const MyAccount = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    departmentList,
    roleList,
    isCreateAccountLoading,
  } = useSelector((state) => state.system);
  const { userInfo, signature, isGetSignatureLoading } = useSelector((state) => state.auth);
  const [account, setAccount] = useState<AccountState>({
    idUser: userInfo?.userId!,
    userName: userInfo?.userName,
    firstName: userInfo?.firstName!,
    lastName: userInfo?.lastName!,
    idDepartment: departmentList.find(
      (department) =>
        department.departmentName === userInfo?.departmentName
    )?.id,
    idRole: roleList.find((role) => role.roleName === userInfo?.roleName)
      ?.id,
  });
  const [isDisabledSave, setIsDisabledSave] = useState(false);

  useEffect(() => {
    if(!userInfo?.userId) return
    dispatch(getSignature({userId: +userInfo?.userId})).unwrap()
  }, [dispatch, userInfo?.userId]);
  
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
              <Typography variant="h4" whiteSpace="nowrap">{t(`Welcome back, ${userInfo?.firstName} ${userInfo?.lastName}`)}</Typography>
              <Typography whiteSpace="nowrap">
                {t('Update your photo and personal detail')}
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
                {t('Save')}
              </SaveLoadingBtn>
            </Stack>
          </Stack>
          <Stack
            spacing={3}
            sx={{ transform: "translateY(-10%)", paddingRight: "100px" }}
          >
            <Stack
              direction="row"
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <TypographyStyled>ID</TypographyStyled>

              <Typography id="component-outlined" sx={{ width: "50%" }}>
                {userInfo?.userId}
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
              <TypographyStyled>{t('First name')}</TypographyStyled>
              <TextField
                id="component-outlined"
                // placeholder="Composed TextField"
                label={t("Username")}
                sx={{ width: "50%" }}
                value={userInfo?.firstName}
                onChange={(value) =>
                  setAccount({
                    ...account,
                    firstName: value.target.value,
                  })
                }
              />
            </Stack>
            <Divider />

            <Stack
              direction="row"
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <TypographyStyled>{t('Last name')}</TypographyStyled>
              <TextField
                id="component-outlined"
                sx={{ width: "50%" }}
                // placeholder="Composed TextField"
                label={t("Password")}
                value={userInfo?.lastName}
                onChange={(value) =>
                  setAccount({
                    ...account,
                    lastName: value.target.value,
                  })
                }
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
              <TypographyStyled>{t('Username')}</TypographyStyled>
              {/* <TextField
                id="component-outlined"
                value={userInfo?.userName}
                disabled
                label={t("Username")}
                sx={{ width: "50%" }}
              /> */}
              <Typography id="component-outlined" sx={{ width: "50%" }}>
              {userInfo?.userName}
              </Typography>
            </Stack>
            <Divider />
            <Stack
              direction="row"
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <TypographyStyled>{t('Password')}</TypographyStyled>
              <Box width="50%">
                <SaveLoadingBtn
                  loading={isCreateAccountLoading}
                  disabled={isDisabledSave}
                  sx={{ height: "fit-content", width: "fit-content", px: 3 }}
                  onClick={() =>
                    dispatch(
                      setLocation({
                        locationIndex: LocationIndex.CHANGE_PASSWORD,
                      })
                    )
                  }
                >
                  {t('Change Password')}
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
              <TypographyStyled>{t('Your avatar')}</TypographyStyled>
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
                  {t('Upload')}
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
              <TypographyStyled>{t('Department')}</TypographyStyled>
              <TextField
                id="component-outlined"
                // placeholder="Composed TextField"
                label={t("Department")}
                helperText='Please contact to admin to make any changes!'
                sx={{ width: "50%" }}
                value={userInfo?.departmentName}
                disabled
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
              <TypographyStyled>{t('Role')}</TypographyStyled>
              <TextField
                id="component-outlined"
                // placeholder="Composed TextField"
                label={t("Role")}
                helperText='Please contact to admin to make any changes!'
                sx={{ width: "50%" }}
                value={userInfo?.roleName}
                disabled
              />
            </Stack>
            <Divider />
            <Stack
              direction="row"
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <TypographyStyled>{t('Signature')}</TypographyStyled>
              {isGetSignatureLoading && <CircularProgress/>}
              {signature && <Box width='50%'><img src={signature} alt=''/></Box>}
            </Stack>
          </Stack>
        </Stack>
        </Paper>
    </Container>
  );
};
