import {
  Divider,
  Autocomplete,
  CircularProgress,
  TextField,
  IconButton,
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
import { handleError } from "../../../../slices/notification";
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

const LoadingBtn = styled(
  LoadingButton,
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
  "&.MuiLoadingButton-loading": {
    backgroundColor: "#fff",
    borderColor: "#407AFF",
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

const ViewCreateDocument: React.FC = () => {
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
    // idDepartment: undefined,
    idTemplateType: undefined,
    size: undefined,
    signatoryList: undefined,
    createdBy: +userInfo?.userId!,
  });

  const [selectedDepartment, setSelectedDepartment] = useState<
    number | undefined
  >(undefined);
  const [file, setFile] = useState<File>();
  const [isEnableSave, setIsEnableSave] = useState(false);

  useEffect(() => {
    let check = false;
    Object.values(form).forEach((value) => {
      if (!value) {
        check = true;
        return;
      }
    });
    check ? setIsEnableSave(false) : setIsEnableSave(true);
  }, [form]);
  // Handle file upload event and update state
  function handleChange(event: any) {
    const newFile: File = event.target.files[0];
    setFile(newFile);
    setForm({ ...form, templateName: newFile.name, size: newFile.size });
  }

  const handleUpload = async () => {
    const storageRef = ref(storage, `/${file!.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    try {
      await dispatch(
        addNewTemplate({
          templateInfo: form,
          storageRef,
          file: file!,
        })
      )
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  // if using a class, equivalent of componentDidMount

  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer/lib",
        initialDoc: undefined,
        disabledElements: [
          // 'viewControlsButton',
          // 'leftPanel'
          // 'viewControlsOverlay'
          // 'toolbarGroup-Annotate'
        ],
      },
      viewer.current!
    ).then(async (inst) => {
      instance.current = inst;
      const { documentViewer, annotationManager, Annotations } = inst.Core;
      const signatureTool = documentViewer.getTool("AnnotationCreateSignature");
      const annotManager = documentViewer.getAnnotationManager();

      documentViewer.addEventListener("documentLoaded", async () => {
        await documentViewer.getDocument().getDocumentCompletePromise();
        documentViewer.updateView();
      });

      // documentViewer.addEventListener('annotationsLoaded', () => {
      //   const annot = new Annotations.FreeTextAnnotation(Annotations.FreeTextAnnotation.Intent.FreeTextCallout, {
      //     PageNumber: 1,
      //     TextAlign: 'center',
      //     TextVerticalAlign: 'center',
      //     TextColor: new Annotations.Color(255, 0, 0, 1),
      //     StrokeColor: new Annotations.Color(0, 255, 0, 1),
      //   });

      //   annot.setPathPoint(0, 500, 25);  // Callout ending (start)
      //   annot.setPathPoint(1, 425, 75);  // Callout knee
      //   annot.setPathPoint(2, 300, 75);  // Callout joint
      //   annot.setPathPoint(3, 100, 50);  // Top-left point
      //   annot.setPathPoint(4, 300, 100); // Bottom-right point

      //   annot.setContents(`Visited: ${new Date()}`);

      //   annotationManager.addAnnotation(annot);
      //   annotationManager.redrawAnnotation(annot);
      // });
      // await documentViewer.getAnnotationsLoadedPromise();
      // const xfdf = await annotationManager.exportAnnotations();
      // console.log(xfdf);
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
    try {
      if (!departmentList) {
        await dispatch(getDepartmentList())
      }
      dispatch(toggleDepartmentList({ isOpen: !isOpenDepartmentList }));
    } catch (error) {
      dispatch(handleError({ errorMessage: undefined }));
    }
  };

  const getTemplateListHandler = () => {
      if (!templateTypeList) {
        dispatch(getTemplateTypeList())
      }
      dispatch(toggleTemplateTypeList({ isOpen: !isOpenTemplateTypes }));
  };

  const getUserListHandler = useCallback(() => {
    dispatch(getUsers());
  }, [dispatch, selectedDepartment]);

  useEffect(() => {
    if (selectedDepartment) {
      getUserListHandler();
    } else {
      dispatch(clearUserList());
    }
  }, [selectedDepartment, getUserListHandler, dispatch]);

  const onChangeSelectedDepartment = (value: number | undefined) => {
    if (!value) {
      setSelectedDepartment(undefined);
      setForm({ ...form, signatoryList: undefined });
      return;
    }
    setSelectedDepartment(value);
    if (form.signatoryList) {
      setForm({ ...form, signatoryList: undefined });
    }
  };

  return (
    <Fragment>
      <div className="bg-blue-config px-20 py-6 flex space-x-4 items-center">
        <Link to="/user">
          <ArrowBackIosIcon fontSize="small" className="fill-white" />
        </Link>
        <span className="text-white">Create a document</span>
      </div>
      <div className="flex">
        <div className="flex flex-col bg-dark-config min-h-screen px-10 pt-12 space-y-8 w-80">
          <div className="flex flex-col space-y-8 text-white">
            <div className="flex flex-col space-y-4">
              <h4>Choose a file</h4>
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
                <span className="text-white text-base break-words w-60">
                  {form.templateName}
                </span>
              </IconButton>
            </div>
            <Divider className="bg-white" />
            <div className="flex flex-col space-y-4">
              <h4>Description</h4>
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
              <h4>Type</h4>

              <Autocomplete
                id="asynchronous-demo"
                sx={{
                  width: 300,
                }}
                open={isOpenTemplateTypes}
                onOpen={getTemplateListHandler}
                onClose={getTemplateListHandler}
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
              <h4>Department</h4>
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
              <h4>Select Signer(s)</h4>
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
                  }}
                  id="multiple-limit-tags"
                  options={userList?.items!}
                  getOptionLabel={(option) => option.email}
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
            <LoadingBtn
              size="small"
              loading={isAddNewTemplateLoading}
              loadingIndicator={<CircularProgress color="inherit" size={16} />}
              variant="outlined"
              onClick={handleUpload}
              disabled={!isEnableSave}
            >
              Save
            </LoadingBtn>
          </div>
        </div>
        <div className="webviewer w-full" ref={viewer}></div>
      </div>
      <AlertPopup
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
      />
    </Fragment>
  );
};

export default ViewCreateDocument;
