const express = require("express");
const {
  getAllBookings,
  getOneBooking,
  deleteOneBooking,
  createBooking,
} = require("../queries/bookings");

const bookings = express.Router();

/** get */
bookings.get("/", async (req, res) => {
  const allBookings = await getAllBookings();
    
  if (allBookings) {
    //no query, show everything
    res
      .status(200)
      .json({ success: true, data: { payload: [...allBookings] } });
  } else {
    //do something for queries
    res
      .status(400)
      .json({
        success: false,
        data: { error: "Server Error - Something went wrong w/ fetching data!" },
      });
  }
});

bookings.get("/:booking_id", async (req, res) => {
  const { booking_id } = req.params;
  const oneBooking = await getOneBooking(booking_id);

  if (oneBooking) {
    //no query, show everything
    res.status(200).json({ success: true, data: { payload: oneBooking } });
  } else {
    //do something for queries
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
    const booking = await createBooking(req.body);
  } catch (error) {
    res.status(400).json({ error: "Failed to create booking!" });
  }
});

/** delete */
bookings.delete("/:booking_id", async (req, res) => {
  const { booking_id } = req.params;
  const booking = await deleteOneBooking(booking_id);
  
  if (booking) {
    res.status(200).json(booking);
  } else {
    res.status(404).json({error : "No booking found at that id."});
  }
});

/** page 404 */
bookings.get("*", (req, res) => {
  res
    .status(404)
    .send("with incorrect id - sets status to 404 and returns error key");
});

module.exports = bookings;
