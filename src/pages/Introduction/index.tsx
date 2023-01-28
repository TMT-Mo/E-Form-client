import React from "react";
import intropic from "../../assets/intropic.svg";
import scroll from "../../assets/scroll.svg";
import signature from "../../assets/signature.svg";
import paper from "../../assets/paper.svg";
import clock from "../../assets/clock.svg";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo-dark.svg";
import { Link } from "react-router-dom";
import { links } from "../../utils";

const Introduction = () => {
  const { t } = useTranslation();

  return (
    <main>
      {/* Hero */}
      <section className="flex flex-col p-20 space-y-16 items-center">
        <div className="flex justify-around items-center space-x-20">
          <div className="flex flex-col space-y-8">
            <h1 className="text-5xl font-medium leading-tight xl:w-2/3">
              {t("Process internal application way faster")}
            </h1>
            <p className="text-sm text-gray-config w-3/6">
              {t(
                `We’re here to help companies handle employee’s application much faster when and where ever they need.`
              )}
            </p>
            <Link
              to={links.login}
              className="px-16 py-3 font-semibold bg-blue-config text-white w-fit rounded-md no-underline"
            >
              {t("Sign in")}
            </Link>
          </div>
          <img alt="" src={intropic} />
        </div>
        <img alt="" src={scroll} className="w-20 animate-bounce" />
      </section>

      {/* Services */}
      <section className="flex flex-col p-20 space-y-8 items-center bg-blue-light-config">
        <h1 className="text-5xl font-medium leading-tight ">
          {t("What we bring to the table")}
        </h1>
        <p className="text-md text-gray-config">
          {t("We will help you manage your employee’s application")}
        </p>

        <div className="flex justify-around w-10/12 m-auto space-x-10">
          <div className="flex flex-col items-center space-y-3 border rounded-xl p-9 text-center w-80 h-56 shadow-lg shadow-blue-200 bg-white">
            <img alt="" src={signature} className="w-10" />
            <h2 className="font-medium">{t("Adding Signature")}</h2>
            <p className="text-sm text-gray-config pt-4">
              {t("User can add signature as a base64 image")}
            </p>
          </div>
          <div className="flex flex-col items-center space-y-3 border rounded-xl p-9 text-center w-80 h-56 shadow-lg shadow-blue-200 bg-white">
            <img alt="" src={paper} className="w-10" />
            <h2 className="font-medium">{t("Document Viewer")}</h2>
            <p className="text-sm text-gray-config pt-4">
              {t(
                "Customize document easily like word with drag, drop, input text, etc."
              )}
            </p>
          </div>
          <div className="flex flex-col items-center space-y-3 border rounded-xl p-9 text-center w-80 h-56 shadow-lg shadow-blue-200 bg-white">
            <img alt="" src={clock} className="w-10" />
            <h2 className="font-medium">{t("Save Time")}</h2>
            <p className="text-sm text-gray-config pt-4">
              {t(
                "Save lots of time with solving employee’s applications online"
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col p-20 space-y-8 items-center bg-slate-300">
        <h1 className="text-5xl font-medium leading-tight ">{t("Demo")}</h1>
      </section>

      {/* Footer */}
      <footer className="bg-dark-config">
        <div className="pt-20 pb-6 w-3/4 m-auto space-y-8 text-white fill-white">
          <div className="flex justify-around">
            <img src={logo} alt="" className="self-start " />
            <div className="flex flex-col space-y-4">
              <div className="font-semibold">{t("More Information")}</div>
              <span className="hover:font-semibold cursor-pointer">
                {t("User guide")}
              </span>
              <span className="hover:font-semibold cursor-pointer">
                {t("Install guide")}
              </span>
              <span className="hover:font-semibold cursor-pointer">
                {t("Github")}
              </span>
            </div>
            <div className="flex flex-col space-y-3">
              <div className="font-semibold">Contact</div>
              <div className="flex space-x-4 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.707 12.293a.999.999 0 0 0-1.414 0l-1.594 1.594c-.739-.22-2.118-.72-2.992-1.594s-1.374-2.253-1.594-2.992l1.594-1.594a.999.999 0 0 0 0-1.414l-4-4a.999.999 0 0 0-1.414 0L3.581 5.005c-.38.38-.594.902-.586 1.435.023 1.424.4 6.37 4.298 10.268s8.844 4.274 10.269 4.298h.028c.528 0 1.027-.208 1.405-.586l2.712-2.712a.999.999 0 0 0 0-1.414l-4-4.001zm-.127 6.712c-1.248-.021-5.518-.356-8.873-3.712-3.366-3.366-3.692-7.651-3.712-8.874L7 4.414 9.586 7 8.293 8.293a1 1 0 0 0-.272.912c.024.115.611 2.842 2.271 4.502s4.387 2.247 4.502 2.271a.991.991 0 0 0 .912-.271L17 14.414 19.586 17l-2.006 2.005z"></path>
                </svg>
                <span className="hover:font-semibold cursor-pointer">
                  0123456789
                </span>
              </div>
              <div className="flex space-x-4 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"></path>
                </svg>
                <span className="hover:font-semibold cursor-pointer">
                  abc@gmail.com
                </span>
              </div>
              <div className="flex space-x-4 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm7.931 9h-2.764a14.67 14.67 0 0 0-1.792-6.243A8.013 8.013 0 0 1 19.931 11zM12.53 4.027c1.035 1.364 2.427 3.78 2.627 6.973H9.03c.139-2.596.994-5.028 2.451-6.974.172-.01.344-.026.519-.026.179 0 .354.016.53.027zm-3.842.7C7.704 6.618 7.136 8.762 7.03 11H4.069a8.013 8.013 0 0 1 4.619-6.273zM4.069 13h2.974c.136 2.379.665 4.478 1.556 6.23A8.01 8.01 0 0 1 4.069 13zm7.381 6.973C10.049 18.275 9.222 15.896 9.041 13h6.113c-.208 2.773-1.117 5.196-2.603 6.972-.182.012-.364.028-.551.028-.186 0-.367-.016-.55-.027zm4.011-.772c.955-1.794 1.538-3.901 1.691-6.201h2.778a8.005 8.005 0 0 1-4.469 6.201z"></path>
                </svg>
                <span className="hover:font-semibold cursor-pointer">
                  HCM city
                </span>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-config w-11/12 opacity-80"></div>
          <div>
            {t(
              "© 2022 E-Form. All Rights Reserved. Terms & Conditions. Privacy Policy."
            )}
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Introduction;
