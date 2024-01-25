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
    
    if(messages[0]){
        //no query, show everything
        res.status(200).json({ success: true, data: { payload: [...bookings] } });
    }
    else{
        //do something for queries
        res.status(400).json({ success: false, data: { error: "Server Error - we didn't do it!" } });
    }
});

bookings.get("/:id", async (req, res) => {
    const { id } = req.params;
    const oneBooking = await getOneBooking(id);
    
    if(oneBooking){
        //no query, show everything
        res.status(200).json({ success: true, data: { payload: message } });
    }
    else{
        //do something for queries
        res.status(404).json({ success: false, data: { error: "Server Error - we didn't do it!" } });
    }
});

/** post */
bookings.post("/", async (req, res) => {
    try{
        const booking = await createBooking(req.body);        
    } catch(error) {
        res.status(400).json({error: "something missing in your header"});
    }
});

/** delete */
bookings.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const booking = await deleteOneBooking(id);
    if(booking){
        res.status(200).json(booking);
    }
    else{
        res.status(404).json("wrong");
    }
});

/** page 404 */
bookings.get("*", (req, res) => {
    res.status(404).send("with incorrect id - sets status to 404 and returns error key");
});

module.exports = bookings;