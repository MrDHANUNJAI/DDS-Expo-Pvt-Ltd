import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { JOB_OPENINGS, JobOpening } from '../data/richContentData';
import { useNavigation } from '../context/NavigationContext';
import { useErp } from '../context/ErpContext';
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  Send,
  Sparkles,
  ArrowRight,
  Heart,
  Laptop,
  Users,
  Award,
  ChevronDown,
  X,
  FileCheck,
} from 'lucide-react';

export const CareersPage: React.FC = () => {
  const { pageParams } = useNavigation();
  const { addLead } = useErp();

  const [selectedType, setSelectedType] = useState<'All' | 'Full-Time' | 'Internship'>('All');
  const [activeJob, setActiveJob] = useState<JobOpening | null>(null);

  // Application Modal/Drawer state
  const [applyingJob, setApplyingJob] = useState<JobOpening | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experienceYears: '1-3 Years',
    portfolioUrl: '',
    coverNote: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  // Handle URL query pre-selection (e.g. from navbar dropdown items like "Graphic Designers")
  useEffect(() => {
    if (pageParams.job) {
      const found = JOB_OPENINGS.find(
        (j) =>
          j.id === pageParams.job ||
          j.title.toLowerCase().includes(pageParams.job.toLowerCase())
      );
      if (found) {
        setActiveJob(found);
        setApplyingJob(found);
      }
    }
  }, [pageParams]);

  const filteredJobs = JOB_OPENINGS.filter((job) => {
    if (selectedType === 'All') return true;
    return job.type === selectedType;
  });

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    const refId = `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setApplicationId(refId);

    // Also register as an HR recruitment lead in ERP
    if (addLead) {
      addLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: 'Applicant',
        source: 'Website',
        interestedService: `Recruitment: ${applyingJob?.title || 'Open Position'}`,
        priority: 'High',
        status: 'New',
        leadValue: 0,
        notes: `Applied for: ${applyingJob?.title} (${applyingJob?.type}). Experience: ${formData.experienceYears}. Portfolio: ${formData.portfolioUrl}. Note: ${formData.coverNote}`,
      });
    }

    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setApplyingJob(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      experienceYears: '1-3 Years',
      portfolioUrl: '',
      coverNote: '',
    });
  };

  return (
    <div className="careers-page">
      <PageHeader
        title="Careers & Internships at DDS Expo"
        subtitle="Work with cutting-edge generative AI models, high-performance web frameworks, and help scale leading regional brands."
        categoryBadge="Join Our Team"
      />

      {/* Filter Tabs */}
      <section className="py-4 bg-white border-bottom sticky-top shadow-sm" style={{ top: '70px', zIndex: 10 }}>
        <div className="container">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div className="d-flex align-items-center gap-2">
              <span className="text-muted small fw-semibold me-1">Role Type:</span>
              {(['All', 'Full-Time', 'Internship'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`btn btn-sm px-3.5 py-1.5 rounded-pill fw-semibold transition ${
                    selectedType === type
                      ? 'btn-primary text-white shadow-sm'
                      : 'btn-light text-secondary hover-bg-slate-200'
                  }`}
                  style={selectedType === type ? { backgroundColor: '#4154f1', borderColor: '#4154f1' } : {}}
                >
                  {type === 'All' ? 'All Openings' : `${type} Positions`}
                </button>
              ))}
            </div>

            <span className="text-muted small">
              {filteredJobs.length} active positions open for applications
            </span>
          </div>
        </div>
      </section>

      {/* Job Listings Grid */}
      <section className="py-5 bg-light">
        <div className="container py-lg-4">
          <div className="row g-4">
            {filteredJobs.map((job) => (
              <div key={job.id} className="col-lg-6">
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white p-4 p-lg-5 transition hover-shadow-md d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-1.5">
                        <span
                          className={`badge rounded-pill small px-2.5 py-1 ${
                            job.type === 'Full-Time' ? 'bg-primary text-white' : 'bg-success text-white'
                          }`}
                        >
                          {job.type}
                        </span>
                        <span className="badge bg-light text-secondary border rounded-pill small px-2.5 py-1">
                          {job.department}
                        </span>
                        {job.featured && (
                          <span className="badge bg-warning text-dark rounded-pill small px-2.5 py-1 fw-bold">
                            High Priority
                          </span>
                        )}
                      </div>
                      <h4 className="fw-bold text-dark mb-0">{job.title}</h4>
                    </div>

                    <span className="badge bg-slate-100 text-slate-700 border small">
                      {job.openings} Openings
                    </span>
                  </div>

                  <div className="row g-2 mb-3 small text-muted">
                    <div className="col-sm-6 d-flex align-items-center gap-1.5">
                      <MapPin size={14} className="text-danger" />
                      <span>{job.location}</span>
                    </div>
                    <div className="col-sm-6 d-flex align-items-center gap-1.5">
                      <Clock size={14} className="text-primary" />
                      <span>Experience: {job.experience}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-3 bg-light border mb-3">
                    <span className="text-muted text-xs d-block">Compensation Package:</span>
                    <strong className="text-dark small fw-bold">{job.compensation}</strong>
                  </div>

                  <p className="text-secondary text-xs mb-4 flex-grow-1" style={{ lineHeight: 1.6 }}>
                    {job.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-4">
                    <span className="text-dark fw-bold small text-uppercase text-xs d-block mb-1.5">
                      Core Responsibilities:
                    </span>
                    <ul className="list-unstyled space-y-1.5 mb-0">
                      {job.responsibilities.slice(0, 2).map((resp, i) => (
                        <li key={i} className="d-flex align-items-start gap-2 text-muted text-xs">
                          <CheckCircle2 size={13} className="text-primary shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-top mt-auto d-flex gap-2">
                    <button
                      onClick={() => setApplyingJob(job)}
                      className="btn btn-primary flex-grow-1 py-2 rounded-pill fw-semibold shadow-sm d-inline-flex align-items-center justify-content-center gap-2"
                      style={{ backgroundColor: '#4154f1', borderColor: '#4154f1' }}
                    >
                      <Send size={15} />
                      <span>Apply Now</span>
                    </button>
                    <button
                      onClick={() => setActiveJob(job)}
                      className="btn btn-outline-secondary py-2 px-3 rounded-pill text-xs fw-semibold"
                    >
                      <span>Full Details</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks & Benefits Section */}
      <section className="py-5 bg-white">
        <div className="container py-lg-4">
          <div className="text-center max-w-700 mx-auto mb-5">
            <span className="text-primary fw-bold text-uppercase small">Why DDS Expo?</span>
            <h2 className="fw-bold text-dark">Exceptional Benefits & Perks</h2>
            <p className="text-muted">We invest in our people so they can create exceptional work.</p>
          </div>

          <div className="row g-4">
            {[
              {
                icon: Laptop,
                color: '#4154f1',
                title: 'Apple M-Series Workstations',
                desc: 'Dual 4K color-calibrated monitors and top-tier M3 Max / RTX hardware to eliminate rendering lag.',
              },
              {
                icon: Heart,
                color: '#df1529',
                title: 'Comprehensive Health Cover',
                desc: 'Full medical, accident, and hospitalization insurance coverage for employees and dependents.',
              },
              {
                icon: Award,
                color: '#20c997',
                title: 'Generous Performance Bonuses',
                desc: 'Quarterly profit sharing and spot bonuses celebrating rapid project turnarounds and client wins.',
              },
              {
                icon: Users,
                color: '#fd7e14',
                title: 'Hybrid & Remote Flexibility',
                desc: 'Flexible hours with work-from-home options to ensure optimal work-life balance and deep focus.',
              },
            ].map((perk, i) => {
              const Icon = perk.icon;
              return (
                <div key={i} className="col-lg-3 col-md-6">
                  <div className="card h-100 p-4 rounded-4 border-0 shadow-sm bg-light text-center">
                    <div
                      className="p-3 rounded-circle text-white mx-auto mb-3"
                      style={{ backgroundColor: perk.color, width: '56px', height: '56px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Icon size={24} />
                    </div>
                    <h5 className="fw-bold text-dark mb-2">{perk.title}</h5>
                    <p className="text-muted text-xs mb-0">{perk.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Direct Contact HR Strip */}
      <section className="py-5 bg-light border-top">
        <div className="container py-lg-2">
          <div className="p-4 p-lg-5 rounded-4 shadow-sm bg-white border d-flex flex-column flex-md-row align-items-center justify-content-between gap-4">
            <div>
              <span className="badge bg-primary px-3 py-1 rounded-pill small text-uppercase mb-2">Direct HR Reach</span>
              <h4 className="fw-bold text-dark mb-1">Don't see your specific role listed?</h4>
              <p className="text-muted small mb-0">
                We are always seeking exceptional talent in 3D Motion, DevOps, and Performance Marketing. Send your resume directly to our talent acquisition team.
              </p>
            </div>
            <div className="d-flex gap-2 text-nowrap">
              <a
                href="mailto:careers@ddsexpo.com?subject=General Career Application - DDS Expo"
                className="btn btn-outline-primary px-4 py-2.5 rounded-pill fw-semibold small"
              >
                careers@ddsexpo.com
              </a>
              <a
                href="https://wa.me/919966994679?text=Hi,%20I%20would%20like%20to%20apply%20for%20a%20position%20at%20DDS%20Expo"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success px-4 py-2.5 rounded-pill fw-semibold small d-inline-flex align-items-center gap-2 text-white"
              >
                <i className="bi bi-whatsapp"></i>
                <span>WhatsApp HR</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Job Application Modal */}
      {applyingJob && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(1, 41, 112, 0.7)', backdropFilter: 'blur(4px)', zIndex: 1050 }}
          onClick={() => setApplyingJob(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 rounded-4 shadow-2xl overflow-hidden bg-white">
              <div className="modal-header border-bottom px-4 py-3 bg-white">
                <div>
                  <span className="badge bg-primary px-2.5 py-1 rounded-pill small mb-1">
                    {applyingJob.type} Application
                  </span>
                  <h4 className="fw-bold text-dark mb-0">Apply for {applyingJob.title}</h4>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary rounded-circle"
                  onClick={() => setApplyingJob(null)}
                  style={{ width: '32px', height: '32px', padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X size={16} />
                </button>
              </div>

              <div className="modal-body p-4 p-lg-5">
                {isSubmitted ? (
                  <div className="text-center py-4">
                    <div className="p-3 bg-success/10 text-success rounded-circle d-inline-flex mb-3">
                      <FileCheck size={48} />
                    </div>
                    <h3 className="fw-bold text-dark mb-2">Application Submitted!</h3>
                    <p className="text-muted small mb-3">
                      Thank you, <strong>{formData.name}</strong>. Your profile has been logged in our HR candidate system under Reference ID:
                    </p>
                    <div className="p-3 bg-light rounded-3 d-inline-block font-monospace fw-bold text-primary mb-4">
                      {applicationId}
                    </div>
                    <p className="text-muted text-xs mb-4">
                      Our talent team will review your portfolio and reach out via email or phone within 48 business hours.
                    </p>
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="btn btn-primary px-4 py-2 rounded-pill fw-semibold"
                      style={{ backgroundColor: '#4154f1', borderColor: '#4154f1' }}
                    >
                      Done / Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitApplication}>
                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-dark">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="form-control rounded-3 small"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-dark">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="rahul@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="form-control rounded-3 small"
                        />
                      </div>
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-dark">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="form-control rounded-3 small"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-dark">
                          Experience Level
                        </label>
                        <select
                          value={formData.experienceYears}
                          onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                          className="form-select rounded-3 small"
                        >
                          <option value="Fresher / Intern">Fresher / Intern</option>
                          <option value="1 - 2 Years">1 - 2 Years</option>
                          <option value="2 - 5 Years">2 - 5 Years</option>
                          <option value="5+ Years">5+ Years (Senior Lead)</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-dark">
                        Portfolio Link / Google Drive Resume Link *
                      </label>
                      <input
                        type="url"
                        required
                        placeholder="https://behance.net/yourname or drive.google.com/..."
                        value={formData.portfolioUrl}
                        onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                        className="form-control rounded-3 small"
                      />
                      <span className="text-muted text-[11px]">
                        Please ensure the link permission is set to public viewing.
                      </span>
                    </div>

                    <div className="mb-4">
                      <label className="form-label small fw-semibold text-dark">
                        Brief Cover Note / Why DDS Expo?
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your creative background, recent projects, and what excites you about this role..."
                        value={formData.coverNote}
                        onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                        className="form-control rounded-3 small"
                      />
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                      <button
                        type="button"
                        onClick={() => setApplyingJob(null)}
                        className="btn btn-outline-secondary px-4 rounded-pill small"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary px-5 py-2.5 rounded-pill fw-semibold shadow-sm d-inline-flex align-items-center gap-2"
                        style={{ backgroundColor: '#4154f1', borderColor: '#4154f1' }}
                      >
                        <Send size={16} />
                        <span>Submit Application</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Job Details Modal */}
      {activeJob && !applyingJob && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(1, 41, 112, 0.7)', backdropFilter: 'blur(4px)', zIndex: 1050 }}
          onClick={() => setActiveJob(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 rounded-4 shadow-2xl overflow-hidden bg-white">
              <div className="modal-header border-bottom px-4 py-3 bg-white">
                <div>
                  <span className="badge bg-primary px-2.5 py-1 rounded-pill small mb-1">
                    {activeJob.department}
                  </span>
                  <h4 className="fw-bold text-dark mb-0">{activeJob.title}</h4>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary rounded-circle"
                  onClick={() => setActiveJob(null)}
                  style={{ width: '32px', height: '32px', padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X size={16} />
                </button>
              </div>

              <div className="modal-body p-4 p-lg-5">
                <div className="row g-3 p-3 bg-light rounded-3 border mb-4 text-xs">
                  <div className="col-sm-4">
                    <span className="text-muted d-block">Location</span>
                    <strong className="text-dark">{activeJob.location}</strong>
                  </div>
                  <div className="col-sm-4">
                    <span className="text-muted d-block">Experience</span>
                    <strong className="text-dark">{activeJob.experience}</strong>
                  </div>
                  <div className="col-sm-4">
                    <span className="text-muted d-block">Compensation</span>
                    <strong className="text-success">{activeJob.compensation}</strong>
                  </div>
                </div>

                <h6 className="fw-bold text-dark text-uppercase small mb-2">Role Overview:</h6>
                <p className="text-secondary small mb-4">{activeJob.description}</p>

                <h6 className="fw-bold text-dark text-uppercase small mb-2">Key Responsibilities:</h6>
                <ul className="list-unstyled space-y-2 mb-4">
                  {activeJob.responsibilities.map((r, i) => (
                    <li key={i} className="d-flex align-items-start gap-2 text-secondary small">
                      <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>

                <h6 className="fw-bold text-dark text-uppercase small mb-2">Requirements & Skills:</h6>
                <ul className="list-unstyled space-y-2 mb-4">
                  {activeJob.requirements.map((req, i) => (
                    <li key={i} className="d-flex align-items-start gap-2 text-secondary small">
                      <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>

                <h6 className="fw-bold text-dark text-uppercase small mb-2">Perks & Compensation:</h6>
                <ul className="list-unstyled space-y-2 mb-0">
                  {activeJob.perks.map((p, i) => (
                    <li key={i} className="d-flex align-items-start gap-2 text-secondary small">
                      <Sparkles size={16} className="text-warning shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-footer bg-light px-4 py-3 d-flex justify-content-between">
                <button
                  type="button"
                  onClick={() => setActiveJob(null)}
                  className="btn btn-outline-secondary btn-sm px-4 rounded-pill"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const target = activeJob;
                    setActiveJob(null);
                    setApplyingJob(target);
                  }}
                  className="btn btn-primary btn-sm px-4 py-2 rounded-pill fw-semibold shadow-sm d-inline-flex align-items-center gap-1.5"
                  style={{ backgroundColor: '#4154f1', borderColor: '#4154f1' }}
                >
                  <Send size={14} />
                  <span>Apply for this Role</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
