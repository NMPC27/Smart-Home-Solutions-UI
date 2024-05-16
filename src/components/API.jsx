import axios from "axios";

// const endpoint = "http://127.0.0.1:8000";
const endpoint = "https://likely-eve-nuno.koyeb.app";

export function doLogin(email, password) {
  const form_data = new FormData();

  form_data.append("username", email);
  form_data.append("password", password);

  return axios.post(endpoint + "/token", form_data, {
    headers: { "Access-Control-Allow-Origin": endpoint },
  });
}

export function signUp(data) {
  return axios.post(endpoint + "/signUp", data, {
    headers: { "Access-Control-Allow-Origin": endpoint },
  });
}

export function getDevices() {
  let token = localStorage.getItem("token");

  return axios.get(endpoint + "/devices", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": endpoint,
    },
  });
}

export function getRooms() {
  let token = localStorage.getItem("token");

  return axios.get(endpoint + "/rooms", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": endpoint,
    },
  });
}

export function getCards() {
  let token = localStorage.getItem("token");

  return axios.get(endpoint + "/dashboards", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": endpoint,
    },
  });
}

export function getNotifications() {
  let token = localStorage.getItem("token");

  return axios.get(endpoint + "/notifications", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": endpoint,
    },
  });
}

export function deviceEdit(data) {
  let token = localStorage.getItem("token");

  return axios.put(
    endpoint + "/devices/"+data.id,
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    },
  );
}

export function deviceOn(data) {
  let token = localStorage.getItem("token");

  return axios.put(
    endpoint + "/devices/on/"+data.id,
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    },
  );
}

export function deviceTemperatureTarget(data) {
  let token = localStorage.getItem("token");

  return axios.put(
    endpoint + "/devices/temperature/"+data.id,
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    },
  );
}

export function deviceLightColor(data) {
  let token = localStorage.getItem("token");

  return axios.put(
    endpoint + "/devices/light/color/"+data.id,
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    },
  );
}

export function deviceLightBrightness(data) {
  let token = localStorage.getItem("token");

  return axios.put(
    endpoint + "/devices/light/brightness/"+data.id,
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    },
  );
}

export function deviceAlarm(data) {
  let token = localStorage.getItem("token");

  return axios.put(
    endpoint + "/devices/alarm",
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    },
  );
}

export function getSensor(id) {
  let token = localStorage.getItem("token");

  return axios.get(endpoint + `/devices/sensor?id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": endpoint,
    },
  });
}

export function getCamImg(id) {
  let token = localStorage.getItem("token");

  return axios.get(endpoint + `/devices/cam?id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": endpoint,
    },
  });
}

export function roomAdd(data) {
  let token = localStorage.getItem("token");

  return axios.post(
    endpoint + "/rooms",
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    },
  );
}

export function roomEdit(data) {
  let token = localStorage.getItem("token");

  return axios.put(
    endpoint + "/rooms/"+data.id,
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    },
  );
}

export function roomRemove(data) {
  let token = localStorage.getItem("token");

  return axios.delete(
    endpoint + "/rooms/"+data.id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
      data: { data }
    },
  );
}

export function dashboardAdd(data) {
  let token = localStorage.getItem("token");

  return axios.post(
    endpoint + "/dashboards",
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    },
  );
}

export function dashboardRemove(data) {
  let token = localStorage.getItem("token");

  return axios.delete(
    endpoint + "/dashboards/"+data.tab,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
      data: { data }
    },
  );
}

export function dashboardCardAdd(data) {
  let token = localStorage.getItem("token");

  return axios.post(
    endpoint + "/dashboards/card",
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    },
  );
}

export function dashboardCardEdit(data) {
  let token = localStorage.getItem("token");

  return axios.put(
    endpoint + "/dashboards/card",
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    },
  );
}

export function dashboardCardRemove(data) {
  let token = localStorage.getItem("token");

  return axios.delete(
    endpoint + "/dashboards/card/"+data.idx,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
      data: { data },
    },
  );
}

