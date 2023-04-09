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
  { value: "true", label: "enable" },
  { value: "false", label: "disable" },
];

const { IS_ENABLE } = DataTableHeader;

const SelectType = (props: GridFilterInputValueProps) => {
  const { t } = useTranslation();
  const { applyValue, item } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { filter} = useSelector((state) => state.filter);

  const handleChange = (e: SelectChangeEvent) => {
    applyValue({
      ...item,
      value: e.target.value,
      columnField: IS_ENABLE,
    });
  };

  return (
    <FormControl variant="standard" sx={{ minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">
        {t('Filter value')}
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

export const isEnableOnlyOperators: GridFilterOperator[] = [
  {
    label: "equal",
    value: "equal",
    getApplyFilterFn: (filterItem: GridFilterItem) => {
      return filterItem.value;
    },
    InputComponent: SelectType,
  },
];
