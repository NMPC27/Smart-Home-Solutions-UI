import { memo } from "react";
import IconButton from "@mui/material/IconButton";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { useReactFlow } from "reactflow";
import DeleteIcon from "@mui/icons-material/Delete";

const HumiditySensorNode = memo(({ id, data }) => {
  const { deleteElements } = useReactFlow();

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <>
      <IconButton
        sx={{ padding: 0 }}
        onClick={() => data.openDialog(id, "Humidity Sensor")}
      >
        <WaterDropIcon fontSize="large" sx={{ color: "#D9A406" }} />
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

HumiditySensorNode.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    openDialog: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

HumiditySensorNode.displayName = 'HumiditySensorNode';

export default HumiditySensorNode;