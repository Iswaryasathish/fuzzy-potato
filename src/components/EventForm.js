import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from './config'; 


const EventForm = ({ onEventCreated }) => {
    const [title, setTitle] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const newEvent = {
            title,
            start,
            end,
        };
    
        try {
            const response = await axios.post(`${API_BASE_URL}/api/events`, newEvent);
            onEventCreated(response.data);
            setTitle('');
            setStart('');
            setEnd('');
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Start Date</label>
                <input
                    type="datetime-local"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>End Date</label>
                <input
                    type="datetime-local"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Create Event</button>
        </form>
    );
};

export default EventForm;
