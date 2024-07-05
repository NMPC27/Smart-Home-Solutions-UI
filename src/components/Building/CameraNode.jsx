import { memo } from "react";
import IconButton from "@mui/material/IconButton";
import VideocamIcon from "@mui/icons-material/Videocam";
import { useReactFlow } from "reactflow";
import DeleteIcon from "@mui/icons-material/Delete";

const CameraNode = memo(({ id, data }) => {
  const { deleteElements } = useReactFlow();

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <>
      <IconButton
        sx={{ padding: 0 }}
        onClick={() => data.openDialog(id, "Camera")}
      >
        <VideocamIcon fontSize="large" sx={{ color: data.on && "#D9A406" }} />
      </IconButton>
      <p style={{ marginTop: 0, marginBottom: 0, fontSize: "1em" }}>
        <b>{data.name}</b>
      </p>
      <div className="nodrag">
        <IconButton
          sx={{ padding: 0, marginTop: -1 }}
          onClick={(e) => handleDelete(e)}
        >
          <DeleteIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </div>
    </>
  );
});

import PropTypes from "prop-types";

CameraNode.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    openDialog: PropTypes.func.isRequired,
    on: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

CameraNode.displayName = 'CameraNode';

export default CameraNode;