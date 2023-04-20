import { Stack } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "hooks";
import { DepartmentSystem } from "./department";
import { RoleSystem } from "./role";
import { PermissionSystem } from "./permission";
import {
  clearSystem,
  getDepartmentList,
  getRoleList,
  getTemplateTypeList,
} from "slices/system";
import { Account } from "./account";
import { TypeTemplateSystem } from "pages/system/type-template";

export const System = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const getDepartment = dispatch(getDepartmentList());
    const getRole = dispatch(getRoleList());
    const getTypeTemplate = dispatch(getTemplateTypeList());
    // const getPermission = dispatch(getPermissionList());

    getDepartment.unwrap();
    getRole.unwrap();
    getTypeTemplate.unwrap()
    // getPermission.unwrap();

    return () => {
      getDepartment.abort();
      getRole.abort();
      getTypeTemplate.abort();
      // getPermission.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(clearSystem())
  }, [dispatch]);
  
  return (
    <div className="flex flex-col py-10 space-y-6">
      <h2>{t("System Management")}</h2>
      <Stack direction="row" justifyContent="space-evenly" spacing={5}>
        <DepartmentSystem />
        <RoleSystem />
        <PermissionSystem />
        <TypeTemplateSystem/>
      </Stack>
      <Account />
    </div>
  );
};
