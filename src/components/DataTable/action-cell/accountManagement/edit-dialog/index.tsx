import {
  Dialog,
  DialogContent,
  Box,
  Stack,
  Typography,
  TextField,
  IconButton,
  Autocomplete,
  Chip,
  CircularProgress,
  DialogActions,
} from "@mui/material";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../../../../hooks";
import { Permission } from "../../../../../models/system";
import { editAccount } from "../../../../../slices/system";
import {
  AccountStatus,
  AccountStatusTag,
} from "../../../../../utils/constants";
import {
  DummyPermissions,
  FixedDummyPermissions,
} from "../../../../../utils/dummy-data";
import { TextFieldStyled, SaveLoadingBtn } from "../../../../CustomStyled";
import RefreshIcon from "@mui/icons-material/Refresh";

interface Props {
  isOpen: boolean;
  handleToggleDialog: () => void;
}

interface AccountStatusOptions {
  statusId: number;
  statusTag: string;
}

interface AccountState {
  username?: string;
  password?: string;
  permissions: Permission[];
  idDepartment?: number;
  idRole?: number;
  signature?: string;
  status?: AccountStatusOptions;
}

const statusOptions: AccountStatusOptions[] = [
  {
    statusId: AccountStatus.ENABLE,
    statusTag: AccountStatusTag.ENABLE,
  },
  {
    statusId: AccountStatus.DISABLE,
    statusTag: AccountStatusTag.DISABLE,
  },
];

export const EditDialog = (props: Props) => {
  const { isOpen, handleToggleDialog } = props;
  const {
    isGetDepartmentsLoading,
    isGetPermissionLoading,
    isCreateAccountLoading,
    accountDetail,
  } = useSelector((state) => state.system);
  const { userInfo } = useSelector((state) => state.auth);
  const [isDisabledSave, setIsDisabledSave] = useState(false);
  const dispatch = useDispatch();

  const currentPermissionList = (): Permission[] => {
    const list: Permission[] = [];
    const currentPermissions = userInfo?.idPermissions.split(",")!;
    currentPermissions.forEach((p) =>
      list.push(DummyPermissions.find((value) => value.id === +p)!)
    );
    return list;
  };
  const [account, setAccount] = useState<AccountState>({
    username: undefined,
    password: undefined,
    idDepartment: undefined,
    permissions: [
      ...FixedDummyPermissions,
      ...currentPermissionList().filter(
        (option) => FixedDummyPermissions.indexOf(option) === -1
      ),
    ],
    idRole: undefined,
    signature: undefined,
    status: {
      statusId: accountDetail?.status!,
      statusTag:
        accountDetail?.status === AccountStatus.ENABLE
          ? AccountStatusTag.ENABLE
          : AccountStatusTag.DISABLE,
    },
  });

  const onChangeSelectedPermissions = (value: Permission[]) => {
    setAccount({
      ...account,
      permissions: [
        ...FixedDummyPermissions,
        ...value.filter(
          (option) => FixedDummyPermissions.indexOf(option) === -1
        ),
      ],
    });
  };

  const EditAccountHandle = () => {
    const onEditAccount = dispatch(
      editAccount({
        account: {
          ...account,
          idPermissions: account.permissions.map((p) => p.id),
          status: account.status?.statusId,
        },
      })
    );
    onEditAccount.unwrap();
    return () => onEditAccount.abort();
  };

  const onRefreshPassword = () => {
    setAccount({ ...account, password: "P@ssw0rd" });
  };

  const handleChangeStatus = (value: AccountStatusOptions) => {
    setAccount({ ...account, status: value });
  };

  return (
    <Dialog open={isOpen} onClose={handleToggleDialog}>
      <DialogContent>
        <Box minWidth="500px">
          <Stack spacing={3}>
            <Typography component="h1" fontSize="2rem">
              Edit account
            </Typography>
            <Stack spacing={0.5}>
              <Typography fontSize="0.75rem">Username</Typography>
              <TextField
                id="component-outlined"
                defaultValue={accountDetail?.username}
                sx={{ color: "#000" }}
                disabled
              />
              {/* <FormHelperText id="component-error-text">Error</FormHelperText> */}
            </Stack>
            <Stack direction="row" alignItems="center">
              <Stack spacing={0.5} width="100%">
                <Typography fontSize="0.75rem">Password</Typography>
                <TextField
                  id="component-outlined"
                  sx={{ color: "#000" }}
                  disabled
                  value={account.password}
                />
                {/* <FormHelperText id="component-error-text">Error</FormHelperText> */}
              </Stack>
              <IconButton onClick={onRefreshPassword}>
                <RefreshIcon />
              </IconButton>
            </Stack>

            {/* Department */}
            <Stack spacing={0.5}>
              <Typography fontSize="0.75rem">Department</Typography>
              <TextField
                id="component-outlined"
                placeholder="Composed TextField"
                defaultValue={accountDetail?.departmentName}
                sx={{ color: "#000" }}
                disabled
              />
              {/* <FormHelperText id="component-error-text">Error</FormHelperText> */}
            </Stack>

            {/* Role */}
            <Stack spacing={0.5}>
              <Typography fontSize="0.75rem">Role</Typography>
              <TextField
                id="component-outlined"
                placeholder="Composed TextField"
                defaultValue={accountDetail?.roleName}
                sx={{ color: "#000" }}
                disabled
              />
              {/* <FormHelperText id="component-error-text">Error</FormHelperText> */}
            </Stack>

            {/* Permission */}
            <Autocomplete
              id="asynchronous-demo"
              multiple
              onChange={(e, value) => onChangeSelectedPermissions(value)}
              isOptionEqualToValue={(option, value) =>
                option.permissionName === value.permissionName
              }
              getOptionLabel={(option) => t(option.permissionName)}
              options={DummyPermissions}
              loading={isGetPermissionLoading}
              value={account.permissions}
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
            <Autocomplete
              disableClearable
              value={account.status}
              id="combo-box-demo"
              getOptionLabel={(option) => t(option.statusTag)}
              isOptionEqualToValue={(option, value) =>
                option.statusId === value.statusId
              }
              options={statusOptions}
              onChange={(e, value) => handleChangeStatus(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    backgroundColor: `${
                      account.status?.statusId === AccountStatus.ENABLE
                        ? "#7bed9f"
                        : "#ff6b81"
                    }`,
                    color: `${
                      account.status?.statusId === AccountStatus.ENABLE
                        ? "#2ed573"
                        : "#ff4757"
                    }`,
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
  );
};
