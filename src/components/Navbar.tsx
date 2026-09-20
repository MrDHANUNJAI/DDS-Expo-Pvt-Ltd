import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onOpenEnquiry?: () => void;
  onOpenPortal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry, onOpenPortal }) => {
  const { currentPage, navigateTo } = useNavigation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (route: Parameters<typeof navigateTo>[0], params?: Parameters<typeof navigateTo>[1]) => {
    navigateTo(route, params);
    setMobileNavOpen(false);
  };

  const navItems = [
    { label: 'Home', route: 'home' as const },
    { label: 'Services', route: 'services' as const },
    { label: 'Gallery', route: 'gallery' as const },
    { label: 'Careers', route: 'careers' as const },
    { label: 'Team', route: 'team' as const },
    { label: 'Blog', route: 'blog' as const },
    { label: 'Contact', route: 'contact' as const },
  ];

  return (
    <>
      <header
        id="header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3' 
            : 'bg-white py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center gap-2 cursor-pointer focus:outline-none"
            aria-label="DDS Expo Home"
          >
            <BrandLogo height={38} />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6 list-none m-0 p-0">
              {navItems.map((item) => {
                const isActive = currentPage === item.route;
                return (
                  <li key={item.route}>
                    <a
                      href={`#${item.route}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.route);
                      }}
                      className={`relative py-1.5 text-[15px] font-medium transition-colors duration-200 cursor-pointer ${
                        isActive
                          ? 'text-blue-600 font-semibold'
                          : 'text-slate-600 hover:text-blue-600'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {onOpenPortal && (
              <button
                type="button"
                onClick={onOpenPortal}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-all duration-200 shadow-sm cursor-pointer"
                title="Business Portal"
              >
                <i className="bi bi-shield-lock-fill text-blue-600"></i>
                <span>ERP Portal</span>
              </button>
            )}

            {onOpenEnquiry && (
              <button
                type="button"
                onClick={onOpenEnquiry}
                className="inline-flex items-center px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                Get a Quote
              </button>
            )}
          </div>

          {/* Mobile Actions Menu Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            {onOpenPortal && (
              <button
                type="button"
                onClick={onOpenPortal}
                className="p-2 text-slate-600 hover:text-blue-600 rounded-lg border border-slate-100 bg-slate-50/50"
                aria-label="ERP Portal"
              >
                <i className="bi bi-shield-lock fs-5"></i>
              </button>
            )}

            <button
              type="button"
              className="p-2 text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors focus:outline-none"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Toggle Navigation Menu"
            >
              <i className={`bi ${mobileNavOpen ? 'bi-x' : 'bi-list'} fs-3`}></i>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileNavOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      {/* Mobile Drawer Container */}
      <div
        className={`fixed top-0 bottom-0 right-0 w-80 max-w-[85vw] bg-white z-50 shadow-2xl border-l border-slate-100 flex flex-col transition-transform duration-300 lg:hidden ${
          mobileNavOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <BrandLogo height={32} />
          <button
            type="button"
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close menu"
          >
            <i className="bi bi-x-lg fs-5"></i>
          </button>
        </div>

        {/* Drawer Menu Items */}
        <div className="flex-1 overflow-y-auto px-4 py-5">
          <ul className="flex flex-col gap-1.5 list-none m-0 p-0">
            {navItems.map((item) => {
              const isActive = currentPage === item.route;
              return (
                <li key={item.route}>
                  <a
                    href={`#${item.route}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.route);
                    }}
                    className={`flex items-center px-4 py-3 text-base font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'text-blue-600 bg-blue-50/70'
                        : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Drawer Footer Actions */}
        {onOpenEnquiry && (
          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <button
              type="button"
              onClick={() => {
                setMobileNavOpen(false);
                onOpenEnquiry();
              }}
              className="w-full flex items-center justify-center py-3 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-md transition-colors cursor-pointer"
            >
              Get a Quote
            </button>
          </div>
        )}
      </div>
    </>
  );
};
