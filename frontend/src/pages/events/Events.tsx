import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { EventsList } from '@/components/EventsList';
import { CreateEventForm } from '@/components/CreateEventForm';

const Events = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <PageLayout
      title="Upcoming Events"
      description="Discover and attend events hosted by student societies."
    >
      <div className="flex justify-end mb-6">
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Cancel' : 'Create Event'}
        </Button>
      </div>
      {showCreateForm ? <CreateEventForm /> : <EventsList />}
    </PageLayout>
  );
};

export default Events;
