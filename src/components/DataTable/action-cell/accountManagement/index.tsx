import {
  IconButton,
} from "@mui/material";
import { TouchRippleActions } from "@mui/material/ButtonBase/TouchRipple";
import { GridRenderCellParams } from "@mui/x-data-grid";
import React, { useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useDispatch, useSelector } from "../../../../hooks";
import {
  clearAccountDetail,
  getAccountDetail,
} from "../../../../slices/system";
import { EditDialog } from "./edit-dialog/";
import { IUser } from "../../../../models/system";

export const AccountManagementActionCell = (
  props: GridRenderCellParams<Date>
) => {
  const { hasFocus, row } = props;
  const buttonElement = React.useRef<HTMLButtonElement | null>(null);
  const rippleRef = React.useRef<TouchRippleActions | null>(null);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const {
    accountDetail,
  } = useSelector((state) => state.system);

  React.useLayoutEffect(() => {
    if (hasFocus) {
      const input = buttonElement.current?.querySelector("input");
      input?.focus();
    } else if (rippleRef.current) {
      // Only available in @mui/material v5.4.1 or later
      rippleRef.current.stop({} as any);
    }
  }, [hasFocus]);

  const onOpenAccountDetail = () => {
    dispatch(getAccountDetail({ account: row }));
    setIsOpen(true);
  };

  const handleToggleDialog = () => {
    setIsOpen((prevState) => !prevState)
    accountDetail && dispatch(clearAccountDetail());
  }

  return (
    <div>
      <IconButton aria-label="delete" onClick={onOpenAccountDetail}>
        <BorderColorIcon fontSize="small" />
      </IconButton>
      {accountDetail?.id === (row as IUser).id && <EditDialog handleToggleDialog={handleToggleDialog} isOpen={isOpen}/>}
    </div>
  );
};
