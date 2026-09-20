import React from 'react';
import { VALUES } from '../data/siteData';

export const ValuesSection: React.FC = () => {
  return (
    <section id="values" className="values section py-5">
      {/* Section Title */}
      <div className="container section-title text-center mb-5">
        <h2
          className="d-inline-block px-4 py-2 rounded-pill fw-bold text-uppercase"
          style={{
            fontSize: '13px',
            letterSpacing: '1px',
            backgroundColor: 'rgba(65, 84, 241, 0.1)',
            color: '#4154f1',
          }}
        >
          Why AI-Powered Digital Marketing?
        </h2>
      </div>

      <div className="container">
        <div className="row gy-4">
          {VALUES.map(val => (
            <div key={val.id} className="col-lg-4">
              <div
                className="card h-100 p-4 border-0 text-center shadow-sm"
                style={{
                  borderRadius: '8px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <div className="p-3">
                  <img
                    src={val.img}
                    className="img-fluid mb-4"
                    alt={val.title}
                    style={{ maxHeight: '180px', objectFit: 'contain' }}
                  />
                </div>
                <h3 className="fw-bold mb-3" style={{ fontSize: '22px', color: '#012970' }}>
                  {val.title}
                </h3>
                <p className="text-muted mb-0">{val.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
