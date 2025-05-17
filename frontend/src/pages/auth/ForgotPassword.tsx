import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { authService } from '@/services/auth';

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState<'email' | 'question' | 'done'>('email');
  const [email, setEmail] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await authService.forgotPassword(email);
      if ('question' in res) {
        setSecurityQuestion(res.question);
        setStep('question');
      } else {
        setError(res.error || 'User not found');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to get security question');
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await authService.resetPassword(email, securityAnswer, newPassword);
      if (res.success) {
        setSuccess('Password reset successful! You can now log in.');
        setStep('done');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(res.message || 'Failed to reset password');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Forgot Password</h2>
          <p className="mt-2 text-sm text-gray-600">Reset your password using your security question.</p>
        </div>
        {step === 'email' && (
          <form className="space-y-6" onSubmit={handleEmailSubmit}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button type="submit" className="w-full">Next</Button>
          </form>
        )}
        {step === 'question' && (
          <form className="space-y-6" onSubmit={handleResetSubmit}>
            <div>
              <Label>Security Question</Label>
              <div className="bg-gray-100 rounded px-3 py-2 mb-2">{securityQuestion}</div>
            </div>
            <div>
              <Label htmlFor="securityAnswer">Your Answer</Label>
              <Input
                id="securityAnswer"
                name="securityAnswer"
                type="text"
                value={securityAnswer}
                onChange={e => setSecurityAnswer(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button type="submit" className="w-full">Reset Password</Button>
          </form>
        )}
        {step === 'done' && (
          <div className="text-green-600 text-center text-lg font-semibold">{success}</div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword; 