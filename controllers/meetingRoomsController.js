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

  if (allMeetingRooms[0]) {
    //no query, show everything
    res
      .status(200)
      .json({ success: true, data: { payload: allMeetingRooms } });
  } else {
    //do something for queries
    res
      .status(400)
      .json({
        success: false,
        data: { error: "Server Error - Something went wrong fetching data!" },
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
        data: { error: "Server Error - Meeting room not found!" },
      });
  }
});

/** post */
meetingRooms.post("/", async (req, res) => {
  try {
    const createdMeetingRoom = await createMeetingRoom(req.body);
    res.status(201).json(createdMeetingRoom)
  } catch (error) {
    res.status(400).json({ error: "Server Error - Failed to create meeting room" });
  }
});

/** page 404 */
meetingRooms.get("*", (req, res) => {
  res
    .status(404)
    .send("Incorrect route - sets status to 404 and returns error key");
});

module.exports = meetingRooms;
