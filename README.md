nunocunhafinal@gmail.com

atençao o dg tem uma tese deste tipo em nome dele, pode tentar fuder

# TODO:
- tabs rename com nome antigo para editar
- onde tem tabs ao dar delete a uma tab onde n esteja da error
- delete automation and building when only one tab
- error deleting automation aplied when on diferent tab
- fix delete tabs (builfing and automation) being on +add
- por os axis com end e begining -> https://mui.com/x/react-charts/axis/ (axis subdomain)
- fix sync problem between same cards (duplicated) 

- ir um dia a fnac e experimentar o ui nos diferentes ecras
- add card power?
- ver ons e off dos nodes no building

- segmaentar rede dos devices
- add custom url to local app


- fzr cenas


- global room bug when changing from empety room to any -> never hapen again



-----
Ao mudar a cor no tele e dps a britness muda para a cor anterior 
Cenas nas luzes, color changing eyc
Scroll no tele da temp é meio bugado 
Resize automation ao clicar num node não foca certo tele


- fix delete card mobile
- lista de compras
- tempo 
- try to improve notification, not getting every 5s
- ver isto https://reactflow.dev/examples/interaction/drag-and-drop -> por outro lado fica dificil de arrastar em mobile
- can not store the token in the local storage !! vulnerability
    https://stackoverflow.com/questions/71815202/is-it-safe-and-convenient-to-store-jwt-token-in-localstorage-or-cookies-and-to-s
    https://stackoverflow.com/questions/69294536/where-to-store-jwt-token-in-react-client-side-in-secure-way

- forgot password and create account -> to be removed




- Mostrar a diferença entre o produzido e o consumido, para que seja fácil perceber se o outcome é positivo ou negativo




- tests
- PropTypes

- fix requests no building (doneishh)
- nos filtros por apenas as room onde esta aquele tipo de device
- No date picker, faz sentido poder dar um intervalo temporal -> flr com o prof (muito trabalho para o ganho -> library paga da mui)

(future work)

- 2 hubs para redundância
- empresa/organização -> ter admin com acesso a tudo e dps várias pessoas com acessos diferentes
- Voice commands feitos pelo user
- energy (future work) -> machine learning para criar algoritmos de agendamento de dispositivos

in add dialog we must define type and room associated
name is user writen
room is user writen but then associated

DB:
json
timeline
??
proprio file system

UI structure:

![alt text](UIstructure.drawio.png)

data in dashboard:

```
rooms = [ "kitchen", "bed", "ofice" ]

devices:
[
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
```

data in energy:

```
const datatmp = {
	consumption:{
		grid: [10, 2, 2, 2, 2, 2, 2, 10, 20, 30, 40, 50, 30, 30, 15, 15, 40, 40, 80, 90, 100, 60, 40, 20],
		solar: [0, 0, 0, 0, 0, 0, 10, 30, 40, 50, 60, 70, 80, 90, 120, 100, 80, 60, 30, 10, 0, 0, 0, 0],
		gas: [0, 0, 0, 0, 0, 0, 20, 40, 50, 80, 100, 70, 120, 60, 60, 80, 80, 90, 40, 30, 10, 0, 0, 0],
	},
	production: {
		solar: [0, 0, 0, 0, 0, 0, 10, 30, 40, 50, 60, 70, 80, 90, 120, 100, 80, 60, 30, 10, 0, 0, 0, 0],
		gas: [0, 0, 0, 0, 0, 0, 20, 40, 50, 80, 100, 70, 120, 60, 60, 80, 80, 90, 40, 30, 10, 0, 0, 0]
	}
}
```

"cards": {
"mobile": [
[
{"type": "Light", "room": "test", "i": "0", "x": 0, "y": 0, "w": 3, "h": 2},
{"type": "Light", "room": "test", "i": "1", "x": 0, "y": 2, "w": 3, "h": 2}
],
[
{"type": "Light", "room": "test", "i": "0", "x": 0, "y": 0, "w": 3, "h": 2},
{"type": "Light", "room": "test", "i": "1", "x": 0, "y": 2, "w": 3, "h": 2}
]
],
"tablet": [
[
{"type": "Light", "room": "test", "i": "0", "x": 0, "y": 0, "w": 3, "h": 2},
{"type": "Light", "room": "test", "i": "1", "x": 0, "y": 2, "w": 3, "h": 2}
],
[
{"type": "Light", "room": "test", "i": "0", "x": 0, "y": 0, "w": 3, "h": 2},
{"type": "Light", "room": "test", "i": "1", "x": 0, "y": 2, "w": 3, "h": 2}
]
],
"pc":[
[
{"type": "Light", "room": "test", "i": "0", "x": 0, "y": 0, "w": 3, "h": 2},
{"type": "Light", "room": "test", "i": "1", "x": 0, "y": 2, "w": 3, "h": 2}
],
[
{"type": "Light", "room": "test", "i": "0", "x": 0, "y": 0, "w": 3, "h": 2},
{"type": "Light", "room": "test", "i": "1", "x": 0, "y": 2, "w": 3, "h": 2}
]
]
}

```
"cards": [
    [
        "name": "Dashboard X",
        "mobile": [
            {"type": "Light", "room": "test", "i": "0", "x": 0, "y": 0, "w": 3, "h": 2},
            {"type": "Light", "room": "test", "i": "1", "x": 0, "y": 2, "w": 3, "h": 2}
        ],
        "tablet": [
            {"type": "Light", "room": "test", "i": "0", "x": 0, "y": 0, "w": 3, "h": 2},
            {"type": "Light", "room": "test", "i": "1", "x": 0, "y": 2, "w": 3, "h": 2}
        ],
        "pc": [
            {"type": "Light", "room": "test", "i": "0", "x": 0, "y": 0, "w": 3, "h": 2},
            {"type": "Light", "room": "test", "i": "1", "x": 0, "y": 2, "w": 3, "h": 2}
        ]
    ],
    [
        "name": "Dashboard I",
        "mobile": [
            {"type": "Light", "room": "test", "i": "0", "x": 0, "y": 0, "w": 3, "h": 2},
            {"type": "Light", "room": "test", "i": "1", "x": 0, "y": 2, "w": 3, "h": 2}
        ],
        "tablet": [
            {"type": "Light", "room": "test", "i": "0", "x": 0, "y": 0, "w": 3, "h": 2},
            {"type": "Light", "room": "test", "i": "1", "x": 0, "y": 2, "w": 3, "h": 2}
        ],
        "pc": [
            {"type": "Light", "room": "test", "i": "0", "x": 0, "y": 0, "w": 3, "h": 2},
            {"type": "Light", "room": "test", "i": "1", "x": 0, "y": 2, "w": 3, "h": 2}
        ]
    ],
]
```
