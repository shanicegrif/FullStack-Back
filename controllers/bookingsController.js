const express = require("express");
const { getOneMeetingRoom } = require("../queries/meetingRooms");
const {
  getAllBookings,
  getOneBooking,
  deleteOneBooking,
  createBooking,
} = require("../queries/bookings");

const bookings = express.Router();

/** get */
bookings.get("/", async (req, res) => {
  const { meeting_room_id } = req.params;

  try {
    const oneMeetingRoom = await getOneMeetingRoom(meeting_room_id);
    const allBookings = await getAllBookings(meeting_room_id);
    res
      .status(200)
      .json({ success: true, data: { payload: {...oneMeetingRoom, allBookings} } });
  } catch (error) {
    //do something for queries
    res
      .status(400)
      .json({
        success: false,
        data: { error: "Server Error - Something went wrong fetching data!" },
      });
  }
});

bookings.get("/:booking_id", async (req, res) => {
  const { booking_id, meeting_room_id } = req.params;
  
  try {
    const oneBooking = await getOneBooking(booking_id);
    const oneMeetingRoom = await getOneMeetingRoom(meeting_room_id);

    if (oneBooking.id) {
      res.status(200).json({ success: true, data: { payload: {...oneMeetingRoom, oneBooking} } });
    }
  } catch (error){
    res
      .status(404)
      .json({
        success: false,
        data: { error: "Server Error - Booking not found!" },
      });
  }
});

/** post */
bookings.post("/", async (req, res) => {
  try {
    const createdBooking = await createBooking(req.body);
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(400).json({ error: "Failed to create booking!" });
  }
});

/** delete */
bookings.delete("/:booking_id", async (req, res) => {
  const { booking_id } = req.params;
  const deletedBooking = await deleteOneBooking(booking_id);

  if (deletedBooking) {
    res.status(200).json(deletedBooking);
  } else {
    res.status(404).json("No booking found at that id.");
  }
});

/** page 404 */
bookings.get("*", (req, res) => {
  res
    .status(404)
    .send("Incorrect route - sets status to 404 and returns error key");
});

module.exports = bookings;
