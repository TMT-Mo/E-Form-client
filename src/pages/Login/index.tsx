import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import intropic from "../../assets/intropic.svg";
import { useDispatch, useSelector } from "../../hooks";
import { login } from "../../slices/auth";
// import { handleError, handleSuccess } from "../../slices/notification";
// import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import {
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import { VisibilityOff, Visibility } from "@mui/icons-material";

interface State {
  password: string;
  showPassword: boolean;
}

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
  "&.Mui-disabled": {
    color: "#F2F2F2",
    backgroundColor: "#6F7276",
  },
  "&.MuiLoadingButton-loading": {
    backgroundColor: "#fff",
    borderColor: "#407AFF",
  },
});

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoginLoading } = useSelector((state) => state.auth);
  const [username, setUsername] = useState<string>();
  const [values, setValues] = useState<State>({
    password: "",
    showPassword: false,
  });

  const onLoginHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await dispatch(login({ username, password: values.password })).unwrap();
    navigate("/user");
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="flex flex-col items-center justify-center px-10 py-10 bg-blue-light-config  rounded-xl  lg:flex-row w-10/12 lg:justify-around lg:px-10 lg:py-32">
        <div className=" flex-col-reverse space-y-4 items-center hidden lg:flex-col lg:flex">
          <Link to="/user">
            <img alt="" src={intropic} className="cursor-pointer lg:block" />
          </Link>
          <div className="flex flex-col space-y-4 pb-8 items-center text-center w-60 lg:w-fit">
            <h1 className="text-4xl font-medium pt-10">
              {t("Welcome to E-Form")}
            </h1>
            <p className="text-md text-gray-config text-center">
              {t(
                "Input your Email and password to join us and get fully accessible"
              )}
            </p>
          </div>
        </div>
        <form onSubmit={onLoginHandler}>
          <div className="flex flex-col space-y-8 w-72  md:w-96">
            <h1 className="text-4xl font-bold ">{t("Sign in")}</h1>
            <div className="flex flex-col space-y-2">
              <div className="">
                {t("Email address")} <span className="text-red-500">*</span>
              </div>
              <TextField
                id="outlined-basic"
                className="bg-white "
                label={t("example@")}
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <div>
                {t("Password")} <span className="text-red-500">*</span>
              </div>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  {t("Enter password")}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={(e) =>
                    setValues({
                      password: e.target.value,
                      showPassword: values.showPassword,
                    })
                  }
                  className="w-full bg-white"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </div>
            <LoadingBtn
              size="small"
              loading={isLoginLoading}
              loadingIndicator={<CircularProgress color="inherit" size={16} />}
              variant="outlined"
              onClick={onLoginHandler}
              disabled={!(values.password && username)}
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
