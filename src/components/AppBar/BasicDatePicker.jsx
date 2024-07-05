import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as React from "react";

export default function BasicDatePicker(props) {
  const [label, setLabel] = React.useState("");

  React.useEffect(() => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;

    setLabel(today);
  }, []);

  const handleDateChange = (val) => {
    setLabel("Date Picker");

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
          label={label}
          format="DD/MM/YYYY"
          onChange={(val) => handleDateChange(val)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

import PropTypes from "prop-types";

// PropTypes for BasicDatePicker component
BasicDatePicker.propTypes = {
  handleDateChange: PropTypes.func.isRequired,
};
