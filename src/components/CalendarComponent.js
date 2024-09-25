import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import NavigationBar from './NavigationBar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarComponent.css';
import EventForm from './EventForm';
import API_BASE_URL from './config'; 


const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
    const [events, setEvents] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        // Fetch events from the API
        fetch(`${API_BASE_URL}/api/events`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Ensure events have correct start and end as Date objects
                const formattedEvents = data.map(event => ({
                    ...event,
                    start: new Date(event.start),
                    end: new Date(event.end)
                }));
                setEvents(formattedEvents);
            })
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    const handleEventCreated = (newEvent) => {
        // Add the new event to the calendar
        setEvents([...events, {
            ...newEvent,
            start: new Date(newEvent.start),
            end: new Date(newEvent.end)
        }]);
        setShowForm(false);
    };

    return (
        <div className='pro1'>
        <NavigationBar />
        <div style={{ height: '600px' }}>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Add Event'}
            </button>
            {showForm && <EventForm onEventCreated={handleEventCreated} />}
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
            />
        </div>
        </div>
    );
};

export default CalendarComponent;
