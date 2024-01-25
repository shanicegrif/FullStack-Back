DROP DATABASE IF EXISTS booking_db_dev;
CREATE DATABASE booking_db_dev;

\c thread_db_dev;

/*
{
    "meetingName": "Scrum Standup",
    "meetinRoomId": 2,
    "startDate": "2022-03-23T17:00:00.000Z",
    "endDate": "2022-03-23T17:30:00.000Z",
    "attendees": "jdoe@email.com, bdylan@email.com"
}
*/
CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    meetingName VARCHAR(255) UNIQUE NOT NULL,
    meetingRoomId INTEGER REFERENCES meetingRooms (room_id) ON DELETE CASCADE,
    startDate TIMESTAMP NOT NULL,
    endDate TIMESTAMP NOT NULL,
    attendees TEXT
);

/*
    "name": "Meeting Room 1",
    "capacity": 3,
    "floor": 22
*/
CREATE TABLE meetingRooms (
    room_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    capacity INTEGER NOT NULL,
    floor INTEGER NOT NULL
);

