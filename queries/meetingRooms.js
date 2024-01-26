const db = require("../db/dbConfig.js");

/*
CREATE TABLE meetingRooms (
    room_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    capacity INTEGER NOT NULL,
    floor INTEGER NOT NULL
);
*/
const getAllMeetingRooms = async () => {
    try {
        const allMeetingRooms = await db.any("SELECT * FROM meeting_rooms");
        return allMeetingRooms;
    } catch(err) {
        return err;
    };
};

const getOneMeetingRoom = async (id) => {
    try{
        const meetingRoom = await db.one(`SELECT * FROM meeting_rooms WHERE room_id = ${id}`);
        return meetingRoom;
    } catch(err) {
        return err;
    };
};

const createMeetingRoom = async (item) => {
    const { name, capacity, floor } = item;
    if(!name || !capacity || !floor){
        return {error: "something is missing"};
    };
    try {
        const meetingRoom = await db.one(`INSERT INTO meeting_rooms (name, capacity, floor) 
            VALUES ($1, $2, $3) RETURNING *`, [name, capacity, floor]);
        return meetingRoom;
    } catch(err){
        return err;
    };
};

module.exports = {
    getAllMeetingRooms,
    getOneMeetingRoom,
    createMeetingRoom,
};