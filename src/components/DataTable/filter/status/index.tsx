import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import {
  GridFilterOperator,
  GridFilterItem,
  GridFilterInputValueProps,
} from "@mui/x-data-grid";
import { useState } from "react";
import { DataTableHeader, StatusTemplate } from "../../../../utils/constants";

interface Items {
  value: StatusTemplate;
  label: string;
}
const {APPROVED, NEW, REJECTED} = StatusTemplate
const items: Items[] = [
  { value: NEW, label: "New" },
  { value: APPROVED, label: "Approved" },
  { value: REJECTED, label: "Rejected" },
];

const {STATUS } = DataTableHeader;
const SelectStatus = (props: GridFilterInputValueProps) => {
  const { applyValue, item } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = useState<any>('');

  const handleChange = (e: SelectChangeEvent) => {
    applyValue({
        ...item,
        value: e.target.value,
        columnField: STATUS,
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

export const statusOnlyOperators: GridFilterOperator[] = [
  {
    label: "equal",
    value: "equal",
    getApplyFilterFn: (filterItem: GridFilterItem) => {
      return filterItem.value;
    },
    InputComponent: SelectStatus,
  },
];
