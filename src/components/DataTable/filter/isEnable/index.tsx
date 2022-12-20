import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import {
  GridFilterOperator,
  GridFilterItem,
  GridFilterInputValueProps,
} from "@mui/x-data-grid";
import { useState } from "react";
import { DataTableHeader } from "../../../../utils/constants";

interface Items {
  value: string;
  label: string;
}
const items: Items[] = [
  { value: 'false', label: 'false' },
  { value: 'true', label: 'true' },
];

const { IS_ENABLE} = DataTableHeader;

const SelectType = (props: GridFilterInputValueProps) => {
  const { applyValue, item } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = useState<any>('');

  const handleChange = (e: SelectChangeEvent) => {
    applyValue({
        ...item,
        value: e.target.value,
        columnField: IS_ENABLE,
      });
      setValue(e.target.value);
  } 
  
  return (
    <FormControl variant="standard" sx={{ minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">Filter value</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        label="Age"
        value={value}
        onChange={handleChange}
      >
        {items.map((item, index) => (
          <MenuItem value={item.value} key={index}>{item.label}</MenuItem>
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
