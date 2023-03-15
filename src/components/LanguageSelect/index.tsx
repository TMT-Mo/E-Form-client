import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { useTranslation } from "react-i18next";
import { US, VN } from 'country-flag-icons/react/3x2'

const LanguageSelect: React.FC = () => {
  const { i18n } = useTranslation();
  const secondLanguage = i18n.language.includes("en") ? "vn" : "en";
  const currentLanguage = i18n.language;

  const handleDisplayFlag = (value: string) => {
    if(value.includes('en')){
      return <US title="US" style={{width: '17px', height: '17px'}}/>
    }
    else{
      return <VN title="VN" style={{width: '17px', height: '17px'}}/>
    }
  }

  const handleChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    i18n.changeLanguage(event.currentTarget.value);
  };
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState: any) => (
        <div className="flex items-center">
          <Button
            {...bindTrigger(popupState)}
            className="bg-white font-semibold"
          >
            {handleDisplayFlag(currentLanguage)}
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Button onClick={handleChange} value={secondLanguage}>
              {handleDisplayFlag(secondLanguage)}
            </Button>
          </Popover>
        </div>
      )}
    </PopupState>
  );
};

export default LanguageSelect;
//
