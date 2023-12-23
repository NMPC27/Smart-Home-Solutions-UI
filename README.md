# TODO:

- - room dialog (and edit)
- - device dialog (and edit)
- lights edit button
- fix slider temperature (and put gray when off)
- do global state

in add dialog we must define type and room associated
name is user writen
room is user writen but then associated

data in dashboard:

rooms = [ "kitchen", "bed", "ofice" ]

devices: [
{
id: 1,
type: "light",
room: "kitchen",

        name: "Kitchen (user writen)",
        on: true,
        brightness: 100,
        color: "#FFFFFF"
    },
    {
        id: 2,
        type: "light",
        room: "bed",

        name: "Bedroom (user writen)",
        on: false,
        brightness: 100,
        color: "#FFFFFF"
    },
    {
        id: 3,
        type: "ac", // sensor temperature or ac
        room: "kitchen",

        name: "Kitchen",
        on: true,
        currentTemperature: 10,
        targetTemperature: 23,
    },
    {
        id: 4,
        type: "ac", // sensor temperature or ac
        room: "bed",

        name: "Bed (user writen)",
        on: false,
        currentTemperature: 7,
        targetTemperature: 20,
    },
    {
        id: 4,
        type: "ac", // sensor temperature or ac
        room: "bed",

        name: "Bed (user writen)",
        on: false,
        currentTemperature: 7,
        targetTemperature: 20,
    },
    { //! ATENÇAO NAO MT BEM DEFINIDO
        id: 5,
        type: "motionSensor", // security and can be used for ligths in automation
        room: "bed",

        name: "sensor bed (user writen)",
        on: true,
        detectedMotion: true,
    },
    {
        id: 6,
        type: "camera",
        room: "bed",

        on: false,
        name: "Hallway #2",
        endpoint: "c4.png",
    },

]
