import {
  LocalizationProvider,
  DesktopDatePicker,
  DatePicker,
  DesktopDateTimePicker,
} from "@mui/x-date-pickers";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { t } from "i18next";
import { DateFilter } from "models/mui-data";
import React, { useState } from "react";
import { useSelector } from "hooks";
import { DummyStatistics } from "utils/dummy-data";
import { TextFieldStyled } from "components/CustomStyled";
import { Department } from "models/system";

export const TemplateBox = () => {
  const { approved, departmentName, rejected, total, waiting } =
    DummyStatistics[0];
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department>();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    isGetDepartmentsLoading,
    departmentList,
  } = useSelector((state) => state.system);

  const handleFormatDate = (date: Dayjs | undefined) =>
    date?.toISOString().replace("Z", "").replace("T17", "T00");

  const handleChangeStartDate = (value: Dayjs) => {
    setStartDate(value.subtract(1, "day"));
  };

  const handleChangeEndDate = (value: Dayjs) => {
    setEndDate(value.subtract(2, "day"));
  };

  const onChangeSelectedDepartment = (value: Department | null) => {
    if (!value) {
      return;
    }
    setSelectedDepartment(value);
  };

  return (
    <Stack spacing={2} width="100%">
      <h2>Template</h2>
      <Paper
        sx={{
          p: 3,
          // width: "50%",
        }}
      >
        <Stack spacing={4}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="end"
          >
            <Autocomplete
              id="asynchronous-demo"
              sx={{
                width: 150,
              }}
              onChange={(e, value) => onChangeSelectedDepartment(value)}
              isOptionEqualToValue={(option, value) =>
                option.departmentName === value.departmentName
              }
              getOptionLabel={(option) => t(option.departmentName)}
              options={departmentList}
              loading={isGetDepartmentsLoading}
              value={selectedDepartment}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  sx={{ borderBottom: "none" }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {isGetDepartmentsLoading ? (
                          <CircularProgress color="primary" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
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
                      sx={{ width: "150px" }}
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
                    <TextField
                      {...params}
                      sx={{ width: "150px" }}
                      variant="standard"
                      disabled
                    />
                  )}
                  disableFuture
                  minDate={startDate ?? undefined}
                />
              </Stack>
            </LocalizationProvider>
          </Stack>

          <Typography
            variant="h4"
            component="h1"
            style={{ paddingBottom: "10px" }}
            fontWeight="600"
          >
            Total: {DummyStatistics[0].total}
          </Typography>
          <Divider />
          <Stack>
            <Typography
              variant="h6"
              component="h1"
              style={{ paddingBottom: "10px" }}
              fontWeight="semiBold"
            >
              New: {DummyStatistics[0].waiting}
            </Typography>
            <Typography
              variant="h6"
              component="h1"
              style={{ paddingBottom: "10px" }}
              fontWeight="semiBold"
            >
              Approved: {DummyStatistics[0].approved}
            </Typography>
            <Typography
              variant="h6"
              component="h1"
              style={{ paddingBottom: "10px" }}
              fontWeight="semiBold"
            >
              Rejected: {DummyStatistics[0].rejected}
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};
