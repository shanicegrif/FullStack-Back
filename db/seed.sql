\c booking_db_dev;

/*sample data into the meeting_rooms table*/
INSERT INTO meeting_rooms (name, capacity, floor) VALUES
    ('Room A', 10, 1),
    ('Room B', 8, 2),
    ('Room C', 12, 3),
    ('Room D', 6, 4),
    ('Room E', 15, 5);

/*sample data into the bookings table*/
INSERT INTO bookings (meeting_name, meeting_room_id, start_date, end_date, attendees) VALUES
    ('Meeting 1', 1, '2022-03-23T10:00:00.000Z', '2022-03-23T11:30:00.000Z', 'sam@email.com, amy@email.com'),
    ('Meeting 2', 2, '2022-03-23T14:00:00.000Z', '2022-03-23T15:30:00.000Z', 'dani@email.com, remy@email.com'),
    ('Meeting 3', 3, '2022-03-24T09:30:00.000Z', '2022-03-24T11:00:00.000Z', 'lucy@email.com'),
    ('Meeting 4', 4, '2022-03-24T13:00:00.000Z', '2022-03-24T14:30:00.000Z', 'boon@email.com'),
    ('Meeting 5', 5, '2022-03-25T11:00:00.000Z', '2022-03-25T12:30:00.000Z', 'dean@email.com, maya@email.com'),
    ('Meeting 6', 1, '2022-03-25T15:00:00.000Z', '2022-03-25T16:30:00.000Z', 'kevin@email.com'),
    ('Meeting 7', 2, '2022-03-26T10:30:00.000Z', '2022-03-26T12:00:00.000Z', 'tyler@email.com, susan@email.com'),
    ('Meeting 8', 3, '2022-03-26T14:30:00.000Z', '2022-03-26T16:00:00.000Z', 'mike@email.com'),
    ('Meeting 9', 4, '2022-03-27T09:00:00.000Z', '2022-03-27T10:30:00.000Z', 'sean@email.com, max@email.com'),
    ('Meeting 10', 5, '2022-03-27T13:30:00.000Z', '2022-03-27T15:00:00.000Z', 'andy@email.com');
