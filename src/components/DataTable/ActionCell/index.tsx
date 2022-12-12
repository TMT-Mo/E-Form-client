import { Button, IconButton } from "@mui/material";
import { TouchRippleActions } from "@mui/material/ButtonBase/TouchRipple";
import { GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Link } from "react-router-dom";

export const ActionCell = (props: GridRenderCellParams<Date>) => {
  const { hasFocus, value } = props;
  const buttonElement = React.useRef<HTMLButtonElement | null>(null);
  const rippleRef = React.useRef<TouchRippleActions | null>(null);

  React.useLayoutEffect(() => {
    if (hasFocus) {
      const input = buttonElement.current?.querySelector("input");
      input?.focus();
    } else if (rippleRef.current) {
      // Only available in @mui/material v5.4.1 or later
      rippleRef.current.stop({} as any);
    }
  }, [hasFocus]);

  return (
    <div>
      <IconButton aria-label="lock" >
        <LockIcon fontSize="small"/>
      </IconButton>
      <IconButton aria-label="delete">
        <Link to='/viewDocument' replace><BorderColorIcon fontSize="small"/></Link>
      </IconButton>
    </div>
  );
};
