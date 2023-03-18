import {
  Divider,
  Autocomplete,
  CircularProgress,
  TextField,
  IconButton,
  Typography,
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
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import WebViewer, { WebViewerInstance } from "@pdftron/webviewer";
import { ref } from "firebase/storage";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AlertPopup from "../../../../components/AlertPopup";
import {
  getDepartmentList,
  toggleDepartmentList,
  getTemplateTypeList,
  toggleTemplateTypeList,
  getSigner,
  clearUserList,
} from "../../../../slices/system";
import { addNewTemplate } from "../../../../slices/template";
import { useDispatch, useSelector } from "../../../../hooks";
import storage from "../../../../utils/firebase";
import { useTranslation } from "react-i18next";
import {
  WhiteBtn,
  SaveLoadingBtn,
  TextFieldStyled,
} from "../../../../components/CustomStyled";
import { IUser } from "../../../../models/system";

interface Form {
  templateName?: string;
  signatoryList?: IUser[];
  idTemplateType?: number;
  idDepartment?: number,
  description?: string;
  size?: number;
  createdBy?: number;
}

const ViewAddTemplate: React.FC = () => {
  const { t, i18n } = useTranslation();
  const viewer = useRef(null);
  const instance = useRef<WebViewerInstance>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    isGetDepartmentsLoading,
    departmentList,
    isOpenDepartmentList,
    isGetSignerLoading,
    userList,
    isGetTemplateTypesLoading,
    isOpenTemplateTypes,
    templateTypeList,
  } = useSelector((state) => state.system);
  const { isAddNewTemplateLoading } = useSelector((state) => state.template);

  const [form, setForm] = useState<Form>({
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

  const getSignerListHandler = useCallback(() => {
    dispatch(getSigner({ departmentId_eq: form.idDepartment })).unwrap();
  }, [dispatch, form.idDepartment]);

  const handleUpload = async () => {
    const storageRef = ref(storage, `/file/${file!.name}`);
    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    await dispatch(
      addNewTemplate({
        templateInfo: {...form, signatoryList: form.signatoryList!.map(signer => signer.id) },
        storageRef,
        file: file!,
      })
    ).unwrap();
    navigate("/user");
  };

  const onChangeSelectedDepartment = (value: number | undefined) => {
    if (!value) {
      setForm({ ...form, signatoryList: undefined, idDepartment: undefined });
      return;
    }
    setForm({ ...form, idDepartment: value, signatoryList: undefined });
  };

  useEffect(() => {
    let check = false;
    if (!file) return;
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
  // if using a class, equivalent of componentDidMount

  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer/lib",
        initialDoc: undefined,
        disabledElements: ["downloadButton", 'languageButton'],
      },
      viewer.current!
    ).then(async (inst) => {
      instance.current = inst;
      const { documentViewer } = inst.Core;
      inst.UI.setLanguage(i18n.language === 'vn' ? 'vi' : 'en');
      const annotManager = documentViewer.getAnnotationManager();
      annotManager.enableReadOnlyMode();
      const UIEvents = inst.UI.Events;
      inst.UI.addEventListener(UIEvents.LOAD_ERROR, function (err) {
        inst.UI.showErrorMessage(
          "This file has been broken! Please insert another one."
        );
        setFile(undefined);
      });
      documentViewer.addEventListener("documentLoaded", async () => {
        await documentViewer.getDocument().getDocumentCompletePromise();
        documentViewer.updateView();
      });
    });
  }, [i18n.language]);

  useEffect(() => {
    if (!file) {
      return;
    }
    if (instance.current) {
      instance.current.UI.loadDocument(file);
    }
  }, [file]);

  useEffect(() => {
    if (form.idDepartment) {
      getSignerListHandler();
    } else {
      dispatch(clearUserList());
    }
  }, [getSignerListHandler, dispatch, form.idDepartment]);

  const signers = form?.signatoryList?.map((signer, index) => (
    <div
      className="flex flex-col space-y-3 rounded-md border border-solid border-white p-4"
      key={index}
    >
      <div className="flex space-x-2 items-center ">
        <h4>{t("Signer")}:</h4>
        <span className="text-white text-base break-words">
          {signer.username}
        </span>
      </div>
      <div className="flex space-x-2 items-center">
        <h4>Department:</h4>
        <span className="text-white text-base break-words">
          {signer.departmentName}
        </span>
      </div>
      <div className="flex space-x-2 items-center">
        <h4>{t("Role")}:</h4>
        <span className="text-white text-base break-words">
          {signer.roleName}
        </span>
      </div>
    </div>
  ))
  
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
                getOptionLabel={(option) => t(option.typeName)}
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
                getOptionLabel={(option) => t(option.departmentName)}
                options={departmentList}
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
              {isGetSignerLoading && (
                <div className="flex justify-center">
                  <CircularProgress />
                </div>
              )}
              {userList && !isGetSignerLoading && (
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
                  options={userList}
                  getOptionLabel={(option) => option.username}
                  onChange={(e, value) => {
                    setForm({
                      ...form,
                      signatoryList:
                        value.length > 0
                          ? value
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
            {signers}
            <SaveLoadingBtn
              disabled={!isEnableSave}
              onClick={() => setOpenDialog(true)}
              autoFocus
            >
              {t("Save")}
            </SaveLoadingBtn>
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
          <WhiteBtn onClick={() => setOpenDialog(false)} size="small">
            {t("Cancel")}
          </WhiteBtn>
          <SaveLoadingBtn
            size="small"
            loading={isAddNewTemplateLoading}
            loadingIndicator={<CircularProgress color="inherit" size={16} />}
            variant="outlined"
            onClick={handleUpload}
          >
            {t("Save")}
          </SaveLoadingBtn>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ViewAddTemplate;
