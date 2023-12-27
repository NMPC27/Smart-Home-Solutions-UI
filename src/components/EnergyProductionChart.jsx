import { LineChart } from "@mui/x-charts/LineChart";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

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
  22, 23
];

const chartColors = [ "#FFA500", "#CC0000"];
const lables = ["Solar", "Gas" ];

export default function EnergyProductionChart(props) {
  
  return (
    <OutItem elevation={5}>
      <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>
        Energy Production
      </h2>
      <InItem>
        <div style={{ width: "100%", height: "40vh" }}>
          <LineChart
            colors={chartColors}
            xAxis={[{ data: xAxis, label: "Hour" }]}
            yAxis={[{ label: "kWh" }]}
            series={[
              { data: props.production.solar, label: "Solar Production" },
              { data: props.production.gas, label: "Gas Production" },
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
                <div
                  style={{
                    width: "2vh",
                    height: "2vh",
                    backgroundColor: chartColors[index],
                  }}
                />
                <h4>{item}</h4>
              </>
            );
          })}
        </Stack>
      </InItem>
    </OutItem>
  );
}
