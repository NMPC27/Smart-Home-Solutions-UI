import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { PieChart } from "@mui/x-charts/PieChart";
import Stack from "@mui/material/Stack";
import { useDrawingArea } from "@mui/x-charts/hooks";
import Button from '@mui/material/Button';
import * as React from "react";

const OutItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#111827",
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

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 30,
  fontWeight: "bold",
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

const pieColors = ["#2E96FF", "#FFA500", "#CC0000"];
const lables = ["Grid", "Solar", "Gas"];

export default function EnergyConsumptionPie(props) {

  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    var grid = props.consumption.grid.reduce((partialSum, a) => partialSum + a, 0);
    var solar = props.consumption.solar.reduce((partialSum, a) => partialSum + a, 0);
    var gas = props.consumption.gas.reduce((partialSum, a) => partialSum + a, 0);

    let tmp = []
    if (grid > 0) {
      tmp.push({ label: "Grid", value: grid })
    }
    if (solar > 0) {
      tmp.push({ label: "Solar", value: solar })
    }
    if (gas > 0) {
      tmp.push({ label: "Gas", value: gas })
    }

    setData(tmp);
    setTotal(grid + solar + gas)
  }, [props.consumption]);

  return (
    <OutItem elevation={5}>
      <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>
        Daily Consumption
      </h2>
      <InItem>
        <div style={{ width: "100%", height: "40vh", minHeight: "300px" }}>
          <PieChart
            colors={pieColors}
            series={[
              {
                paddingAngle: 5,
                cornerRadius: 5,
                innerRadius: 80,
                outerRadius: 120,
                data: data,
              },
            ]}
            margin={{ right: 5 }}
            legend={{ hidden: true }}
          >
            <PieCenterLabel>
              {total.toFixed(2)}{" "}kWh
            </PieCenterLabel>
          </PieChart>
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
                  disabled
                  variant="contained" 
                  sx={{ 
                    '&:disabled': {
                      backgroundColor: pieColors[index],
                      color: "#FFFFFF",
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

