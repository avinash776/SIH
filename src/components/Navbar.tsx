import {
  AcademicCapIcon,
  Bars3Icon,
  BookOpenIcon,
  HomeIcon,
  SparklesIcon,
  UserGroupIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Admin', href: '/admin', icon: UserGroupIcon },
  { name: 'Learn', href: '/learn', icon: AcademicCapIcon },
  { name: 'About', href: '/about', icon: BookOpenIcon },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
                  <SparklesIcon className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
              </div>
              
              <div className="text-gray-800">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">
                  SkillSetu
                </h1>
                <p className="text-xs text-gray-600 font-medium">Multilingual Learning</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className={`relative px-6 py-3 rounded-2xl font-semibold transition-all duration-200 flex items-center space-x-2 group ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                    
                    {/* Clean active indicator - inside the button */}
                    {isActive && (
                      <div className="ml-2 w-2 h-2 bg-white rounded-full opacity-90"></div>
                    )}
                  </Link>
                </div>
              );
            })}
            
            {/* Language Selector */}
            <div className="relative">
              <button className="flex items-center space-x-2 px-4 py-3 rounded-2xl bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
                <span className="text-lg">🌐</span>
                <span className="font-medium">EN | हिं</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-3 rounded-2xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-lg"
          >
            <div className="px-4 py-6 space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <div key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md' 
                          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                    >
                      <item.icon className="h-6 w-6" />
                      <span className="text-lg">{item.name}</span>
                      {isActive && (
                        <span className="ml-auto text-white">⚡</span>
                      )}
                    </Link>
                  </div>
                );
              })}
              
              <div className="pt-4 border-t border-gray-200">
                <button className="flex items-center space-x-3 px-4 py-3 rounded-2xl bg-gray-50 text-gray-700 w-full">
                  <span className="text-xl">🌐</span>
                  <span className="text-lg font-medium">Language: EN | हिं</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;