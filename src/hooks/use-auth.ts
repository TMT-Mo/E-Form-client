
import { useDispatch } from "./use-dispatch";
// import { rootReducer } from './../store/index';
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { TOKEN_NAME } from "../utils/constants";
import { setUserInfo, storeToken } from "../slices/auth";

interface UseAuth {
  login: (token: string) => void;
  logout: () => void;
  authenticate: () => void;
}

export const useAuth = (): UseAuth => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const auth = useSelector(state => state)
  const login = (token: string): void => {
    localStorage.setItem(TOKEN_NAME, JSON.stringify(token));
  };

  const logout = (): void => {
    localStorage.clear();
    // rootReducer(auth.auth, {type: 'Reset'})
    navigate("/login", { replace: true });
  };

  const authenticate = useCallback(() => {
    try {
      dispatch(storeToken({value: true}))
      const token = localStorage.getItem(TOKEN_NAME) as string;
      if (token) {
        dispatch(setUserInfo({token}));
        navigate('/user');
      } else {
        navigate('/login');
      }
    } catch (error) {
      localStorage.clear()
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return {
    login,
    logout,
    authenticate,
  };
};
