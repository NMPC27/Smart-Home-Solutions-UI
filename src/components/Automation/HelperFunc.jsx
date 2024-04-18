import React from 'react';

export default function HelperFunc(props) {
  
  React.useEffect(() => {
    
    if (props.data === null) { return }
    if (props.target === null) { return }

    if (props.target === "clearNodeData") {
      props.clearNodeData(props.data,props.nodesData)
    }else if (props.target === "eventData") {
      props.eventData(props.data,props.nodesData)
    }else if (props.target === "deviceData"){
      props.deviceData(props.data,props.nodesData)
    }else if (props.target === "timeData"){
      props.timeData(props.data,props.nodesData)
    }else if (props.target === "waitData"){
      props.waitData(props.data,props.nodesData)
    }

  },[props.data,props.target])

  return ;
}
