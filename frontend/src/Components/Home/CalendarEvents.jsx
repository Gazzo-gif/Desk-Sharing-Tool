const CalendarEvents = [];

async function fetchBookings(userId) {
  const response = await fetch(`/bookings/user/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch bookings');
  }
  const bookings = await response.json();
  return bookings;
}

async function populateCalendarEvents(userId) {
  try {
    const bookings = await fetchBookings(userId);
    bookings.forEach(booking => {
      const start = new Date(booking.day + 'T' + booking.begin);
      const end = new Date(booking.day + 'T' + booking.end);
      CalendarEvents.push({
        id: booking.id, // Assuming desk id is appropriate as event id
        title: `Desk ${booking.desk.id}`, // You can customize title as needed
        start,
        end
      });
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
  }
}

// Call populateCalendarEvents with the userId
const userId = localStorage.getItem("userId");
populateCalendarEvents(userId);

export default CalendarEvents;
