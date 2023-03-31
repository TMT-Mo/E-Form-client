import React from "react";
import { Link } from "react-router-dom";
import logo from "assets/logo-light.svg";
import { links } from "utils";
import LanguageSelect from "components/LanguageSelect";

const TopBar: React.FC = () => {
  return (
    <div className="flex px-10 py-8 space-x-20 justify-around items-center">
      <Link to={links.introduction}><img src={logo} alt="logo" className="scale-75 w-fit"/></Link>
      <div>
        <LanguageSelect />
        </div>
    </div>
  );
};

export default TopBar;
