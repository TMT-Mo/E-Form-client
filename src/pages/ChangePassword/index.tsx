import { TextField } from "@mui/material";
import { SaveLoadingBtn } from "../../components/CustomStyled";

const ChangePassword = () => {
  return (
    <div className={`h-screen flex items-center justify-center `}>
      <form>
        <div className="flex flex-col space-y-8 w-2/3 z-10 rounded-md bg-white shadow-md lg:w-96 lg:px-10 lg:py-10">
          <h1 className="text-2xl font-bold z-10">Change password</h1>
          <TextField
            // error
            id="standard-error"
            label="Username"
            variant="standard"
          />
          <TextField
            // error
            id="standard-error-helper-text"
            label="Password"
            variant="standard"
          />
          <TextField
            // error
            id="standard-error-helper-text"
            label="Repeat Password"
            variant="standard"
          />

          <SaveLoadingBtn>Save</SaveLoadingBtn>
          <span className="text-gray-500 italic">
            *Lưu ý: Sau khi đổi mật khẩu, bạn phải đăng nhập lại vào hệ thống!
          </span>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
