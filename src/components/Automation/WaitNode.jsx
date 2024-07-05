import React, { memo } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const WaitNode = memo(({ id, isConnectable, data }) => {
  const { deleteElements } = useReactFlow();

  const [hour, setHour] = React.useState(() => {
    return data.wait.split(":")[0];
  });
  const [min, setMin] = React.useState(() => {
    return data.wait.split(":")[1];
  });
  const [sec, setSec] = React.useState(() => {
    return data.wait.split(":")[2];
  });

  const handleHourEdit = (hour) => {
    if (isNaN(hour)) {
      return;
    }

    setHour(hour);
    data.editData({ id: id, wait: hour + ":" + min + ":" + sec }, "waitData");
  };

  const handleMinEdit = (min) => {
    if (isNaN(min)) {
      return;
    }

    setMin(min);
    data.editData({ id: id, wait: hour + ":" + min + ":" + sec }, "waitData");
  };

  const handleSecEdit = (sec) => {
    if (isNaN(sec)) {
      return;
    }

    setSec(sec);
    data.editData({ id: id, wait: hour + ":" + min + ":" + sec }, "waitData");
  };

  const handleDeleteWait = (e) => {
    e.stopPropagation();
    data.clearNodeData(id, "clearNodeData");
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={{
          width: "10px",
          height: "10px",
        }}
      />
      <div>
        <b>Wait:</b>
      </div>
      <div className="nodrag" style={{ display: "flex", flexDirection: "row" }}>
        <input
          style={{
            backgroundColor: "#FFFFFF",
            color: "#000000",
            width: "25%",
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
            width: "25%",
            textAlign: "center",
            borderRadius: "20px",
            borderColor: "#000000",
          }}
          value={min}
          onChange={(e) => handleMinEdit(e.target.value)}
        />
        <b style={{ width: "10%" }}>:</b>
        <input
          style={{
            backgroundColor: "#FFFFFF",
            color: "#000000",
            width: "25%",
            textAlign: "center",
            borderRadius: "20px",
            borderColor: "#000000",
          }}
          value={sec}
          onChange={(e) => handleSecEdit(e.target.value)}
        />
      </div>
      <div className="nodrag">
        <IconButton size="small" onClick={(e) => handleDeleteWait(e)}>
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

import PropTypes from 'prop-types';

WaitNode.propTypes = {
  id: PropTypes.string.isRequired,
  isConnectable: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    wait: PropTypes.string.isRequired,
    editData: PropTypes.func.isRequired,
    clearNodeData: PropTypes.func.isRequired,
  }).isRequired,
};

WaitNode.displayName = 'WaitNode';

export default WaitNode;