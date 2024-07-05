import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import * as React from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#111827",
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: "center",
  color: "#FFFFFF",
  borderRadius: "20px",
}));

export default function NotFound() {
  let navigate = useNavigate();

  const [imgIdx] = React.useState(() => {
    return Math.floor(Math.random() * 100);
  });

  return (
    <div
      style={{
        width: "90vw",
        height: "90vh",
        backgroundImage: `url(${imgIdx}.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Item>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <Button
          variant="contained"
          sx={{ fontWeight: "bold" }}
          onClick={() => navigate("/")}
        >
          Return Home
        </Button>
      </Item>
    </div>
  );
}
