const http = require("http");
const fs = require("fs");
const path = require("path");
const io = require("socket.io");

const app = http.createServer((request, response) => {
  if (request.method === "GET") {
    const filePath = path.join(__dirname, "index.html");
    readStream = fs.createReadStream(filePath);
    readStream.pipe(response);
  } else if (request.method === "POST") {
    let data = "";
    request.on("data", (chunk) => {
      data += chunk;
    });

    request.on("end", () => {
      const parsedData = JSON.parse(data);
      console.log(parsedData);
      response.writeHead(200, { "Content-Type": "json" });
      response.end(data);
    });
  } else {
    response.statusCode = 405;
    response.end();
  }
});

const socket = io(app);

let users = [];

socket.on("connection", function (socket) {
  console.log("New connection");

  socket.on("NEW_LOGIN_EVENT", (username) => {
    socket.emit("SERVER_MSG", { msg: username + " " + "зашёл в чат" });
  });

  socket.on("NEW_LOGIN_EVENT", (username) => {
    socket.broadcast.emit("NEW_CONN_EVENT", {
      msg: username + " " + "зашёл в чат",
    });
  });

  socket.on("disconnect", function (username) {
    console.log("The client disconnected");

    socket.broadcast.emit("NEW_DISCONN_EVENT", {
      msg: socket.username + " " + "вышел из чата",
    });
  });

  socket.on("ADD_USERS", (username) => {
    function addUser(username) {
      users.push({
        username: username,
      });
    }

    addUser(` ${username} `);

    users.map((username, i) => (username.id = i + 1));

    console.log(users);
  });

  socket.on("TYPING", (username) => {
    socket.broadcast.emit("SERVER_MSG", {
      msg: username + " " + "печатает сообщение",
    });
  });

  socket.on("CLIENT_MSG", (data) => {
    socket.emit("SERVER_MSG", { msg: data.msg.split("").reverse().join("") });
  });
});

app.listen(3000, "localhost");
