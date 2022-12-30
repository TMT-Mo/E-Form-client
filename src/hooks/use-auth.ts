
import { useDispatch } from "./use-dispatch";
// import { rootReducer } from './../store/index';
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { TOKEN_NAME } from "../utils/constants";
import { checkAuthentication, setUserInfo } from "../slices/auth";
import { helpers } from "../utils";

interface UseAuth {
  logout: () => void;
  authenticate: () => void;
}

export const useAuth = (): UseAuth => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getToken, clearToken} = helpers
  // const auth = useSelector(state => state)

  const logout = useCallback((): void => {
    clearToken()
    // rootReducer(auth.auth, {type: 'Reset'})
    navigate("/login", { replace: true });
  },[clearToken, navigate])

  const authenticate = useCallback(() => {
      dispatch(checkAuthentication({value: true}))
      const token = getToken()
      if (token) {
        dispatch(setUserInfo({token}));
        navigate('/user');
      } else {
        navigate('/login');
      }
  }, [dispatch, getToken, navigate]);

  return {
    logout,
    authenticate,
  };
};
