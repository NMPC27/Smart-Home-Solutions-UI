import axios from "axios";

const endpoint = "http://127.0.0.1:8000"

export function getDevices() {
  return axios.get(endpoint+'/devices', {});
}

export function getRooms() {
    return axios.get(endpoint+'/rooms', {});
}

export function getCards() {
    return axios.get(endpoint+'/cards', {});
}

export function postDevices(data) {
    return axios.post(endpoint+'/devices', {data});
}

export function postRooms(data) {
    return axios.post(endpoint+'/rooms', {data});
}

export function postCards(data) {
    return axios.post(endpoint+'/cards', {data});
}  

export function getEnergy(date) {
    return axios.get(endpoint+`/energy?date=${date}`, {});
}

export function getFiles(file, download) {
    if (download){
        return axios.get(endpoint+`/files?file=${file}`, {responseType: 'blob'});
    }else{
        return axios.get(endpoint+`/files?file=${file}`, {});
    }
}

