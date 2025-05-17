import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Image, ArrowRight, Search, Plus } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SocietiesList } from '@/components/SocietiesList';
import { CreateSocietyForm } from '@/components/CreateSocietyForm';

const Societies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

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
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          {showCreateForm ? 'Cancel' : 'Create Society'}
        </Button>
      </div>

      {showCreateForm ? (
        <CreateSocietyForm />
      ) : (
        <SocietiesList />
      )}
    </PageLayout>
  );
};

export default Societies;
