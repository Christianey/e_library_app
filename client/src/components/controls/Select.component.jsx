import { FormControl, InputLabel, Select as MuiSelect, MenuItem } from "@material-ui/core";
import React from "react";

const Select = (props) => {
  const { name, label, value, onChange, options=[], ...other } = props;
  
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      
      <MuiSelect label={label} name={name} value={value} onChange={onChange} {...other}>
        {options.map((option, i) => (
          <MenuItem value={option} key={i} name={name}>
            {option}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
