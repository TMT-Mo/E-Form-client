import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { SaveLoadingBtn } from "../../components/CustomStyled";
import { useDispatch, useSelector } from "../../hooks";
import { changePassword } from "../../slices/auth";
import { handleError } from "../../slices/alert";

interface Form{
  idUser: number;
  password?: string;
  newPassword?: string;
  repeatNewPassword?: string;
}

const ChangePassword = () => {
  const {userInfo, isChangePasswordLoading} = useSelector(state => state.auth)
  const [isDisable, setIsDisable] = useState(false)
  const dispatch = useDispatch()
  const [form, setForm] = useState<Form>({
    idUser: userInfo?.userId!,
    password: undefined,
    newPassword: undefined,
    repeatNewPassword: undefined
  })

  const onChangePasswordHandler = async (e: { preventDefault: () => void }) => {
    const {idUser, newPassword, repeatNewPassword, password} = form
    if(newPassword !== repeatNewPassword){
      dispatch(handleError({ errorMessage: 'Wrong repeat password. Please try again!' }));
      return
    }
    
    await dispatch(changePassword({ idUser, newPassword: newPassword!, password: password! })).unwrap();
  };

  useEffect(() => {
    let check = false;
    Object.values(form).forEach((value) => {
      if (!value) {
        check = true;
      }
    });
    check ? setIsDisable(true) : setIsDisable(false);
  }, [form]);
  
  return (
    <div className={`h-screen flex items-center justify-center `}>
      <form>
        <div className="flex flex-col space-y-8 w-2/3 z-10 rounded-md bg-white shadow-md lg:w-96 lg:px-10 lg:py-10">
          <h1 className="text-2xl font-bold z-10">Change password</h1>
          <TextField
            // error
            id="standard-error-helper-text"
            label="Password"
            variant="standard"
            value={form?.password}
            onChange={(value) => setForm({...form, password: value.target.value})}
          />
          <TextField
            // error
            id="standard-error-helper-text"
            label="New password"
            variant="standard"
            value={form?.newPassword}
            onChange={(value) => setForm({...form, newPassword: value.target.value})}
          />
          <TextField
            // error
            id="standard-error-helper-text"
            label="Repeat new password"
            variant="standard"
            value={form?.repeatNewPassword}
            onChange={(value) => setForm({...form, repeatNewPassword: value.target.value})}
          />

          <SaveLoadingBtn loading={isChangePasswordLoading} disabled={isDisable} onClick={onChangePasswordHandler}>Save</SaveLoadingBtn>
          <span className="text-gray-500 italic">
            *Lưu ý: Sau khi đổi mật khẩu, bạn phải đăng nhập lại vào hệ thống!
          </span>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
