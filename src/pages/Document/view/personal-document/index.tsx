import {
  Autocomplete,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import WebViewer from "@pdftron/webviewer";
import { useDispatch, useSelector } from "../../../../hooks";
import StatusTag from "../../../../components/StatusTag";
import { useTranslation } from "react-i18next";
import { helpers } from "../../../../utils";
import { Document } from "../../../../models/document";
import { styled } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { StatusDocument } from "../../../../utils/constants";
import { IUser } from "../../../../models/system";
import { getSigner } from "../../../../slices/system";
import { useCallback } from "react";

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

const TextFieldStyled = styled(TextField)({
  color: "#fff",
  input: {
    color: "#fff",
  },
  "& .MuiSvgIcon-root": {
    fill: "#fff",
  },
});

const ViewPersonalDocument: React.FC = () => {
  const viewer = useRef(null);
  const dispatch = useDispatch();
  const { documentDetail } = useSelector((state) => state.document);
  const { userInfo } = useSelector((state) => state.auth);
  const { isGetSignerLoading, userList } = useSelector((state) => state.system);
  const [isChangingSigner, setIsChangingSigner] = useState(false);
  const [isOpenSignerList, setIsOpenSignerList] = useState(false);
  const [indexOpenSigner, setIndexOpenSigner] = useState<null | number>(null);
  const [deletedSigners, setDeletedSigners] = useState<IUser[] | undefined>([]);
  const {
    createdAt,
    createdBy,
    description,
    documentName,
    xfdfString,
    signatoryList,
    link,
    departmentName,
    status,
    typeName,
  } = (documentDetail as Document)!;
  const [t] = useTranslation();
  const [signerList, setSignerList] = useState([...signatoryList!]);
  const onChangeSigner = (value: IUser, index: number) => {
    if (value) {
      const newSignerList = [...signerList];
      newSignerList[index] = value;
      console.log(newSignerList);
      setSignerList(newSignerList);
      return
    }
    // setSignerList(prevState => prevState.map((state, i) => i === index ? deletedSigners[index]! : state))
    
    // console.log(value);
  };

  const onOpenSignerList = (index: number) => {
    setIsOpenSignerList(true);
    setIndexOpenSigner(index);
  };

  const filterUser = (): IUser[] => {
    let newUserList: IUser[] = [];
    let checkExisted;
    let deleteSigner
    userList?.items!.forEach((u) => {
      checkExisted = false;
      signerList.forEach((value, index) => {
        if (u.username === value.username) {
          checkExisted = true;
          deleteSigner = signerList.map((signer, i) =>
            i === index ? value : signer
          );
        }
      });
      !checkExisted && newUserList.push(u);
    });
    // setDeletedSigners(deleteSigner);
    return newUserList;
  };

  const signers = signerList.map((signer, index) => (
    <div className="flex flex-col space-y-3 rounded-md border border-solid border-white p-4">
      <div className="flex space-x-2 items-center ">
        <h4>{t("Signer")}:</h4>
        <Typography className="text-white">{signer.username}</Typography>
      </div>
      <div className="flex space-x-2 items-center">
        <h4>{t("Role")}:</h4>
        <Typography className="text-white">{signer.roleName}</Typography>
      </div>
      <div className="flex space-x-2 items-center">
        <h4>{t("Status")}:</h4>
        <Typography className="text-white">
          <StatusTag status={signer.status} type="document" />
        </Typography>
      </div>
      <div className="flex space-x-2 items-center">
        <h4>{t("Date modified")}:</h4>
        <Typography className="text-white">
          {helpers.addHours(signer.updateAt) ?? "---"}
        </Typography>
      </div>
      {signer.status === StatusDocument.PROCESSING_DOCUMENT &&
        isChangingSigner && (
          <Autocomplete
            id="asynchronous-demo"
            sx={{
              width: 300,
            }}
            open={isOpenSignerList && indexOpenSigner === index}
            onOpen={() => onOpenSignerList(index)}
            onClose={() => setIsOpenSignerList(false)}
            onChange={(e, value) => onChangeSigner(value!, index)}
            // isOptionEqualToValue={(option, value) =>
            //   option.username === value.username
            // }
            getOptionLabel={(option) => option.username}
            options={filterUser()}
            loading={isGetSignerLoading}
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
                      {isGetSignerLoading ? (
                        <CircularProgress color="primary" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        )}
    </div>
  ));
  // if using a class, equivalent of componentDidMount

  useEffect(() => {
    if (isChangingSigner && !userList) {
      dispatch(getSigner({ departmentId_eq: 2 })).unwrap();
    }
  }, [dispatch, isChangingSigner, userList]);

  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer/lib",
        initialDoc: link!,
        disabledElements: ["downloadButton"],
        isReadOnly: true,
      },
      viewer.current!
    ).then(async (instance) => {
      const { documentViewer, annotationManager } = instance.Core;
      instance.UI.setHeaderItems(function (header) {
        header.push({
          type: "actionButton",
          img: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20"><path d="M19 9h-4V3H9v6H5l7 8zM4 19h16v2H4z"></path></svg>',
          onClick: async () =>
            await instance.UI.downloadPdf({
              filename: documentName.replace(/.docx|.doc/g, ""),
              xfdfString,
            }),
        });
      });
      documentViewer.addEventListener("documentLoaded", async () => {
        await documentViewer.getDocument().getDocumentCompletePromise();
        await annotationManager.importAnnotations(xfdfString);
        documentViewer.updateView();
        annotationManager.setAnnotationDisplayAuthorMap((userId) => {
          if (userId === userInfo?.userId!.toString()) {
            return userInfo?.userName!;
          } else if (userId !== "System") {
            return userId;
          }
          return "System";
        });
      });
    });
  }, [documentName, link, userInfo?.userId, userInfo?.userName, xfdfString]);
  return (
    <Fragment>
      <div className="bg-blue-config px-20 py-6 flex space-x-4 items-center">
        <Link to="/user">
          <ArrowBackIosIcon fontSize="small" className="fill-white" />
        </Link>
        <span className="text-white">{t("Personal Document")}</span>
      </div>
      <div className="flex flex-col-reverse md:flex-row">
        <div className="flex flex-col bg-dark-config min-h-screen px-10 pt-12 space-y-8 pb-8 md:w-80">
          <div className="flex flex-col space-y-8 text-white">
            <div className="flex flex-col space-y-2">
              <h4>{t("File name")}:</h4>
              <span className="text-white text-base break-words w-60">
                {documentName}
              </span>
            </div>

            <div className="flex flex-col space-y-2">
              <h4>{t("Description")}:</h4>
              <span className="text-white text-base break-words w-60">
                {description}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <h4>{t("Type")}:</h4>
              <span className="text-white text-base break-words w-60">
                {typeName}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <h4>{t("Department")}:</h4>
              <span className="text-white text-base break-words w-60">
                {departmentName}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <h4>{t("Created By")}:</h4>
              <span className="text-white text-base break-words w-60">
                {createdBy.username}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <h4>{t("Created At")}:</h4>
              <span className="text-white text-base break-words w-60">
                {helpers.addHours(createdAt, 7)}
              </span>
            </div>
            <Divider className="bg-white" />
            <div className="flex justify-center">
              <h4>{t("Signer List")}:</h4>
            </div>
            {signers}
            {/* {status === StatusDocument.PROCESSING_DOCUMENT && (
              <LoadingBtn
                size="small"
                // loading={isApproveDocumentLoading}
                loadingIndicator={
                  <CircularProgress color="inherit" size={16} />
                }
                variant="outlined"
                onClick={() => setIsChangingSigner((prevState) => !prevState)}
              >
                Change Signer
              </LoadingBtn>
            )} */}
          </div>
        </div>
        <div className="webviewer w-full h-screen" ref={viewer}></div>
      </div>
    </Fragment>
  );
};

export default ViewPersonalDocument;
