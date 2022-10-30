import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import intropic from "../../assets/intropic.svg";
const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate()

  const onLoginHandler = () =>{
    navigate('/home')
  }
  
  return (
    <div className="flex justify-center mt-10">
      <div className="flex items-center w-10/12 justify-around bg-blue-light-config px-20 py-32 rounded-xl">
        <div className="flex flex-col space-y-4 items-center">
            <img alt="" src={intropic} className="cursor-pointer"/>
          <h1 className="text-4xl font-medium pt-10">{t('Welcome to E-Form')}</h1>
          <p className="text-md text-gray-config text-center">
            {t('Input your Email and password to join us and get fully accessible')}
          </p>
        </div>
        <form onSubmit={onLoginHandler}>
          <div className="flex flex-col p-20 space-y-8">
            <h1 className="text-4xl font-bold ">{t('Sign in')}</h1>
            <div className="flex flex-col space-y-2">
              <h2>Email address <span className="text-red-500">*</span></h2>
              <input
                type="text"
                className="px-6 py-3 border rounded-xl w-72 outline-none"
                placeholder="Example@gmail.com"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <h2>Password <span className="text-red-500">*</span></h2>
              <input
                type="password"
                className="px-6 py-3 border rounded-xl w-72 outline-none"
                placeholder="Password"
              />
            </div>
            <button className="px-16 py-3 font-semibold bg-blue-config text-white rounded-md">
              {t('Sign in')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
