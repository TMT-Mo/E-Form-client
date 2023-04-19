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
import { useTranslation } from "react-i18next";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import styled from "@emotion/styled";

const BoxStyled = styled(
  Box,
  {}
)({
  padding: 7,
  borderRadius: 10,
  // background: "#4BC0C0",
  width: "fit-content",
  height: "100%",
  display: "flex",
  alignItems: "center",
});

export const TemplateBoxNoneFilter = () => {
  const { t } = useTranslation();
  const { approved, departmentName, rejected, total, waiting } =
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
    <Stack spacing={2} width="100%">
      <h2>Document</h2>
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
        }}
        elevation={3}
      >
        <Stack spacing={4}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="end"
          >
            {/* <Autocomplete
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
            /> */}
            <Typography
            variant="h5"
            component="h1"
            fontWeight="600"
          >
            {userInfo?.departmentName}
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack direction="row" spacing={3}>
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
          <Stack spacing={2}>
            <Divider />
            {/* <Stack direction="row" justifyContent="space-around">
              
            </Stack> */}
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6" component="h1" fontWeight="semiBold">
                New ( Unhandled )
              </Typography>
              <Typography variant="h6" component="h1" fontWeight="semiBold">
                {DummyStatistics[0].approved}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6" component="h1" fontWeight="semiBold">
                New ( Handled )
              </Typography>
              <Typography variant="h6" component="h1" fontWeight="semiBold">
                {DummyStatistics[0].approved}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6" component="h1" fontWeight="semiBold">
                Approved
              </Typography>
              <Typography variant="h6" component="h1" fontWeight="semiBold">
                {DummyStatistics[0].approved}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6" component="h1" fontWeight="semiBold">
                Rejected
              </Typography>
              <Typography variant="h6" component="h1" fontWeight="semiBold">
                {DummyStatistics[0].approved}
              </Typography>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6" component="h1" fontWeight="semiBold">
                Remaining
              </Typography>
              <Typography variant="h6" component="h1" fontWeight="semiBold">
                {DummyStatistics[0].approved}
              </Typography>
            </Stack>

            {/* <Stack
              direction="row"
              alignItems="end"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="end" spacing={3}>
                <BoxStyled sx={{ background: "#049BFF" }}>
                  <MoreHorizIcon style={{ color: "#fff" }} fontSize="large" />
                </BoxStyled>
                <Stack>
                  <Typography variant="h6" component="h1" fontWeight="semiBold">
                    New
                  </Typography>
                  <Typography sx={{ color: "#b2bec3" }} fontWeight="bold">
                    Template created in selected time
                  </Typography>
                </Stack>
              </Stack>
              <Typography variant="h6" component="h1" fontWeight="semiBold">
                {DummyStatistics[0].approved}
              </Typography>
            </Stack> */}
            {/* <Stack
              direction="row"
              alignItems="end"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="end" spacing={3}>
                <BoxStyled sx={{ background: "#4BC0C0" }}>
                  <CheckOutlinedIcon style={{ color: "#fff" }} fontSize="large" />
                </BoxStyled>
                <Stack>
                  <Typography variant="h6" component="h1" fontWeight="semiBold">
                    Approved
                  </Typography>
                  <Typography sx={{ color: "#b2bec3" }} fontWeight="bold">
                    Approved template in selected time
                  </Typography>
                </Stack>
              </Stack>
              <Typography variant="h6" component="h1" fontWeight="semiBold">
                {DummyStatistics[0].approved}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="end"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="end" spacing={3}>
                <BoxStyled sx={{ background: "#FF6384" }}>
                  <CloseOutlinedIcon style={{ color: "#fff" }} fontSize="large" />
                </BoxStyled>
                <Stack>
                  <Typography variant="h6" component="h1" fontWeight="semiBold">
                    Rejected
                  </Typography>
                  <Typography sx={{ color: "#b2bec3" }} fontWeight="bold">
                    Rejected template in selected time
                  </Typography>
                </Stack>
              </Stack>
              <Typography variant="h6" component="h1" fontWeight="semiBold">
                {DummyStatistics[0].approved}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="end"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="end" spacing={3}>
                <BoxStyled sx={{ background: "#d63031" }}>
                  <PendingActionsIcon
                    style={{ color: "#fff" }}
                    fontSize="large"
                  />
                </BoxStyled>
                <Stack>
                  <Typography variant="h6" component="h1" fontWeight="semiBold">
                    Remaining
                  </Typography>
                  <Typography sx={{ color: "#b2bec3" }} fontWeight="bold">
                    Non-handled template before selected time
                  </Typography>
                </Stack>
              </Stack>
              <Typography variant="h6" component="h1" fontWeight="semiBold">
                {DummyStatistics[0].approved}
              </Typography>
            </Stack> */}
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};
