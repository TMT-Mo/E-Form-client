import {
  DialogContent,
  DialogContentText,
  Autocomplete,
  CircularProgress,
  DialogActions,
  Box,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector, useSignalR } from "hooks";
import {
  clearSharedInfo,
  getSharedUser,
  shareUsers,
} from "slices/document";
import {
  TextFieldStyled,
  WhiteBtn,
  SaveLoadingBtn,
} from "components/CustomStyled";
import { SharedUser } from "models/document";
import { clearUserList, getUserList } from "slices/system";
import Stack from "@mui/material/Stack";
interface Props {
  onOpen: () => void;
  value: number;
  idDocument: number;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ minWidth: "600px" }}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const UserTab = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isGetUserListLoading, userList } = useSelector(
    (state) => state.system
  );
  const { isGetSharedUserLoading, sharedUser, isShareUserLoading } =
    useSelector((state) => state.document);
    const {userInfo} = useSelector(state => state.auth)
  const { onOpen, value, idDocument } = props;
  const [selectedUser, setSelectedUser] = useState<SharedUser[]>([]);
  const {sendSignalNotification} = useSignalR()

  const onAddSelectedUser = (value: SharedUser[]) => {
    setSelectedUser(value);
  };

  const onShareUser = async () => {
    await dispatch(
      shareUsers({
        idDocument,
        userIdList: selectedUser.map((user) => user.id),
      })
    ).unwrap();
    sendSignalNotification({userIds: selectedUser.map(u => u.id), notify:{
      isChecked: false,
      description: `You has been shared to view a document by ${userInfo?.userName}!`
    }})
    onOpen();
  };

  useEffect(() => {
    const getSharedUsers = dispatch(getSharedUser({ idDocument }));
    getSharedUsers.unwrap();
    // const getUserList = dispatch(ge)

    return () => getSharedUsers.abort();
  }, [dispatch, idDocument]);

  useEffect(() => {
    const getUsers = dispatch(getUserList({}));
    getUsers.unwrap();

    return () => getUsers.abort();
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearSharedInfo());
      dispatch(clearUserList());
    };
  }, [dispatch]);
  //
  return (
    <TabPanel value={value} index={1}>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Stack
            spacing={2}
            sx={{
              width: '100%',
              color: "#000",
            }}
          >
            <h4>{t("Share User")}</h4>
            <Autocomplete
              id="asynchronous-demo"
              multiple
              onChange={(e, value) => onAddSelectedUser(value!)}
              isOptionEqualToValue={(option, value) =>
                option.userName === value.userName
              }
              getOptionLabel={(option) => t(option.userName)}
              options={userList}
              value={selectedUser}
              loading={isGetUserListLoading}
              limitTags={2}
              sx={{
                ".MuiAutocomplete-clearIndicator": {
                  backgroundColor: "#000",
                  scale: '75%'
                },
                ".MuiAutocomplete-popupIndicator": {
                  backgroundColor: "#DBEAFE",
                  scale: '75%'
                },
                ".MuiAutocomplete-popupIndicatorOpen":{
                  backgroundColor: "#2563EB",
                  scale: '75%'
                },
                "& .MuiChip-deleteIcon": {
                  fill: "#000",
                },
              }}
              renderInput={(params) => (
                <TextFieldStyled
                  {...params}
                  label="To:"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {isGetUserListLoading ? (
                          <CircularProgress color="primary" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
            <Autocomplete
              multiple
              options={sharedUser.map((user) => user.userName)}
              value={sharedUser.map((user) => user.userName)}
              limitTags={2}
              readOnly
              loading={isGetSharedUserLoading}
              renderInput={(params) => (
                <TextFieldStyled
                  {...params}
                  label="Current Sharing:"
                  variant="standard"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {isGetSharedUserLoading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
            <DialogActions>
              <WhiteBtn onClick={() => onOpen()}>Cancel</WhiteBtn>
              <SaveLoadingBtn
                loading={isShareUserLoading}
                onClick={onShareUser}
              >
                Save
              </SaveLoadingBtn>
            </DialogActions>
          </Stack>
        </DialogContentText>
      </DialogContent>
    </TabPanel>
  );
};

export default UserTab;
