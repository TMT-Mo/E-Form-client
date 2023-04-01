import { UserInfo } from "./../models/auth";

import { useDispatch } from "./use-dispatch";
// import { rootReducer } from './../store/index';
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { checkAuthentication, setUserInfo } from "../slices/auth";
import { helpers } from "../utils";
import jwtDecode from "jwt-decode";
import { setLocation } from "../slices/location";
import { Permissions } from "utils/constants";

interface UseAuth {
  logout: () => void;
  authenticate: () => void;
  handleLocation: () => void; 
}

const {SYSTEM_MANAGEMENT, ANALYTICS_DASHBOARD_MANAGEMENT, VIEW_TEMPLATE_MANAGEMENT } = Permissions
export const useAuth = (): UseAuth => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getToken, clearToken, getLocation } = helpers;
  // const auth = useSelector(state => state)

  const logout = useCallback((): void => {
    clearToken();
    // rootReducer(auth.auth, {type: 'Reset'})
    // store.dispatch({ type: 'Reset' });
    navigate("/login", { replace: true });
  }, [clearToken, navigate]);

  const handleLocation = useCallback(
    () => {
      const location = getLocation()

      const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }
      const user = jwtDecode(token) as UserInfo;
      
    const permissionList = user.idPermissions.split(',').map(p => +p)
    if(location){
      dispatch(setLocation({locationIndex: location}))
      dispatch(setUserInfo({ user }));
      return
    }
    const hasSystemPermission = permissionList.includes(SYSTEM_MANAGEMENT)
    const hasAnalyticsDashboardPermission = permissionList.includes(SYSTEM_MANAGEMENT)
    
    if(hasSystemPermission){
      dispatch(setLocation({locationIndex: SYSTEM_MANAGEMENT}))
      dispatch(setUserInfo({ user }));
      return
    }
    else if (hasAnalyticsDashboardPermission){
      dispatch(setLocation({locationIndex: ANALYTICS_DASHBOARD_MANAGEMENT}))
      dispatch(setUserInfo({ user }));
      return
    }
    else{
      dispatch(setLocation({locationIndex: VIEW_TEMPLATE_MANAGEMENT}))
      dispatch(setUserInfo({ user }));
    }
    },
    [dispatch, getLocation, getToken, navigate],
  )
  

  const authenticate = useCallback(() => {
    dispatch(checkAuthentication({ value: true }));
    handleLocation()
    navigate("/user");
  }, [dispatch, handleLocation, navigate]);

  return {
    logout,
    authenticate,
    handleLocation
  };
};
