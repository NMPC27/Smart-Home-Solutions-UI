import React, { memo } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const EventNode = memo(({ id, data, isConnectable }) => {
  const { deleteElements } = useReactFlow();

  const [deviceIdx, setDeviceIdx] = React.useState(0);
  const [temperature, setTemperature] = React.useState(data.temperature);
  const [humidity, setHumidity] = React.useState(data.humidity);
  const [sensor, setSensor] = React.useState(data.sensor);
  const [sinal, setSinal] = React.useState(data.sinal);

  React.useEffect(() => {
    if (data.deviceID === null) {
      return;
    }

    let idx = data.devices.findIndex((device) => device.id === data.deviceID);
    setDeviceIdx(idx);
  }, []);

  const handleChangeDevice = (event) => {
    data.editData(
      {
        id: id,
        deviceID: data.devices[event].id,
        deviceType: data.devices[event].type,
      },
      "eventData",
    );
    setDeviceIdx(event);
  };

  const handleChangeSensor = (event) => {
    data.editData({ id: id, sensor: event }, "eventData");
    setSensor(event);
  };

  const plusTemp = () => {
    if (temperature < 30) {
      data.editData({ id: id, temperature: temperature + 1 }, "eventData");
      setTemperature(temperature + 1);
    }
  };

  const minusTemp = () => {
    if (temperature > 15) {
      data.editData({ id: id, temperature: temperature - 1 }, "eventData");
      setTemperature(temperature - 1);
    }
  };

  const plusHumi = () => {
    if (humidity < 100) {
      data.editData({ id: id, humidity: humidity + 5 }, "eventData");
      setHumidity(humidity + 5);
    }
  };

  const minusHumi = () => {
    if (humidity > 0) {
      data.editData({ id: id, humidity: humidity - 5 }, "eventData");
      setHumidity(humidity - 5);
    }
  };

  const handleChangeSinal = (val) => {
    data.editData({ id: id, sinal: val }, "eventData");
    setSinal(val);
  };

  const handleDeleteEvent = (e) => {
    e.stopPropagation();
    data.clearNodeData(id, "clearNodeData");
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <>
      <div>
        <b>Event Device:</b>
      </div>
      <select
        className="nodrag"
        style={{ backgroundColor: "#FFFFFF", color: "#000000" }}
        value={deviceIdx}
        onChange={(e) => handleChangeDevice(e.target.value)}
      >
        {data.devices.map((device, idx) => {
          if (
            device.type === "Temperature Sensor" ||
            device.type === "Motion Sensor" ||
            device.type === "Humidity Sensor"
          ) {
            return (
              <option key={idx} value={idx}>
                {device.name}
              </option>
            );
          }
        })}
      </select>
      {data.devices[deviceIdx].type === "Motion Sensor" && (
        <>
          <div>
            <b>Motion:</b>
          </div>
          <select
            className="nodrag"
            style={{ backgroundColor: "#FFFFFF", color: "#000000" }}
            value={sensor}
            onChange={(e) => handleChangeSensor(e.target.value)}
          >
            <option value={"notDetected"}>Not Detected</option>
            <option value={"detected"}>Detected</option>
          </select>
        </>
      )}
      {data.devices[deviceIdx].type === "Temperature Sensor" && (
        <>
          <div>
            <b>Temperature:</b>
          </div>
          <div
            className="nodrag"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <button
              style={{ marginRight: "0.5vw" }}
              onClick={() => minusTemp()}
            >
              -
            </button>
            <input
              style={{
                backgroundColor: "#FFFFFF",
                color: "#000000",
                width: "100%",
                textAlign: "center",
                borderRadius: "20px",
                borderColor: "#000000",
              }}
              value={sinal + " " + temperature + "°C"}
              readOnly
            />
            <button style={{ marginLeft: "0.5vw" }} onClick={() => plusTemp()}>
              +
            </button>
          </div>
          <div
            className="nodrag"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <button
              style={{ marginRight: "1vw" }}
              onClick={() => handleChangeSinal("<")}
            >
              {"<"}
            </button>
            <button
              style={{ marginLeft: "1vw" }}
              onClick={() => handleChangeSinal(">")}
            >
              {">"}
            </button>
          </div>
        </>
      )}
      {data.devices[deviceIdx].type === "Humidity Sensor" && (
        <>
          <div>
            <b>Humidity:</b>
          </div>
          <div
            className="nodrag"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <button
              style={{ marginRight: "0.5vw" }}
              onClick={() => minusHumi()}
            >
              -
            </button>
            <input
              style={{
                backgroundColor: "#FFFFFF",
                color: "#000000",
                width: "100%",
                textAlign: "center",
                borderRadius: "20px",
                borderColor: "#000000",
              }}
              value={sinal + " " + humidity + "%"}
              readOnly
            />
            <button style={{ marginLeft: "0.5vw" }} onClick={() => plusHumi()}>
              +
            </button>
          </div>
          <div
            className="nodrag"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <button
              style={{ marginRight: "1vw" }}
              onClick={() => handleChangeSinal("<")}
            >
              {"<"}
            </button>
            <button
              style={{ marginLeft: "1vw" }}
              onClick={() => handleChangeSinal(">")}
            >
              {">"}
            </button>
          </div>
        </>
      )}
      <div className="nodrag">
        <IconButton size="small" onClick={(e) => handleDeleteEvent(e)}>
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

EventNode.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    devices: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })).isRequired,
    deviceID: PropTypes.string,
    temperature: PropTypes.number,
    humidity: PropTypes.number,
    sensor: PropTypes.string,
    sinal: PropTypes.string,
    editData: PropTypes.func.isRequired,
    clearNodeData: PropTypes.func.isRequired,
  }).isRequired,
  isConnectable: PropTypes.bool.isRequired,
};

EventNode.displayName = 'EventNode';

export default EventNode;