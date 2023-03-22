import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../components/DataTable";
import { useDispatch, useSelector } from "../../hooks";
import { DataTableHeader } from "../../utils/constants";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import styled from "@emotion/styled";
import { DepartmentSystem } from "./department";
import { RoleSystem } from "./role";
import { PermissionSystem } from "./permission";
import { getDepartmentList, getPermissionList, getRoleList } from "../../slices/system";

const { TYPE, CREATED_AT, CREATED_BY } = DataTableHeader;

const CustomBox = styled(Box)({
  padding: "20px 40px",
  backgroundColor: "#fff",
  width: "fit-content",
  borderRadius: "15px",
  lineHeight: "50px",
});
export const System = () => {
  const dispatch = useDispatch();
  const {} = useSelector(state => state.system)
  const { t } = useTranslation();

  useEffect(() => {
    const getDepartment = dispatch(getDepartmentList())
    const getRole = dispatch(getRoleList())
    const getPermission = dispatch(getPermissionList())

    getDepartment.unwrap()
    getRole.unwrap()
    getPermission.unwrap()
  
    return () => {
      getDepartment.abort()
      getRole.abort()
      getPermission.abort()
    }
  }, [dispatch])
  

  return (
    <div className="flex flex-col py-10 space-y-6">
      <h2>{t("System Management")}</h2>
      <Stack direction="row" justifyContent="space-evenly">
        <DepartmentSystem />
        <RoleSystem />
        <PermissionSystem />
      </Stack>
    </div>
  );
};
