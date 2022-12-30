import SearchIcon from "@mui/icons-material/Search";
import {
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "../../../components/DataTable";
import { useDispatch, useSelector } from "../../../hooks";
import { getDocuments } from "../../../slices/document";

const AwaitSigning = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { searchItemValue, currentPage, filter} = useSelector(state => state.document)

  useEffect(() => {
    const getDocumentList = dispatch(
      getDocuments({
        documentName_contains: searchItemValue || undefined,
        _page: currentPage,
        _size: 10,
        _sort: undefined,
        signatoryList_contains: userInfo?.userId
      })
    );

    getDocumentList.unwrap()
    return () => {
      getDocumentList.abort();
    };
  }, [currentPage, dispatch, searchItemValue, userInfo?.userId]);
  const { t } = useTranslation();
  return (
    <div className="flex flex-col px-20 py-10 space-y-6">
      <h2>{t ("Await Signing")}</h2>
      <div className="flex flex-col rounded-md border border-gray-400 bg-white">
        <div className="flex px-10 py-6 justify-between">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 300,
            }}
            variant="outlined"
          >
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={t ("Search Document")}
              inputProps={{ "aria-label": "search google maps" }}
            />
          </Paper>
        </div>
        <DataTable />
      </div>
    </div>
  );
};

export default AwaitSigning;
