import { useEffect, useState } from "react";
import { ChartDataset } from "chart.js";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import {
  CircularProgress,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch, useSelector } from "hooks";
import { useTranslation } from "react-i18next";
import { ChartBar } from "components/Chart/bar";
import { helpers } from "utils";
import {
  getStatisticsTemplateList,
} from "slices/statistics";

const { handleFormatDateJS } = helpers;
interface DefaultDate {
  fromDate: string;
  toDate: string;
}
const defaultDate: DefaultDate = {
  fromDate: handleFormatDateJS(
    dayjs(new Date("Tue Oct 11 2022 00:00:00 GMT+0700 (Indochina Time)")).add(
      1,
      "day"
    )
  )!,
  toDate: handleFormatDateJS(dayjs(new Date()))!,
};

export function TemplateChartBar() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState<Dayjs>(dayjs(defaultDate.fromDate));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs(defaultDate.toDate));
  const { departmentList } = useSelector(
    (state) => state.system
  );
  const { userInfo } = useSelector((state) => state.auth);
  const { isGetStatisticsTemplateListLoading, arrangedTemplateStatistics } = useSelector(
    (state) => state.statistics
  );

  const datasets: ChartDataset<"bar">[] = [
    {
      label: t("Rejected"),
      data: arrangedTemplateStatistics?.rejectedList || [],
      backgroundColor: "rgb(255, 99, 132)",
      barThickness: 35,
    },
    {
      label: t("Approved"),
      data: arrangedTemplateStatistics?.approvedList || [],
      backgroundColor: "rgb(75, 192, 192)",
      barThickness: 35,
    },
    {
      label: t("Processing"),
      data: arrangedTemplateStatistics?.processingList || [],
      backgroundColor: "rgb(53, 162, 235)",
      barThickness: 35,
    },
  ];

  const handleChangeStartDate = (value: Dayjs) => {
    setStartDate(value.subtract(1, "day"));
  };

  const handleChangeEndDate = (value: Dayjs) => {
    setEndDate(value.subtract(2, "day"));
  };

  useEffect(() => {
    const onGetStatisticsTemplateList = dispatch(
      getStatisticsTemplateList({
        fromDate: handleFormatDateJS(startDate),
        toDate: handleFormatDateJS(endDate),
      })
    );

    onGetStatisticsTemplateList.unwrap();
  }, [departmentList, dispatch, endDate, startDate, userInfo?.departmentName]);

  return (
    <Paper sx={{ p: 3, borderRadius: 3, width: "70%" }} elevation={3}>
      
       <Stack spacing={5}>
        <Stack direction="row" justifyContent="space-between" alignItems="end">
          <h2>{t('Stacked Bar Chart')}</h2>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack direction="row" spacing={2}>
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
                    sx={{ width: "150px" }}
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
        {isGetStatisticsTemplateListLoading && (
          <Stack minHeight={300} justifyContent="center" alignItems="center">
            <CircularProgress />
          </Stack>
        )}
         {arrangedTemplateStatistics && !isGetStatisticsTemplateListLoading &&<ChartBar datasets={datasets} labels={arrangedTemplateStatistics!.labels} />}
      </Stack>
    </Paper>
  );
}
