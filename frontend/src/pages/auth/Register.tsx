import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/services/auth';

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    securityQuestion: '',
    securityAnswer: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm Password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Student ID
    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    }
    
    // Security Question
    if (!formData.securityQuestion.trim()) {
      newErrors.securityQuestion = 'Security question is required';
    }
    // Security Answer
    if (!formData.securityAnswer.trim()) {
      newErrors.securityAnswer = 'Security answer is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        await authService.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          securityQuestion: formData.securityQuestion,
          securityAnswer: formData.securityAnswer,
        });
        
        toast({
          title: "Account created!",
          description: "You've successfully registered. Please login to continue.",
        });
        
        // Redirect to login page
        navigate('/login');
      } catch (error) {
        toast({
          title: "Registration failed",
          description: error instanceof Error ? error.message : 'Please try again',
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join Campus Sphere and connect with student societies
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'border-red-500' : ''}
                disabled={isLoading}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'border-red-500' : ''}
                disabled={isLoading}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'border-red-500' : ''}
                disabled={isLoading}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
            
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'border-red-500' : ''}
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                name="studentId"
                type="text"
                value={formData.studentId}
                onChange={handleChange}
                className={errors.studentId ? 'border-red-500' : ''}
                disabled={isLoading}
              />
              {errors.studentId && <p className="mt-1 text-sm text-red-600">{errors.studentId}</p>}
            </div>
            
            <div>
              <Label htmlFor="securityQuestion">Security Question</Label>
              <Input
                id="securityQuestion"
                name="securityQuestion"
                type="text"
                value={formData.securityQuestion}
                onChange={handleChange}
                className={errors.securityQuestion ? 'border-red-500' : ''}
                disabled={isLoading}
                placeholder="E.g. What is your favorite book?"
              />
              {errors.securityQuestion && <p className="mt-1 text-sm text-red-600">{errors.securityQuestion}</p>}
            </div>
            <div>
              <Label htmlFor="securityAnswer">Security Answer</Label>
              <Input
                id="securityAnswer"
                name="securityAnswer"
                type="text"
                value={formData.securityAnswer}
                onChange={handleChange}
                className={errors.securityAnswer ? 'border-red-500' : ''}
                disabled={isLoading}
                placeholder="Answer to your security question"
              />
              {errors.securityAnswer && <p className="mt-1 text-sm text-red-600">{errors.securityAnswer}</p>}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Register'}
          </Button>
          
          <div className="text-center">
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:text-primary-700">
                Login instead
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
