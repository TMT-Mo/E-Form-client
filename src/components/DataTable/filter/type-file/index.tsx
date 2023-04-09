import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import {
  GridFilterOperator,
  GridFilterItem,
  GridFilterInputValueProps,
} from "@mui/x-data-grid";
import { useSelector } from "hooks";
import { useTranslation } from "react-i18next";
import { DataTableHeader } from "utils/constants";

interface Items {
  value: string;
  label: string;
}
const items: Items[] = [
  { value: ".pdf", label: "PDF" },
  { value: ".doc", label: "DOC" },
  { value: ".docx", label: "DOCX" },
];

const { TYPE } = DataTableHeader;
const SelectType = (props: GridFilterInputValueProps) => {
  const { t } = useTranslation();
  const { applyValue, item } = props;
  const { filter} = useSelector((state) => state.filter);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  
  const handleChange = (e: SelectChangeEvent) => {
    applyValue({
      ...item,
      value: e.target.value,
      columnField: TYPE,
    });
  };

  return (
    <FormControl variant="standard" sx={{ minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">
        {t("Filter value")}
      </InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        label="Age"
        value={filter?.value as string}
        onChange={handleChange}
      >
        {items.map((item, index) => (
          <MenuItem value={item.value} key={index}>
            {t(item.label)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};



export const typeOnlyOperators: GridFilterOperator[] = [
  {
    label: "Equal",
    value: "equal",
    getApplyFilterFn: (filterItem: GridFilterItem) => {
      return filterItem.value;
    },
    InputComponent: SelectType,
  },
];
