import {
  Divider,
  Autocomplete,
  CircularProgress,
  TextField,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import WebViewer, { WebViewerInstance } from "@pdftron/webviewer";
import { ref } from "firebase/storage";
import { LoadingButton } from "@mui/lab";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AlertPopup from "../../../../components/AlertPopup";
import { TemplateArgs } from "../../../../models/template";
import {
  getDepartmentList,
  toggleDepartmentList,
  getTemplateTypeList,
  toggleTemplateTypeList,
  getUsers,
  clearUserList,
} from "../../../../slices/system";
import { addNewTemplate } from "../../../../slices/template";
import { useDispatch, useSelector } from "../../../../hooks";
import storage from "../../../../utils/firebase";
import { useTranslation } from "react-i18next";

const LoadingBtn = styled(
  LoadingButton,
  {}
)({
  backgroundColor: "#407AFF",
  borderRadius: "5px",
  color: "#fff",
  padding: "5px",
  textTransform: "unset",
  // fontSize: '15px',
  // width: 'fit-content',
  ":hover": { backgroundColor: "#578aff" },
  "&.MuiLoadingButton-loading": {
    backgroundColor: "#fff",
    borderColor: "#407AFF",
  },
});

const CancelBtn = styled(
  Button,
  {}
)({
  backgroundColor: "#fff",
  borderRadius: "5px",
  color: "#407AFF",
  padding: "5px",
  textTransform: "unset",
  // ":hover": { backgroundColor: "#407AFF", color: "#fff", },
});

const StyledBtn = styled(
  Button,
  {}
)({
  backgroundColor: "#407AFF",
  borderRadius: "5px",
  color: "#fff",
  paddingTop: "10px",
  paddingBottom: "10px",
  ":hover": { backgroundColor: "#fff", color: "#407AFF" },
  "&.Mui-disabled": {
    color: "#F2F2F2",
    backgroundColor: "#6F7276",
  },
});

const TextFieldStyled = styled(TextField)({
  color: "#fff",
  input: {
    color: "#fff",
  },
  "& .MuiSvgIcon-root": {
    fill: "#fff",
  },
});

const ViewAddTemplate: React.FC = () => {
  const viewer = useRef(null);
  const instance = useRef<WebViewerInstance>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    isGetDepartmentsLoading,
    departmentList,
    isOpenDepartmentList,
    isGetUserListLoading,
    userList,
    isGetTemplateTypesLoading,
    isOpenTemplateTypes,
    templateTypeList,
  } = useSelector((state) => state.system);
  const { isAddNewTemplateLoading } = useSelector((state) => state.template);

  const [form, setForm] = useState<TemplateArgs>({
    templateName: undefined,
    description: undefined,
    idDepartment: undefined,
    idTemplateType: undefined,
    size: undefined,
    signatoryList: undefined,
    createdBy: +userInfo?.userId!,
  });

  const [file, setFile] = useState<File>();
  const [isEnableSave, setIsEnableSave] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    let check = false;
    if(!file) return 
    Object.values(form).forEach((value) => {
      if (!value) {
        check = true;
        return;
      }
    });
    check ? setIsEnableSave(false) : setIsEnableSave(true);
  }, [file, form]);
  // Handle file upload event and update state
  function handleChange(event: any) {
    const newFile: File = event.target.files[0];
    setFile(newFile);
    setForm({ ...form, templateName: newFile.name, size: newFile.size });
  }

  const handleUpload = async () => {
    const storageRef = ref(storage, `/file/${file!.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    await dispatch(
      addNewTemplate({
        templateInfo: form,
        storageRef,
        file: file!,
      })
    ).unwrap();
    navigate("/user");
  };

  // if using a class, equivalent of componentDidMount

  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer/lib",
        initialDoc: undefined,
        disabledElements: ["downloadButton"],
      },
      viewer.current!
    ).then(async (inst) => {
      instance.current = inst;
      const { documentViewer } = inst.Core;
      const annotManager = documentViewer.getAnnotationManager();
      annotManager.enableReadOnlyMode();
      const UIEvents = inst.UI.Events;
      inst.UI.addEventListener(UIEvents.LOAD_ERROR, function (err) {
        inst.UI.showErrorMessage('This file has been broken! Please insert another one.')
        setFile(undefined)
      });
      documentViewer.addEventListener("documentLoaded", async () => {
        await documentViewer.getDocument().getDocumentCompletePromise();
        documentViewer.updateView();
      });
    });
  }, []);

  useEffect(() => {
    if (!file) {
      return;
    }
    if (instance.current) {
      instance.current.UI.loadDocument(file);
    }
  }, [file]);

  const getDepartmentListHandler = async () => {
    if (!departmentList) {
      await dispatch(getDepartmentList()).unwrap();
    }
    dispatch(toggleDepartmentList({ isOpen: !isOpenDepartmentList }));
  };

  const getTemplateTypesHandler = async () => {
    if (!templateTypeList) {
      await dispatch(getTemplateTypeList()).unwrap();
    }
    dispatch(toggleTemplateTypeList({ isOpen: !isOpenTemplateTypes }));
  };

  const getUserListHandler = useCallback(() => {
    dispatch(getUsers({ departmentId_eq: form.idDepartment })).unwrap();
  }, [dispatch, form.idDepartment]);

  useEffect(() => {
    if (form.idDepartment) {
      getUserListHandler();
    } else {
      dispatch(clearUserList());
    }
  }, [getUserListHandler, dispatch, form.idDepartment]);

  const onChangeSelectedDepartment = (value: number | undefined) => {
    if (!value) {
      setForm({ ...form, signatoryList: undefined, idDepartment: undefined });
      return;
    }
    setForm({ ...form, idDepartment: value, signatoryList: undefined });
  };
  const { t } = useTranslation();
  return (
    <Fragment>
      <div className="bg-blue-config px-20 py-6 flex space-x-4 items-center">
        <Link to="/user">
          <ArrowBackIosIcon fontSize="small" className="fill-white" />
        </Link>
        <span className="text-white">{t("Add a template")}</span>
      </div>
      <div className="flex flex-col-reverse md:flex-row">
        <div className="flex flex-col bg-dark-config min-h-screen px-10 pt-12 space-y-8 pb-8 md:w-80 md:pb-0">
          <div className="flex flex-col space-y-8 text-white">
            <div className="flex flex-col space-y-4">
              <h4>{t("Choose a file")}</h4>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                className="w-fit flex space-x-2"
              >
                <input
                  hidden
                  accept=".pdf,.doc,.docx"
                  type="file"
                  id="file-picker"
                  className=""
                  onChange={handleChange}
                />
                <FileUploadIcon />
                <Typography className="text-white">
                  {form.templateName}
                </Typography>
              </IconButton>
            </div>
            <Divider className="bg-white" />
            <div className="flex flex-col space-y-4">
              <h4>{t("Description")}</h4>
              <TextField
                id="outlined-multiline-flexible"
                sx={{
                  border: "1px solid #fff",
                  borderRadius: "5px",
                  textarea: {
                    color: "#fff",
                  },
                }}
                multiline
                minRows={4}
                maxRows={4}
                color="primary"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col space-y-4">
              <h4>{t("Type")}</h4>

              <Autocomplete
                id="asynchronous-demo"
                sx={{
                  width: 300,
                }}
                open={isOpenTemplateTypes}
                onOpen={getTemplateTypesHandler}
                onClose={getTemplateTypesHandler}
                onChange={(e, value) =>
                  setForm({ ...form, idTemplateType: value?.id })
                }
                isOptionEqualToValue={(option, value) =>
                  option.typeName === value.typeName
                }
                getOptionLabel={(option) => option.typeName}
                options={templateTypeList?.items!}
                loading={isGetTemplateTypesLoading}
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
                          {isGetTemplateTypesLoading ? (
                            <CircularProgress color="primary" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <h4>{t("Department")}</h4>
              <Autocomplete
                id="asynchronous-demo"
                sx={{
                  width: 300,
                }}
                open={isOpenDepartmentList}
                onOpen={getDepartmentListHandler}
                onClose={getDepartmentListHandler}
                onChange={(e, value) => onChangeSelectedDepartment(value?.id)}
                isOptionEqualToValue={(option, value) =>
                  option.departmentName === value.departmentName
                }
                getOptionLabel={(option) => option.departmentName}
                options={departmentList?.items!}
                loading={isGetDepartmentsLoading}
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
                          {isGetDepartmentsLoading ? (
                            <CircularProgress color="primary" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <h4>{t("Select Signer(s)")}</h4>
              {isGetUserListLoading && (
                <div className="flex justify-center">
                  <CircularProgress />
                </div>
              )}
              {userList?.items && !isGetUserListLoading && (
                <Autocomplete
                  multiple
                  limitTags={2}
                  sx={{
                    "& .MuiAutocomplete-tag": {
                      backgroundColor: "#fff",
                    },
                    "& .MuiChip-deleteIcon": {
                      fill: "#000",
                    },
                  }}
                  id="multiple-limit-tags"
                  options={userList?.items!}
                  getOptionLabel={(option) => option.username}
                  onChange={(e, value) => {
                    setForm({
                      ...form,
                      signatoryList:
                        value.length > 0
                          ? value.map((item) => item.id)
                          : undefined,
                    });
                  }}
                  renderInput={(params) => (
                    <TextFieldStyled
                      {...params}
                      sx={{ border: "1px solid #fff", borderRadius: "5px" }}
                    />
                  )}
                />
              )}
            </div>
            <StyledBtn
              disabled={!isEnableSave}
              onClick={() => setOpenDialog(true)}
              autoFocus
            >
              {t("Save")}
            </StyledBtn>
          </div>
        </div>
        <div className="webviewer w-full h-screen" ref={viewer}></div>
      </div>
      <AlertPopup
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
      />
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t("Are you sure you want to save this form ?")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("After saving this template")}, {form.templateName!}{" "}
            {t("will be waiting for an approval")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CancelBtn onClick={() => setOpenDialog(false)} size="small">
            {t("Cancel")}
          </CancelBtn>
          <LoadingBtn
            size="small"
            loading={isAddNewTemplateLoading}
            loadingIndicator={<CircularProgress color="inherit" size={16} />}
            variant="outlined"
            onClick={handleUpload}
          >
            {t("Save")}
          </LoadingBtn>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ViewAddTemplate;
