const SyslogServer = require("syslog-server");
const server = new SyslogServer();

server.on("message", (value) => {
    console.log(value);
});

server.on("error", (value) => {
    console.log(value);
});

server.start();