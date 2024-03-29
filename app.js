const express = require("express");
const cors = require("cors");
const meetingRooms = require('./controllers/meetingRoomsController.js')
const bookingsController = require("./controllers/bookingsController.js");

const app = express();

app.use(cors());
app.use(express.json());

// root
app.get("/", (request, response) => {
    response.send("Hello World!");
});

app.use("/meetingRooms", meetingRooms);
app.use("/bookings", bookingsController);

// 404 Page not found
app.get("*", (req, res) => {
    res.status(404).json({ error: "Page not found" });
});

module.exports = app;