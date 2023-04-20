import { Container, Paper, Stack } from "@mui/material";
import { RequiredPermission } from "components/RequiredPermission";
import CustomizedProgressBars from "components/Statistics";
import { useDispatch } from "hooks";
import { Account } from "pages/analytics/dashboard/account-management";
import { DocumentBoxNoneFilter } from "pages/analytics/dashboard/document/document-box";
import { DocumentBoxWithFilter } from "pages/analytics/dashboard/document/document-box-filter";
import { DocumentChartBar } from "pages/analytics/dashboard/document/document-chart-bar";
import { TemplateBoxNoneFilter } from "pages/analytics/dashboard/template/template-box";
import { TemplateBoxWithFilter } from "pages/analytics/dashboard/template/template-box-filter";
import { TemplateChartBar } from "pages/analytics/dashboard/template/template-chart-bar";
import React, { useEffect } from "react";
import { getDepartmentList, getRoleList } from "slices/system";
import { Permissions } from "utils/constants";

const {
  VIEW_DOCUMENT_OVERALL_STATISTICS,
  VIEW_ACCOUNT_LIST,
  VIEW_DOCUMENT_STATISTICS,
} = Permissions;
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
        <RequiredPermission permission={VIEW_DOCUMENT_OVERALL_STATISTICS}>
          <Stack spacing={3}>
            <h2>Template Statistics</h2>
            <Stack direction="row" spacing={5}>
              <TemplateChartBar />
              <TemplateBoxWithFilter />
            </Stack>
          </Stack>
        </RequiredPermission>
        <RequiredPermission permission={VIEW_DOCUMENT_OVERALL_STATISTICS}>
          <Stack spacing={3}>
            <h2>Document Statistics</h2>
            <Stack direction="row" spacing={5}>
              <DocumentChartBar />
              <DocumentBoxWithFilter />
            </Stack>
          </Stack>
        </RequiredPermission>

        {/* <Stack direction="row" spacing={10}>
          <DocumentChartBar />
          <DocumentBox />
        </Stack> */}
        <RequiredPermission permission={VIEW_DOCUMENT_STATISTICS}>
          <Stack direction="row" spacing={10}>
            <TemplateBoxNoneFilter />
            <DocumentBoxNoneFilter />
          </Stack>
        </RequiredPermission>
        <RequiredPermission permission={VIEW_ACCOUNT_LIST}>
          <Account />
        </RequiredPermission>
      </Stack>
    </Container>
  );
};
