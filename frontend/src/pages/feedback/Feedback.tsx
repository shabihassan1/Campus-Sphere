import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { FeedbackForm } from '@/components/FeedbackForm';
import { FeedbackList } from '@/components/FeedbackList';
import { societiesService, Society } from '@/services/societiesService';
import { eventsService, Event } from '@/services/eventsService';

const Feedback = () => {
  const [selectedSocietyId, setSelectedSocietyId] = useState<string>('');
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [societies, setSocieties] = useState<Society[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    societiesService.getAllSocieties().then(setSocieties);
    eventsService.getAllEvents().then(setEvents);
  }, []);

  // When a society is selected, clear event selection and vice versa
  const handleSocietyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSocietyId(e.target.value);
    setSelectedEventId('');
  };
  const handleEventChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEventId(e.target.value);
    setSelectedSocietyId('');
  };

  return (
    <PageLayout
      title="Submit Feedback"
      description="Share your thoughts and suggestions about student societies or events."
    >
      <FeedbackForm />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h3 className="text-xl font-semibold mb-4">View Feedback</h3>
        <div className="flex gap-2 mb-4">
          <select
            value={selectedSocietyId}
            onChange={handleSocietyChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Societies</option>
            {societies.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <span className="text-gray-500">or</span>
          <select
            value={selectedEventId}
            onChange={handleEventChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Events</option>
            {events.map(ev => (
              <option key={ev.id} value={ev.id}>{ev.name}</option>
            ))}
          </select>
        </div>
        <FeedbackList
          societyId={selectedSocietyId || undefined}
          eventId={selectedEventId || undefined}
        />
      </div>
    </PageLayout>
  );
};

export default Feedback;
