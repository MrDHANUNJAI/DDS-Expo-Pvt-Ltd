import React, { useState } from 'react';
import { SERVICES } from '../data/siteData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService?: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="services" className="services section py-5">
      <div className="container section-title text-center mb-5">
        <h2
          className="d-inline-block px-4 py-2 rounded-pill fw-bold text-uppercase mb-2"
          style={{
            fontSize: '13px',
            letterSpacing: '1px',
            backgroundColor: 'rgba(65, 84, 241, 0.1)',
            color: '#4154f1',
          }}
        >
          Services
        </h2>
        <p className="fw-bold fs-2" style={{ color: '#012970' }}>
          Check Our Services
        </p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {SERVICES.map(service => {
            const isHovered = hoveredId === service.id;

            return (
              <div key={service.id} className="col-lg-4 col-md-6">
                <div
                  className={`service-item ${service.className} position-relative text-center p-5 shadow-sm h-100`}
                  onMouseEnter={() => setHoveredId(service.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    backgroundColor: isHovered ? service.accentColor : '#ffffff',
                    borderBottom: `4px solid ${service.accentColor}`,
                    borderRadius: '8px',
                    transition: 'all 0.35s ease-in-out',
                    cursor: 'pointer',
                  }}
                  onClick={() => onSelectService && onSelectService(service)}
                >
                  <div
                    className="icon d-inline-flex align-items-center justify-content-center p-3 rounded mb-4"
                    style={{
                      backgroundColor: isHovered ? '#ffffff' : `${service.accentColor}18`,
                      color: isHovered ? service.accentColor : service.accentColor,
                      fontSize: '34px',
                      width: '70px',
                      height: '70px',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <i className={`bi ${service.icon}`}></i>
                  </div>
                  <h3
                    className="fw-bold mb-3 fs-4"
                    style={{
                      color: isHovered ? '#ffffff' : '#012970',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="mb-4"
                    style={{
                      color: isHovered ? 'rgba(255,255,255,0.9)' : '#555555',
                      fontSize: '15px',
                      lineHeight: '1.6',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {service.description}
                  </p>
                  <button
                    type="button"
                    className="read-more d-inline-flex align-items-center justify-content-center bg-transparent border-0 fw-semibold text-decoration-none"
                    style={{
                      color: isHovered ? '#ffffff' : service.accentColor,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    <span>Get Started</span>
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
