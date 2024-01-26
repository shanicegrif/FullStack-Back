const db = require("../db/dbConfig.js");

/*
CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    meetingName VARCHAR(255) UNIQUE NOT NULL,
    meeting_room_id INTEGER REFERENCES meetingRooms (room_id) ON DELETE CASCADE,
    startDate TIMESTAMP NOT NULL,
    endDate TIMESTAMP NOT NULL,
    attendees TEXT
);
*/
const getAllBookings = async () => {
    try {
        const allBookings = await db.any("SELECT * FROM bookings");
        return allBookings;
    } catch(err) {
        return err;
    };
};

const getOneBooking = async (id) => {
    try{
        const booking = await db.one(`SELECT * FROM bookings WHERE room_id = ${id}`);
        return booking;
    } catch(err) {
        return err;
    };
};

const deleteOneBooking = async (id) => {
    try {
        const booking = await db.one(`DELETE FROM bookings WHERE room_id = ${id} RETURNING *`);
        return booking;
    } catch(err){
        return err;
    };
};

const createBooking = async (item) => {
    const { meeitngName, meeting_room_id, startDate, endDate, attendees } = item;
    if(!meeitngName || !meeting_room_id || !startDate || !endDate){
        return {error: "something is missing"};
    };
    try {
        const booking = await db.one(`INSERT INTO bookings (meetingName, meeting_room_id, startDate, endDate, attendees) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`, [meeitngName, meeting_room_id, startDate, endDate, attendees]);
        return booking;
    } catch(err){
        return err;
    };
};

module.exports = {
    getAllBookings,
    getOneBooking,
    deleteOneBooking,
    createBooking,
}