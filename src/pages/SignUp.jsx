import Grid from "@mui/material/Grid";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LockIcon from "@mui/icons-material/Lock";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { signUp } from "../components/API";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignUp() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  let navigate = useNavigate();

  React.useEffect(() => {
    if (mobile) {
      document.body.style.margin = 0;
    } else {
      document.body.style.margin = "2vw";
    }
  }, [mobile]);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confPassword, setConfPassword] = React.useState("");
  const [openErrorMsg, setOpenErrorMsg] = React.useState(false); // fill all the fields!
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleSignUp = () => {
    if (name === "" || email === "" || password === "" || confPassword === "") {
      setErrorMsg("Please fill out all the fields!");
      setOpenErrorMsg(true);
      return;
    }

    if (password !== confPassword) {
      setErrorMsg("Passwords don't match!");
      setOpenErrorMsg(true);
      return;
    }

    signUp({ name, email, password }).then((res) => {
      if (res.data.status === "error") {
        setErrorMsg("Email already in use!");
        setOpenErrorMsg(true);
      } else {
        navigate("/");
      }
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSignUp();
    }
  };

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={0}
          sm={6}
          md={8}
          height="90vh"
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "20px",
          }}
        />
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              backgroundColor: "#111827",
              borderTopRightRadius: mobile ? 0 : "20px",
              borderBottomRightRadius: mobile ? 0 : "20px",
            }}
            height={mobile ? "100vh" : "100%"}
          >
            <Grid container textAlign="center">
              <Grid item xs={12} sx={{ marginTop: "5vh" }}>
                <LockIcon />
              </Grid>
              <Grid item xs={12}>
                <h2>Sign Up</h2>
              </Grid>
              <Grid item xs={12} sx={{ marginTop: "5vh" }}>
                <TextField
                  label="Name"
                  variant="outlined"
                  sx={{
                    width: "70%",
                    backgroundColor: "#374151",
                    borderRadius: "10px",
                    borderColor: "#FFFFFF",
                    svg: { color: "#FFFFFF" },
                    input: { color: "#FFFFFF" },
                    label: { color: "#FFFFFF" },
                  }}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
              </Grid>
              <Grid item xs={12} sx={{ marginTop: "5vh" }}>
                <TextField
                  label="Email"
                  variant="outlined"
                  sx={{
                    width: "70%",
                    backgroundColor: "#374151",
                    borderRadius: "10px",
                    borderColor: "#FFFFFF",
                    svg: { color: "#FFFFFF" },
                    input: { color: "#FFFFFF" },
                    label: { color: "#FFFFFF" },
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
              </Grid>
              <Grid item xs={12} sx={{ marginTop: "5vh" }}>
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  sx={{
                    width: "70%",
                    backgroundColor: "#374151",
                    borderRadius: "10px",
                    borderColor: "#FFFFFF",
                    svg: { color: "#FFFFFF" },
                    input: { color: "#FFFFFF" },
                    label: { color: "#FFFFFF" },
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
              </Grid>
              <Grid item xs={12} sx={{ marginTop: "5vh" }}>
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  sx={{
                    width: "70%",
                    backgroundColor: "#374151",
                    borderRadius: "10px",
                    borderColor: "#FFFFFF",
                    svg: { color: "#FFFFFF" },
                    input: { color: "#FFFFFF" },
                    label: { color: "#FFFFFF" },
                  }}
                  onChange={(e) => setConfPassword(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
              </Grid>
              <Grid item xs={12} sx={{ marginTop: "1vh" }}>
                <Link href="/" variant="body2">
                  Already have an account? Sign In
                </Link>
              </Grid>
              <Grid item xs={12} sx={{ marginTop: "5vh" }}>
                <Button
                  variant="contained"
                  sx={{ fontWeight: "bold" }}
                  onClick={() => handleSignUp()}
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openErrorMsg}
        autoHideDuration={6000}
        onClose={(event, reason) => {
          if (reason !== "clickaway") {
            setOpenErrorMsg(false);
          }
        }}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClose={(event, reason) => {
            if (reason !== "clickaway") {
              setOpenErrorMsg(false);
            }
          }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
