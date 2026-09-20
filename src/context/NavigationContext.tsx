import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PageRoute } from '../types';

interface NavigationContextType {
  currentPage: PageRoute;
  pageParams: Record<string, string>;
  navigateTo: (page: PageRoute, params?: Record<string, string>) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

const PAGE_TITLES: Record<PageRoute, string> = {
  home: 'DDS Expo | Unified AI Digital Solutions & Creative Agency',
  about: 'About Us | DDS Expo Leadership, Mission & AI Capabilities',
  services: 'Our Services & Pricing | DDS Expo Digital Solutions',
  features: 'Features & Why DDS Expo | AI-Driven Enterprise Performance',
  testimonials: 'Client Success Stories & Testimonials | DDS Expo Verified Reviews',
  team: 'Leadership & Team | Meet the Innovators at DDS Expo',
  blog: 'Digital Insights & Blog | AI Trends & Growth Strategies',
  gallery: 'Work Gallery & Portfolio | Commercial Campaigns & Showcase',
  careers: 'Careers & Internships | Join the Future of AI at DDS Expo',
  contact: 'Contact Us & Corporate Offices | DDS Expo Visakhapatnam',
  portal: 'Business ERP & CRM Portal | DDS Expo Enterprise Management',
};

function parseHash(): { page: PageRoute; params: Record<string, string> } {
  const rawHash = window.location.hash.replace(/^#\/?/, '');
  if (!rawHash) {
    return { page: 'home', params: {} };
  }

  const [routePart, queryPart] = rawHash.split('?');
  const normalizedRoute = routePart.toLowerCase().trim() as PageRoute;

  const validPages: PageRoute[] = [
    'home',
    'about',
    'services',
    'features',
    'testimonials',
    'team',
    'blog',
    'gallery',
    'careers',
    'contact',
    'portal',
  ];

  const page = validPages.includes(normalizedRoute) ? normalizedRoute : 'home';
  const params: Record<string, string> = {};

  if (queryPart) {
    const searchParams = new URLSearchParams(queryPart);
    searchParams.forEach((val, key) => {
      params[key] = val;
    });
  }

  return { page, params };
}

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageRoute>(() => parseHash().page);
  const [pageParams, setPageParams] = useState<Record<string, string>>(() => parseHash().params);

  useEffect(() => {
    const handleHashChange = () => {
      const { page, params } = parseHash();
      setCurrentPage(page);
      setPageParams(params);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    document.title = PAGE_TITLES[currentPage] || PAGE_TITLES.home;
  }, [currentPage]);

  const navigateTo = (page: PageRoute, params?: Record<string, string>) => {
    setCurrentPage(page);
    setPageParams(params || {});

    let newHash = `#/${page === 'home' ? '' : page}`;
    if (params && Object.keys(params).length > 0) {
      const search = new URLSearchParams(params).toString();
      newHash += `?${search}`;
    }

    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NavigationContext.Provider value={{ currentPage, pageParams, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
