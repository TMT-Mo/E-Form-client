import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import intropic from "../../assets/intropic.svg";
import { useDispatch, useSelector } from "../../hooks";
import { login } from "../../slices/auth";
import { handleError, handleSuccess } from "../../slices/notification";
// import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";

const LoadingBtn = styled(
  LoadingButton,
  {}
)({
  backgroundColor: "#407AFF",
  borderRadius: "5px",
  color: "#fff",
  paddingTop: "10px",
  paddingBottom: "10px",
  ":hover": { backgroundColor: "#fff", color: "#407AFF" },
  "&.Mui-disabled":{
    color:'#F2F2F2',
    backgroundColor: '#6F7276'
  },
  "&.MuiLoadingButton-loading": {
    backgroundColor: "#fff",
    borderColor:'#407AFF'
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
      navigate("/user");
    } catch (err) {
      console.log(err);
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
          <div className="flex flex-col p-20 space-y-8 w-96">
            <h1 className="text-4xl font-bold ">{t("Sign in")}</h1>
            <div className="flex flex-col space-y-2">
              <div className="">
                Email address <span className="text-red-500">*</span>
              </div>
              <TextField
                id="outlined-basic"
                className="bg-white "
                label="example@"
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <div>
                Password <span className="text-red-500">*</span>
              </div>
              <TextField
                id="outlined-basic"
                type="password"
                className="bg-white "
                label="Password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <LoadingBtn
              size="small"
              loading={isLoginLoading}
              loadingIndicator={<CircularProgress color="inherit" size={16} />}
              variant="outlined"
              onClick={onLoginHandler}
              disabled={!(password && username)}
            >
              {t("Sign in")}
            </LoadingBtn>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
