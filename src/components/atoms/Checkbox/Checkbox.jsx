import React, { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

export default function CheckBox(props) {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    if (props.onChange) {
      props.onChange(isChecked);
    }
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          size="small"
          onChange={handleChange}
          checked={checked}
          name={props.name}
        />
      }
      label={
        <Typography
          sx={{
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 'var(--semibold)',
          }}
        >
          {props.text}
        </Typography>
      }
    />
  );
}