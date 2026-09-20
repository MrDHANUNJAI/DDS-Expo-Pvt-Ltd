import React from 'react';

interface HeroSectionProps {
  onWatchVideo: () => void;
  onGetStarted?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onWatchVideo,
  onGetStarted,
}) => {
  return (
    <section id="hero" className="hero section pt-5 mt-4">
      <div className="container">
        <div className="row gy-4 align-items-center">
          <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
            <h1 className="display-5 fw-bold text-navy mb-3">
              We offer AI Modern solutions for growing your business
            </h1>
            <p className="fs-5 text-muted mb-4">
              Where AI Meets Marketing Excellence!
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 align-items-sm-center">
              <a
                href="#about"
                className="btn-get-started text-decoration-none"
                onClick={e => {
                  if (onGetStarted) {
                    e.preventDefault();
                    onGetStarted();
                  }
                }}
              >
                Get Started <i className="bi bi-arrow-right ms-2"></i>
              </a>
              <button
                type="button"
                onClick={onWatchVideo}
                className="btn-watch-video d-flex align-items-center bg-transparent border-0 text-decoration-none p-0"
              >
                <i className="bi bi-play-circle fs-2 text-primary me-2"></i>
                <span className="fw-semibold text-dark">Watch Video</span>
              </button>
            </div>
          </div>
          <div className="col-lg-6 order-1 order-lg-2 hero-img text-center">
            <img
              src="/assets/img/hero-img.png"
              className="img-fluid animated"
              alt="AI Modern Solutions"
              style={{ maxHeight: '500px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
