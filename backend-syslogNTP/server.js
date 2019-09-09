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
  device.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}

const server = http.createServer(app);
/*const io = socketIo(server);
io.on("connection", (sockets) => {
  sockets.emit(getData);
});*/

app.use(allowCrossDomain);
app.use("/api", router);
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));