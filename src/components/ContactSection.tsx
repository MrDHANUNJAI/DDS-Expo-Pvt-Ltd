import React, { useState } from 'react';
import { CONTACT_DETAILS } from '../data/siteData';
import { useErp } from '../context/ErpContext';

export const ContactSection: React.FC = () => {
  const { addLead } = useErp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Automatically push new lead into ERP CRM system
    addLead({
      name: formData.name,
      company: formData.subject || 'Website Inquiry',
      email: formData.email,
      phone: formData.phone || '+91 9966994679',
      serviceRequired: formData.subject || 'AI Digital Solutions',
      estimatedBudget: 35000,
      source: 'Website',
      notes: formData.message,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        phone: '',
        message: '',
      });
      setTimeout(() => setIsSuccess(false), 6000);
    }, 800);
  };

  return (
    <section id="contact" className="contact section py-5 bg-light">
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
          Contact
        </h2>
        <p className="fw-bold fs-2" style={{ color: '#012970' }}>
          Contact Us
        </p>
      </div>

      <div className="container">
        {/* Contact Info & Map */}
        <div className="row gy-4 mb-5">
          <div className="col-lg-6">
            <div className="row gy-4">
              {/* Address */}
              <div className="col-md-6">
                <div
                  className="info-item p-4 bg-white shadow-sm h-100"
                  style={{ borderRadius: '6px' }}
                >
                  <i className="bi bi-geo-alt fs-2 text-primary mb-2 d-inline-block"></i>
                  <h3 className="fw-bold fs-5 mb-2" style={{ color: '#012970' }}>
                    Address
                  </h3>
                  {CONTACT_DETAILS.addressLines.map((line, idx) => (
                    <p key={idx} className="text-muted mb-0 small">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {/* Call Us */}
              <div className="col-md-6">
                <div
                  className="info-item p-4 bg-white shadow-sm h-100"
                  style={{ borderRadius: '6px' }}
                >
                  <i className="bi bi-telephone fs-2 text-primary mb-2 d-inline-block"></i>
                  <h3 className="fw-bold fs-5 mb-2" style={{ color: '#012970' }}>
                    Call Us
                  </h3>
                  {CONTACT_DETAILS.phones.map((phone, idx) => (
                    <p key={idx} className="mb-1 small">
                      <a
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        className="text-decoration-none text-muted"
                      >
                        {phone}
                      </a>
                    </p>
                  ))}
                </div>
              </div>

              {/* Email Us */}
              <div className="col-md-6">
                <div
                  className="info-item p-4 bg-white shadow-sm h-100"
                  style={{ borderRadius: '6px' }}
                >
                  <i className="bi bi-envelope fs-2 text-primary mb-2 d-inline-block"></i>
                  <h3 className="fw-bold fs-5 mb-2" style={{ color: '#012970' }}>
                    Email Us
                  </h3>
                  {CONTACT_DETAILS.emails.map((email, idx) => (
                    <p key={idx} className="mb-1 small">
                      <a
                        href={`mailto:${email}`}
                        className="text-decoration-none text-muted"
                      >
                        {email}
                      </a>
                    </p>
                  ))}
                </div>
              </div>

              {/* Open Hours */}
              <div className="col-md-6">
                <div
                  className="info-item p-4 bg-white shadow-sm h-100"
                  style={{ borderRadius: '6px' }}
                >
                  <i className="bi bi-clock fs-2 text-primary mb-2 d-inline-block"></i>
                  <h3 className="fw-bold fs-5 mb-2" style={{ color: '#012970' }}>
                    Open Hours
                  </h3>
                  {CONTACT_DETAILS.openHours.map((hour, idx) => (
                    <p key={idx} className="text-muted mb-0 small">
                      {hour}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="col-lg-6">
            <div
              className="bg-white p-2 shadow-sm rounded overflow-hidden"
              style={{ minHeight: '380px' }}
            >
              <iframe
                src={CONTACT_DETAILS.mapEmbedSrc}
                width="100%"
                height="380"
                style={{ border: 0, borderRadius: '4px' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin allow-popups"
                title="DDS Expo Location"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Interactive Send Message Form */}
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="p-4 p-md-5 bg-white shadow-sm rounded">
              <h3 className="fw-bold mb-4 text-center" style={{ color: '#012970' }}>
                Send Us a Message
              </h3>

              {isSuccess && (
                <div className="alert alert-success d-flex align-items-center mb-4">
                  <i className="bi bi-check-circle-fill me-2 fs-5"></i>
                  <div>Thank you! Your message has been sent to DDS Expo. Our team will contact you shortly.</div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row gy-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Your Name</label>
                    <input
                      type="text"
                      className="form-control py-2"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Your Email</label>
                    <input
                      type="email"
                      className="form-control py-2"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control py-2"
                      placeholder="e.g. +91 9876543210"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Subject / Service</label>
                    <input
                      type="text"
                      className="form-control py-2"
                      required
                      placeholder="e.g. AI Creatives & Lead Generation"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-muted">Message</label>
                    <textarea
                      rows={4}
                      className="form-control"
                      required
                      placeholder="Tell us about your business goals..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="col-12 text-center pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary px-5 py-2 fw-semibold"
                      style={{
                        backgroundColor: '#4154f1',
                        borderRadius: '4px',
                      }}
                    >
                      {isSubmitting ? (
                        <span>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Sending...
                        </span>
                      ) : (
                        <span>Send Message</span>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
