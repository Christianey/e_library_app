import React from "react";
import { Button as MuiButton } from "@mui/material";

const Button = (props) => {
  const { text, size, variant, color, onClick, children, ...other } = props;
  return (
    <MuiButton
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
