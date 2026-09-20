import React from 'react';
import { FEATURES_LIST, ALT_FEATURES_LIST } from '../data/siteData';

export const FeaturesSection: React.FC = () => {
  return (
    <>
      {/* Features Section */}
      <section id="features" className="features section py-5">
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
            Features
          </h2>
          <p className="fw-bold fs-2" style={{ color: '#012970' }}>
            Our AI-Driven Digital Marketing Services
          </p>
        </div>

        <div className="container">
          <div className="row gy-5 align-items-center">
            <div className="col-xl-6 text-center">
              <img
                src="/assets/img/features.png"
                className="img-fluid"
                alt="AI Features"
                style={{ maxHeight: '440px' }}
              />
            </div>
            <div className="col-xl-6">
              <div className="row gy-4">
                {FEATURES_LIST.map((feat, idx) => (
                  <div key={idx} className="col-md-6">
                    <div
                      className="feature-box d-flex align-items-center p-3 shadow-sm bg-white"
                      style={{
                        borderRadius: '6px',
                        borderLeft: '4px solid #4154f1',
                      }}
                    >
                      <i className="bi bi-check fs-2 text-primary me-2"></i>
                      <h3 className="fs-6 fw-bold mb-0" style={{ color: '#012970' }}>
                        {feat}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alt-Features (Why Choose Us) Section */}
      <section id="alt-features" className="alt-features section py-5 bg-light">
        <div className="container">
          <div className="row gy-5 align-items-center">
            <div className="col-xl-7 order-2 order-xl-1">
              <h2 className="fw-bold mb-4" style={{ color: '#012970', fontSize: '32px' }}>
                Why Choose Us?
              </h2>
              <div className="row gy-4">
                {ALT_FEATURES_LIST.map((item, idx) => (
                  <div key={idx} className="col-md-6">
                    <div className="icon-box d-flex align-items-start">
                      <div
                        className="p-3 rounded me-3 shadow-sm bg-white"
                        style={{
                          color: '#4154f1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minWidth: '50px',
                          minHeight: '50px',
                        }}
                      >
                        <i className={`bi ${item.icon} fs-4`}></i>
                      </div>
                      <div>
                        <h4
                          className="fw-bold mb-1 fs-6"
                          style={{ color: '#012970' }}
                        >
                          {item.title}
                        </h4>
                        <p className="text-muted small mb-0">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-xl-5 order-1 order-xl-2 text-center">
              <img
                src="/assets/img/alt-features.png"
                className="img-fluid"
                alt="Why Choose Us"
                style={{ maxHeight: '420px' }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
