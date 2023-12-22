import { LineChart } from '@mui/x-charts/LineChart';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

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


const dataGrid = [10,2,2,2,2,2,2,10,20,30,40,50,30,30,15,15,40,40,80,90,100,60,40,20]

const dataSolar = [0,0,0,0,0,0,10,30,40,50,60,70,80,90,120,100,80,60,30,10,0,0,0,0]

const dataGas = [0,0,0,0,0,0,20,40,50,80,100,70,120,60,60,80,80,90,40,30,10,0,0,0]

const xAxis = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

const chartColors = ["#2E96FF", "#FFA500", "#CC0000"]

export default function EnergyConsumptionChart() {
  
    return (
        <OutItem elevation={5}>
            <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>Energy Consumption</h2>
            <InItem>
                <div style={{ width:"100%", height:"40vh"}}>
                    <LineChart
                        colors={chartColors}
                        xAxis={[
                            { data: xAxis, label: "Hour" },
                        ]}
                        yAxis={[
                            { label: "kWh" },
                        ]}
                        series={[
                            { data: dataGrid, label: "Grid Consumption" },
                            { data: dataSolar, label: "Solar Consumption" },
                            { data: dataGas, label: "Gas Consumption" },
                        ]}
                    />
                </div>
            </InItem>
        </OutItem>
    )
}