import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FolderIcon from "@mui/icons-material/Folder";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import { getFiles } from "../API";
import fileDownload from "js-file-download";
import { Grid } from "@mui/material";

const OutItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1F2937",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: "#FFFFFF",
  borderRadius: "20px",
}));

const InItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "20px",
}));

export default function FilesTable() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [path, setPath] = React.useState("/");
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    getFiles("/").then((res) => {
      setData(res.data);
    });
  }, []);

  const handleOpenFolder = (idx) => {
    setData([]);
    let file = data[idx].fileName;

    if (path === "/") {
      setPath("/" + file);
      getFiles("/" + file).then((res) => {
        setData(res.data);
      });
    } else {
      // /ola -> /ola/file
      setPath(path + "/" + file);
      getFiles(path + "/" + file).then((res) => {
        setData(res.data);
      });
    }
  };

  const handleGoBack = () => {
    setData([]);

    let pathTMP = path.split("/");
    pathTMP.pop();

    let pathTMP2 = "";
    for (let i = 0; i < pathTMP.length; i++) {
      if (pathTMP[i] === "") {
        pathTMP2 = pathTMP2 + "/";
      } else {
        pathTMP2 = pathTMP2 + pathTMP[i];
      }
    }

    setPath(pathTMP2);
    getFiles(pathTMP2).then((res) => {
      setData(res.data);
    });
  };

  const handleDownloadFile = (idx) => {
    if (path === "/") {
      getFiles("/" + data[idx].fileName, true).then((res) => {
        fileDownload(res.data, data[idx].fileName);
      });
    } else {
      getFiles(path + "/" + data[idx].fileName, true).then((res) => {
        fileDownload(res.data, data[idx].fileName);
      });
    }
  };

  if (data === null) {
    return (
      <Skeleton variant="rounded" height="70vh" sx={{ borderRadius: "20px" }} />
    );
  } else {
    return (
      <OutItem elevation={5}>
        <Grid container>
          <Grid item xs={12}>
            <h2
              style={{
                marginTop: "1vh",
                marginBottom: "2vh",
                marginLeft: "1vw",
              }}
            >
              Files: {path}
            </h2>
          </Grid>
        </Grid>

        <InItem>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>File Name</TableCell>
                <TableCell align="right">Date</TableCell>
                {!mobile && <TableCell align="right">Type</TableCell>}
                <TableCell align="right">Size</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, idx) => (
                <TableRow
                  key={idx}
                  onClick={() => {
                    if (idx === 0 && path !== "/") {
                      handleGoBack();
                    } else if (row.type === "folder") {
                      handleOpenFolder(idx);
                    } else if (row.type !== "folder" && idx !== 0) {
                      handleDownloadFile(idx);
                    }
                  }}
                  sx={{ "&:hover": { bgcolor: "#F5F5F5" } }}
                >
                  <TableCell component="th" scope="row">
                    {idx === 0 && path !== "/" && (
                      <IconButton onClick={() => handleGoBack()}>
                        <ArrowBackIcon />
                      </IconButton>
                    )}
                    {row.type === "folder" && (
                      <IconButton onClick={() => handleOpenFolder(idx)}>
                        <FolderIcon />
                      </IconButton>
                    )}
                    {row.type !== "folder" && idx !== 0 && (
                      <IconButton onClick={() => handleDownloadFile(idx)}>
                        <InsertDriveFileIcon />
                      </IconButton>
                    )}
                    {row.fileName}
                  </TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  {!mobile && <TableCell align="right">{row.type}</TableCell>}
                  <TableCell align="right">{row.size}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InItem>
      </OutItem>
    );
  }
}
