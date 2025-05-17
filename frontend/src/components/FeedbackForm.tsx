import React, { useState, useEffect } from 'react';
import { feedbackService, CreateFeedbackDto } from '../services/feedbackService';
import { societiesService, Society } from '../services/societiesService';
import { eventsService, Event } from '../services/eventsService';

export const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<CreateFeedbackDto>({
    message: '',
    rating: undefined,
    societyId: '',
    eventId: '',
  });
  const [societies, setSocieties] = useState<Society[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    societiesService.getAllSocieties().then(setSocieties);
    eventsService.getAllEvents().then(setEvents);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const payload: CreateFeedbackDto = {
      message: formData.message,
      rating: formData.rating,
    };
    if (formData.societyId) payload.societyId = formData.societyId;
    if (formData.eventId) payload.eventId = formData.eventId;
    try {
      await feedbackService.createFeedback(payload);
      setSuccess(true);
      setFormData({ message: '', rating: undefined, societyId: '', eventId: '' });
    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rating' ? (value ? parseInt(value) : undefined) : value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Submit Feedback</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">Feedback submitted successfully!</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Target</label>
          <div className="flex gap-2">
            <select
              name="societyId"
              value={formData.societyId}
              onChange={e => setFormData(f => ({ ...f, societyId: e.target.value, eventId: '' }))}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Society</option>
              {societies.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <span className="text-gray-500">or</span>
            <select
              name="eventId"
              value={formData.eventId}
              onChange={e => setFormData(f => ({ ...f, eventId: e.target.value, societyId: '' }))}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Event</option>
              {events.map(ev => (
                <option key={ev.id} value={ev.id}>{ev.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating (optional, 1-5)</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min={1}
            max={5}
            value={formData.rating ?? ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}; 