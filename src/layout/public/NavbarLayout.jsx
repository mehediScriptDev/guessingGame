import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User2 } from 'lucide-react';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';

const NavbarLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'About', href: '/about' },
    { id: 3, name: 'Platform', href: '/platform' },
    { id: 4, name: 'AI & Innovation', href: '/ai-innovation' },
    { id: 5, name: 'Pricing', href: '/pricing' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-blue-500">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/img/logo.png" alt="Logo" className="w-40 lg:w-50" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-6 md:flex">
            {navigation.map((item) => {
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center font-medium text-white ${
                    isActive(item.href) ? 'border-b px-3 py-1' : 'px-3 py-1 hover:border-b '
                  }`}
                >
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center space-x-6 md:flex">
            {/* Additional right-side items can be added here */}
            <Link to="/auth/login" className="flex items-center text-white">
              <User2 className="mr-1 inline-block h-5 w-5" />
              Log In
            </Link>
            <Link to="/auth/register" className="text-white">
              Join Free
            </Link>
            <Link
              to="/pricing"
              className="rounded-md bg-white px-4 py-2 font-semibold text-blue-600 hover:bg-blue-100"
            >
              Purchase
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-100 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="pb-4 md:hidden">
            <div className="flex flex-col space-y-1">
              {navigation.map((item) => {
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-2 rounded-md px-3 py-2 text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-100 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
};

export default NavbarLayout;
