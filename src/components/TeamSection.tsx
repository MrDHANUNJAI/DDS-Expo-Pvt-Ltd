import React from 'react';
import { TEAM } from '../data/siteData';

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="team section py-5 bg-light">
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
          Team
        </h2>
        <p className="fw-bold fs-2" style={{ color: '#012970' }}>
          Our hard working team
        </p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {TEAM.map(member => (
            <div key={member.id} className="col-lg-3 col-md-6 d-flex align-items-stretch">
              <div
                className="team-member w-100 bg-white shadow-sm overflow-hidden text-center"
                style={{
                  borderRadius: '8px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <div
                  className="member-img position-relative overflow-hidden"
                  style={{ backgroundColor: '#f5f7fc' }}
                >
                  <img
                    src={member.image}
                    className="img-fluid w-100"
                    alt={member.name}
                    style={{
                      height: '280px',
                      objectFit: 'cover',
                      objectPosition: 'top',
                    }}
                  />
                  <div
                    className="social d-flex justify-content-center gap-2 py-2 bg-white/90 position-absolute bottom-0 start-0 end-0 border-top"
                    style={{ backdropFilter: 'blur(4px)' }}
                  >
                    <a
                      href={member.socials.twitter || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted p-1 hover-primary"
                    >
                      <i className="bi bi-twitter-x fs-5"></i>
                    </a>
                    <a
                      href={member.socials.facebook || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted p-1 hover-primary"
                    >
                      <i className="bi bi-facebook fs-5"></i>
                    </a>
                    <a
                      href={member.socials.instagram || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted p-1 hover-primary"
                    >
                      <i className="bi bi-instagram fs-5"></i>
                    </a>
                    <a
                      href={member.socials.linkedin || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted p-1 hover-primary"
                    >
                      <i className="bi bi-linkedin fs-5"></i>
                    </a>
                  </div>
                </div>
                <div className="member-info p-3">
                  <h4
                    className="fw-bold fs-5 mb-1"
                    style={{ color: '#012970' }}
                  >
                    {member.name}
                  </h4>
                  <span className="text-muted small fw-medium">{member.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
