import {
  Autocomplete,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "hooks";
import { Department } from "models/system";
import { useTranslation } from "react-i18next";
import { DoughnutChart } from "components/Chart/doughnut";
import { ChartDataset } from "chart.js";
import { StatisticsDocument } from "models/statistics";
import { helpers } from "utils";

const { handlePercentageValue } = helpers;

export const DocumentBoxWithFilter = () => {
  const { t } = useTranslation();
  const [selectedDepartment, setSelectedDepartment] = useState<Department>();
  const { userInfo } = useSelector((state) => state.auth);
  const { isGetDepartmentsLoading, departmentList } = useSelector(
    (state) => state.system
  );
  const { isGetStatisticsDocumentListLoading, statisticsDocumentList } =
    useSelector((state) => state.statistics);
  const [selectedStatistics, setSelectedStatistics] =
    useState<StatisticsDocument>();

  const labels = [t("Rejected"), t("Processing"), t("Approved")];
  const datasets: ChartDataset<"doughnut">[] = [
    {
      label: t("Value"),
      data: [
        selectedStatistics?.rejected || 0,
        selectedStatistics?.processing || 0,
        selectedStatistics?.approved || 0,
      ],
      backgroundColor: ["#FF6384", "#35A2EB", "#22CFCF"],
      borderColor: ["#FF6384", "#35A2EB", "#22CFCF"],
    },
  ];

  const onChangeSelectedDepartment = (value: Department | null) => {
    if (!value) {
      return;
    }
    setSelectedDepartment(value);
    setSelectedStatistics(
      statisticsDocumentList.find(
        (statistics) => statistics.departmentId === value.id
      )
    );
  };

  useEffect(() => {
    if (!statisticsDocumentList) return;
    const defaultSelectedStatistics = statisticsDocumentList.find(
      (statistics) => statistics.departmentName === userInfo?.departmentName
    );
    setSelectedStatistics(defaultSelectedStatistics);
    setSelectedDepartment({
      departmentName: defaultSelectedStatistics?.departmentName!,
      id: defaultSelectedStatistics?.departmentId!,
    });
  }, [statisticsDocumentList, userInfo?.departmentName]);

  // useEffect(() => {
  //   if(!departmentList) return
  //   if(!selectedDepartment) return
  //   const currentDepartment = departmentList.find(d => d.departmentName === userInfo?.departmentName)
  //   setSelectedDepartment(currentDepartment) 
  // }, [departmentList, selectedDepartment, userInfo?.departmentName]);

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
        {selectedStatistics && <Stack direction="row" justifyContent="space-between" alignItems="end">
          <Autocomplete
            id="asynchronous-demo"
            sx={{
              width: 250,
            }}
            onChange={(e, value) => onChangeSelectedDepartment(value)}
            isOptionEqualToValue={(option, value) =>
              option.departmentName === value.departmentName
            }
            disableClearable
            getOptionLabel={(option) => option.departmentName}
            options={departmentList.filter(
              (department) => department.departmentName !== "All"
            )}
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
        </Stack>}
        {isGetStatisticsDocumentListLoading && (
          <Stack minHeight={300} justifyContent="center" alignItems="center">
            <CircularProgress />
          </Stack>
        )}
        {selectedStatistics && !isGetStatisticsDocumentListLoading && (
          <Stack spacing={2}>
            <Typography
              variant="h4"
              component="h1"
              style={{ paddingBottom: "10px" }}
              fontWeight="600"
            >
              {t("Total")}: {selectedStatistics.total}
            </Typography>

            <DoughnutChart labels={labels} datasets={datasets} />

            <Stack spacing={4}>
              <Divider />
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h6" component="h1" fontWeight="semiBold">
                    {t("Processing")}
                  </Typography>
                  <Typography variant="h6" component="h1" fontWeight="semiBold">
                    {selectedStatistics.processing}{" "}
                    {handlePercentageValue(
                      selectedStatistics.processing,
                      selectedStatistics.total
                    )}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h6" component="h1" fontWeight="semiBold">
                    {t("Approved")}
                  </Typography>
                  <Typography variant="h6" component="h1" fontWeight="semiBold">
                    {selectedStatistics.approved}{" "}
                    {handlePercentageValue(
                      selectedStatistics.approved,
                      selectedStatistics.total
                    )}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h6" component="h1" fontWeight="semiBold">
                    {t("Rejected")}
                  </Typography>
                  <Typography variant="h6" component="h1" fontWeight="semiBold">
                    {selectedStatistics.rejected}{" "}
                    {handlePercentageValue(
                      selectedStatistics.rejected,
                      selectedStatistics.total
                    )}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};
