import { useSelector } from "../hooks";
import { Permissions } from "../utils/constants";

export const usePermission = (permission: Permissions): boolean => {
  const { userInfo } = useSelector((state) => state.auth);
  // * Change permissions in token as string to number
  const hasPermissions = userInfo?.idPermissions.split(",").map((id) => +id);
  return hasPermissions?.includes(permission)!;
};
