import {
  Autocomplete,
  Box,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { TouchRippleActions } from "@mui/material/ButtonBase/TouchRipple";
import { GridRenderCellParams } from "@mui/x-data-grid";
import React, { useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link } from "react-router-dom";
import { setViewerLocation } from "../../../../slices/location";
import { ViewerLocationIndex } from "../../../../utils/constants";
import { useDispatch, useSelector } from "../../../../hooks";
import { getDocumentDetail } from "../../../../slices/document";
import { editAccount, getAccountDetail } from "../../../../slices/system";
import { PhotoCamera } from "@mui/icons-material";
import { t } from "i18next";
import { TextFieldStyled, SaveLoadingBtn } from "../../../CustomStyled";
import { useTranslation } from "react-i18next";
import { Account, Permission } from "../../../../models/system";
import {  Button, Menu, TextField } from "@mui/material";
import { DummyPermissions, FixedDummyPermissions } from "../../../../utils/dummy-data";


interface AccountState {
  username?: string;
  password?: string;
  permissions: Permission[];
  idDepartment?: number;
  idRole?: number;
  signature?: string;
  isEnable: boolean;
}

export const AccountManagementActionCell = (
  props: GridRenderCellParams<Date>
) => {
  const { hasFocus, row } = props;
  const buttonElement = React.useRef<HTMLButtonElement | null>(null);
  const rippleRef = React.useRef<TouchRippleActions | null>(null);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const {
    isGetDepartmentsLoading,
    isGetPermissionLoading,
    isGetRoleLoading,
    departmentList,
    roleList,
    permissionList,
    isCreateAccountLoading,
    accountDetail,
  } = useSelector((state) => state.system);
  const [account, setAccount] = useState<AccountState>({
    username: undefined,
    password: undefined,
    idDepartment: undefined,
    permissions: [...FixedDummyPermissions],
    idRole: undefined,
    signature: undefined,
    isEnable: false
  });
  const [isDisabledSave, setIsDisabledSave] = useState(false);

  React.useLayoutEffect(() => {
    if (hasFocus) {
      const input = buttonElement.current?.querySelector("input");
      input?.focus();
    } else if (rippleRef.current) {
      // Only available in @mui/material v5.4.1 or later
      rippleRef.current.stop({} as any);
    }
  }, [hasFocus]);

  const onOpenAccountDetail = () => {
    dispatch(getAccountDetail({ account: row }));
    setIsOpen(true);
  };

  const onChangeSelectedPermissions = (value: Permission[]) => {
    setAccount({
      ...account,
      permissions: [
        ...FixedDummyPermissions,
        ...value.filter(
          (option) => FixedDummyPermissions.indexOf(option) === -1
        ),
      ],
    })
  }

  const EditAccountHandle = () => {
    const onEditAccount = dispatch(editAccount({ account: {...account, idPermissions: account.permissions.map(p => p.id)} }));
    onEditAccount.unwrap();
    return () => onEditAccount.abort();
  };

  return (
    <div>
      <IconButton aria-label="delete" onClick={onOpenAccountDetail}>
        <BorderColorIcon fontSize="small" />
      </IconButton>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen((prevState) => !prevState)}
      >
        <DialogContent>
          <Box minWidth="500px">
            <Stack spacing={3}>
              <Typography component="h1" fontSize="2rem">
                Create account
              </Typography>
              <Stack spacing={0.5}>
                <Typography fontSize='0.75rem'>Username</Typography>
                <TextField
                  id="component-outlined"
                  placeholder="Composed TextField"
                  defaultValue={accountDetail?.username}
                  sx={{color: "#000"}}
                  disabled
                />
                {/* <FormHelperText id="component-error-text">Error</FormHelperText> */}
              </Stack>
              <Stack spacing={0.5}>
                <Typography fontSize='0.75rem'>Password</Typography>
                <TextField
                  id="component-outlined"
                  placeholder="Composed TextField"
                  defaultValue={accountDetail?.username}
                  sx={{color: "#000"}}
                  disabled
                />
                {/* <FormHelperText id="component-error-text">Error</FormHelperText> */}
              </Stack>

              {/* Department */}
              <Stack spacing={0.5}>
                <Typography fontSize='0.75rem'>Department</Typography>
                <TextField
                  id="component-outlined"
                  placeholder="Composed TextField"
                  defaultValue={accountDetail?.username}
                  sx={{color: "#000"}}
                />
                {/* <FormHelperText id="component-error-text">Error</FormHelperText> */}
              </Stack>

              {/* Role */}
              <Stack spacing={0.5}>
                <Typography fontSize='0.75rem'>Role</Typography>
                <TextField
                  id="component-outlined"
                  placeholder="Composed TextField"
                  defaultValue={accountDetail?.username}
                  sx={{color: "#000"}}
                />
                {/* <FormHelperText id="component-error-text">Error</FormHelperText> */}
              </Stack>

              {/* Permission */}
              <Autocomplete
                id="asynchronous-demo"
                multiple
                onChange={(e, value) =>
                  onChangeSelectedPermissions(value)
                }
                isOptionEqualToValue={(option, value) =>
                  option.permissionName === value.permissionName
                }
                getOptionLabel={(option) => t(option.permissionName)}
                options={DummyPermissions}
                loading={isGetPermissionLoading}
                renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip
                    label={option.permissionName}
                    {...getTagProps({ index })}
                    disabled={FixedDummyPermissions.indexOf(option) !== -1}
                  />
                ))
              }
                limitTags={2}
                sx={{
                  ".MuiAutocomplete-clearIndicator": {
                    backgroundColor: "#000",
                    scale: "75%",
                  },
                  ".MuiAutocomplete-popupIndicator": {
                    backgroundColor: "#DBEAFE",
                    scale: "75%",
                  },
                  ".MuiAutocomplete-popupIndicatorOpen": {
                    backgroundColor: "#2563EB",
                    scale: "75%",
                  },
                  "& .MuiChip-deleteIcon": {
                    fill: "#000",
                  },
                }}
                renderInput={(params) => (
                  <TextFieldStyled
                    {...params}
                    label="Select permission"
                    sx={{
                      border: "1px solid #fff",
                      borderRadius: "5px",
                    }}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <React.Fragment>
                          {isGetDepartmentsLoading ? (
                            <CircularProgress color="primary" size={20} />
                          ) : null}
                          {params.InputProps.startAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
              <SaveLoadingBtn
                loading={isCreateAccountLoading}
                disabled={isDisabledSave}
                onClick={EditAccountHandle}
              >
                Save
              </SaveLoadingBtn>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};
