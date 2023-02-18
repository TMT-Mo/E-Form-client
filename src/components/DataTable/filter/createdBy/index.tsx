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
import { useState } from "react";
import { useSelector } from "../../../../hooks";
import { DataTableHeader } from "../../../../utils/constants";

const { CREATED_BY } = DataTableHeader;
const SelectType = (props: GridFilterInputValueProps) => {
  const { applyValue, item } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = useState<any>("");
  const { isGetUserListLoading, userList } = useSelector(
    (state) => state.system
  );

  const handleChange = (e: SelectChangeEvent) => {
    applyValue({
      ...item,
      value: e.target.value,
      columnField: CREATED_BY,
    });
    setValue(e.target.value);
  };

  // const getUserListHandler = useCallback(() => {
  //   dispatch(getUsers({ departmentId_eq: +userInfo?.idDepartment! })).unwrap();
  // }, [dispatch, userInfo?.idDepartment]);

  // useEffect(() => {
  //   !userList && getUserListHandler();
  // }, [getUserListHandler, userList]);

  return (
    <>
      {userList && (
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Filter value
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Age"
            value={value}
            onChange={handleChange}
          >
            {userList.items.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {isGetUserListLoading && (
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: 48,
          }}
          className="flex justify-center items-center w-full"
        >
          <CircularProgress size={20} />
        </Box>
      )}
    </>
  );
};

export const createdByOnlyOperators: GridFilterOperator[] = [
  {
    label: "equal",
    value: "equal",
    getApplyFilterFn: (filterItem: GridFilterItem) => {
      return filterItem.value;
    },
    InputComponent: SelectType,
  },
];
