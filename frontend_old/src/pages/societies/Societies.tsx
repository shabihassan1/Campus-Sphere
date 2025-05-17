
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Image, ArrowRight, Search } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ConfirmModal from '@/components/common/ConfirmModal';

// Mock data
const mockSocieties = [
  {
    id: 1,
    name: 'Computer Science Society',
    description: 'A community for computer science students to share knowledge and build projects together.',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
  },
  {
    id: 2,
    name: 'Photography Club',
    description: 'Explore different photographic techniques and showcase your creativity.',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
  },
  {
    id: 3,
    name: 'Debate Society',
    description: 'Improve your public speaking and critical thinking through competitive debates.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
  },
  {
    id: 4,
    name: 'Music Society',
    description: 'For students passionate about music, performance, and composition.',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
  },
  {
    id: 5,
    name: 'Sports Club',
    description: 'Join various sports teams and participate in inter-university competitions.',
    image: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3',
  },
  {
    id: 6,
    name: 'Environmental Society',
    description: 'Work on sustainability projects and raise awareness about environmental issues.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  },
];

const Societies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [joinedSocieties, setJoinedSocieties] = useState<number[]>([]);
  const [confirmModalData, setConfirmModalData] = useState<{
    isOpen: boolean;
    societyId: number | null;
    societyName: string;
  }>({
    isOpen: false,
    societyId: null,
    societyName: '',
  });

  const handleOpenConfirmModal = (id: number, name: string) => {
    setConfirmModalData({
      isOpen: true,
      societyId: id,
      societyName: name,
    });
  };

  const handleCloseConfirmModal = () => {
    setConfirmModalData({
      isOpen: false,
      societyId: null,
      societyName: '',
    });
  };

  const handleJoinSociety = () => {
    if (confirmModalData.societyId) {
      setJoinedSocieties((prev) => [...prev, confirmModalData.societyId!]);
    }
    handleCloseConfirmModal();
  };

  const filteredSocieties = mockSocieties.filter((society) =>
    society.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageLayout
      title="Browse Societies"
      description="Discover and join student societies that match your interests."
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="relative w-full md:w-auto mb-4 md:mb-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search societies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full md:w-80"
          />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500">
            Showing {filteredSocieties.length} of {mockSocieties.length} societies
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSocieties.map((society) => (
          <div key={society.id} className="campus-card flex flex-col">
            <div className="h-48 relative overflow-hidden">
              {society.image ? (
                <img 
                  src={society.image} 
                  alt={society.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <Image className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
            <div className="p-4 flex-grow">
              <h3 className="font-semibold text-lg mb-1">{society.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{society.description}</p>
              
              <div className="mt-auto flex justify-between items-center">
                {joinedSocieties.includes(society.id) ? (
                  <Button 
                    variant="outline"
                    className="text-green-600 border-green-600 hover:bg-green-50"
                    disabled
                  >
                    <Check size={16} className="mr-1" /> Joined
                  </Button>
                ) : (
                  <Button 
                    variant="outline"
                    onClick={() => handleOpenConfirmModal(society.id, society.name)}
                  >
                    Join Society
                  </Button>
                )}
                <Link to={`/societies/${society.id}`}>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary-700">
                    View Details <ArrowRight size={16} className="ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={confirmModalData.isOpen}
        onClose={handleCloseConfirmModal}
        onConfirm={handleJoinSociety}
        title={`Join ${confirmModalData.societyName}`}
        description="Are you sure you want to join this society? You'll receive updates about meetings and events."
        confirmText="Join Society"
      />
    </PageLayout>
  );
};

export default Societies;
