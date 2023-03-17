import {
  DialogContent,
  DialogContentText,
  Autocomplete,
  CircularProgress,
  DialogActions,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "../../../../../hooks";
import {
  changeSharedUser,
  clearSharedInfo,
  getSharedUser,
  shareUsers,
} from "../../../../../slices/document";
import ClearIcon from "@mui/icons-material/Clear";
import {
  TextFieldStyled,
  WhiteBtn,
  SaveLoadingBtn,
} from "../../../../CustomStyled";
import { SharedUser } from "../../../../../models/document";

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
  const { onOpen, value, idDocument } = props;

  const onAddSelectedUser = (value: SharedUser | undefined) => {
    if (!value) {
      dispatch(changeSharedUser({ users: [] }));
      return;
    }
    const { departmentName } = value;
    if (sharedUser?.length === 0) {
      // setSelectedDepartment((prevState) => [...prevState!, value]);
      dispatch(changeSharedUser({ users: [...sharedUser, value] }));
      return;
    }
    if (departmentName === "All" || sharedUser[0].departmentName === "All") {
      // setSelectedDepartment([value]);
      dispatch(changeSharedUser({ users: [value] }));
      return;
    }
    // setSelectedDepartment((prevState) => [...prevState!, value]);
    dispatch(changeSharedUser({ users: [...sharedUser, value] }));
    return value;
  };

  const onChangeSelectedUser = (index: number) => {
    dispatch(
      changeSharedUser({
        users: sharedUser?.filter((u) => u !== sharedUser[index]),
      })
    );
  };

  const onShareDepartment = async () => {
    await dispatch(
      shareUsers({ idDocument, userIdList: sharedUser.map((user) => user.id) })
    ).unwrap();
  };

  const filterUser = (): SharedUser[] => {
    let newUserList: SharedUser[] = [];
    let checkExisted;
    userList.forEach((u) => {
      checkExisted = false;
      sharedUser.forEach((value, index) => {
        if (u.departmentName === value.departmentName) {
          checkExisted = true;
        }
      });
      !checkExisted && newUserList.push(u);
    });
    return newUserList;
  };

  useEffect(() => {
    const getSharedUsers = dispatch(getSharedUser({ idDocument }));
    getSharedUsers.unwrap();
    // const getUserList = dispatch(ge)

    return () => getSharedUsers.abort();
  }, [dispatch, idDocument]);

  useEffect(() => {
    return () => {
      dispatch(clearSharedInfo());
    };
  }, [dispatch]);
  //
  return (
    <TabPanel value={value} index={1}>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <h4>{t("User list")}</h4>
          <Autocomplete
            id="asynchronous-demo"
            // multiple = {departmentList?.items ? true : false}
            sx={{
              width: 300,
              color: "#000",
            }}
            // open={isOpenDepartmentList}
            // onOpen={getDepartmentListHandler}
            // onClose={getDepartmentListHandler}
            onChange={(e, value) => onAddSelectedUser(value!)}
            isOptionEqualToValue={(option, value) =>
              option.departmentName === value.departmentName
            }
            getOptionLabel={(option) => t(option.username)}
            options={filterUser()}
            loading={isGetUserListLoading}
            renderInput={(params) => (
              <TextFieldStyled
                {...params}
                sx={{
                  border: "1px solid #fff",
                  borderRadius: "5px",
                }}
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
          {isGetSharedUserLoading && (
            <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "300px",
              alignItems: 'center'
            }}
            >
              <CircularProgress />
            </div>
          )}
          <div
            className="flex flex-col border border-slate-500 rounded-md"
            style={{ width: "300px" }}
          >
            {!isGetSharedUserLoading &&
              sharedUser.map((user, index) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "between",
                    width: "300px",
                  }}
                  key={user.id}
                >
                  <span>{user.username}</span>
                  <IconButton
                    onClick={() => onChangeSelectedUser(index)}
                    size="small"
                  >
                    <ClearIcon />
                  </IconButton>
                </div>
              ))}
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <WhiteBtn onClick={() => onOpen()}>Cancel</WhiteBtn>
        <SaveLoadingBtn
          loading={isShareUserLoading}
          onClick={onShareDepartment}
        >
          Save
        </SaveLoadingBtn>
      </DialogActions>
    </TabPanel>
  );
};

export default UserTab;
