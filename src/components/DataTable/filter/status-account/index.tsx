import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
  } from "@mui/material";
  import {
    GridFilterOperator,
    GridFilterItem,
    GridFilterInputValueProps,
  } from "@mui/x-data-grid";
  import { useSelector } from "hooks";
  import { useTranslation } from "react-i18next";
  import { DataTableHeader, AccountStatus } from "utils/constants";
  
  interface Items {
    value: AccountStatus;
    label: string;
  }
  const { ENABLE, DISABLE,  } = AccountStatus;
  const items: Items[] = [
    { value: ENABLE, label: "Enable" },
    { value: DISABLE, label: "Disabled" },
  ];
  
  const { STATUS } = DataTableHeader;
  const SelectStatus = (props: GridFilterInputValueProps) => {
    const { t } = useTranslation();
    const { applyValue, item } = props;
    const { filter} = useSelector((state) => state.filter);
    // eslint-disable-next-line react-hooks/rules-of-hooks
  
    const handleChange = (e: SelectChangeEvent) => {
      applyValue({
        ...item,
        value: e.target.value,
        columnField: STATUS,
      });
    };
  
    return (
      <FormControl variant="standard" sx={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">
          {t('Filter value')}
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Age"
          value={filter?.value as string}
          onChange={handleChange}
        >
          {items.map((item, index) => (
            <MenuItem value={item.value} key={index}>
              {t(item.label)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };
  
  export const statusAccountOnlyOperators: GridFilterOperator[] = [
    {
      label: "equal",
      value: "equal",
      getApplyFilterFn: (filterItem: GridFilterItem) => {
        return filterItem.value;
      },
      InputComponent: SelectStatus,
    },
  ];
  