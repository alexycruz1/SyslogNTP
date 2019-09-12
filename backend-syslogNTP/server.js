const mongoose = require("mongoose");
const getSecret = require("./secret");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const socketIo = require("socket.io");
const Device = require("./Device");
const http = require('http');

const API_PORT = 3001;
const app = express();
const router = express.Router();
let devicesSocket = {};

mongoose.connect(getSecret("dbUri"));
let db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(logger("dev"));

router.get("/", (req, res) => {
  res.json({ message: "HELLO WORLD" });
});

router.get("/getData", (req, res) => {
  Device.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post("/putData", (req, res) => {
  let device = new Device();

  const { Sequence, Host, Priority, Date, Time, Message } = req.body;

  device.Sequence = req.body.Sequence;
  device.Host = req.body.Host;
  device.Priority = req.body.Priority;
  device.Date = req.body.Date;
  device.Time = req.body.Time;
  device.Message = req.body.Message;
  device.save((err, newLog) => {
    console.log("New Log Event: ", newLog)
    if (err) return res.json({ success: false, error: err });
    let _namespace = getNamespace(newLog.Host)
    _namespace.logs.push(newLog);
    _namespace.namespace.emit("new-log", newLog);
    return res.json({ success: true });
  });
});

router.get("/listDevices", (req, res) => {
  res.json({
    devices: Object.keys(devicesSocket)
  })
});

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
  console.log("New client connected (default)", socket.id)
})
Device.find((err, data) => {
  if (err) return res.json({ success: false, error: err });
  
  for (let i = 0; i < data.length; i++) {
    let _namespace = getNamespace(data[i].Host)
    _namespace.logs.push(data[i]);
   }
});

function getNamespace(name) {
  if (!devicesSocket.hasOwnProperty(name)) {
    devicesSocket[name] = {
      logs: [],
      namespace: io.of("/" + name)
    };
    io.emit("get-devices", {
      devices: Object.keys(devicesSocket)
    })
    devicesSocket[name].namespace.on("connection", socket => {
      socket.emit("log-data", devicesSocket[name].logs)
      console.log(`New Client connected to ${name}`)
    })
  }
  return devicesSocket[name];
}

app.use(allowCrossDomain);
app.use("/api", router);
server.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));