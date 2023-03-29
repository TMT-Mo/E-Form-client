import { Autocomplete, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { TextFieldStyled } from "../../../../../components/CustomStyled";
import StatusTag from "../../../../../components/StatusTag";
import { useSelector } from "../../../../../hooks";
import { IUser } from "../../../../../models/system";
import { helpers } from "../../../../../utils";
import { StatusDocument } from "../../../../../utils/constants";
 
interface Props {
  signerList: IUser[]
  isOpenSignerList: boolean;
  isChangingSigner: boolean;
  onOpenSignerList: (index?: number) => void;
  indexOpenSigner: null | number;
  onChangeSigner: (value: IUser, index: number) => void
}

const ChangeSigner: React.FC<Props> = ({
  signerList,
  isOpenSignerList,
  isChangingSigner,
  onOpenSignerList,
  indexOpenSigner,
  onChangeSigner
}) => {
  const {t} = useTranslation();
  const { isGetSignerLoading, userList } = useSelector((state) => state.system);

  const filterUser = (): IUser[] => {
    let newUserList: IUser[] = [];
    let checkExisted;
    userList.forEach((u) => {
      checkExisted = false;
      signerList.forEach((value, index) => {
        if (u.userName === value.userName) {
          checkExisted = true;
        }
      });
      !checkExisted && newUserList.push(u);
    });
    return newUserList;
  };

  const signers = signerList.map((signer, index) => (
    <div className="flex flex-col space-y-3 rounded-md border border-solid border-white p-4 min-w-fit">
      <div className="flex space-x-2 items-center ">
        <h4>{t("Signer")}:</h4>
        <Typography className="text-white">{signer.userName}</Typography>
      </div>
      <div className="flex space-x-2 items-center">
        <h4>{t("Department")}:</h4>
        <span className="text-white text-base break-words">{t(signer.departmentName)}</span>
      </div>
      <div className="flex space-x-2 items-center">
        <h4>{t("Role")}:</h4>
        <Typography className="text-white">{t(signer.roleName)}</Typography>
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
            onClose={() => onOpenSignerList()}
            onChange={(e, value) => onChangeSigner(value!, index)}
            disableClearable
            // isOptionEqualToValue={(option, value) =>
            //   option.username === value.username
            // }
            getOptionLabel={(option) => option.userName}
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

  return <>{signers}</>;
};

export default ChangeSigner;
