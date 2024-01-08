import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DownloadIcon from "@mui/icons-material/Download";
import FolderIcon from "@mui/icons-material/Folder";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import { getFiles } from "../API";
import fileDownload from 'js-file-download'
import UploadIcon from '@mui/icons-material/Upload';
import { Grid } from "@mui/material";

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


export default function FilesTable() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [path, setPath] = React.useState("/");
  const [data, setData] = React.useState(null);

  React.useEffect( () => {
    getFiles("/").then((res) => {
      setData(res.data)
    })
  },[])

  const handleOpenFolder = (idx) => {
    setData([])
    let file = data[idx].fileName

    if (path === '/'){
      setPath('/'+file);
      getFiles('/'+file).then((res) => {
        setData(res.data)
      })
    }else{ // /ola -> /ola/file
      setPath(path+'/'+file);
      getFiles(path+'/'+file).then((res) => {
        setData(res.data)
      })
    }

    
  };

  const handleGoBack = () => {
    setData([])

    
    let pathTMP = path.split("/")
    pathTMP.pop()

    let pathTMP2 = ""
    for (let i=0;i<pathTMP.length;i++){

      if ( pathTMP[i] === '' ){ 
        pathTMP2 = pathTMP2 + '/'
      }else{
        pathTMP2 = pathTMP2 + pathTMP[i]
      }

    }

    setPath(pathTMP2);
    getFiles(pathTMP2).then((res) => {
      setData(res.data)
    })
  };

  const handleDownloadFile = (idx) => {

    if ( path === "/" ){
      getFiles("/" + data[idx].fileName,true).then((res) => {
        fileDownload(res.data, data[idx].fileName)
      })
    }else{
      getFiles(path + "/" + data[idx].fileName,true).then((res) => {
        fileDownload(res.data, data[idx].fileName)
      })
    }

  };

  const handleUploadFile = () => {

  };

  if ( data === null ) {
    return (
      <Skeleton variant="rounded" height="70vh" sx={{ borderRadius:"20px" }} />
    );
  } else {
    return (
      <OutItem elevation={5}>
        
        <Grid container>
          <Grid item xs={10} sm={11} md={11.5}>
            <h2 style={{ marginTop: "1vh", marginBottom: "2vh" }}>Files: {path}</h2>
          </Grid>
          <Grid item xs={2} sm={1} md={0.5}>
            <IconButton
              onClick={() => handleUploadFile()}              
              sx={{ color: "#FFFFFF" }}
            >
                <UploadIcon fontSize="large"/>
            </IconButton>
          </Grid>
        </Grid>

        <InItem>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>File Name</TableCell>
                <TableCell align="right">Date</TableCell>
                { !mobile && <TableCell align="right">Type</TableCell> }              
                <TableCell align="right">Size</TableCell>
                <TableCell align="right">Open</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row,idx) => (
                <TableRow key={idx}>
                  <TableCell component="th" scope="row">                  
                    { idx !== 0 && path !== "/" &&
                      <SubdirectoryArrowRightIcon/> 
                    }
                    {row.fileName}
                  </TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  { !mobile && <TableCell align="right">{row.type}</TableCell> }                
                  <TableCell align="right">{row.size}</TableCell>
                  {row.type === "folder" && (
                    <TableCell align="right">
                      <IconButton onClick={() => handleOpenFolder(idx)}>
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
                      <IconButton onClick={() => handleDownloadFile(idx)}>
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
}
