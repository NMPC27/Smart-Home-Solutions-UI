import { LineChart } from "@mui/x-charts/LineChart";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import * as React from "react";
import Button from '@mui/material/Button';

const OutItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1F2937",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#FFFFFF",
  borderRadius: "20px",
}));

const InItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "20px",
}));

const chartColors = ["#FFA500", "#CC0000"];
const chartColorsHover = ["#D98C00", "#A60000"];
const lables = ["Solar", "Gas"];

export default function EnergyProductionChart(props) {

  const [select, setSelect] = React.useState("All");
  const [xAxis, setXAxis] = React.useState([])

  React.useEffect(() => {
    var parts = props.date.split("/");
    var startDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]), 0, 0, 0);
    let dateArray = [];

    for (let i = 0; i < 24; i++) {
      let hour = startDate.getHours() + i;
      let newDate = new Date(startDate);
      newDate.setHours(hour);
      dateArray.push(newDate);
    }

    setXAxis(dateArray)
  } , [props.date]);

  return (
    <OutItem elevation={5}>
      <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>
        Energy Production
      </h2>
      <InItem>
        <div style={{ width: "100%", height: "40vh" }}>
          <LineChart
            colors={chartColors}
            xAxis={[{ data: xAxis, label: "Hour", scaleType: "utc" }]}
            yAxis={[{ label: "kWh" }]}
            series={[
              { data: select === 'Solar' || select === 'All' ? props.production.solar : [], label: "Solar Production" },
              { data: select === 'Gas' || select === 'All' ? props.production.gas : [], label: "Gas Production" },
            ]}
            legend={{ hidden: true }}
          />
        </div>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          {lables.map((item, index) => {
            return (
              <>
                <Button 
                  onClick={() => {
                    if (select === item) {
                      setSelect("All");
                    } else {
                      setSelect(item);
                    }
                  }}
                  variant="contained" 
                  sx={{ 
                    backgroundColor: chartColors[index],
                    '&:hover': {
                      backgroundColor: chartColorsHover[index],
                    },
                  }}
                >
                  <b>{item}</b>
                </Button>
              </>
            );
          })}
        </Stack>
      </InItem>
    </OutItem>
  );
}

