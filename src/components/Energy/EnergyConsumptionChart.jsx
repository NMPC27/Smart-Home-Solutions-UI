import { LineChart } from "@mui/x-charts/LineChart";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import * as React from "react";

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

const xAxis = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];

const chartColors = ["#2E96FF", "#FFA500", "#CC0000"];
const chartColorsHover = ["#277FD9", "#D98C00", "#A60000"];
const lables = ["Grid", "Solar", "Gas"];

export default function EnergyConsumptionChart(props) {

  const [select, setSelect] = React.useState("All");

  return (
    <OutItem elevation={5}>
      <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>
        Energy Consumption
      </h2>
      <InItem>
        <div style={{ width: "100%", height: "40vh" }}>
          <LineChart
            colors={chartColors}
            xAxis={[{ data: xAxis, label: "Hour" }]}
            yAxis={[{ label: "kWh" }]}
            series={[
              { data: select === 'Grid' || select === 'All' ? props.consumption.grid : [], label: "Grid Consumption" },
              { data: select === 'Solar' || select === 'All' ? props.consumption.solar : [], label: "Solar Consumption" },
              { data: select === 'Gas' || select === 'All' ? props.consumption.gas : [], label: "Gas Consumption" },
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
