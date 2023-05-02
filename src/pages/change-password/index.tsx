import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import { SaveLoadingBtn } from "components/CustomStyled";
import { useAuth, useDispatch, useSelector } from "hooks";
import { changePassword } from "slices/auth";
import { handleError } from "slices/alert";
import { getDepartmentList, getRoleList } from "slices/system";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { helpers } from "utils";

interface Form {
  oldPassword?: string;
  newPassword?: string;
  repeatNewPassword?: string;
}

interface PwDisplay {
  isDisplay: boolean;
  errorMessage?: string;
}

const ChangePassword = () => {
  const { t } = useTranslation();
  const { userInfo, isChangePasswordLoading } = useSelector(
    (state) => state.auth
  );
  const [isDisable, setIsDisable] = useState(false);
  const [pwErrorDisplay, setPwErrorDisplay] = useState<PwDisplay>();
  const { logout } = useAuth();
  const dispatch = useDispatch();
  const [form, setForm] = useState<Form>({
    oldPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  helpers.decryptData();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRepeatPassword = () =>
    setShowRepeatPassword((show) => !show);

  const onChangePasswordHandler = async (e: { preventDefault: () => void }) => {
    const { newPassword, oldPassword } = form;
    if (oldPassword !== helpers.decryptData()) {
      dispatch(
        handleError({
          errorMessage: "Wrong old password. Please try again!",
        })
      );
      return;
    }

    await dispatch(
      changePassword({
        idUser: +userInfo?.userId!,
        password: newPassword!,
      })
    ).unwrap();
    logout();
  };

  useEffect(() => {
    let hasEmpty = false;
    Object.values(form).forEach((value) => {
      if (!value) {
        hasEmpty = true;
      }
    });
    if (hasEmpty || pwErrorDisplay?.isDisplay) {
      setIsDisable(true);
      return;
    }
    setIsDisable(false);
  }, [form, pwErrorDisplay]);

  // * Check password's validation
  useEffect(() => {
    const { newPassword } = form;
    if (!newPassword) return;
    const reg =
      /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/g;
    if (!reg.test(newPassword)) {
      setPwErrorDisplay({
        isDisplay: true,
        errorMessage:
          "New password must have at least 8 characters includes a special character, one uppercase and one number",
      });
      return;
    }
    if (form.newPassword !== form.repeatNewPassword) {
      setPwErrorDisplay({
        isDisplay: true,
        errorMessage: "Repeat password must be match with New password",
      });
      return;
    }
    setPwErrorDisplay({ isDisplay: false, errorMessage: undefined });
  }, [form]);

  useEffect(() => {
    const getDepartment = dispatch(getDepartmentList());
    const getRole = dispatch(getRoleList());

    getDepartment.unwrap();
    getRole.unwrap();

    return () => {
      getDepartment.abort();
      getRole.abort();
    };
  }, [dispatch]);

  return (
    <div className={`h-screen flex items-center justify-center `}>
      <form>
        <div className="flex flex-col space-y-8 w-2/3 z-10 rounded-md bg-white shadow-md lg:w-96 lg:px-10 lg:py-10">
          <h1 className="text-2xl font-bold z-10">{t("Change password")}</h1>
          <FormControl variant="standard">
            <InputLabel htmlFor="outlined-adornment-password">
              {t("Old password")}
            </InputLabel>
            <Input
              id="old"
              type="password"
              value={form?.oldPassword}
              onChange={(value) =>
                setForm({ ...form, oldPassword: value.target.value })
              }
            />
          </FormControl>
          <FormControl variant="standard" error={pwErrorDisplay?.isDisplay}>
            <InputLabel htmlFor="outlined-adornment-password">
              {t("New password")}
            </InputLabel>
            <Input
              id="new"
              type={showPassword ? "text" : "password"}
              value={form?.newPassword}
              onChange={(value) =>
                setForm({ ...form, newPassword: value.target.value })
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="standard" error={pwErrorDisplay?.isDisplay}>
            <InputLabel htmlFor="outlined-adornment-password">
              {t("Repeat new password")}
            </InputLabel>
            <Input
              id="repeat"
              type={showRepeatPassword ? "text" : "password"}
              value={form?.repeatNewPassword}
              onChange={(value) =>
                setForm({ ...form, repeatNewPassword: value.target.value })
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowRepeatPassword}
                    edge="end"
                  >
                    {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {pwErrorDisplay?.isDisplay && (
              <FormHelperText id="component-error-text">
                {t(pwErrorDisplay.errorMessage!)}
              </FormHelperText>
            )}
          </FormControl>

          <SaveLoadingBtn
            loading={isChangePasswordLoading}
            disabled={isDisable}
            // disabled
            onClick={onChangePasswordHandler}
          >
            {t("Save")}
          </SaveLoadingBtn>
          <span className="text-gray-500 italic">
            *{t("Notice: After changing password, you have to login again!")}
          </span>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
