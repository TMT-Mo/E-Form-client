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
  import { getDepartmentList, getRoleList } from "slices/system";
  import { DataTableHeader } from "utils/constants";

  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
  
  const { ROLE_NAME } = DataTableHeader;
  const SelectRole = (props: GridFilterInputValueProps) => {
    const { t } = useTranslation();
    const { applyValue, item } = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch();
    const { filter } = useSelector((state) => state.filter);
    const { isGetRoleLoading, roleList } = useSelector(
      (state) => state.system
    );
  
    const handleChange = (e: SelectChangeEvent) => {
      applyValue({
        ...item,
        value: e.target.value,
        columnField: ROLE_NAME,
      });
    };
  
    useEffect(() => {
      if (roleList.length !== 0) return;
      dispatch(getRoleList()).unwrap();
    }, [roleList, dispatch]);
  
    return (
      <>
        {isGetRoleLoading ? (
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
              MenuProps={MenuProps}
            >
              {roleList
                .map((item) => (
                  <MenuItem value={item.id} key={item.id}>
                    {t(item.roleName)}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}
      </>
    );
  };
  
  export const roleOnlyOperators: GridFilterOperator[] = [
    {
      label: "equal",
      value: "equal",
      getApplyFilterFn: (filterItem: GridFilterItem) => {
        return filterItem.value;
      },
      InputComponent: SelectRole,
    },
  ];
  