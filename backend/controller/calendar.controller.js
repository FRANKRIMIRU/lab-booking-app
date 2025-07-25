import { google } from "googleapis";

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000"
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

 export const addBookingToCalendar = async (req, res) => {

  const { name, email, date, testType } = req.body;
  if (!name || !email || !date || !testType) {
  return res.status(400).json({ success: false, message: "All fields are required." });
}

  const event = {
    summary: `Lab Test: ${testType}`,
    description: `Booked by ${name} (${email})`,
    start: {
      dateTime: new Date(date + "T09:00:00").toISOString(),
      timeZone: "Africa/Nairobi",
    },
    end: {
      dateTime: new Date(date + "T10:00:00").toISOString(),
      timeZone: "Africa/Nairobi",
    },
    attendees: [{ email: "rimirufrank@gmail.com" }],
      colorId: '5'
  };

  try {
    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });
    res.status(200).json({ success: true, eventId: response.data.id });
  } catch (err) {
  console.error("Google Calendar API Error:", err.response?.data || err.message);
  res.status(500).json({ success: false, message: err.message });
}

};
