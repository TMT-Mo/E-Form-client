import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  CircularProgress,
  Box,
} from "@mui/material";
import {
  GridFilterOperator,
  GridFilterItem,
  GridFilterInputValueProps,
} from "@mui/x-data-grid";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "hooks";
import { getDepartmentList } from "slices/system";
import { DataTableHeader } from "utils/constants";

const { DEPARTMENT } = DataTableHeader;
const SelectDepartment = (props: GridFilterInputValueProps) => {
  const { t } = useTranslation();
  const { applyValue, item } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { filter } = useSelector((state) => state.filter);
  const { isGetDepartmentsLoading, departmentList } = useSelector(
    (state) => state.system
  );

  const handleChange = (e: SelectChangeEvent) => {
    applyValue({
      ...item,
      value: e.target.value,
      columnField: DEPARTMENT,
    });
  };

  useEffect(() => {
    if (departmentList.length !== 0) return;
    dispatch(getDepartmentList()).unwrap();
  }, [departmentList, dispatch]);

  return (
    <>
      {isGetDepartmentsLoading ? (
        <Box
        sx={{
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: 48,
        }}
      >
        <CircularProgress size={20} />
      </Box>
      ) : (
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            {t("Filter value")}
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Age"
            value={filter?.value as string}
            onChange={handleChange}
          >
            {departmentList
              .filter(
                (d) =>
                  d.departmentName === "All" ||
                  d.departmentName === userInfo?.departmentName
              )
              .map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {t(item.departmentName)}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}
    </>
  );
};

export const departmentOnlyOperators: GridFilterOperator[] = [
  {
    label: "equal",
    value: "equal",
    getApplyFilterFn: (filterItem: GridFilterItem) => {
      return filterItem.value;
    },
    InputComponent: SelectDepartment,
  },
];
