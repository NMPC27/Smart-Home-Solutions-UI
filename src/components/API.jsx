import axios from "axios";

//const endpoint = "http://127.0.0.1:8000";
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

  return axios.get(endpoint + "/cards", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": endpoint,
    },
  });
}

export function postDevices(data) {
  let token = localStorage.getItem("token");

  return axios.post(
    endpoint + "/devices",
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    },
  );
}

export function postRooms(data) {
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

export function postCards(data) {
  let token = localStorage.getItem("token");

  return axios.post(
    endpoint + "/cards",
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

export function getFiles(file, download) {
  let token = localStorage.getItem("token");

  if (download) {
    return axios.get(endpoint + `/files?file=${file}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
      responseType: "blob",
    });
  } else {
    return axios.get(endpoint + `/files?file=${file}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": endpoint,
      },
    });
  }
}
