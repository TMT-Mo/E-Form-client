import styled from '@emotion/styled';
import { Box, Typography, Stack, IconButton } from '@mui/material';
import React from 'react'
import AddBoxIcon from "@mui/icons-material/AddBox";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from '../../../hooks';

const CustomBox = styled(Box)({
  padding: "20px 40px",
  backgroundColor: "#fff",
  width: "fit-content",
  borderRadius: "15px",
  lineHeight: "50px",
});

export const RoleSystem = () => {
  const { isGetRoleLoading, roleList } = useSelector(
    (state) => state.system
  );
  return (
    <CustomBox>
          <Typography variant="h6" component="h2" style={{paddingBottom: '10px'}}>
            Role
          </Typography>
          {isGetRoleLoading && <CircularProgress />}
          <Stack direction="row" spacing={25} justifyContent='space-between' alignItems='center'>
            <Typography variant="h2" component="h1">
              23
            </Typography>
            <Stack spacing={1} >
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <AddBoxIcon />
              </IconButton>
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <DriveFileRenameOutlineIcon/>
              </IconButton>
            </Stack>
          </Stack>
        </CustomBox>
  )
}
