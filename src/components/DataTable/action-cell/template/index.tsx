import { CircularProgress, IconButton } from "@mui/material";
import { TouchRippleActions } from "@mui/material/ButtonBase/TouchRipple";
import { GridRenderCellParams } from "@mui/x-data-grid";
import React, { useCallback, useEffect } from "react";
import LockIcon from "@mui/icons-material/Lock";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link } from "react-router-dom";
import { Template } from "../../../../models/template";
import { setViewerLocation } from "../../../../slices/location";
import { enableTemplate, getTemplateDetail } from "../../../../slices/template";
import { ViewerLocationIndex } from "../../../../utils/constants";
import { useDispatch, useSelector } from "../../../../hooks";

const {
  CREATE_DOCUMENT,
} = ViewerLocationIndex;

export const TemplateActionCell = (props: GridRenderCellParams<Date>) => {
  const { hasFocus, row } = props;
  const buttonElement = React.useRef<HTMLButtonElement | null>(null);
  const rippleRef = React.useRef<TouchRippleActions | null>(null);
  const dispatch = useDispatch();
  const { isEnableTemplateLoading, templateDetail } = useSelector(
    (state) => state.template
  );
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
      await dispatch(
        enableTemplate({ id: rowValue.id, isEnable: !rowValue.isEnable })
      ).unwrap(); //* Unwrap to catch error when failed
  }, [dispatch, rowValue.id, rowValue.isEnable]);

  useEffect(() => {
    if (templateDetail?.id === rowValue.id) {
      onEnableTemplate();
    }
  }, [onEnableTemplate, rowValue.id, templateDetail?.id]);

  return (
    <div>
      <IconButton
        aria-label="lock"
        onClick={() => dispatch(getTemplateDetail({ template: row }))}
      >
        {isEnableTemplateLoading && templateDetail?.id === rowValue.id ? (
          <CircularProgress size={20} />
        ) : (
          <LockIcon fontSize="small" />
        )}
      </IconButton>
      <IconButton
        aria-label="delete"
        onClick={() => {
          dispatch(getTemplateDetail({ template: row }))
          dispatch(setViewerLocation({viewerLocationIndex: CREATE_DOCUMENT}))
        }}
      >
        <Link to="/viewer" replace>
          <BorderColorIcon fontSize="small" />
        </Link>
      </IconButton>
    </div>
  );
};
