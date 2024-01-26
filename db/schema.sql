DROP DATABASE IF EXISTS booking_db_dev;
CREATE DATABASE booking_db_dev;

\c booking_db_dev;


/*
    "name": "Meeting Room 1",
    "capacity": 3,
    "floor": 22
*/
CREATE TABLE meeting_rooms (
    room_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    capacity INTEGER NOT NULL,
    floor INTEGER NOT NULL
);

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
    meeting_name VARCHAR(255) UNIQUE NOT NULL,
    meeting_room_id INTEGER REFERENCES meeting_rooms (room_id) ON DELETE CASCADE,
    startDate TIMESTAMP NOT NULL,
    endDate TIMESTAMP NOT NULL,
    attendees TEXT
);


