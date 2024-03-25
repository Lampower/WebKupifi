// Подключаем библиотеку для работы с WebSocket
const WebSocket = require("ws");
// Создаём подключение к WS

const wss = new WebSocket.Server({
  port: 8081,
});

console.log("сервер запустился");

let users = [];

wss.on("connection", function connection(ws) {
  console.log("юзер подключился");

  let user = {
    connection: ws,
  };

  users.push(user);

  console.log("юзеров в сети: " + users.length);

  let usrAmount = users.length;

  ws.on("message", function message(data) {
    console.log(`received json string: ${data}`);

    let recivedMsg = JSON.parse(data);

    if (recivedMsg.type === "massage") {
      console.log(`type: ${recivedMsg.type}`);

      console.log(`username: ${recivedMsg.username}`);

      console.log(`text from user: ${recivedMsg.text}`);

      for (let u of users) {
        u.connection.send(JSON.stringify(recivedMsg));
      }
    }

    if (recivedMsg.type === "+usr") {
      console.log(`type: ${recivedMsg.type}`);
      for (let u of users) {
        recivedMsg.type = "User Amount";
        recivedMsg.text = usrAmount;
        u.connection.send(JSON.stringify(recivedMsg));
      }
    }
  });

  ws.on("close", function close(event) {
    console.log(`closed code ${event}`);

    let id = users.indexOf(user);

    users.splice(id, 1);

    console.log("пользователей осталось: " + users.length);

    let serverMsg = {
      type: "User Amount",
      username: " ",
      text: users.length,
    };

    for (let u of users) {
      serverMsg.type = "User Amount";
      serverMsg.text = usrAmount - 1;
      u.connection.send(JSON.stringify(serverMsg));
    }
  });
});
