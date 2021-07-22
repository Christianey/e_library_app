import { TextField } from "@material-ui/core";
import React from "react";

const Textfield = (props) => {
  const {label, name, onChange, value, type, ...other} = props;
  
  return (
    <TextField
      type={type}
      label={label}
      name={name}
      onChange={onChange}
      value={value}
      {...other}
    />
  );
};

export default Textfield;
