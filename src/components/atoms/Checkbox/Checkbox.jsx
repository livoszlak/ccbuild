import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

export default function CheckBox(props) {
  return (
    <FormControlLabel
    control={
      <Checkbox size="small" name={props.name} />
    }
    label={<Typography sx={{fontSize: '14px', fontFamily: 'Inter, sans-serif', fontWeight: 'var(--semibold)'}}>{props.text}</Typography>}
  />
  );
}