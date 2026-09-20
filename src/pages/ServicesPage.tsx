import React, { useState } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { DETAILED_SERVICES, ServiceDetail } from '../data/richContentData';
import { useNavigation } from '../context/NavigationContext';
import {
  Check,
  Clock,
  Sparkles,
  ArrowRight,
  Calculator,
  ShieldCheck,
  Zap,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesPageProps {
  onOpenEnquiry: (service?: ServiceItem | null) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenEnquiry }) => {
  const { navigateTo } = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Interactive Package Calculator state
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'ai-creatives',
    'ai-websites',
  ]);

  const categories = [
    'All',
    'Creatives',
    'Video',
    'Web & Tech',
    'Branding',
    'Growth & Ads',
    'Automation',
  ];

  const filteredServices =
    selectedCategory === 'All'
      ? DETAILED_SERVICES
      : DETAILED_SERVICES.filter((s) => s.category === selectedCategory);

  const toggleCalculatorAddon = (serviceId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculatedTotal = selectedAddons.reduce((sum, id) => {
    const srv = DETAILED_SERVICES.find((s) => s.id === id);
    return sum + (srv ? srv.startingPrice : 0);
  }, 0);

  const handleBookService = (srv: ServiceDetail) => {
    const mappedService: ServiceItem = {
      id: srv.id,
      title: srv.title,
      description: srv.overview,
      icon: srv.icon,
      className: 'item-primary',
      accentColor: srv.accentColor,
    };
    onOpenEnquiry(mappedService);
  };

  const handleRequestCalculatedQuote = () => {
    const selectedNames = selectedAddons
      .map((id) => DETAILED_SERVICES.find((s) => s.id === id)?.title)
      .filter(Boolean)
      .join(', ');

    const bundleService: ServiceItem = {
      id: 'custom-package',
      title: `Custom Package: ${selectedNames || 'Digital Solutions'}`,
      description: `Estimated budget: ₹${calculatedTotal.toLocaleString()}`,
      icon: 'bi-box-seam',
      className: 'item-primary',
      accentColor: '#4154f1',
    };
    onOpenEnquiry(bundleService);
  };

  return (
    <div className="services-page">
      <PageHeader
        title="Services & Digital Solutions"
        subtitle="End-to-end creative production, viral short-form video, full-stack web engineering, and automated customer acquisition engines."
        categoryBadge="Commercial Capabilities"
      />

      {/* Category Filter Pills */}
      <section className="py-4 bg-white border-bottom sticky-top shadow-sm" style={{ top: '70px', zIndex: 10 }}>
        <div className="container">
          <div className="d-flex align-items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            <span className="text-muted small fw-semibold me-2 d-none d-md-inline">Filter:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn btn-sm px-3.5 py-1.5 rounded-pill text-nowrap fw-semibold transition ${
                  selectedCategory === cat
                    ? 'btn-primary text-white shadow-sm'
                    : 'btn-light text-secondary hover-bg-slate-200'
                }`}
                style={selectedCategory === cat ? { backgroundColor: '#4154f1', borderColor: '#4154f1' } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive Service Cards Grid */}
      <section className="py-5 bg-light">
        <div className="container py-lg-4">
          <div className="row g-4">
            {filteredServices.map((srv) => (
              <div key={srv.id} className="col-lg-6">
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white p-4 p-lg-5 transition hover-shadow-md">
                  {/* Top Bar */}
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="p-3 rounded-3 text-white d-flex align-items-center justify-content-center"
                        style={{ backgroundColor: srv.accentColor, width: '52px', height: '52px' }}
                      >
                        <i className={`bi ${srv.icon} fs-4`}></i>
                      </div>
                      <div>
                        <span className="badge bg-light text-primary border px-2.5 py-1 rounded-pill small fw-semibold mb-1">
                          {srv.category}
                        </span>
                        <h3 className="h4 fw-bold text-dark mb-0">{srv.title}</h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-primary fw-semibold small mb-3">{srv.tagline}</p>
                  <p className="text-muted small mb-4">{srv.overview}</p>

                  {/* Pricing and Turnaround Bar */}
                  <div className="p-3 rounded-3 bg-light border d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <span className="text-muted small d-block">Starting from</span>
                      <strong className="h5 fw-bold text-dark mb-0">
                        ₹{srv.startingPrice.toLocaleString()}
                      </strong>
                      <span className="text-muted small"> / project</span>
                    </div>
                    <div className="text-end">
                      <span className="text-muted small d-block">Turnaround SLA</span>
                      <div className="d-flex align-items-center gap-1 small fw-semibold text-slate-800">
                        <Clock size={14} className="text-primary" />
                        <span>{srv.deliveryTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Deliverables Checklist */}
                  <h6 className="fw-bold text-dark small text-uppercase tracking-wider mb-2">
                    What's Included:
                  </h6>
                  <ul className="list-unstyled space-y-2 mb-4">
                    {srv.deliverables.map((del, idx) => (
                      <li key={idx} className="d-flex align-items-start gap-2 text-secondary small">
                        <Check size={16} className="text-success shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="mb-4">
                    <span className="text-muted small d-block mb-1.5 fw-semibold">Tech & Creative Tools:</span>
                    <div className="d-flex flex-wrap gap-1.5">
                      {srv.technologies.map((t, i) => (
                        <span key={i} className="badge bg-slate-100 text-slate-700 font-monospace py-1 px-2 border">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto pt-3 border-top d-flex gap-2">
                    <button
                      onClick={() => handleBookService(srv)}
                      className="btn btn-primary flex-grow-1 py-2.5 rounded-pill fw-semibold shadow-sm d-inline-flex align-items-center justify-content-center gap-2"
                      style={{ backgroundColor: '#4154f1', borderColor: '#4154f1' }}
                    >
                      <span>Inquire / Request Proposal</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Package & Pricing Estimator */}
      <section className="py-5 bg-white border-top">
        <div className="container py-lg-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="text-primary fw-bold text-uppercase small">Interactive Estimator</span>
              <h2 className="fw-bold text-dark display-6 mb-3">Build Your Custom Growth Package</h2>
              <p className="text-muted mb-4">
                Select the exact capabilities your enterprise requires. Our interactive calculator computes estimated investment with bundled multi-service benefits.
              </p>

              <div className="space-y-2.5">
                {DETAILED_SERVICES.map((s) => {
                  const isChecked = selectedAddons.includes(s.id);
                  return (
                    <div
                      key={s.id}
                      onClick={() => toggleCalculatorAddon(s.id)}
                      className={`p-3 rounded-3 border d-flex align-items-center justify-content-between cursor-pointer transition ${
                        isChecked
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'border-slate-200 bg-white hover-bg-slate-50'
                      }`}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded d-flex align-items-center justify-content-center border transition ${
                            isChecked ? 'bg-primary border-primary text-white' : 'border-slate-300 bg-white'
                          }`}
                          style={{ width: '20px', height: '20px' }}
                        >
                          {isChecked && <Check size={14} />}
                        </div>
                        <div>
                          <div className="fw-bold text-dark small">{s.title}</div>
                          <div className="text-muted text-[11px]">{s.deliveryTime} delivery</div>
                        </div>
                      </div>
                      <strong className="text-dark small">₹{s.startingPrice.toLocaleString()}</strong>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="col-lg-6">
              <div
                className="p-4 p-lg-5 rounded-4 shadow-lg text-white"
                style={{ background: 'linear-gradient(135deg, #012970 0%, #1a3a8f 100%)' }}
              >
                <div className="d-flex align-items-center gap-2 mb-3">
                  <Calculator size={24} className="text-warning" />
                  <h4 className="fw-bold text-white mb-0">Estimated Package Scope</h4>
                </div>
                <p className="text-white-50 small mb-4">
                  Includes full dedicated project manager, GST tax invoices, vector IP transfer, and client portal tracking.
                </p>

                <div className="p-3 bg-white/10 rounded-3 mb-4">
                  <div className="d-flex justify-content-between text-white-50 small mb-1">
                    <span>Selected Services ({selectedAddons.length})</span>
                    <span>Standard Agency Value: ₹{Math.round(calculatedTotal * 1.35).toLocaleString()}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-baseline">
                    <span className="text-white fw-bold">DDS Expo Package:</span>
                    <span className="display-6 fw-bold text-warning">₹{calculatedTotal.toLocaleString()}</span>
                  </div>
                  <div className="text-white-50 text-[11px] mt-1">+ 18% GST with full Input Tax Credit eligibility</div>
                </div>

                <ul className="list-unstyled space-y-2 mb-4 text-white-50 small">
                  <li className="d-flex align-items-center gap-2 text-white">
                    <ShieldCheck size={16} className="text-success" />
                    <span>Includes 30 Days Free Post-Launch Maintenance</span>
                  </li>
                  <li className="d-flex align-items-center gap-2 text-white">
                    <ShieldCheck size={16} className="text-success" />
                    <span>Direct Access to Senior Creative & Engineering Leads</span>
                  </li>
                  <li className="d-flex align-items-center gap-2 text-white">
                    <ShieldCheck size={16} className="text-success" />
                    <span>Fast-Track 50% Advance & Milestone Billing</span>
                  </li>
                </ul>

                <button
                  onClick={handleRequestCalculatedQuote}
                  disabled={selectedAddons.length === 0}
                  className="btn btn-warning text-dark fw-bold w-100 py-3 rounded-pill shadow d-inline-flex align-items-center justify-content-center gap-2"
                >
                  <Sparkles size={18} />
                  <span>Request Official Proposal for this Package</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Production Workflow */}
      <section className="py-5 bg-light">
        <div className="container py-lg-4">
          <div className="text-center max-w-700 mx-auto mb-5">
            <span className="text-primary fw-bold text-uppercase small">Methodology</span>
            <h2 className="fw-bold text-dark">Our 5-Step Delivery Workflow</h2>
            <p className="text-muted">Precision-crafted execution from initial brief to commercial deployment.</p>
          </div>

          <div className="row g-4">
            {[
              {
                step: '01',
                title: 'Discovery & Brief',
                desc: 'Audience intelligence gathering, competitor gap analysis, and defining measurable KPIs.',
              },
              {
                step: '02',
                title: 'AI Prototyping',
                desc: 'Rapid conceptual generation of multiple visual hooks, layouts, and copy variants.',
              },
              {
                step: '03',
                title: 'Production Sprint',
                desc: 'Hand-crafted vector refinement, 4K video grading, and responsive code development.',
              },
              {
                step: '04',
                title: 'Rigorous QA',
                desc: 'Cross-browser testing, Core Web Vitals audit, and multi-round quality review.',
              },
              {
                step: '05',
                title: 'Launch & Support',
                desc: 'Live deployment, tracking setup, client training, and continuous performance tuning.',
              },
            ].map((st, i) => (
              <div key={i} className="col-lg col-md-4 col-sm-6">
                <div className="card h-100 p-3.5 rounded-4 border-0 shadow-sm bg-white text-center">
                  <div className="fw-bold text-primary display-6 mb-2">{st.step}</div>
                  <h6 className="fw-bold text-dark mb-2">{st.title}</h6>
                  <p className="text-muted text-xs mb-0">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
