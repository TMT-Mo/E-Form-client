import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  GridFilterInputValueProps,
  GridFilterItem,
  GridFilterOperator,
} from "@mui/x-data-grid";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";

function InputNumberInterval(props: GridFilterInputValueProps) {
  const { item, applyValue, focusElementRef = null } = props;
  const [startDate, setStartDate] = useState<Dayjs | null>();
  const [endDate, setEndDate] = useState<Dayjs | null>();

  //   const handleUpperFilterChange: TextFieldProps['onChange'] = (event) => {
  //     const newUpperBound = event.target.value;
  //     updateFilterValue(filterValueState[0], newUpperBound);
  //   };
  //   const handleLowerFilterChange: TextFieldProps['onChange'] = (event) => {
  //     const newLowerBound = event.target.value;
  //     updateFilterValue(newLowerBound, filterValueState[1]);
  //   };

  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 300,
        height: 48,
      }}
      columnGap='1em'
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="From"
          inputFormat="DD/MM/YYYY"
          value={startDate}
          onChange={(newValue: Dayjs | null) => setStartDate(newValue)}
          renderInput={(params: any) => (
            <TextField
              {...params}
              variant="standard"
              // sx={{ marginRight: 2, width: "fit-content" }}
            />
          )}
        />
        <DesktopDatePicker
          label="To"
          inputFormat="DD/MM/YYYY"
          value={endDate}
          onChange={(newValue: Dayjs | null) => setEndDate(newValue)}
          renderInput={(params: any) => (
            <TextField {...params} variant="standard" />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
}
//
export const createdAtOnlyOperators: GridFilterOperator[] = [
  {
    label: "Between",
    value: "between",
    getApplyFilterFn: (filterItem: GridFilterItem) => {
      return filterItem.value;
    },
    InputComponent: InputNumberInterval,
  },
];
