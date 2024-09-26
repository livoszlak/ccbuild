import React, { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

export default function CheckBox(props) {
  const [checked, setChecked] = useState(props.value || false);

  const handleChange = (event) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    if (props.onChange) {
      props.onChange(isChecked, isChecked ? true : false);
    }
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          size="small"
          sx={{ py: '0px'}}
          onChange={handleChange}
          checked={checked}
          name={props.name}
        />
      }
      label={
        <Typography
          sx={{
            fontSize: '14px !important',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '600',
          }}
        >
          {props.text}
        </Typography>
      }
    />
  );
}