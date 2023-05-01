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

interface Form {
  idUser: number;
  // password?: string;
  newPassword?: string;
  repeatNewPassword?: string;
}

const ChangePassword = () => {
  const { t } = useTranslation();
  const { userInfo, isChangePasswordLoading } = useSelector(
    (state) => state.auth
  );
  const [isDisable, setIsDisable] = useState(false);
  const [isPwErrorDisplay, setIsPwErrorDisplay] = useState(false);
  const { logout } = useAuth();
  const dispatch = useDispatch();
  const [form, setForm] = useState<Form>({
    idUser: +userInfo?.userId!,
    // password: undefined,
    newPassword: undefined,
    repeatNewPassword: undefined,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRepeatPassword = () =>
    setShowRepeatPassword((show) => !show);

  const onChangePasswordHandler = async (e: { preventDefault: () => void }) => {
    const { idUser, newPassword, repeatNewPassword } = form;
    if (newPassword !== repeatNewPassword) {
      dispatch(
        handleError({
          errorMessage: "Wrong repeat password. Please try again!",
        })
      );
      return;
    }

    await dispatch(
      changePassword({
        idUser,
        password: newPassword!,
      })
    ).unwrap();
    logout();
  };

  useEffect(() => {
    let check = false;
    // Object.values(form).forEach((value) => {
    //   if (!value) {
    //     check = true;
    //   }
    // });
    if (!form.newPassword || !form.repeatNewPassword) {
      setIsDisable(true);
      return;
    }
    setIsDisable(false);
    // check ? setIsDisable(true) : setIsDisable(false);
  }, [form]);

  // * Check password's validation
  useEffect(() => {
    const { newPassword } = form;
    if (!newPassword) return;
    const reg =
      /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/g;
    if (!reg.test(newPassword)) {
      setIsPwErrorDisplay(true);
      return;
    }
    setIsPwErrorDisplay(false);
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
          <h1 className="text-2xl font-bold z-10">{t('Change password')}</h1>
          <FormControl
            variant="standard"
            error={
              form.newPassword !== form.repeatNewPassword &&
              form.repeatNewPassword?.length !== 0
            }
          >
            <InputLabel htmlFor="outlined-adornment-password">
              {t('New password')}
            </InputLabel>
            <Input
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={form?.newPassword}
              onChange={(value) =>
                setForm({ ...form, newPassword: value.target.value })
              }
              // error={
              //   form.newPassword !== form.repeatNewPassword &&
              //   form.repeatNewPassword?.length !== 0
              // }
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
            {/* {form.newPassword !== form.repeatNewPassword &&
              form.repeatNewPassword?.length !== 0 && (
                <FormHelperText id="component-error-text">
                  Repeat password must be match with New password!
                </FormHelperText>
              )} */}
          </FormControl>
          <FormControl
            variant="standard"
            error={
              form.newPassword !== form.repeatNewPassword &&
              form.repeatNewPassword?.length !== 0
            }
          >
            <InputLabel htmlFor="outlined-adornment-password">
              {t('Repeat new password')}
            </InputLabel>
            <Input
              id="outlined-adornment-password"
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
            {form.newPassword !== form.repeatNewPassword &&
              form.repeatNewPassword?.length !== 0 && (
                <FormHelperText id="component-error-text">
                  {t('Repeat password must be match with New password')}!
                </FormHelperText>
              )}
          </FormControl>

          <SaveLoadingBtn
            loading={isChangePasswordLoading}
            disabled={isDisable}
            // disabled
            onClick={onChangePasswordHandler}
          >
            {t('Save')}
          </SaveLoadingBtn>
          <span className="text-gray-500 italic">
            *{t('Notice: After changing password, you have to login again!')}
          </span>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
