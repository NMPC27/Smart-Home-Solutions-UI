import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { PieChart } from '@mui/x-charts/PieChart';
import Stack from '@mui/material/Stack';
import { useDrawingArea } from '@mui/x-charts/hooks';


const OutItem = styled(Paper)(({ theme }) => ({
    backgroundColor: "#1F2937",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: "#FFFFFF",
    borderRadius: "20px"
  }));

const InItem = styled(Paper)(({ theme }) => ({
    backgroundColor: "#FFFFFF",
    ...theme.typography.body2,
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: "20px"
  }));

const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 30,
    fontWeight:"bold"
}));

function PieCenterLabel({ children }) {
const { width, height, left, top } = useDrawingArea();
return (
    <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
    </StyledText>
);
}

const pieColors = ["#2E96FF", "#FFA500", "#CC0000"]

const data = [
    { label: 'Grid', value: 800 },
    { label: 'Solar', value: 300 },
    { label: 'Gas', value: 300 },
];

const totalConsumption = 80.22

export default function EnergyConsumptionPie() {
  
    return (
        <OutItem elevation={5}>
            <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>Daily Consumption</h2>
            <InItem>
                <div style={{ width:"100%", height:"37.8vh"}}>
                    <PieChart
                        colors={pieColors}
                        series={[
                        {
                            paddingAngle: 5,
                            cornerRadius: 5, 
                            innerRadius: 80,
                            outerRadius: 125,
                            data,
                        },
                        ]}
                        margin={{ right: 5 }}
                        legend={{ hidden: true }}
                    >
                        <PieCenterLabel>{totalConsumption} kWh</PieCenterLabel>
                    </PieChart>
                </div>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                    {
                        data.map((item, index) => {
                            return (
                                <>
                                <div style={{ width:"2vh", height:"2vh", backgroundColor:pieColors[index]}}/>
                                <h4>{item.label}</h4>
                                </>
                            )
                        })
                    }
                </Stack>
            </InItem>
        </OutItem>
    )
}