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
import { useDispatch, useSelector } from "../../../../hooks";
import { getUsers } from "../../../../slices/system";
import { DataTableHeader } from "../../../../utils/constants";

const { CREATED_BY } = DataTableHeader;
const SelectType = (props: GridFilterInputValueProps) => {
  const { applyValue, item } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = useState<any>("");
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
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

  const getUserListHandler = useCallback(() => {
    dispatch(getUsers({ departmentId_eq: +userInfo?.idDepartment! })).unwrap();
  }, [dispatch, userInfo?.idDepartment]);

  useEffect(() => {
    !userList && getUserListHandler();
  }, [getUserListHandler, userList]);

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
        <div className="flex justify-center items-center">
          <CircularProgress size={20} />
        </div>
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
