// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DeviceSchema = new Schema(
  {
    Sequence: String,
    Host: String,
    Priority: String,
    Date: String,
    Time: String,
    Message: String,
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Devices", DeviceSchema);