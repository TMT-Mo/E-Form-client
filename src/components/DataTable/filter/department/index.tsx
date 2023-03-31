import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    CircularProgress,
  } from "@mui/material";
  import {
    GridFilterOperator,
    GridFilterItem,
    GridFilterInputValueProps,
  } from "@mui/x-data-grid";
  import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
  import { useDispatch, useSelector } from "hooks";
  import {
      getDepartmentList,
  } from "slices/system";
  import { DataTableHeader } from "utils/constants";
  
  const {DEPARTMENT } = DataTableHeader;
  const SelectDepartment = (props: GridFilterInputValueProps) => {
    const {t} = useTranslation()
    const { applyValue, item } = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<any>("");
    const dispatch = useDispatch();
    const { isGetDepartmentsLoading, departmentList } = useSelector(
      (state) => state.system
    );
  
    const handleChange = (e: SelectChangeEvent) => {
      applyValue({
        ...item,
        value: e.target.value,
        columnField: DEPARTMENT,
      });
      setValue(e.target.value);
    };
  
    const getDepartmentListHandler = useCallback(() => {
        dispatch(getDepartmentList()).unwrap()
    }, [dispatch]);
  
    useEffect(() => {
      !departmentList && getDepartmentListHandler();
    }, [departmentList, getDepartmentListHandler]);
  
    return (
      <>
        {departmentList && (
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              {t('Filter value')}
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Age"
              value={value}
              onChange={handleChange}
            >
              {departmentList.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {t(item.departmentName)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {isGetDepartmentsLoading && <div className="flex justify-center items-center"><CircularProgress size={20} /></div>}
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
  