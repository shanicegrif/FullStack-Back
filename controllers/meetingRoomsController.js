const express = require("express");
const {
  getAllMeetingRooms,
  getOneMeetingRoom,
  createMeetingRoom,
} = require("../queries/meetingRooms");

const bookingsController = require("./bookingsController.js")
const meetingRooms = express.Router();

meetingRooms.use("/:meeting_room_id/bookings", bookingsController)

/** get */
meetingRooms.get("/", async (req, res) => {
  const allMeetingRooms = await getAllMeetingRooms();

  if (messages[0]) {
    //no query, show everything
    res
      .status(200)
      .json({ success: true, data: { payload: [...allMeetingRooms] } });
  } else {
    //do something for queries
    res
      .status(400)
      .json({
        success: false,
        data: { error: "Server Error - we didn't do it!" },
      });
  }
});

meetingRooms.get("/:id", async (req, res) => {
  const { id } = req.params;
  const oneMeetingRoom = await getOneMeetingRoom(id);

  if (oneMeetingRoom) {
    //no query, show everything
    res.status(200).json({ success: true, data: { payload: oneMeetingRoom } });
  } else {
    //do something for queries
    res
      .status(404)
      .json({
        success: false,
        data: { error: "Server Error - we didn't do it!" },
      });
  }
});

/** post */
meetingRooms.post("/", async (req, res) => {
  try {
    const oneMeetingRoom = await createMeetingRoom(req.body);
  } catch (error) {
    res.status(400).json({ error: "something missing in your header" });
  }
});

/** page 404 */
meetingRooms.get("*", (req, res) => {
  res
    .status(404)
    .send("with incorrect id - sets status to 404 and returns error key");
});

module.exports = meetingRooms;
