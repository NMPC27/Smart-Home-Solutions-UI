import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicDatePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer sx={{ marginBottom: "1vh" }} components={["DatePicker"]}>
        <DatePicker
          sx={{
            backgroundColor: "#374151",
            borderRadius: "10px",
            borderColor: "#FFFFFF",
            svg: { color: "#FFFFFF" },
            input: { color: "#FFFFFF" },
            label: { color: "#FFFFFF" },
          }}
          label="Date Picker"
          inputFormat={"dd/MM/yyyy"}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
