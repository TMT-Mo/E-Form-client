import { Container, Paper, Stack } from "@mui/material";
import CustomizedProgressBars from "components/Statistics";
import { useDispatch } from "hooks";
import { Account } from "pages/analytics/dashboard/account-management";
import { DocumentBox } from "pages/analytics/dashboard/document-box";
import { TemplateBox } from "pages/analytics/dashboard/template-box";
import { TemplateChartBar } from "pages/analytics/dashboard/template-chart-bar";
import React, { useEffect } from "react";
import { getDepartmentList, getRoleList } from "slices/system";

export const AnalyticsDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getDepartment = dispatch(getDepartmentList());
    const getRole = dispatch(getRoleList());

    // const getPermission = dispatch(getPermissionList());

    getDepartment.unwrap();
    getRole.unwrap();
    // getPermission.unwrap();

    return () => {
      getDepartment.abort();
      getRole.abort();
      // getPermission.abort();
    };
  }, [dispatch]);

  return (
    <Container sx={{ paddingY: "50px", mx: 0 }} maxWidth="xl">
      <Stack spacing={5}>
        {/* <Paper sx={{ p: 5, maxHeight: "400px", borderRadius: 3 }} elevation={3}>
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
          <ChartBar />
        </Paper> */}
        <TemplateChartBar/>
        <Stack direction="row" spacing={10}>
          <TemplateBox />
          <DocumentBox />
        </Stack>
        <Account />
      </Stack>
    </Container>
  );
};
