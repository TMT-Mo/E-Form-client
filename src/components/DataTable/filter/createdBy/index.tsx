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
import { useTranslation } from "react-i18next";
import { useSelector } from "../../../../hooks";
import { DataTableHeader } from "../../../../utils/constants";

const { CREATED_BY } = DataTableHeader;
const SelectType = (props: GridFilterInputValueProps) => {
  const { applyValue, item } = props;
  const {t} = useTranslation()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = useState<any>("");
  const { isGetUserListLoading, userList } = useSelector(
    (state) => state.system
  );

  const handleChange = (e: SelectChangeEvent) => {
    applyValue({
      ...item,
      value: e.target.value,
      columnField: t(CREATED_BY),
    });
    setValue(e.target.value);
  };

  return (
    <>
      {userList && (
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
            {userList.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.userName}
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
    label: "Equal",
    value: "equal",
    getApplyFilterFn: (filterItem: GridFilterItem) => {
      return filterItem.value;
    },
    InputComponent: SelectType,

  },
];
