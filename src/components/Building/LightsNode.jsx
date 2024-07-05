import { memo } from "react";
import IconButton from "@mui/material/IconButton";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { useReactFlow } from "reactflow";
import DeleteIcon from "@mui/icons-material/Delete";

const LightsNode = memo(({ id, data }) => {
  const { deleteElements } = useReactFlow();

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <>
      <IconButton
        sx={{ padding: 0 }}
        onClick={() => data.openDialog(id, "Lights")}
      >
        <LightbulbIcon fontSize="large" sx={{ color: data.on && "#D9A406" }} />
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

LightsNode.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    openDialog: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    on: PropTypes.bool.isRequired,
  }).isRequired,
};

LightsNode.displayName = 'LightsNode';

export default LightsNode;
