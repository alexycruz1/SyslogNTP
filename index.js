const SyslogServer = require("syslog-server");
const server = new SyslogServer();
const request = require('request');

server.on("error", (value) => {
    console.log(value)
})
server.on("message", (value) => {
    let fields = value.message.split(': ');
    let logDate = new Date(fields[1]);
    logDate.setFullYear(new Date().getFullYear());

    request.post('http://localhost:3001/api/putData', {
        form: {
            Sequence: fields[0],
            Host: value.host,
            Priority: fields[2].match(new RegExp('-([1-7])-'))[1],
            Date: logDate.toDateString(),
            Time: logDate.toTimeString(),
            Message: value.message, 
        }
    });
});

server.on("error", (value) => {
    console.log(value);
});

server.start();