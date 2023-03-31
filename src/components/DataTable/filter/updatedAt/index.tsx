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
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import { DataTableHeader } from "utils/constants";
import { DateFilter } from "models/mui-data";
import { useSelector } from "hooks";

const { UPDATED_AT } = DataTableHeader;
function InputNumberInterval(props: GridFilterInputValueProps) {
  const { item, applyValue } = props;
  const {filter} = useSelector(state => state.filter)
  const fromDate = (filter?.value as DateFilter)?.startDate
  const toDate = (filter?.value as DateFilter)?.endDate
  const [startDate, setStartDate] = useState<Dayjs | null>(fromDate ? dayjs(fromDate) : null);
  const [endDate, setEndDate] = useState<Dayjs | null>(toDate ? dayjs(toDate) : null);
  const handleFormatDate = (date: Dayjs | undefined) =>
    date?.toISOString().replace("Z", "").replace("T17", "T00");

  const handleChangeStartDate = (value: Dayjs) => {
    applyValue({
      ...item,
      value: {
        startDate: handleFormatDate(value),
        endDate: handleFormatDate(endDate?.add(2, "day")),
      } as DateFilter,
      columnField: UPDATED_AT,
    });
    setStartDate(value.subtract(1, "day"));
  };

  const handleChangeEndDate = (value: Dayjs) => {
    applyValue({
      ...item,
      value: {
        startDate: handleFormatDate(startDate?.add(1, "day")),
        endDate: handleFormatDate(value),
      } as DateFilter,
      columnField: UPDATED_AT,
    });
    setEndDate(value.subtract(2, "day"));
  };

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
      columnGap="1em"
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="From"
          inputFormat="DD/MM/YYYY"
          value={startDate}
          onChange={(newValue: Dayjs | null) =>
            handleChangeStartDate(newValue!.add(1, "day"))
          }
          renderInput={(params: any) => (
            <TextField
              {...params}
              variant="standard"
              disabled
              value={null}
            />
          )}
          disableFuture
          maxDate={endDate ?? undefined}
        />
        <DesktopDatePicker
          label="To"
          inputFormat="DD/MM/YYYY"
          value={endDate}
          onChange={(newValue: Dayjs | null) =>
            handleChangeEndDate(newValue!.add(2, "day"))
          }
          renderInput={(params: any) => (
            <TextField {...params} variant="standard" disabled />
          )}
          disableFuture
          minDate={startDate ?? undefined}
        />
      </LocalizationProvider>
    </Box>
  );
}

export const updatedAtOnlyOperators: GridFilterOperator[] = [
  {
    label: "Between",
    value: "between",
    getApplyFilterFn: (filterItem: GridFilterItem) => {
      return filterItem.value;
    },
    InputComponent: InputNumberInterval,
  },
];
