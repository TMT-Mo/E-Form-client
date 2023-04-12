import {
  LocalizationProvider,
  DesktopDatePicker,
  DatePicker,
  DesktopDateTimePicker,
} from "@mui/x-date-pickers";
import { Box, Paper, Stack, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { t } from "i18next";
import { DateFilter } from "models/mui-data";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DummyStatistics } from "utils/dummy-data";

export const DetailBox = () => {
  const { approved, departmentName, rejected, total, waiting } =
    DummyStatistics[0];
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const handleFormatDate = (date: Dayjs | undefined) =>
    date?.toISOString().replace("Z", "").replace("T17", "T00");

  const handleChangeStartDate = (value: Dayjs) => {
    setStartDate(value.subtract(1, "day"));
  };

  const handleChangeEndDate = (value: Dayjs) => {
    setEndDate(value.subtract(2, "day"));
  };
  return (
    <Paper
      sx={{
        p: 3,
        maxWidth: 500,
      }}
    >
      <Stack direction='row' justifyContent='space-between' alignItems='end'>
      <Typography variant="h5" component="h5" >
        Template
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack direction="row" spacing={2}>
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
                  sx={{ width: "150px", }}
                  // value={null}
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
                <TextField {...params} sx={{ width: "150px", }} variant="standard" disabled />
              )}
              disableFuture
              minDate={startDate ?? undefined}
            />
          </Stack>
        </LocalizationProvider>
      </Stack>
      <Stack direction="row" justifyContent='space-between' alignItems='center'>
        <Typography
          variant="h6"
          component="h1"
          style={{ paddingBottom: "10px" }}
          fontWeight="bold"
        >
          {departmentName}
        </Typography>
        
      </Stack>
    </Paper>
  );
};
