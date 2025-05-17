import React, { useEffect, useState } from 'react';
import { societiesService, Society } from '../services/societiesService';
import { useToast } from '@/hooks/use-toast';

const getUserId = () => localStorage.getItem('userId');

export const SocietiesList: React.FC = () => {
  const [societies, setSocieties] = useState<Society[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [joiningSocietyId, setJoiningSocietyId] = useState<string | null>(null);
  const [editingSociety, setEditingSociety] = useState<Society | null>(null);
  const [editForm, setEditForm] = useState({ name: '', description: '', logoUrl: '', category: '' });
  const [members, setMembers] = useState<any[]>([]);
  const [showMembersSocietyId, setShowMembersSocietyId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadSocieties();
  }, []);

  const loadSocieties = async () => {
    try {
      const data = await societiesService.getAllSocieties();
      setSocieties(data);
      setError(null);
    } catch (err) {
      setError('Failed to load societies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinSociety = async (id: string, name: string) => {
    const confirmed = window.confirm('Are you sure you want to join this society? You can only leave by emailing the president.');
    if (!confirmed) return;
    setJoiningSocietyId(id);
    try {
      await societiesService.joinSociety(id);
      toast({
        title: 'Joined Society',
        description: `You have joined ${name}!`,
        duration: 3000,
      });
      await loadSocieties();
    } catch (err) {
      setError('Failed to join society. Please try again.');
    } finally {
      setJoiningSocietyId(null);
    }
  };

  const handleEditClick = (society: Society) => {
    setEditingSociety(society);
    setEditForm({
      name: society.name,
      description: society.description,
      logoUrl: society.logoUrl || '',
      category: society.category,
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSociety) return;
    try {
      await societiesService.editSociety(editingSociety.id, editForm);
      toast({ title: 'Society updated', description: 'Society details updated successfully.' });
      setEditingSociety(null);
      await loadSocieties();
    } catch (err) {
      setError('Failed to update society.');
    }
  };

  const handleShowMembers = async (societyId: string) => {
    setShowMembersSocietyId(societyId);
    try {
      const data = await societiesService.getMembers(societyId);
      setMembers(data);
    } catch (err) {
      setError('Failed to load members.');
    }
  };

  const handleRemoveMember = async (societyId: string, memberId: string) => {
    if (!window.confirm('Remove this member from the society?')) return;
    try {
      await societiesService.removeMember(societyId, memberId);
      toast({ title: 'Member removed', description: 'Member removed from society.' });
      await handleShowMembers(societyId);
      await loadSocieties();
    } catch (err) {
      setError('Failed to remove member.');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading societies...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Student Societies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {societies.map((society) => {
          const isPresident = society.president?.id === getUserId();
          return (
            <div key={society.id} className="bg-white rounded-lg shadow-lg p-8 flex flex-col justify-between min-h-[320px] transition-shadow hover:shadow-xl">
              {society.logoUrl && (
                <img
                  src={society.logoUrl}
                  alt={`${society.name} logo`}
                  className="w-full h-40 object-cover mb-6 rounded"
                />
              )}
              <h3 className="text-xl font-semibold mb-2">{society.name}</h3>
              <p className="text-gray-600 mb-6">{society.description}</p>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-sm text-gray-500">{society.category}</span>
                <span className="text-sm text-blue-600 font-semibold">{society.members?.length || 0} member{(society.members?.length || 0) === 1 ? '' : 's'}</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-auto">
                {/* Show Join button only if not president and not already a member */}
                {!(isPresident || society.members?.some((m) => m.id === getUserId())) && (
                  <button
                    onClick={() => handleJoinSociety(society.id, society.name)}
                    disabled={joiningSocietyId === society.id}
                    className={`px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed`}
                  >
                    {joiningSocietyId === society.id ? 'Joining...' : 'Join'}
                  </button>
                )}
                {/* Show Edit button and Members button only for president */}
                {isPresident && (
                  <>
                    <button
                      onClick={() => handleEditClick(society)}
                      className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleShowMembers(society.id)}
                      className="px-3 py-1 rounded bg-green-500 hover:bg-green-600 text-white text-sm"
                    >
                      Members
                    </button>
                  </>
                )}
              </div>
              {/* Members List Modal (visible only to president) */}
              {isPresident && showMembersSocietyId === society.id && (
                <div className="bg-gray-50 border rounded p-4 mt-4">
                  <h4 className="font-semibold mb-2">Members</h4>
                  <ul>
                    {members.map((member) => (
                      <li key={member.id} className="flex justify-between items-center mb-1">
                        <span>{member.name} ({member.email})</span>
                        {/* Remove button only for president and not for self */}
                        {isPresident && member.id !== getUserId() && (
                          <button
                            onClick={() => handleRemoveMember(society.id, member.id)}
                            className="px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-xs"
                          >
                            Remove
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setShowMembersSocietyId(null)} className="mt-2 text-sm text-blue-600">Close</button>
                </div>
              )}
              {/* Edit Society Modal */}
              {isPresident && editingSociety && editingSociety.id === society.id && (
                <div className="bg-gray-50 border rounded p-4 mt-4">
                  <h4 className="font-semibold mb-2">Edit Society</h4>
                  <form onSubmit={handleEditSubmit} className="space-y-2">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full border rounded px-2 py-1"
                      placeholder="Society Name"
                      required
                    />
                    <textarea
                      value={editForm.description}
                      onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                      className="w-full border rounded px-2 py-1"
                      placeholder="Description"
                      required
                    />
                    <input
                      type="text"
                      value={editForm.logoUrl}
                      onChange={e => setEditForm(f => ({ ...f, logoUrl: e.target.value }))}
                      className="w-full border rounded px-2 py-1"
                      placeholder="Logo URL"
                    />
                    <input
                      type="text"
                      value={editForm.category}
                      onChange={e => setEditForm(f => ({ ...f, category: e.target.value }))}
                      className="w-full border rounded px-2 py-1"
                      placeholder="Category"
                      required
                    />
                    <div className="flex gap-2">
                      <button type="submit" className="px-3 py-1 rounded bg-blue-500 text-white">Save</button>
                      <button type="button" onClick={() => setEditingSociety(null)} className="px-3 py-1 rounded bg-gray-400 text-white">Cancel</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}; 