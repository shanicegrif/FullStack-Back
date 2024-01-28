const express = require("express");
const {
  getAllMeetingRooms,
  getOneMeetingRoom,
  createMeetingRoom,
} = require("../queries/meetingRooms");

const {getBookingsByRoomId} = require("../queries/bookings");
const meetingRooms = express.Router();

/** get */
meetingRooms.get("/", async (req, res) => {
  try {
    const allMeetingRooms = await getAllMeetingRooms();

    if (allMeetingRooms[0]) {
      res.status(200).json({ success: true, data: { payload: allMeetingRooms } });
    } else {
      res.status(404).json({
        success: false,
        data: { error: "No meeting rooms found!" },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      data: { error: "Server Error - Something went wrong fetching data!" },
    });
  }
});

meetingRooms.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const oneMeetingRoom = await getOneMeetingRoom(id);

    if (oneMeetingRoom) {
      res.status(200).json({ success: true, data: { payload: oneMeetingRoom } });
    } else {
      res.status(404).json({
        success: false,
        data: { error: "Meeting room not found!" },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      data: { error: "Server Error - Something went wrong fetching data!" },
    });
  }
});

meetingRooms.get("/:id/bookings", async (req, res) => {
    const {id} = req.params;
    const allBookings = await getBookingsByRoomId(id);

    if (allBookings) {
        //no query, show everything
        res.status(200).json({ success: true, data: { payload: [...allBookings] } });
      } else {
        //do something for queries
        res
          .status(404)
          .json({
            success: false,
            data: { error: "Server Error - we didn't do it!" },
          });
      }
})

/** post */
meetingRooms.post("/", async (req, res) => {
  try {
    const createdMeetingRoom = await createMeetingRoom(req.body);
    res.status(201).json({ success: true, data: { payload: createdMeetingRoom } });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: { error: "Failed to create meeting room!" },
    });
  }
});

/** page 404 */
meetingRooms.get("*", (req, res) => {
  res
    .status(404)
    .send("Incorrect route - sets status to 404 and returns error key");
});

module.exports = meetingRooms;
