import styled from "@emotion/styled";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  FormHelperText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "hooks";
import { TemplateType } from "models/template";
import { useTranslation } from "react-i18next";
import { WhiteBtn, SaveLoadingBtn } from "components/CustomStyled";
import {
  createTemplateType,
  editTemplateType,
  getTemplateTypeList,
} from "slices/system";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CloseIcon from "@mui/icons-material/Close";

const CustomBox = styled(Box)({
  padding: "20px 40px",
  backgroundColor: "#fff",
  width: "100%",
  borderRadius: "15px",
  lineHeight: "50px",
  filter:
    "drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))",
});

export const TypeTemplateSystem = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    isGetTemplateTypesLoading,
    isEditTemplateTypeLoading,
    isCreateTemplateTypeLoading,
    templateTypeList,
  } = useSelector((state) => state.system);
  const [modifyTemplateType, setModifyTemplateType] = useState<TemplateType>();
  const [selectedTemplateType, setSelectedTemplateType] =
    useState<TemplateType>();
  const [newTemplateType, setNewTemplateType] = useState<string>();
  const [isAddingTemplateType, setIsAddingTemplateType] = useState(false);
  const [isEditingTemplateType, setIsEditingTemplateType] = useState(false);
  const [isViewingTemplateType, setIsViewingTemplateType] = useState(false);

  const onEditTemplateType = async () => {
    const { typeName, id } = modifyTemplateType!;
    const editTemplateTypeHandle = dispatch(editTemplateType({ typeName, id }));
    await editTemplateTypeHandle.unwrap();
    // sendSignalREditSystem({ typeName: selectedTemplateType?.typeName });
    const getTemplateType = dispatch(getTemplateTypeList());
    await getTemplateType.unwrap();

    setIsEditingTemplateType(false);
  };

  const onCreateTemplateType = async () => {
    const createTemplateTypeHandler = dispatch(
      createTemplateType({ typeName: newTemplateType!, status: 1 })
    );
    await createTemplateTypeHandler.unwrap();

    const getTemplateType = dispatch(getTemplateTypeList());
    await getTemplateType.unwrap();

    setIsAddingTemplateType(false);
  };

  useEffect(() => {
    if (!isEditingTemplateType) {
      setModifyTemplateType(undefined);
    }
  }, [isEditingTemplateType]);

  useEffect(() => {
    if (!isAddingTemplateType) {
      setNewTemplateType(undefined);
    }
  }, [isAddingTemplateType]);

  return (
    <>
      <CustomBox sx={{ w: 1 / 4 }}>
        <Stack
          direction="row"
          //   spacing={25}
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack
            direction="column"
            //   justifyContent="space-between"
            //   alignItems="center"
          >
            <Typography
              variant="h6"
              component="h1"
              style={{ paddingBottom: "10px" }}
              fontWeight="bold"
              noWrap
            >
              {t("Template Type")}
            </Typography>

            {!isGetTemplateTypesLoading && (
              <Typography variant="h2" component="h1">
                {templateTypeList?.length}
              </Typography>
            )}
            {isGetTemplateTypesLoading && <CircularProgress />}
          </Stack>

          {!isGetTemplateTypesLoading && (
            <Stack direction="column">
              <IconButton
                type="button"
                // sx={{ p: "10px" }}
                aria-label="search"
                onClick={() =>
                  setIsAddingTemplateType((prevState) => !prevState)
                }
              >
                <AddBoxIcon sx={{ fill: "#fdcb6e" }} />
              </IconButton>
              <IconButton
                type="button"
                // sx={{ p: "10px" }}
                aria-label="search"
                onClick={() =>
                  setIsEditingTemplateType((prevState) => !prevState)
                }
              >
                <DriveFileRenameOutlineIcon sx={{ fill: "#00b894" }} />
              </IconButton>
              <IconButton
                type="button"
                // sx={{ p: "10px" }}
                aria-label="search"
                onClick={() =>
                  setIsViewingTemplateType((prevState) => !prevState)
                }
              >
                <ListAltIcon sx={{ fill: "#0984e3" }} />
              </IconButton>
            </Stack>
          )}
        </Stack>
      </CustomBox>
      <Dialog open={isEditingTemplateType}>
        <DialogContent>
          <Box minWidth="500px">
            <Stack spacing={3}>
              <Typography variant="h5" component="h1" alignSelf="center">
                {t("Edit Template Type")}
              </Typography>
              <Autocomplete
                id="asynchronous-demo"
                onChange={(e, value) => {
                  setModifyTemplateType(value!);
                  setSelectedTemplateType(value!);
                }}
                isOptionEqualToValue={(option, value) =>
                  option.typeName === value.typeName
                }
                getOptionLabel={(option) => t(option.typeName)}
                options={templateTypeList}
                sx={{
                  ".MuiAutocomplete-clearIndicator": {
                    backgroundColor: "#bdc3c7",
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
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("Select Template Type")}
                    sx={{ color: "#000" }}
                    InputProps={{
                      ...params.InputProps,

                      startAdornment: (
                        <React.Fragment>
                          {isGetTemplateTypesLoading ? (
                            <CircularProgress color="primary" size={20} />
                          ) : null}
                          {params.InputProps.startAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
              <Stack spacing={1}>
                <Typography>{t("Modify Template Type")}</Typography>
                <TextField
                  fullWidth
                  value={modifyTemplateType?.typeName}
                  disabled={!modifyTemplateType}
                  onChange={(value) => {
                    if (value.target.value.length > 30) return;
                    setModifyTemplateType({
                      ...modifyTemplateType!,
                      typeName: value.target.value,
                    });
                  }}
                />
                <FormHelperText id="component-error-text">{t('Maximum length')}: 30</FormHelperText>
              </Stack>
              <DialogActions>
                <WhiteBtn
                  onClick={() => setIsEditingTemplateType(false)}
                  size="small"
                >
                  {t("Cancel")}
                </WhiteBtn>
                <SaveLoadingBtn
                  size="small"
                  loading={isEditTemplateTypeLoading}
                  loadingIndicator={
                    <CircularProgress color="inherit" size={16} />
                  }
                  variant="outlined"
                  onClick={onEditTemplateType}
                  disabled={!modifyTemplateType}
                >
                  {t("Save")}
                </SaveLoadingBtn>
              </DialogActions>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog open={isAddingTemplateType}>
        <DialogContent>
          <Box minWidth="500px">
            <Stack spacing={3}>
              <Typography variant="h5" component="h1" alignSelf="center">
                {t("Add Template Type")}
              </Typography>
              <Stack spacing={1}>
                <Typography>{t("Input type")}</Typography>
                <TextField
                  fullWidth
                  value={newTemplateType}
                  onChange={(value) => {
                    if (value.target.value.length > 30) return;
                    setNewTemplateType(value.target.value);
                  }}
                />
                <FormHelperText id="component-error-text">{t('Maximum length')}: 30</FormHelperText>
              </Stack>
              <DialogActions>
                <WhiteBtn
                  onClick={() => setIsAddingTemplateType(false)}
                  size="small"
                >
                  {t("Cancel")}
                </WhiteBtn>
                <SaveLoadingBtn
                  size="small"
                  loading={isCreateTemplateTypeLoading}
                  loadingIndicator={
                    <CircularProgress color="inherit" size={16} />
                  }
                  variant="outlined"
                  onClick={onCreateTemplateType}
                >
                  {t("Save")}
                </SaveLoadingBtn>
              </DialogActions>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog open={isViewingTemplateType}>
        <DialogContent>
          <Box minWidth="500px">
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5" component="h1" alignSelf="center">
                  {t("Template Type List")}
                </Typography>
                <IconButton onClick={() => setIsViewingTemplateType(false)}>
                  <CloseIcon />
                </IconButton>
              </Stack>
              {templateTypeList?.map((type) => (
                <TextField key={type.id} value={t(type.typeName)} disabled />
              ))}
              <DialogActions>
                <WhiteBtn
                  onClick={() => setIsViewingTemplateType(false)}
                  size="small"
                >
                  {t("Cancel")}
                </WhiteBtn>
              </DialogActions>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
