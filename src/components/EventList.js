import React, { useEffect, useState } from 'react';
import ICAL from 'ical.js';
import redTwitch from '../assets/redtwitch.png';

function EventList({ icalLink }) {
  const [events, setEvents] = useState([]);
  const [nextEvent, setNextEvent] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  const today = new Date().getDate(); // Get today's day of the month

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
          const endDate = new ICAL.Time(event.getFirstPropertyValue('dtend')).toJSDate();
          const summary = event.getFirstPropertyValue('summary');
          const description = event.getFirstPropertyValue('description') || 'Unknown Game';
          return { startDate, endDate, summary, description };
        });

        // Sort events by startDate
        eventList.sort((a, b) => a.startDate - b.startDate);

        setEvents(eventList);

        if (eventList.length > 0) {
          const upcomingEvent = eventList.find(event => new Date() < event.endDate);
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
        setCurrentTime(now.toLocaleTimeString());
        const countdownElement = document.getElementById('countdown-timer');
        const eventDetailsElement = document.getElementById('event-details');

        if (!eventDate || now >= eventDate) {
          countdownElement.textContent = 'n/a';
          clearInterval(timerInterval);
          return;
        }

        const timeDifference = eventDate - now;

        if (timeDifference <= 0) {
          countdownElement.textContent = "Live Now!";
          countdownElement.classList.add("live-now");
          clearInterval(timerInterval);
        } else {
          countdownElement.classList.remove("live-now");
          const hours = Math.floor(timeDifference / 1000 / 60 / 60);
          const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
          const seconds = Math.floor((timeDifference / 1000) % 60);
          countdownElement.textContent = `${hours}h ${minutes}m ${seconds}s`;
        }

        if (nextEvent) {
          const startTime = nextEvent.startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
          const endTime = nextEvent.endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
          eventDetailsElement.textContent = `${nextEvent.summary} | ${startTime} - ${endTime} | ${nextEvent.description}`;
        }
      };

      updateTimer();
      const timerInterval = setInterval(updateTimer, 1000);
    };

    fetchEvents();
  }, [icalLink, nextEvent]);

  const renderCalendar = () => {
    const today = new Date().getDate(); // Get today's date (day of the month)
    const startDay = new Date();
    startDay.setDate(startDay.getDate() - startDay.getDay()); // Most recent Sunday

    const days = [];

    for (let i = 0; i < 14; i++) {
      const day = new Date(startDay);
      day.setDate(startDay.getDate() + i);
      const dayEvents = events.filter(event => event.startDate.toDateString() === day.toDateString());

      days.push({
        date: day,
        events: dayEvents,
        isToday: day.getDate() === today, // Compare the day of the month
      });
    }

    return (
      <div className="calendar-container">
        <table className="calendar-table">
          <thead>
            <tr>
              {days.slice(0, 7).map((day, index) => (
                <th key={index}>{day.date.toLocaleDateString('en-US', { weekday: 'long' })}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {days.slice(0, 7).map((day, index) => (
                <td key={index} className={day.isToday ? 'today' : ''}>
                  <div className="calendar-date">{day.date.getDate()}</div>
                  {day.events.map((event, i) => (
                    <div key={i} className="calendar-event">
                      <img src={redTwitch} alt="Stream Icon" className="calendar-icon" />
                      <span>{event.summary}</span>
                      <div className="calendar-time">
                        {event.startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} - {event.endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                      </div>
                    </div>
                  ))}
                </td>
              ))}
            </tr>
            <tr>
              {days.slice(7, 14).map((day, index) => (
                <td key={index} className={day.isToday ? 'today' : ''}>
                  <div className="calendar-date">{day.date.getDate()}</div>
                  {day.events.map((event, i) => (
                    <div key={i} className="calendar-event">
                      <img src={redTwitch} alt="Stream Icon" className="calendar-icon" />
                      <span>{event.summary}</span>
                      <div className="calendar-time">
                        {event.startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} - {event.endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                      </div>
                    </div>
                  ))}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <div className="subscribe-container">
          <a href={icalLink} target="_blank" rel="noopener noreferrer" className="subscribe-button">
            Subscribe to Calendar
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="schedule-container">
      <div className="time-section">
        <div id="current-time" className="current-time">
          Current Time: {currentTime}
        </div>
      </div>
      <div className="countdown-section">
        <h3 className="countdown-title2">Next Stream:</h3>
        <div id="countdown-timer" className="countdown"></div>
        <div id="event-details" className="event-details"></div>
      </div>
      <h3 className="calendar-title">Upcoming Events:</h3>
      {renderCalendar()}
    </div>
  );
}

export default EventList;
