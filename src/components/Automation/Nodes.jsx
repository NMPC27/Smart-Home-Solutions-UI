import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
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

export default function Nodes(props) {
    return (
      <OutItem elevation={5}>
        <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>
          Nodes
        </h2>
        <InItem>
        
        <Button variant="contained">Event</Button>
        <Button variant="contained">Wait until</Button>
        <Button variant="contained">Device</Button>
        <Button variant="contained">Time</Button>
        <Button variant="contained">API</Button>

        </InItem>
      </OutItem>
    );
}