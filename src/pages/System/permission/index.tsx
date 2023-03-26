import styled from "@emotion/styled";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import React, { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "../../../hooks";
import { DummyPermissions } from "../../../utils/dummy-data";
import { t } from "i18next";
import { WhiteBtn } from "../../../components/CustomStyled";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField/TextField";

const CustomBox = styled(Box)({
  padding: "20px 40px",
  backgroundColor: "#fff",
  width: "100%",
  borderRadius: "15px",
  lineHeight: "50px",
});

export const PermissionSystem = () => {
  const { t } = useTranslation();
  const { isGetPermissionLoading, permissionList } = useSelector(
    (state) => state.system
  );
  const [isOpenPermissionDialog, setIsOpenPermissionDialog] = useState(false);
  return (
    <>
      <CustomBox>
        <Typography
          variant="h6"
          component="h2"
          style={{ paddingBottom: "10px" }}
          fontWeight='bold'
        >
          Permission
        </Typography>
        {isGetPermissionLoading && <CircularProgress />}
        <Stack
          direction="row"
          spacing={25}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h2" component="h1">
            {DummyPermissions.length}
          </Typography>
          <Stack spacing={1}>
            <IconButton
              onClick={() =>
                setIsOpenPermissionDialog((prevState) => !prevState)
              }
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
            >
              <DriveFileRenameOutlineIcon />
            </IconButton>
          </Stack>
        </Stack>
      </CustomBox>
      <Dialog open={isOpenPermissionDialog}>
        <DialogContent>
          <Box minWidth="500px">
            <Stack spacing={2}>
              <Typography variant="h5" component="h1" alignSelf='center'>
                Permission List
              </Typography>
              {DummyPermissions.map((permission) => (
                <TextField key={permission.id} value={permission.permissionName} disabled />
              ))}
              <DialogActions>
                <WhiteBtn
                  onClick={() => setIsOpenPermissionDialog(false)}
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
