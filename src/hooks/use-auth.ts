import { UserInfo } from "./../models/auth";

import { useDispatch } from "./use-dispatch";
// import { rootReducer } from './../store/index';
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { checkAuthentication, setUserInfo } from "../slices/auth";
import { helpers } from "../utils";
import jwtDecode from "jwt-decode";
import { setLocation } from "../slices/location";

interface UseAuth {
  logout: () => void;
  authenticate: () => void;
}

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

  const authenticate = useCallback(() => {
    dispatch(checkAuthentication({ value: true }));
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }
    const user = jwtDecode(token) as UserInfo;
    if (user.exp * 1000 < Date.now()) {
      //* Check if token has been expired
      logout();
      return;
    }
    const location = getLocation()
    // console.log(location)
    dispatch(setLocation({locationIndex: location}))
    dispatch(setUserInfo({ user }));
    navigate("/user");
  }, [dispatch, getLocation, getToken, logout, navigate]);

  return {
    logout,
    authenticate,
  };
};
