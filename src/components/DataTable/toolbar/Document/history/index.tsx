import { Stack, Paper, IconButton, InputBase } from '@mui/material';
import { GridToolbarFilterButton } from '@mui/x-data-grid';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { searchDocument } from 'slices/document';
import SearchIcon from "@mui/icons-material/Search";
export const HistoryDocumentToolBar = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    return (
      <Stack justifyContent="space-between" padding={3} direction="row">
        <Paper
            // component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: `${window.innerWidth < 720 ? '200px' : '300px'}`,
            }}
            variant="outlined"
          >
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={t("Search Document")}
              inputProps={{ "aria-label": "search google maps" }}
              onChange={(e) =>
                dispatch(searchDocument({ value: e.target.value }))
              }
            />
          </Paper>
          <GridToolbarFilterButton />
      </Stack>
    );
}
