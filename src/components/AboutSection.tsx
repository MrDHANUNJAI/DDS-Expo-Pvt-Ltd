import React from 'react';

interface AboutSectionProps {
  onGetStarted?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onGetStarted }) => {
  return (
    <section id="about" className="about section py-5">
      <div className="container">
        <div className="row gx-0 align-items-center">
          <div className="col-lg-6 d-flex flex-column justify-content-center">
            <div
              className="content p-4 p-md-5"
              style={{
                backgroundColor: 'rgba(65, 84, 241, 0.05)',
                borderRadius: '8px',
              }}
            >
              <h3 className="text-primary fw-bold text-uppercase fs-6 mb-2">
                Who We Are
              </h3>
              <h2 className="fw-bold mb-3" style={{ color: '#012970', fontSize: '28px' }}>
                100% AI-Driven Digital Marketing Solutions for Unmatched Growth
              </h2>
              <p className="text-muted mb-4" style={{ lineHeight: '1.7' }}>
                Imagine a world where your business scales effortlessly, where every ad,
                campaign, and strategy is executed with precision, speed, and
                intelligence. Welcome to DDS Expo, where we harness the power of
                Artificial Intelligence to revolutionize digital marketing and take your
                business to new heights!
              </p>
              <div>
                <a
                  href="#services"
                  className="btn-read-more d-inline-flex align-items-center justify-content-center text-decoration-none"
                  style={{
                    backgroundColor: '#4154f1',
                    color: '#fff',
                    padding: '12px 36px',
                    borderRadius: '4px',
                    fontWeight: 600,
                  }}
                  onClick={e => {
                    if (onGetStarted) {
                      e.preventDefault();
                      onGetStarted();
                    }
                  }}
                >
                  <span>Get Started</span>
                  <i className="bi bi-arrow-right ms-2"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6 d-flex align-items-center justify-content-center p-3 p-md-4">
            <img
              src="/assets/img/about.webp"
              className="img-fluid shadow-sm"
              alt="DDS Expo - AI Digital Marketing"
              style={{ borderRadius: '10px', maxHeight: '420px', width: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
