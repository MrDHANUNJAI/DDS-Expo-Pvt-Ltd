import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../data/siteData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section id="testimonials" className="testimonials section py-5">
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
          Testimonials
        </h2>
        <p className="fw-bold fs-2" style={{ color: '#012970' }}>
          What they are saying about us
        </p>
      </div>

      <div className="container position-relative">
        {/* Testimonials Carousel */}
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div
              className="testimonial-item p-4 p-md-5 bg-white shadow rounded text-center position-relative"
              style={{ minHeight: '260px' }}
            >
              <div className="stars text-warning mb-3">
                {[...Array(TESTIMONIALS[currentIndex].stars)].map((_, i) => (
                  <i key={i} className="bi bi-star-fill mx-1 fs-5"></i>
                ))}
              </div>
              <p
                className="fst-italic text-muted mb-4 fs-5"
                style={{ lineHeight: '1.8' }}
              >
                "{TESTIMONIALS[currentIndex].text}"
              </p>
              <div className="profile mt-auto">
                <h3
                  className="fw-bold fs-5 mb-1"
                  style={{ color: '#012970' }}
                >
                  {TESTIMONIALS[currentIndex].author}
                </h3>
                <h4 className="text-muted small mb-0">
                  {TESTIMONIALS[currentIndex].location}
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel controls */}
        <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
          <button
            type="button"
            onClick={prevSlide}
            className="btn btn-sm btn-outline-primary rounded-circle"
            style={{ width: '38px', height: '38px' }}
            aria-label="Previous testimonial"
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <div className="d-flex gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`border-0 rounded-circle p-0 ${
                  currentIndex === idx ? 'bg-primary' : 'bg-secondary-subtle'
                }`}
                style={{
                  width: currentIndex === idx ? '24px' : '10px',
                  height: '10px',
                  borderRadius: currentIndex === idx ? '10px' : '50%',
                  transition: 'all 0.3s ease',
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={nextSlide}
            className="btn btn-sm btn-outline-primary rounded-circle"
            style={{ width: '38px', height: '38px' }}
            aria-label="Next testimonial"
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};
