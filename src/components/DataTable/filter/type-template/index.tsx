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
import { getTemplateTypeList } from "slices/system";
import { DataTableHeader } from "utils/constants";

const { TYPE_TEMPLATE } = DataTableHeader;
const SelectType = (props: GridFilterInputValueProps) => {
  const { t } = useTranslation();
  const { applyValue, item } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { filter} = useSelector((state) => state.filter);
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
  };

  useEffect(() => {
    if(templateTypeList.length !== 0) return
    dispatch(getTemplateTypeList()).unwrap();
  }, [dispatch, templateTypeList]);

  return (
    <>
      {isGetTemplateTypesLoading ? (
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
            {templateTypeList.map((item) => (
              <MenuItem value={item.typeName} key={item.id}>
                {item.typeName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
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
