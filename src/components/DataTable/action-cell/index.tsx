import { CircularProgress, IconButton } from "@mui/material";
import { TouchRippleActions } from "@mui/material/ButtonBase/TouchRipple";
import { GridRenderCellParams } from "@mui/x-data-grid";
import React, { useCallback, useEffect, useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "../../../hooks";
import { enableTemplate, getTemplateDetail } from "../../../slices/template";
import { Template } from "../../../models/template";
import { handleError } from "../../../slices/notification";

export const ActionCell = (props: GridRenderCellParams<Date>) => {
  const { hasFocus, value, row  } = props;
  const buttonElement = React.useRef<HTMLButtonElement | null>(null);
  const rippleRef = React.useRef<TouchRippleActions | null>(null);
  const dispatch = useDispatch();
  const { isEnableTemplateLoading, templateDetail } = useSelector((state) => state.template);
  // const [idTemplate, setIdTemplate] = useState<number>();

  const rowValue = row as Template;
  React.useLayoutEffect(() => {
    if (hasFocus) {
      const input = buttonElement.current?.querySelector("input");
      input?.focus();
    } else if (rippleRef.current) {
      // Only available in @mui/material v5.4.1 or later
      rippleRef.current.stop({} as any);
    }
  }, [hasFocus]);

  const onEnableTemplate = useCallback(async () => {
    try {
      await dispatch(
        enableTemplate({ id: rowValue.id, isEnable: !rowValue.isEnable })
      ).unwrap(); //* Unwrap to catch error when failed
    } catch {
      dispatch(handleError({ errorMessage: undefined }));
    }
  }, [dispatch, rowValue.id, rowValue.isEnable]);

  useEffect(() => {
    if(templateDetail?.id === rowValue.id){
      onEnableTemplate()
    } ;
  }, [onEnableTemplate, rowValue.id, templateDetail?.id]);

  return (
    <div>
      <IconButton aria-label="lock" onClick={() => dispatch(getTemplateDetail({ template: row }))}>
        {isEnableTemplateLoading && templateDetail?.id === rowValue.id ? (
          <CircularProgress size={20} />
        ) : (
          <LockIcon fontSize="small" />
        )}
      </IconButton>
      <IconButton aria-label="delete">
        <Link
          to="/viewCreateDocument"
          replace
          onClick={() => dispatch(getTemplateDetail({ template: row }))}
        >
          <BorderColorIcon fontSize="small" />
        </Link>
      </IconButton>
    </div>
  );
};
