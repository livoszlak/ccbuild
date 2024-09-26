import { useState } from "react";
import { useData } from "../../../contexts/DataContext";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import styles from "./DatePicker.module.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function DatePickerComponent(props) {
  const today = dayjs();
  const [firstValue, setFirstValue] = useState(today);
  const [secondValue, setSecondValue] = useState(today.add(1, "day"));
  const { updateProductDates } = useData();

  const handleFirstDateChange = (newValue) => {
    setFirstValue(newValue);
    updateProductDates(
      props.rowId,
      newValue.format("YYYY-MM-DD"),
      secondValue.format("YYYY-MM-DD")
    );
    if (newValue.isAfter(secondValue) || newValue.isSame(secondValue)) {
      const newSecondValue = newValue.add(1, "day");
      setSecondValue(newSecondValue);
      updateProductDates(
        props.rowId,
        newValue.format("YYYY-MM-DD"),
        newSecondValue.format("YYYY-MM-DD")
      );
    }
  };

  const handleSecondDateChange = (newValue) => {
    setSecondValue(newValue);
    updateProductDates(props.rowId, firstValue, newValue);
  };

  return (
    <Box className={styles.container}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={props.title1}
          value={firstValue}
          onChange={handleFirstDateChange}
          minDate={today}
          className={styles.datePicker}
          components={{
            OpenPickerIcon: CalendarTodayIcon,
          }}
        />
        <DatePicker
          label={props.title2}
          value={secondValue}
          onChange={handleSecondDateChange}
          minDate={firstValue.add(1, "day")}
          className={styles.datePicker}
          components={{
            OpenPickerIcon: CalendarTodayIcon,
          }}
        />
      </LocalizationProvider>
    </Box>
  );
}
