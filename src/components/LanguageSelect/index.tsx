import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { useTranslation } from "react-i18next";



const LanguageSelect: React.FC = () => {
  const {  i18n } = useTranslation();
  const secondLanguage = i18n.language.includes("en") ? "vn" : "en";
  const currentLanguage = i18n.language;

  const handleChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    i18n.changeLanguage(event.currentTarget.value );
  };

  console.log(currentLanguage);
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState: any) => (
        <div>
          <Button {...bindTrigger(popupState)} className="bg-white font-semibold" >
            {currentLanguage}
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
            <Button
              onClick={handleChange}
              value={secondLanguage}
            >
              {secondLanguage}
            </Button>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}

export default LanguageSelect
//
