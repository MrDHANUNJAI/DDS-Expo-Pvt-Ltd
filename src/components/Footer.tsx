import React from 'react';
import { useNavigation } from '../context/NavigationContext';

interface FooterProps {
  onOpenPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPortal }) => {
  const { navigateTo } = useNavigation();

  return (
    <footer id="footer" className="footer bg-white border-top pt-5 pb-4">
      <div className="container footer-top">
        <div className="row gy-4">
          {/* About / Contact */}
          <div className="col-lg-4 col-md-6 footer-about">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('home');
              }}
              className="d-flex align-items-center mb-3 text-decoration-none cursor-pointer"
            >
              <img
                src="/assets/img/logo2.png"
                alt="DDS Expo"
                style={{ maxHeight: '38px' }}
              />
            </a>
            <div className="footer-contact text-muted small">
              <p className="mb-1">Visakhapatnam Corporate Office</p>
              <p className="mb-3">AP, India 531021</p>
              <p className="mb-1">
                <strong className="text-dark">Phone:</strong>{' '}
                <a
                  href="tel:9966994679"
                  className="text-decoration-none text-muted hover-text-primary"
                >
                  +91 9966994679
                </a>
                {' / '}
                <a
                  href="tel:9618231993"
                  className="text-decoration-none text-muted hover-text-primary"
                >
                  +91 9618231993
                </a>
              </p>
              <p className="mb-0">
                <strong className="text-dark">Email:</strong>{' '}
                <a
                  href="mailto:info@ddsexpo.com"
                  className="text-decoration-none text-muted hover-text-primary"
                >
                  info@ddsexpo.com
                </a>
              </p>
            </div>
          </div>

          {/* Useful Links */}
          <div className="col-lg-2 col-md-3 footer-links">
            <h4
              className="fw-bold fs-6 mb-3"
              style={{ color: '#012970' }}
            >
              Company Pages
            </h4>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <i className="bi bi-chevron-right text-primary me-1"></i>{' '}
                <button
                  type="button"
                  onClick={() => navigateTo('home')}
                  className="btn btn-link p-0 text-decoration-none text-muted hover-text-primary small"
                >
                  Home
                </button>
              </li>
              <li className="mb-2">
                <i className="bi bi-chevron-right text-primary me-1"></i>{' '}
                <button
                  type="button"
                  onClick={() => navigateTo('about')}
                  className="btn btn-link p-0 text-decoration-none text-muted hover-text-primary small"
                >
                  About Us
                </button>
              </li>
              <li className="mb-2">
                <i className="bi bi-chevron-right text-primary me-1"></i>{' '}
                <button
                  type="button"
                  onClick={() => navigateTo('services')}
                  className="btn btn-link p-0 text-decoration-none text-muted hover-text-primary small"
                >
                  Services & Pricing
                </button>
              </li>
              <li className="mb-2">
                <i className="bi bi-chevron-right text-primary me-1"></i>{' '}
                <button
                  type="button"
                  onClick={() => navigateTo('features')}
                  className="btn btn-link p-0 text-decoration-none text-muted hover-text-primary small"
                >
                  Features & Advantages
                </button>
              </li>
              <li className="mb-2">
                <i className="bi bi-chevron-right text-primary me-1"></i>{' '}
                <button
                  type="button"
                  onClick={() => navigateTo('team')}
                  className="btn btn-link p-0 text-decoration-none text-muted hover-text-primary small"
                >
                  Leadership Team
                </button>
              </li>
              <li className="mb-2">
                <i className="bi bi-chevron-right text-primary me-1"></i>{' '}
                <button
                  type="button"
                  onClick={() => navigateTo('careers')}
                  className="btn btn-link p-0 text-decoration-none text-muted hover-text-primary small"
                >
                  Careers & Hiring
                </button>
              </li>
              <li className="mb-2">
                <i className="bi bi-chevron-right text-primary me-1"></i>{' '}
                <button
                  type="button"
                  onClick={() => navigateTo('contact')}
                  className="btn btn-link p-0 text-decoration-none text-muted hover-text-primary small"
                >
                  Contact & Support
                </button>
              </li>
              {onOpenPortal && (
                <li className="mb-2 pt-1 border-top">
                  <i className="bi bi-shield-lock text-primary me-1"></i>{' '}
                  <button
                    type="button"
                    onClick={onOpenPortal}
                    className="btn btn-link p-0 text-decoration-none text-primary fw-semibold small"
                  >
                    Employee ERP Portal
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Portfolio & Solutions */}
          <div className="col-lg-2 col-md-3 footer-links">
            <h4
              className="fw-bold fs-6 mb-3"
              style={{ color: '#012970' }}
            >
              Work & Services
            </h4>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <i className="bi bi-chevron-right text-primary me-1"></i>{' '}
                <button
                  type="button"
                  onClick={() => navigateTo('gallery', { category: 'Creatives & Ads' })}
                  className="btn btn-link p-0 text-decoration-none text-muted hover-text-primary small"
                >
                  Creatives & Posters
                </button>
              </li>
              <li className="mb-2">
                <i className="bi bi-chevron-right text-primary me-1"></i>{' '}
                <button
                  type="button"
                  onClick={() => navigateTo('gallery', { category: 'Video Marketing' })}
                  className="btn btn-link p-0 text-decoration-none text-muted hover-text-primary small"
                >
                  Video Reels & Shorts
                </button>
              </li>
              <li className="mb-2">
                <i className="bi bi-chevron-right text-primary me-1"></i>{' '}
                <button
                  type="button"
                  onClick={() => navigateTo('gallery', { category: 'Web & Tech' })}
                  className="btn btn-link p-0 text-decoration-none text-muted hover-text-primary small"
                >
                  Web Platforms
                </button>
              </li>
              <li className="mb-2">
                <i className="bi bi-chevron-right text-primary me-1"></i>{' '}
                <button
                  type="button"
                  onClick={() => navigateTo('gallery', { category: 'Identity & Print' })}
                  className="btn btn-link p-0 text-decoration-none text-muted hover-text-primary small"
                >
                  Identity & Logos
                </button>
              </li>
              <li className="mb-2">
                <i className="bi bi-chevron-right text-primary me-1"></i>{' '}
                <button
                  type="button"
                  onClick={() => navigateTo('gallery', { category: 'Social Growth' })}
                  className="btn btn-link p-0 text-decoration-none text-muted hover-text-primary small"
                >
                  Social Growth
                </button>
              </li>
              <li className="mb-2">
                <i className="bi bi-chevron-right text-primary me-1"></i>{' '}
                <button
                  type="button"
                  onClick={() => navigateTo('blog')}
                  className="btn btn-link p-0 text-decoration-none text-muted hover-text-primary small"
                >
                  Tech & AI Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="col-lg-4 col-md-12">
            <h4
              className="fw-bold fs-6 mb-3"
              style={{ color: '#012970' }}
            >
              Follow Us
            </h4>
            <p className="text-muted small mb-3">
              Follow our verified channels to stay updated with AI advertising workflows, prompt engineering, and campaign breakdowns.
            </p>
            <div className="social-links d-flex gap-2">
              <a
                href="https://x.com/ddsexpoofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center justify-content-center rounded-circle border text-muted"
                style={{ width: '40px', height: '40px' }}
                aria-label="Twitter X"
              >
                <i className="bi bi-twitter-x"></i>
              </a>
              <a
                href="https://www.facebook.com/DDSexpoofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center justify-content-center rounded-circle border text-muted"
                style={{ width: '40px', height: '40px' }}
                aria-label="Facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://www.instagram.com/dds_expo/"
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center justify-content-center rounded-circle border text-muted"
                style={{ width: '40px', height: '40px' }}
                aria-label="Instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/digital-dhanu-ai-11454b293/"
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center justify-content-center rounded-circle border text-muted"
                style={{ width: '40px', height: '40px' }}
                aria-label="LinkedIn"
              >
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container copyright text-center mt-4 pt-3 border-top">
        <p className="small text-muted mb-1">
          © {new Date().getFullYear()}{' '}
          <strong className="px-1 text-dark">DDS EXPO PRIVATE LIMITED</strong>{' '}
          All Rights Reserved.
        </p>
        <div className="credits small text-muted">
          AI Powered Digital Marketing, Creative Production & Scalable Web Solutions
        </div>
      </div>
    </footer>
  );
};