export function notificationsDelete(data) {
  let token = localStorage.getItem("token");

  return axios.delete(
    endpoint + "/notifications",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
      data: { data },
    },
  );
}

export function getFlowTabs(date) {
  let token = localStorage.getItem("token");

  return axios.get(endpoint + "/flows/tabs", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": endpoint,
    },
  });
}


export function flowTabAdd(data) {
  let token = localStorage.getItem("token");

  return axios.post(
    endpoint + "/flows/tabs",
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    },
  );
}

export function flowTabEdit(data) {
  let token = localStorage.getItem("token");

  return axios.put(
    endpoint + "/flows/tabs/"+data.idx,
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    },
  );
}

export function flowTabRemove(data) {
  let token = localStorage.getItem("token");

  return axios.delete(
    endpoint + "/flows/tabs/"+data.idx,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
      data: { data }
    },
  );
}

export function getFlowNodes() {
  let token = localStorage.getItem("token");

  return axios.get(endpoint + "/flows/nodes", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": endpoint,
    },
  });
}

export function getFlowEdges() {
  let token = localStorage.getItem("token");

  return axios.get(endpoint + "/flows/edges", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": endpoint,
    },
  });
}

export function flowEdit(data) {
  let token = localStorage.getItem("token");

  return axios.put(
    endpoint + "/flows/edit",
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    },
  );
}

export function getNodesData() {
  let token = localStorage.getItem("token");

  return axios.get(endpoint + "/flows/nodesData", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": endpoint,
    },
  });
}

export function nodesDataAdd(data) {
  let token = localStorage.getItem("token");

  return axios.post(
    endpoint + "/flows/nodesData",
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    },
  );
}

export function nodesDataEdit(data) {
  let token = localStorage.getItem("token");

  return axios.put(
    endpoint + "/flows/nodesData/"+data.nodeData.id,
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    },
  );
}

export function nodesDataRemove(data) {
  let token = localStorage.getItem("token");

  return axios.delete(
    endpoint + "/flows/nodesData/"+data.idx,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
      data: { data }
    },
  );
}

export function applyFlow(data) {
  let token = localStorage.getItem("token");

  return axios.post(
    endpoint + "/flows/apply",
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    },
  );
}

export function getBuildTabs() {
  let token = localStorage.getItem("token");

  return axios.get(endpoint + "/builds/tabs", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": endpoint,
    },
  });
}

export function buildTabAdd(data) {
  let token = localStorage.getItem("token");

  return axios.post(
    endpoint + "/builds/tabs",
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    },
  );
}

export function buildTabEdit(data) {
  let token = localStorage.getItem("token");

  return axios.put(
    endpoint + "/builds/tabs/"+data.idx,
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    },
  );
}

export function buildTabRemove(data) {
  let token = localStorage.getItem("token");

  return axios.delete(
    endpoint + "/builds/tabs/"+data.idx,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
      data: { data }
    },
  );
}

export function getBuildHouseLayout() {
  let token = localStorage.getItem("token");

  return axios.get(endpoint + "/builds/layout", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": endpoint,
    },
  });
}

export function buildsHouseLayoutEdit(data) {
  let token = localStorage.getItem("token");

  return axios.put(
    endpoint + "/builds/layout/"+data.idx,
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    },
  );
}

export function getBuildsHouseLayoutDevices() {
  let token = localStorage.getItem("token");

  return axios.get(endpoint + "/builds/layout/devices", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": endpoint,
    },
  });
}

export function buildsHouseLayoutDevicesEdit(data) {
  let token = localStorage.getItem("token");

  return axios.put(
    endpoint + "/builds/layout/devices/"+data.idx,
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    },
  );
}

export function getEnergy(date) {
  let token = localStorage.getItem("token");

  return axios.get(endpoint + `/energy?date=${date}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": endpoint,
    },
  });
}

export function getHistory(date) {
  let token = localStorage.getItem("token");

  return axios.get(endpoint + `/history?date=${date}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": endpoint,
    },
  });
}
