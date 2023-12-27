import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DownloadIcon from "@mui/icons-material/Download";
import FolderIcon from "@mui/icons-material/Folder";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

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
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "20px",
}));

const dataTMP = [
  { id: 1, fileName: "Fotos", date: "13/09/2022", type: "folder", size: "" },
  {
    id: 2,
    fileName: "report.pdf",
    date: "12/07/2022",
    type: "pdf",
    size: "1Mb",
  },
  {
    id: 3,
    fileName: "report.pdf",
    date: "12/07/2022",
    type: "pdf",
    size: "1Mb",
  },
  {
    id: 4,
    fileName: "report.pdf",
    date: "12/07/2022",
    type: "pdf",
    size: "1Mb",
  },
  {
    id: 5,
    fileName: "report.pdf",
    date: "12/07/2022",
    type: "pdf",
    size: "1Mb",
  },
  {
    id: 6,
    fileName: "report.pdf",
    date: "12/07/2022",
    type: "pdf",
    size: "1Mb",
  },
  {
    id: 7,
    fileName: "report.pdf",
    date: "12/07/2022",
    type: "pdf",
    size: "1Mb",
  },
  {
    id: 8,
    fileName: "report.pdf",
    date: "12/07/2022",
    type: "pdf",
    size: "1Mb",
  },
];

const dataFolder = [
  { id: 0, fileName: "../", date: "", type: "", size: "" },
  {
    id: 1,
    fileName: "other fotos",
    date: "13/09/2022",
    type: "folder",
    size: "",
  },
  { id: 2, fileName: "img3213", date: "12/07/2022", type: "png", size: "3Mb" },
  { id: 3, fileName: "img3213", date: "12/07/2022", type: "png", size: "3Mb" },
  { id: 4, fileName: "img3213", date: "12/07/2022", type: "png", size: "3Mb" },
  { id: 5, fileName: "img3213", date: "12/07/2022", type: "png", size: "3Mb" },
  { id: 6, fileName: "img3213", date: "12/07/2022", type: "png", size: "3Mb" },
  { id: 7, fileName: "img3213", date: "12/07/2022", type: "png", size: "3Mb" },
  { id: 8, fileName: "img3213", date: "12/07/2022", type: "png", size: "3Mb" },
];

export default function FilesTable() {
  const [path, setPath] = React.useState("/");
  const [data, setData] = React.useState(dataTMP);

  const handleOpenFolder = (id) => {
    setPath("/Fotos");
    setData(dataFolder);
  };

  const handleGoBack = () => {
    setPath("/");
    setData(dataTMP);
  };

  const handleDownloadFile = (id) => {};

  return (
    <OutItem elevation={5}>
      <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>Files: {path}</h2>
      <InItem>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>File Name</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Size</TableCell>
              <TableCell align="right">Open</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row,idx) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">                  
                  { idx !== 0 && path !== "/" &&
                    <SubdirectoryArrowRightIcon/> 
                  }
                  {row.fileName}
                </TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">{row.size}</TableCell>
                {row.type === "folder" && (
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpenFolder(row.id)}>
                      <FolderIcon />
                    </IconButton>
                  </TableCell>
                )}
                {row.id === 0 && (
                  <TableCell align="right">
                    <IconButton onClick={() => handleGoBack()}>
                      <ArrowBackIcon />
                    </IconButton>
                  </TableCell>
                )}
                {row.type !== "folder" && row.id !== 0 && (
                  <TableCell align="right">
                    <IconButton onClick={() => handleDownloadFile(row.id)}>
                      <DownloadIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </InItem>
    </OutItem>
  );
}
