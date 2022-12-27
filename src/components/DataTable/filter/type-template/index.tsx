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
import {
  getTemplateTypeList,
} from "../../../../slices/system";
import { DataTableHeader } from "../../../../utils/constants";

const {TYPE_TEMPLATE } = DataTableHeader;
const SelectType = (props: GridFilterInputValueProps) => {
  const { applyValue, item } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = useState<any>("");
  const dispatch = useDispatch();
  const { isGetTemplateTypesLoading, templateTypeList } = useSelector(
    (state) => state.system
  );

  const handleChange = (e: SelectChangeEvent) => {
    applyValue({
      ...item,
      value: e.target.value,
      columnField: TYPE_TEMPLATE,
    });
    setValue(e.target.value);
  };

  const getTypeListHandler = useCallback(() => {
      dispatch(getTemplateTypeList()).unwrap()
  }, [dispatch]);

  useEffect(() => {
    !templateTypeList && getTypeListHandler();
  }, [getTypeListHandler, templateTypeList]);

  return (
    <>
      {templateTypeList && (
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
            {templateTypeList.items.map((item) => (
              <MenuItem value={item.typeName} key={item.id}>
                {item.typeName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {isGetTemplateTypesLoading && <div className="flex justify-center items-center"><CircularProgress size={20} /></div>}
    </>
  );
};

export const typeTemplateOnlyOperators: GridFilterOperator[] = [
  {
    label: "equal",
    value: "equal",
    getApplyFilterFn: (filterItem: GridFilterItem) => {
      return filterItem.value;
    },
    InputComponent: SelectType,
  },
];
