import React, { useState } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { CONTACT_DETAILS } from '../data/siteData';
import { useErp } from '../context/ErpContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  MessageSquare,
  HelpCircle,
  Building,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addLead } = useErp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'AI Creatives & Graphic Design',
    budget: '₹25,000 - ₹50,000',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [leadRef, setLeadRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    const ref = `LEAD-DDS-${Math.floor(1000 + Math.random() * 9000)}`;
    setLeadRef(ref);

    // Push into ERP CRM Leads
    if (addLead) {
      addLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || `${formData.name}'s Enterprise`,
        source: 'Website',
        interestedService: formData.service,
        leadValue: formData.budget.includes('50,000') ? 45000 : 25000,
        priority: 'High',
        status: 'New',
        notes: `Budget Range: ${formData.budget}. Requested Service: ${formData.service}. Inquiry: ${formData.message}`,
      });
    }

    setIsSubmitted(true);
  };

  return (
    <div className="contact-page">
      <PageHeader
        title="Contact Us & Corporate Offices"
        subtitle="Ready to accelerate your brand with AI-powered creative pipelines and scalable web infrastructure? Connect with our senior consultants today."
        categoryBadge="Get in Touch"
      />

      {/* Info Cards Row */}
      <section className="py-5 bg-white border-bottom">
        <div className="container py-lg-2">
          <div className="row g-4">
            {/* Corporate Office */}
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 p-4 rounded-4 border-0 shadow-sm bg-light">
                <div
                  className="p-3 rounded-circle text-white mb-3"
                  style={{ backgroundColor: '#4154f1', width: '52px', height: '52px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <MapPin size={24} />
                </div>
                <h5 className="fw-bold text-dark mb-1">Corporate HQ</h5>
                <p className="text-muted small mb-3">
                  {CONTACT_DETAILS.addressLines[0]}, {CONTACT_DETAILS.addressLines[1]}
                </p>
                <div className="mt-auto">
                  <span className="badge bg-white text-primary border px-2.5 py-1 rounded-pill small">
                    Visakhapatnam Hub
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Phone Lines */}
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 p-4 rounded-4 border-0 shadow-sm bg-light">
                <div
                  className="p-3 rounded-circle text-white mb-3"
                  style={{ backgroundColor: '#15be56', width: '52px', height: '52px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Phone size={24} />
                </div>
                <h5 className="fw-bold text-dark mb-1">Call Our Hotline</h5>
                <div className="space-y-1 mb-3">
                  {CONTACT_DETAILS.phones.map((ph, idx) => (
                    <a
                      key={idx}
                      href={`tel:${ph.replace(/\s+/g, '')}`}
                      className="d-block text-secondary small text-decoration-none fw-semibold hover-text-primary"
                    >
                      {ph}
                    </a>
                  ))}
                </div>
                <div className="mt-auto">
                  <a
                    href="https://wa.me/919966994679?text=Hi%20DDS%20Expo,%20I%20would%20like%20to%20inquire%20about%20your%20services"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-success rounded-pill px-3 py-1 text-xs d-inline-flex align-items-center gap-1.5 text-white"
                  >
                    <i className="bi bi-whatsapp"></i> WhatsApp Chat
                  </a>
                </div>
              </div>
            </div>

            {/* Official Inboxes */}
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 p-4 rounded-4 border-0 shadow-sm bg-light">
                <div
                  className="p-3 rounded-circle text-white mb-3"
                  style={{ backgroundColor: '#ee6c20', width: '52px', height: '52px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Mail size={24} />
                </div>
                <h5 className="fw-bold text-dark mb-1">Email Inboxes</h5>
                <div className="space-y-1 mb-3">
                  {CONTACT_DETAILS.emails.map((em, idx) => (
                    <a
                      key={idx}
                      href={`mailto:${em}`}
                      className="d-block text-secondary small text-decoration-none fw-semibold hover-text-primary"
                    >
                      {em}
                    </a>
                  ))}
                </div>
                <div className="mt-auto">
                  <span className="badge bg-white text-muted border px-2.5 py-1 rounded-pill small">
                    Avg Response: &lt; 2h
                  </span>
                </div>
              </div>
            </div>

            {/* Operational SLA */}
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 p-4 rounded-4 border-0 shadow-sm bg-light">
                <div
                  className="p-3 rounded-circle text-white mb-3"
                  style={{ backgroundColor: '#6610f2', width: '52px', height: '52px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Clock size={24} />
                </div>
                <h5 className="fw-bold text-dark mb-1">Operating Hours</h5>
                <p className="text-muted small mb-3">
                  Client Support: 24/7 / 365 Days<br />
                  Office Consultations: Mon - Sat (9am - 7pm)
                </p>
                <div className="mt-auto">
                  <span className="badge bg-success/10 text-success border border-success/30 px-2.5 py-1 rounded-pill small fw-bold">
                    • Support Online Now
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form & Google Maps Row */}
      <section className="py-5 bg-light">
        <div className="container py-lg-4">
          <div className="row g-5">
            {/* Interactive RFP Form */}
            <div className="col-lg-7">
              <div className="card border-0 shadow-sm rounded-4 bg-white p-4 p-lg-5">
                <div className="mb-4">
                  <span className="text-primary fw-bold text-uppercase small">Request a Proposal</span>
                  <h3 className="fw-bold text-dark">Send Us a Project Brief</h3>
                  <p className="text-muted small">
                    Fill out the form below. Our consultants will evaluate your scope, prepare initial concept mocks, and provide an itemized quote within 24 hours.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-5">
                    <div className="p-3 bg-success/10 text-success rounded-circle d-inline-flex mb-3">
                      <CheckCircle2 size={48} />
                    </div>
                    <h3 className="fw-bold text-dark mb-2">Inquiry Received!</h3>
                    <p className="text-muted small mb-3">
                      Thank you, <strong>{formData.name}</strong>. Your project brief has been logged in our enterprise CRM system under reference:
                    </p>
                    <div className="p-3 bg-light rounded-3 d-inline-block font-monospace fw-bold text-primary mb-4">
                      {leadRef}
                    </div>
                    <p className="text-muted text-xs mb-4">
                      A dedicated account executive has been assigned and will connect via WhatsApp and email shortly.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          company: '',
                          service: 'AI Creatives & Graphic Design',
                          budget: '₹25,000 - ₹50,000',
                          message: '',
                        });
                      }}
                      className="btn btn-outline-primary px-4 py-2 rounded-pill small"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-dark">Your Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="Mr. / Ms. Full Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="form-control rounded-3 small"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-dark">Work Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="form-control rounded-3 small"
                        />
                      </div>
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-dark">Phone / WhatsApp Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 99669 94679"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="form-control rounded-3 small"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-dark">Company / Brand Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Acme Retail Pvt Ltd"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="form-control rounded-3 small"
                        />
                      </div>
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-dark">Primary Service Required</label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="form-select rounded-3 small"
                        >
                          <option value="AI Creatives & Graphic Design">AI Creatives & Graphic Design</option>
                          <option value="AI Video Production & Viral Reels">AI Video Production & Viral Reels</option>
                          <option value="Modern Web & E-Commerce Engineering">Modern Web & E-Commerce Engineering</option>
                          <option value="AI Brand Identity & Logo Print">AI Brand Identity & Logo Print</option>
                          <option value="Lead Funnels & Meta/Google Ads">Lead Funnels & Meta/Google Ads</option>
                          <option value="AI Chatbots & Business Automations">AI Chatbots & Business Automations</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-dark">Estimated Budget Range</label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="form-select rounded-3 small"
                        >
                          <option value="₹15,000 - ₹25,000">₹15,000 - ₹25,000 (Starter)</option>
                          <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000 (Growth)</option>
                          <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000 (Scale)</option>
                          <option value="₹1,00,000+">₹1,00,000+ (Enterprise Retainer)</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label small fw-semibold text-dark">Project Overview & Objectives *</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Describe what you want to achieve, timeline constraints, target audience, or references..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="form-control rounded-3 small"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100 py-3 rounded-pill fw-semibold shadow-sm d-inline-flex align-items-center justify-content-center gap-2"
                      style={{ backgroundColor: '#4154f1', borderColor: '#4154f1' }}
                    >
                      <Send size={18} />
                      <span>Submit Project Brief to CRM</span>
                    </button>

                    <div className="text-center mt-3">
                      <span className="text-muted text-[11px] d-inline-flex align-items-center gap-1">
                        <ShieldCheck size={14} className="text-success" />
                        Strict confidentiality guaranteed. We never share client contact information.
                      </span>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Interactive Map & Direct Directions */}
            <div className="col-lg-5">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white h-100 d-flex flex-column">
                <div className="p-4 border-bottom">
                  <h5 className="fw-bold text-dark mb-1">Our Location on Google Maps</h5>
                  <p className="text-muted small mb-0">Visakhapatnam, Andhra Pradesh 531021</p>
                </div>

                <div className="flex-grow-1" style={{ minHeight: '340px' }}>
                  <iframe
                    src={CONTACT_DETAILS.mapEmbedSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '340px' }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="DDS Expo Corporate Location Map"
                  />
                </div>

                <div className="p-4 bg-light border-top">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <div className="fw-bold text-dark small">Visiting In Person?</div>
                      <div className="text-muted text-xs">Appointments recommended for executive team syncs.</div>
                    </div>
                    <a
                      href="https://maps.google.com/?q=DDS+Expo+Visakhapatnam"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm rounded-pill px-3 fw-semibold"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact FAQ */}
      <section className="py-5 bg-white">
        <div className="container py-lg-4">
          <div className="text-center max-w-700 mx-auto mb-5">
            <span className="text-primary fw-bold text-uppercase small">Have Questions?</span>
            <h2 className="fw-bold text-dark">Frequently Asked Questions</h2>
            <p className="text-muted">Clear answers about working with DDS Expo.</p>
          </div>

          <div className="row g-4 max-w-900 mx-auto">
            <div className="col-md-6">
              <div className="p-4 rounded-4 bg-light border h-100">
                <h6 className="fw-bold text-dark mb-2">How fast do you respond to new inquiries?</h6>
                <p className="text-muted small mb-0">
                  During business hours (9am - 7pm IST), inquiries submitted via this form are acknowledged within 30 minutes, and detailed proposals are delivered within 24 hours.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-4 rounded-4 bg-light border h-100">
                <h6 className="fw-bold text-dark mb-2">Can we sign an NDA before sharing project details?</h6>
                <p className="text-muted small mb-0">
                  Yes, absolutely. We routinely sign standard bilateral NDAs before reviewing proprietary client business logic, designs, or marketing data.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-4 rounded-4 bg-light border h-100">
                <h6 className="fw-bold text-dark mb-2">What are your billing and payment structures?</h6>
                <p className="text-muted small mb-0">
                  We operate on standard milestone-based contracts: typically 50% advance on project kickoff, and 50% upon final delivery and client acceptance, complete with GST invoices.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-4 rounded-4 bg-light border h-100">
                <h6 className="fw-bold text-dark mb-2">Do you take clients outside of Andhra Pradesh?</h6>
                <p className="text-muted small mb-0">
                  Yes! More than 60% of our enterprise clients are located across Hyderabad, Bengaluru, Chennai, Mumbai, Delhi, as well as overseas international clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
