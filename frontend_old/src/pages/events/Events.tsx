
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

// Mock events data
const mockEvents = [
  {
    id: 1,
    title: 'Programming Workshop',
    date: new Date('2025-05-10T14:00:00'),
    society: 'Computer Science Society',
    description: 'Learn the basics of Python programming in this interactive workshop.',
    location: 'Tech Lab, Building B',
  },
  {
    id: 2,
    title: 'Photography Exhibition',
    date: new Date('2025-05-15T18:30:00'),
    society: 'Photography Club',
    description: 'Annual exhibition showcasing student photography work from throughout the year.',
    location: 'Arts Center Gallery',
  },
  {
    id: 3,
    title: 'Debate Competition',
    date: new Date('2025-05-12T16:00:00'),
    society: 'Debate Society',
    description: 'Inter-university debate competition with prizes for the top teams.',
    location: 'Main Auditorium',
  },
  {
    id: 4,
    title: 'Live Music Night',
    date: new Date('2025-05-20T19:00:00'),
    society: 'Music Society',
    description: 'An evening of live performances from student musicians and bands.',
    location: 'Student Union Bar',
  },
  {
    id: 5,
    title: 'Football Tournament',
    date: new Date('2025-05-18T10:00:00'),
    society: 'Sports Club',
    description: 'Five-a-side football tournament open to all students.',
    location: 'University Sports Field',
  },
  {
    id: 6,
    title: 'Campus Clean-up',
    date: new Date('2025-05-25T09:00:00'),
    society: 'Environmental Society',
    description: 'Help keep our campus beautiful by joining our monthly clean-up initiative.',
    location: 'Meet at Main Square',
  },
];

const Events = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredEvents = selectedFilter === 'all' 
    ? mockEvents
    : mockEvents.filter(event => event.society.toLowerCase().includes(selectedFilter.toLowerCase()));

  // Sort events by date
  const sortedEvents = [...filteredEvents].sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <PageLayout 
      title="Upcoming Events" 
      description="Discover and attend events hosted by student societies."
    >
      <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-none gap-2">
        <Button
          variant={selectedFilter === 'all' ? 'default' : 'outline'}
          onClick={() => setSelectedFilter('all')}
          className="whitespace-nowrap"
        >
          All Events
        </Button>
        <Button
          variant={selectedFilter === 'Computer Science' ? 'default' : 'outline'}
          onClick={() => setSelectedFilter('Computer Science')}
          className="whitespace-nowrap"
        >
          Computer Science
        </Button>
        <Button
          variant={selectedFilter === 'Photography' ? 'default' : 'outline'}
          onClick={() => setSelectedFilter('Photography')}
          className="whitespace-nowrap"
        >
          Photography
        </Button>
        <Button
          variant={selectedFilter === 'Music' ? 'default' : 'outline'}
          onClick={() => setSelectedFilter('Music')}
          className="whitespace-nowrap"
        >
          Music
        </Button>
        <Button
          variant={selectedFilter === 'Sports' ? 'default' : 'outline'}
          onClick={() => setSelectedFilter('Sports')}
          className="whitespace-nowrap"
        >
          Sports
        </Button>
      </div>

      <div className="space-y-6">
        {sortedEvents.length > 0 ? (
          sortedEvents.map((event) => (
            <div key={event.id} className="campus-card p-5">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="md:flex-shrink-0">
                  <div className="flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-lg bg-primary-50 text-primary-600">
                    <span className="text-sm font-medium">
                      {format(event.date, 'MMM')}
                    </span>
                    <span className="text-2xl font-bold">
                      {format(event.date, 'd')}
                    </span>
                  </div>
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar size={16} className="mr-1" />
                      {format(event.date, 'EEEE, MMMM d, yyyy • h:mm a')}
                    </div>
                    <div className="text-gray-600">
                      <span className="font-medium">Location:</span> {event.location}
                    </div>
                    <div className="text-primary-600 font-medium">
                      Hosted by: {event.society}
                    </div>
                  </div>
                  
                  <p className="mt-2 text-gray-600 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="mt-3">
                    <Button variant="outline" size="sm">
                      View More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No events found matching your criteria.</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Events;
