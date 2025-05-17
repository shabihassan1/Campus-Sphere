import React, { useEffect, useState } from 'react';
import { feedbackService, Feedback } from '../services/feedbackService';

interface FeedbackListProps {
  societyId?: string;
  eventId?: string;
}

export const FeedbackList: React.FC<FeedbackListProps> = ({ societyId, eventId }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFeedbacks();
    // eslint-disable-next-line
  }, [societyId, eventId]);

  const loadFeedbacks = async () => {
    setLoading(true);
    try {
      let data: Feedback[] = [];
      if (societyId) {
        data = await feedbackService.getBySociety(societyId);
      } else if (eventId) {
        data = await feedbackService.getByEvent(eventId);
      } else {
        data = await feedbackService.getAll();
      }
      setFeedbacks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load feedback.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-4">Loading feedback...</div>;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;
  if (!feedbacks.length) return <div className="text-gray-500 text-center py-4">No feedback yet.</div>;

  return (
    <div className="space-y-4">
      {feedbacks.map(fb => (
        <div key={fb.id} className="bg-gray-50 rounded p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-800">{fb.user?.email || 'User'}</span>
            {fb.rating && <span className="ml-2 text-yellow-500">{'★'.repeat(fb.rating)}</span>}
            <span className="ml-auto text-xs text-gray-400">{new Date(fb.createdAt).toLocaleString()}</span>
          </div>
          <div className="text-gray-700">{fb.message}</div>
        </div>
      ))}
    </div>
  );
}; 