import { DatePicker } from "@mui/x-date-pickers";
import { useState, useEffect } from "react";
import { Grid, TextField } from "../../components/auth";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Calendar({
  availability,
  appointmentsList,
  date,
  setDate,
}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState("");
  const [workHoursRange, setWorkHoursRange] = useState(null);

  //Rango maximo de dias futuros que se puede pedir turno (30)
  const dateRange = new Date();
  dateRange.setMonth(dateRange.getMonth() + 1);

  useEffect(() => {
    setSelectedDate(null);
    setSelectedHour("");
  }, [availability, appointmentsList]);

  //Dias a deshabilitar en el calendario
  const shouldDisableDate = (date) => {
    const day = date.getDay(date);
    const availableDays = availability.map((day) => Number(day.day));
    return !availableDays.includes(day);
  };

  //Obtener array con rango de horarios
  const timeStringToMinutes = (timeStr, separator) =>
    timeStr.split(separator).reduce((h, m) => h * 60 + +m);

  const minutesToTimeString = (minutes, separator) => {
    const minutesPart = (minutes % 60).toString().padStart(2, "0");
    const hoursPart = Math.floor(minutes / 60)
      .toString()
      .padStart(2, "0");
    return hoursPart + separator + minutesPart;
  };

  function generateTimeSlots(
    startStr,
    endStr,
    periodInMinutes,
    separator = ":"
  ) {
    let startMinutes = timeStringToMinutes(startStr, separator);
    let endMinutes = timeStringToMinutes(endStr, separator);
    const oneDayInMinutes = 1440;
    if (endMinutes >= oneDayInMinutes) endMinutes = oneDayInMinutes - 1;
    if (startMinutes <= 0) startMinutes = 0;

    return Array.from(
      { length: Math.floor((endMinutes - startMinutes) / periodInMinutes) + 1 },
      (_, i) =>
        minutesToTimeString(startMinutes + i * periodInMinutes, separator)
    );
  }

  //Genera los items del menu horas segun rango horario
  function generateMenuItems(workHoursRange, interval) {
    const morning = generateTimeSlots("8:00", "12:00", interval);
    const afternoon = generateTimeSlots("14:00", "17:45", interval);

    let takenAppointmentsHours;
    const hoursToDelete = [];

    //Trae los appointments que coincidan con la fecha seleccionada
    if (selectedDate) {
      takenAppointmentsHours = appointmentsList.filter(
        (appointment) =>
          appointment.date === selectedDate.toLocaleDateString("es-ES")
      );
      takenAppointmentsHours.map((appointment) =>
        hoursToDelete.push(appointment.hour)
      );
    }

    const hoursToDeleteSet = new Set(hoursToDelete);

    //Crea la lista de horarios filtrando los que ya están tomados
    if (workHoursRange === "morning") {
      const filteredHours = morning.filter(
        (name) => !hoursToDeleteSet.has(name)
      );
      return filteredHours.map((hour) => (
        <MenuItem key={hour} value={hour}>
          {hour}
        </MenuItem>
      ));
    }
    if (workHoursRange === "afternoon") {
      const filteredHours = afternoon.filter(
        (name) => !hoursToDeleteSet.has(name)
      );
      return filteredHours.map((hour) => (
        <MenuItem key={hour} value={hour}>
          {hour}
        </MenuItem>
      ));
    }
    if (workHoursRange === "fulltime") {
      const filteredHours = [...morning, ...afternoon].filter(
        (name) => !hoursToDeleteSet.has(name)
      );
      return filteredHours.map((hour) => (
        <MenuItem key={hour} value={hour}>
          {hour}
        </MenuItem>
      ));
    }
  }

  //Time FormControl handler
  const handleHourSelect = (event) => {
    setSelectedHour(event.target.value);
    setDate({ ...date, hour: event.target.value });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Date"
            inputFormat="dd/MM/yyyy"
            renderInput={(params) => (
              <TextField sx={{ width: "100%" }} {...params} />
            )}
            value={selectedDate}
            disablePast={true}
            maxDate={dateRange}
            shouldDisableDate={shouldDisableDate}
            selectedDays={null}
            onChange={(newValue) => {
              setSelectedDate(newValue);
              const result = availability.find(
                (day) => day.day === newValue.getDay()
              );
              setWorkHoursRange(result.availability);
              setDate({
                ...date,
                date: newValue.toLocaleDateString("es-ES"),
              });
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="hour-select-label">Time</InputLabel>
            <Select
              labelId="hour-select-label"
              id="hour-simple-select"
              value={selectedHour}
              label="Time"
              onChange={handleHourSelect}
              MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
            >
              <MenuItem value={"none"}>Ninguno</MenuItem>
              {generateMenuItems(workHoursRange, 15)}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
