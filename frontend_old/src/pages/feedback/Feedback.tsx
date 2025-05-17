
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// Mock societies list
const societies = [
  { id: 1, name: 'Computer Science Society' },
  { id: 2, name: 'Photography Club' },
  { id: 3, name: 'Debate Society' },
  { id: 4, name: 'Music Society' },
  { id: 5, name: 'Sports Club' },
  { id: 6, name: 'Environmental Society' },
];

const Feedback = () => {
  const { toast } = useToast();
  const [selectedSociety, setSelectedSociety] = useState<string | undefined>(undefined);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!selectedSociety) {
      newErrors.society = 'Please select a society';
    }
    
    if (!feedbackText.trim()) {
      newErrors.feedback = 'Feedback cannot be empty';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        toast({
          title: "Feedback submitted",
          description: "Thank you for your feedback!",
        });
        console.log('Feedback submitted:', { society: selectedSociety, feedback: feedbackText });
      }, 1000);
    }
  };

  const handleReset = () => {
    setSelectedSociety(undefined);
    setFeedbackText('');
    setIsSubmitted(false);
    setErrors({});
  };

  return (
    <PageLayout
      title="Submit Feedback"
      description="Share your thoughts and suggestions about student societies."
    >
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Feedback Submitted Successfully</h3>
          <p className="text-gray-600 mb-6 text-center max-w-md">
            Thank you for taking the time to provide feedback. Your input helps us improve our student societies.
          </p>
          <Button onClick={handleReset}>Submit Another Feedback</Button>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="society">Select Society</Label>
              <Select onValueChange={setSelectedSociety} value={selectedSociety}>
                <SelectTrigger id="society" className={errors.society ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select a society" />
                </SelectTrigger>
                <SelectContent>
                  {societies.map((society) => (
                    <SelectItem key={society.id} value={society.name}>
                      {society.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.society && <p className="mt-1 text-sm text-red-600">{errors.society}</p>}
            </div>
            
            <div>
              <Label htmlFor="feedback">Your Feedback</Label>
              <Textarea
                id="feedback"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Share your thoughts, suggestions, or experiences with this society..."
                className={`min-h-[150px] ${errors.feedback ? 'border-red-500' : ''}`}
              />
              {errors.feedback && <p className="mt-1 text-sm text-red-600">{errors.feedback}</p>}
            </div>
            
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </form>
        </div>
      )}
    </PageLayout>
  );
};

export default Feedback;
