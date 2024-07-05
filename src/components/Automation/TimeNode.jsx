import React, { memo } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const TimeNode = memo(({ id, isConnectable, data }) => {
  const { deleteElements } = useReactFlow();

  const [hour, setHour] = React.useState(() => {
    return data.time.split(":")[0];
  });
  const [min, setMin] = React.useState(() => {
    return data.time.split(":")[1];
  });

  const handleHourEdit = (hour) => {
    if (hour < 0 || hour > 23) {
      return;
    }

    setHour(hour);
    data.editData({ id: id, time: hour + ":" + min }, "timeData");
  };

  const handleMinEdit = (min) => {
    if (min < 0 || min > 59) {
      return;
    }

    setMin(min);
    data.editData({ id: id, time: hour + ":" + min }, "timeData");
  };

  const handleDeleteTime = (e) => {
    e.stopPropagation();
    data.clearNodeData(id, "clearNodeData");
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <>
      <div>
        <b>Time:</b>
      </div>
      <div className="nodrag" style={{ display: "flex", flexDirection: "row" }}>
        <input
          style={{
            backgroundColor: "#FFFFFF",
            color: "#000000",
            width: "45%",
            textAlign: "center",
            borderRadius: "20px",
            borderColor: "#000000",
          }}
          value={hour}
          onChange={(e) => handleHourEdit(e.target.value)}
        />
        <b style={{ width: "10%" }}>:</b>
        <input
          style={{
            backgroundColor: "#FFFFFF",
            color: "#000000",
            width: "45%",
            textAlign: "center",
            borderRadius: "20px",
            borderColor: "#000000",
          }}
          value={min}
          onChange={(e) => handleMinEdit(e.target.value)}
        />
      </div>
      <div className="nodrag">
        <IconButton size="small" onClick={(e) => handleDeleteTime(e)}>
          <DeleteIcon />
        </IconButton>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        style={{
          width: "10px",
          height: "10px",
        }}
      />
    </>
  );
});

import PropTypes from "prop-types";

TimeNode.propTypes = {
  id: PropTypes.string.isRequired,
  isConnectable: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    time: PropTypes.string.isRequired,
    editData: PropTypes.func.isRequired,
    clearNodeData: PropTypes.func.isRequired,
  }).isRequired,
};

TimeNode.displayName = "TimeNode";

export default TimeNode;
