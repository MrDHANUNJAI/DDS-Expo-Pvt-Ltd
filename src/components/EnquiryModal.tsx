import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { useErp } from '../context/ErpContext';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: ServiceItem | null;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  selectedService,
}) => {
  const { addLead } = useErp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(selectedService?.title || 'AI Creatives');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Sync service if selectedService changes
  React.useEffect(() => {
    if (selectedService) {
      setService(selectedService.title);
    }
  }, [selectedService]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Push into ERP CRM Lead Pipeline
    addLead({
      name,
      company: `${name}'s Company`,
      email,
      phone,
      serviceRequired: service,
      estimatedBudget: 45000,
      source: 'Website',
      notes,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div
      className="modal d-block"
      style={{
        backgroundColor: 'rgba(1, 41, 112, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 9998,
      }}
      tabIndex={-1}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '8px' }}>
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold" style={{ color: '#012970' }}>
              Request AI Growth Consultation
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-4">
            {submitted ? (
              <div className="text-center py-4">
                <i className="bi bi-check-circle-fill text-success fs-1 mb-3 d-block"></i>
                <h4 className="fw-bold" style={{ color: '#012970' }}>
                  Enquiry Received!
                </h4>
                <p className="text-muted small">
                  Our AI marketing specialist will get back to you via WhatsApp / email within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-muted">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Enter your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div className="row g-2 mb-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="form-control"
                      placeholder="name@company.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      className="form-control"
                      placeholder="+91 9966994679"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-muted">
                    Selected Service
                  </label>
                  <select
                    className="form-select"
                    value={service}
                    onChange={e => setService(e.target.value)}
                  >
                    <option value="AI Creatives">AI Creatives (Flyers & Graphics)</option>
                    <option value="AI Videos">AI Videos (Shorts & Reels)</option>
                    <option value="AI Websites">AI Websites (SEO & Web)</option>
                    <option value="AI Branding">AI Branding & Logos</option>
                    <option value="AI Leads">AI Leads & Sales Funnels</option>
                    <option value="AI Automations">AI Automations & CRM</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-muted">
                    Project Requirements / Goals
                  </label>
                  <textarea
                    rows={3}
                    className="form-control"
                    placeholder="Tell us about your business and monthly lead targets..."
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                  ></textarea>
                </div>
                <div className="d-grid pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary py-2 fw-semibold"
                    style={{ backgroundColor: '#4154f1' }}
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
