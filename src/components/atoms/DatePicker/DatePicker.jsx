import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import styles from "./DatePicker.module.css";

export default function DatePickerComponent(props) {
  const [firstValue, setFirstValue] = useState(dayjs());
  const [secondValue, setSecondValue] = useState(dayjs().add(1, "day"));

  const handleFirstDateChange = (newValue) => {
    setFirstValue(newValue);
    if (newValue.isAfter(secondValue) || newValue.isSame(secondValue)) {
      setSecondValue(newValue.add(1, "day"));
    }
  };

  return (
    <Box className={styles.container}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={props.title1}
          value={firstValue}
          onChange={handleFirstDateChange}
        />
        <DatePicker
          label={props.title2}
          value={secondValue}
          onChange={(newValue) => setSecondValue(newValue)}
          minDate={firstValue.add(1, "day")}
        />
      </LocalizationProvider>
    </Box>
  );
}
