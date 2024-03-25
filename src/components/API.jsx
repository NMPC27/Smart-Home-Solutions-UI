import axios from "axios";

// const endpoint = "http://127.0.0.1:8000";
const endpoint = "https://smart-home-solutions-api.onrender.com";

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

export function deviceAdd(data) {
  let token = localStorage.getItem("token");

  return axios.post(
    endpoint + "/devices/add",
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    },
  );
}

export function deviceEdit(data) {
  let token = localStorage.getItem("token");

  return axios.post(
    endpoint + "/devices/edit",
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    },
  );
}

export function deviceRemove(data) {
  let token = localStorage.getItem("token");

  return axios.post(
    endpoint + "/devices/remove",
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

  return axios.post(
    endpoint + "/devices/on",
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

  return axios.post(
    endpoint + "/devices/temperature/target",
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

  return axios.post(
    endpoint + "/devices/light/color",
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

  return axios.post(
    endpoint + "/devices/light/brightness",
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

  return axios.post(
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

export function roomAdd(data) {
  let token = localStorage.getItem("token");

  return axios.post(
    endpoint + "/rooms/add",
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

  return axios.post(
    endpoint + "/rooms/edit",
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

  return axios.post(
    endpoint + "/rooms/remove",
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    },
  );
}

export function dashboardAdd(data) {
  let token = localStorage.getItem("token");

  return axios.post(
    endpoint + "/dashboards/add",
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

  return axios.post(
    endpoint + "/dashboards/remove",
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    },
  );
}

export function dashboardCardAdd(data) {
  let token = localStorage.getItem("token");

  return axios.post(
    endpoint + "/dashboards/card/add",
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

  return axios.post(
    endpoint + "/dashboards/card/edit",
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

  return axios.post(
    endpoint + "/dashboards/card/remove",
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    },
  );
}

export function notificationsDelete(data) {
  let token = localStorage.getItem("token");

  return axios.post(
    endpoint + "/notifications/delete",
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
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
    endpoint + "/flows/tab/add",
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

  return axios.post(
    endpoint + "/flows/tab/edit",
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

  return axios.post(
    endpoint + "/flows/tab/remove",
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
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

  return axios.post(
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
    endpoint + "/builds/tab/add",
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

  return axios.post(
    endpoint + "/builds/tab/edit",
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

  return axios.post(
    endpoint + "/builds/tab/remove",
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
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

  return axios.post(
    endpoint + "/builds/layout/edit",
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

  return axios.post(
    endpoint + "/builds/layout/devices/edit",
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
