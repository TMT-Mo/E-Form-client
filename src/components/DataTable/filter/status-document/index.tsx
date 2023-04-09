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
  import { DataTableHeader, StatusDocument } from "utils/constants";
  
  interface Items {
    value: StatusDocument;
    label: string;
  }
  const { APPROVED_DOCUMENT, PROCESSING_DOCUMENT, REJECTED_DOCUMENT, NOT_YET_DOCUMENT } = StatusDocument;
  const items: Items[] = [
    { value: PROCESSING_DOCUMENT, label: "Processing" },
    { value: APPROVED_DOCUMENT, label: "Approved" },
    { value: REJECTED_DOCUMENT, label: "Rejected" },
    { value: NOT_YET_DOCUMENT, label: "Not yet" },
  ];
  
  const { STATUS } = DataTableHeader;
  const SelectStatus = (props: GridFilterInputValueProps) => {
    const { t } = useTranslation();
    const { applyValue, item } = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { filter} = useSelector((state) => state.filter);
  
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
  
  export const statusOnlyOperators: GridFilterOperator[] = [
    {
      label: "equal",
      value: "equal",
      getApplyFilterFn: (filterItem: GridFilterItem) => {
        return filterItem.value;
      },
      InputComponent: SelectStatus,
    },
  ];
  