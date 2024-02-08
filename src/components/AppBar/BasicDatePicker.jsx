import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicDatePicker(props) {
  const handleDateChange = (val) => {
    var dd = String(val.$D).padStart(2, "0");
    var mm = String(val.$M + 1).padStart(2, "0");
    var yyyy = val.$y;

    var date = dd + "/" + mm + "/" + yyyy;

    props.handleDateChange(date);
  };

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
          format="DD/MM/YYYY"
          onChange={(val) => handleDateChange(val)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

