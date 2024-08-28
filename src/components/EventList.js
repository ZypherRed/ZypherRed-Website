import React, { useEffect, useState } from 'react';
import ICAL from 'ical.js';

function EventList({ icalLink }) {
  const [events, setEvents] = useState([]);
  const [nextEvent, setNextEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(icalLink);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.text();
        const jcalData = ICAL.parse(data);
        const comp = new ICAL.Component(jcalData);
        const vevents = comp.getAllSubcomponents('vevent');
        const eventList = vevents.map(event => {
          const startDate = new ICAL.Time(event.getFirstPropertyValue('dtstart')).toJSDate();
          const summary = event.getFirstPropertyValue('summary');
          return { startDate, summary };
        });
        setEvents(eventList);

        if (eventList.length > 0) {
          const upcomingEvent = eventList.find(event => new Date() < event.startDate);
          setNextEvent(upcomingEvent);
          startCountdown(upcomingEvent ? upcomingEvent.startDate : null);
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    const startCountdown = (eventDate) => {
      const updateTimer = () => {
        const now = new Date();
        const countdownElement = document.getElementById('countdown-timer');

        if (!eventDate || now >= eventDate) {
          countdownElement.textContent = 'n/a';
          clearInterval(timerInterval);
          return;
        }

        const timeDifference = eventDate - now;

        if (timeDifference <= 0) {
          countdownElement.textContent = "Live Now!";
          clearInterval(timerInterval);
        } else {
          const hours = Math.floor(timeDifference / 1000 / 60 / 60);
          const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
          const seconds = Math.floor((timeDifference / 1000) % 60);
          countdownElement.textContent = `${hours}h ${minutes}m ${seconds}s`;
        }
      };

      updateTimer();
      const timerInterval = setInterval(updateTimer, 1000);
    };

    fetchEvents();
  }, [icalLink]);

  return (
    <div className="event-list">
      <h3>Upcoming Events</h3>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            {event.summary} - {event.startDate.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
