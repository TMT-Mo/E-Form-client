import {
  Box,
  Stack,
  Typography,
  TextField,
  CircularProgress,
  Container,
  Avatar,
  Paper,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SaveLoadingBtn } from "../../components/CustomStyled";
import { useDispatch, useSelector } from "../../hooks";
import { AccountStatus, LocationIndex } from "../../utils/constants";
import Divider from "@mui/material/Divider";
import styled from "@emotion/styled";
import { getSignature } from "slices/auth";
import { setLocation } from "slices/location";
import { PhotoCamera } from "@mui/icons-material";
import Resizer from "react-image-file-resizer";
import { handleError } from "slices/alert";
import { editAccount, clearUserList, getUserList, getDepartmentList, getRoleList } from "slices/system";

interface AccountState {
  idUser: number;
  userName?: string;
  avatar?: string;
  idDepartment?: number;
  idRole?: number;
  firstName: string;
  lastName: string;
  idPermissions: number[];
  signature?: string;
}

const TypographyStyled = styled(Typography)({
  color: "#6F7276",
});

export const MyAccount = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { departmentList, roleList, isEditAccountLoading } = useSelector(
    (state) => state.system
  );
  const { userInfo, signature, isGetSignatureLoading } = useSelector(
    (state) => state.auth
  );
  const [account, setAccount] = useState<AccountState>({
    idUser: +userInfo?.userId!,
    userName: userInfo?.userName,
    avatar: userInfo?.avatar,
    firstName: userInfo?.firstName!,
    lastName: userInfo?.lastName!,
    idDepartment: departmentList.find(
      (department) => department.departmentName === userInfo?.departmentName
    )?.id,
    idRole: roleList.find((role) => role.roleName === userInfo?.roleName)?.id,
    idPermissions: userInfo?.idPermissions.split(",").map((p) => +p)!,
    signature,
  });
  const [isDisabledSave, setIsDisabledSave] = useState(false);

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
      avatar: image as string,
    });
    e.target.value = "";
  };

  const EditAccountHandler = async () => {
    const onEditAccount = dispatch(
      editAccount({
        ...account,
        idDepartment: departmentList.find(
          (department) => department.departmentName === userInfo?.departmentName
        )?.id,
        idRole: roleList.find((role) => role.roleName === userInfo?.roleName)?.id,
      })
    );
    await onEditAccount.unwrap();

    return () => onEditAccount.abort();
  };

  useEffect(() => {
    if (!userInfo?.userId) return;
    dispatch(getSignature({ userId: +userInfo?.userId })).unwrap();
  }, [dispatch, userInfo?.userId]);

  // useEffect(() => {
  //   const getDepartment = dispatch(getDepartmentList());
  //   const getRole = dispatch(getRoleList());
  //   // const getPermission = dispatch(getPermissionList());

  //   getDepartment.unwrap();
  //   getRole.unwrap();
  // }, [dispatch]);

  return (
    <Container sx={{ py: 10 }}>
      <Paper
        elevation={3}
        sx={{ background: "#fff", borderRadius: "15px", p: 5 }}
      >
        <Stack spacing={3}>
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
              src={account.avatar ?? userInfo?.avatar}
            />
            <Stack
              spacing={1}
              justifyContent="end"
              sx={{ width: "fit-content" }}
            >
              <Typography variant="h4" whiteSpace="nowrap">
                {t(`Welcome back, `)}
                {userInfo?.firstName} {userInfo?.lastName}
              </Typography>
              <Typography whiteSpace="nowrap">
                {t("Update your photo and personal detail")}
              </Typography>
            </Stack>
            <Stack
              sx={{ width: "100%" }}
              direction="row"
              justifyContent="end"
              alignItems="end"
            >
              {/* <SaveLoadingBtn
                loading={isEditAccountLoading}
                disabled={isDisabledSave}
                sx={{ height: "fit-content", width: "fit-content" }}
                onClick={EditAccountHandler}
              >
                {t("Save")}
              </SaveLoadingBtn> */}
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
              <TypographyStyled>{t("First name")}</TypographyStyled>
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
              <TypographyStyled>{t("Last name")}</TypographyStyled>
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
              <TypographyStyled>{t("Username")}</TypographyStyled>
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
              <TypographyStyled>{t("Password")}</TypographyStyled>
              <Box width="50%">
                <SaveLoadingBtn
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
                  {t("Change Password")}
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
              <TypographyStyled>{t("Your avatar")}</TypographyStyled>
              <Stack width="50%" direction="row" justifyContent="space-between">
                <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                  }}
                  alt="Cindy Baker"
                  src={account.avatar ?? userInfo?.avatar}
                />
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
              <TypographyStyled>{t("Department")}</TypographyStyled>
              <TextField
                id="component-outlined"
                // placeholder="Composed TextField"
                label={t("Department")}
                helperText={t("Please contact to admin to make any changes!")}
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
              <TypographyStyled>{t("Role")}</TypographyStyled>
              <TextField
                id="component-outlined"
                // placeholder="Composed TextField"
                label={t("Role")}
                helperText={t("Please contact to admin to make any changes!")}
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
              <TypographyStyled>{t("Signature")}</TypographyStyled>
              {isGetSignatureLoading && <CircularProgress />}
              {signature && (
                <Box width="50%">
                  <img src={signature} alt="" />
                </Box>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};
