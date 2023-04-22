import {
  LocalizationProvider,
  DesktopDatePicker,
} from "@mui/x-date-pickers";
import {
  Autocomplete,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import React, { useState } from "react";
import { useSelector } from "hooks";
import { DummyStatistics } from "utils/dummy-data";
import { Department } from "models/system";
import { useTranslation } from "react-i18next";
import { DoughnutChart } from "components/Chart/doughnut";
import { ChartDataset } from "chart.js";

const labels = ["Rejected", "Processing", "Approved"];
const datasets: ChartDataset<'doughnut'>[] = [
  {
    label: "Value",
    data: [20, 10, 3],
    backgroundColor: ["#FF6384", "#35A2EB", "#22CFCF"],
    borderColor: ["#FF6384", "#35A2EB", "#22CFCF"],
  },
];

export const DocumentBoxWithFilter = () => {
  const { t } = useTranslation();
  const { approved, departmentName, rejected, total, processing } =
    DummyStatistics[0];
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department>();
  const { userInfo } = useSelector((state) => state.auth);
  const { isGetDepartmentsLoading, departmentList } = useSelector(
    (state) => state.system
  );

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
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        width: 600,
      }}
      elevation={3}
    >
      <Stack spacing={2} direction="column">
        <Stack direction="row" justifyContent="space-between" alignItems="end">
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
            <Stack direction="row" spacing={3}>
              <DesktopDatePicker
                label={t("From")}
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
                    sx={{ width: "130px" }}
                    // value={null}
                  />
                )}
                disableFuture
                maxDate={endDate ?? undefined}
              />
              <DesktopDatePicker
                label={t("To")}
                inputFormat="DD/MM/YYYY"
                value={endDate}
                onChange={(newValue: Dayjs | null) =>
                  handleChangeEndDate(newValue!.add(2, "day"))
                }
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    sx={{ width: "130px" }}
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
          {t('Total')}: {DummyStatistics[0].total}
        </Typography>
        <DoughnutChart labels={labels} datasets={datasets} />
        <Stack spacing={4}>
          <Divider />
          <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6" component="h1" fontWeight="semiBold">
              {t('Processing')}
            </Typography>
            <Typography variant="h6" component="h1" fontWeight="semiBold">
              {DummyStatistics[0].approved}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6" component="h1" fontWeight="semiBold">
              {t('Approved')}
            </Typography>
            <Typography variant="h6" component="h1" fontWeight="semiBold">
              {DummyStatistics[0].approved}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6" component="h1" fontWeight="semiBold">
              {t('Rejected')}
            </Typography>
            <Typography variant="h6" component="h1" fontWeight="semiBold">
              {DummyStatistics[0].approved}
            </Typography>
          </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};
