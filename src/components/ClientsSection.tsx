import React from 'react';
import { CLIENT_LOGOS } from '../data/siteData';

export const ClientsSection: React.FC = () => {
  // Split into 2 rows for rich visual appeal
  const row1 = CLIENT_LOGOS.slice(0, 16);
  const row2 = CLIENT_LOGOS.slice(16);

  return (
    <section id="clients" className="clients section py-5 overflow-hidden">
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
          Clients
        </h2>
        <p className="fw-bold fs-2" style={{ color: '#012970' }}>
          We work with best clients
        </p>
      </div>

      <div className="container-fluid px-0">
        {/* Row 1 Marquee */}
        <div className="clients-marquee mb-4">
          {[...row1, ...row1, ...row1].map((logo, idx) => (
            <div
              key={`row1-${idx}`}
              className="d-flex align-items-center justify-content-center mx-3 p-3 bg-white shadow-xs rounded"
              style={{
                width: '150px',
                height: '80px',
                border: '1px solid #f0f0f0',
              }}
            >
              <img
                src={`/assets/img/clients/${logo}`}
                className="img-fluid"
                alt={`Client ${logo}`}
                style={{
                  maxHeight: '45px',
                  maxWidth: '120px',
                  objectFit: 'contain',
                  filter: 'grayscale(20%)',
                  transition: 'filter 0.3s ease',
                }}
                onError={(e: any) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>

        {/* Row 2 Marquee (slightly reverse or staggered) */}
        <div
          className="clients-marquee"
          style={{ animationDirection: 'reverse', animationDuration: '40s' }}
        >
          {[...row2, ...row2, ...row2].map((logo, idx) => (
            <div
              key={`row2-${idx}`}
              className="d-flex align-items-center justify-content-center mx-3 p-3 bg-white shadow-xs rounded"
              style={{
                width: '150px',
                height: '80px',
                border: '1px solid #f0f0f0',
              }}
            >
              <img
                src={`/assets/img/clients/${logo}`}
                className="img-fluid"
                alt={`Client ${logo}`}
                style={{
                  maxHeight: '45px',
                  maxWidth: '120px',
                  objectFit: 'contain',
                  filter: 'grayscale(20%)',
                }}
                onError={(e: any) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
