import React from 'react';
import Navbar from './Navbar';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  title, 
  description 
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="page-container">
          {(title || description) && (
            <div className="mb-8">
              {title && <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h1>}
              {description && <p className="mt-2 text-lg text-gray-600">{description}</p>}
            </div>
          )}
          {children}
        </div>
      </main>
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Campus Sphere. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout; 