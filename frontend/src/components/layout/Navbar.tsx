import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Book, Calendar, MessageSquare, LogIn, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMainPage = location.pathname === '/';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // In a real app, you would clear authentication tokens here
    localStorage.removeItem('token');
    navigate('/');
  };

  const navItems = [
    { name: 'Browse Societies', path: '/societies', icon: Book },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Feedback', path: '/feedback', icon: MessageSquare },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-700 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">CS</span>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">Campus Sphere</span>
              </Link>
            </div>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            {!isMainPage && navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 flex items-center"
              >
                <item.icon className="mr-1.5 h-4 w-4" />
                {item.name}
              </Link>
            ))}
            {isMainPage ? (
              <div className="flex space-x-4">
                <Link to="/login">
                  <Button variant="outline" className="flex items-center">
                    <LogIn className="mr-1.5 h-4 w-4" />
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="default" className="flex items-center bg-primary-600 hover:bg-primary-700">
                    <User className="mr-1.5 h-4 w-4" />
                    Register
                  </Button>
                </Link>
              </div>
            ) : (
              <Button variant="outline" className="ml-4 flex items-center" onClick={handleLogout}>
                <LogIn className="mr-1.5 h-4 w-4" />
                Logout
              </Button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {!isMainPage && navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="mr-1.5 h-4 w-4" />
                {item.name}
              </Link>
            ))}
            {isMainPage ? (
              <>
                <Link 
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn className="mr-1.5 h-4 w-4" />
                  Login
                </Link>
                <Link 
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="mr-1.5 h-4 w-4" />
                  Register
                </Link>
              </>
            ) : (
              <button 
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 flex items-center"
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
              >
                <LogIn className="mr-1.5 h-4 w-4" />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 