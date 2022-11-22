import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import intropic from "../../assets/intropic.svg";
import { useDispatch, useSelector } from "../../hooks";
import { login } from "../../slices/auth";
import { handleError, handleSuccess } from "../../slices/notification";
import { ThemeProvider, createTheme } from "@mui/system";
import { CircularProgress } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      blue: "#407AFF",
    },
    text: {
      white: "#fff",
    },
  },
});

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoginLoading } = useSelector((state) => state.auth);
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const onLoginHandler = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();
      await dispatch(login({ username, password })).unwrap();
       navigate("/home");
    } catch (err) {
      console.log(err)
    }
    
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="flex items-center w-10/12 justify-around bg-blue-light-config px-20 py-32 rounded-xl">
        <div className="flex flex-col space-y-4 items-center">
          <img alt="" src={intropic} className="cursor-pointer" />
          <h1 className="text-4xl font-medium pt-10">
            {t("Welcome to E-Form")}
          </h1>
          <p className="text-md text-gray-config text-center">
            {t(
              "Input your Email and password to join us and get fully accessible"
            )}
          </p>
        </div>
        <form onSubmit={onLoginHandler}>
          <div className="flex flex-col p-20 space-y-8">
            <h1 className="text-4xl font-bold ">{t("Sign in")}</h1>
            <div className="flex flex-col space-y-2">
              <h2>
                Email address <span className="text-red-500">*</span>
              </h2>
              <input
                type="text"
                className="px-6 py-3 border rounded-xl w-72 outline-none"
                placeholder="Example@gmail.com"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <h2>
                Password <span className="text-red-500">*</span>
              </h2>
              <input
                type="password"
                className="px-6 py-3 border rounded-xl w-72 outline-none"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <LoadingButton
              size="small"
              loading={isLoginLoading}
              loadingIndicator={<CircularProgress color="inherit" size={16}/>}
              variant="outlined"
              onClick={onLoginHandler}
              disabled={!(password && username)}
              sx={{
                bgcolor: "#407AFF",
                borderRadius: "5px",
                color: "#fff",
                paddingTop: '10px',
                paddingBottom: '10px',
                ":hover": { bgcolor: "#fff", color: "#407AFF" },
                
              }}
              
            >
              {t("Sign in")}
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
