import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import {
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { useSelector } from "hooks";
import { DummyStatistics } from "utils/dummy-data";
import { Department } from "models/system";
import { useTranslation } from "react-i18next";
import { DoughnutChart } from "components/Chart/doughnut";
import { ChartDataset } from "chart.js";

const labels = ["Rejected", "Processing", "Approved"];
const datasets: ChartDataset<"doughnut">[] = [
  {
    label: "Value",
    data: [20, 10, 3],
    backgroundColor: ["#FF6384", "#35A2EB", "#22CFCF"],
    borderColor: ["#FF6384", "#35A2EB", "#22CFCF"],
  },
];

export const TemplateBoxNoneFilter = () => {
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


  const handleChangeStartDate = (value: Dayjs) => {
    setStartDate(value.subtract(1, "day"));
  };

  const handleChangeEndDate = (value: Dayjs) => {
    setEndDate(value.subtract(2, "day"));
  };


  return (
    <Stack spacing={3} width={1 / 2}>
      <h2>{t('Document Statistics')}</h2>
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
        }}
        elevation={3}
      >
        <Stack spacing={2} direction="column">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="end"
          >
            <Typography variant="h5" component="h1" fontWeight="600">
              {userInfo?.departmentName}
            </Typography>
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
      </Paper>
    </Stack>
  );
};
