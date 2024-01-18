import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1F2937",
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: "center",
  color: "#FFFFFF",
  borderRadius: "20px",
  margin: "auto",
}));

export default function NotFound() {
  let navigate = useNavigate();

  return (
    <Item>
      <br />
      <br />
      <br />
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <Button
        variant="contained"
        sx={{ fontWeight: "bold" }}
        onClick={() => navigate("/")}
      >
        Return Home
      </Button>
      <br />
      <br />
      <br />
      <br />
      <br />
    </Item>
  );
}
