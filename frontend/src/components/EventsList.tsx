import React, { useEffect, useState } from 'react';
import { eventsService, Event } from '../services/eventsService';

export const EventsList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await eventsService.getAllEvents();
      setEvents(data);
      setError(null);
    } catch (err) {
      setError('Failed to load events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinEvent = async (id: string) => {
    try {
      await eventsService.joinEvent(id);
      await loadEvents();
    } catch (err) {
      setError('Failed to join event. Please try again.');
    }
  };

  const handleLeaveEvent = async (id: string) => {
    try {
      await eventsService.leaveEvent(id);
      await loadEvents();
    } catch (err) {
      setError('Failed to leave event. Please try again.');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading events...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
            <p className="text-gray-600 mb-2">{event.description}</p>
            <div className="mb-2 text-sm text-gray-500">
              <span className="block">Society: {event.society?.name}</span>
              <span className="block">Date: {new Date(event.date).toLocaleString()}</span>
              <span className="block">Location: {event.location}</span>
              <span className="block">Attendees: {event.attendees?.length || 0}</span>
            </div>
            <button
              onClick={() =>
                event.attendees?.some((m) => m.id === localStorage.getItem('userId'))
                  ? handleLeaveEvent(event.id)
                  : handleJoinEvent(event.id)
              }
              className={`px-4 py-2 rounded ${
                event.attendees?.some((m) => m.id === localStorage.getItem('userId'))
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white transition-colors`}
            >
              {event.attendees?.some((m) => m.id === localStorage.getItem('userId'))
                ? 'Leave'
                : 'Join'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}; 