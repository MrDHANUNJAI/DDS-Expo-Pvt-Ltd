import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { useNavigation } from '../context/NavigationContext';
import {
  Zap,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Clock,
  Sparkles,
  ArrowRight,
  Database,
  Lock,
  BarChart3,
  Layers,
} from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="features-page">
      <PageHeader
        title="Features & Unfair Advantages"
        subtitle="Discover why high-growth enterprises and ambitious brands partner with DDS Expo to outpace legacy market competition."
        categoryBadge="Why Choose Us"
      />

      {/* Core Architectural Pillars */}
      <section className="py-5 bg-white">
        <div className="container py-lg-4">
          <div className="text-center max-w-700 mx-auto mb-5">
            <span className="text-primary fw-bold text-uppercase small">Engineered for Growth</span>
            <h2 className="fw-bold text-dark display-6">Our 6 Unfair Capabilities</h2>
            <p className="text-muted">Moving beyond traditional marketing with purpose-built AI execution pipelines.</p>
          </div>

          <div className="row g-4">
            {[
              {
                icon: Cpu,
                color: '#0dcaf0',
                title: 'Proprietary Generative Visual Engine',
                desc: 'We fine-tune custom AI models on your brand colors, fonts, and product photography to produce studio-grade commercial campaign imagery in minutes instead of weeks.',
                metrics: '3x Faster Creative Velocity',
              },
              {
                icon: TrendingUp,
                color: '#20c997',
                title: 'Predictive SEO & Semantic Keyword Clusters',
                desc: 'Google ranking algorithms favor deep topical authority. We map semantic search intent to structure comprehensive articles that outrank legacy keyword-stuffed competitors.',
                metrics: 'Top 3 Organic Search Positions',
              },
              {
                icon: Zap,
                color: '#fd7e14',
                title: 'Viral 3-Second Hook Video Engineering',
                desc: 'Our video team tests hundreds of intro visual hooks, trending audio waveforms, and kinetic subtitles to ensure social algorithms reward your reels with massive organic reach.',
                metrics: '2.4M+ Average Monthly Impressions',
              },
              {
                icon: BarChart3,
                color: '#6610f2',
                title: 'Autonomous Ad Bidding & ROAS Guardian',
                desc: 'Machine learning algorithms continuously analyze cost-per-acquisition across Meta and Google, shifting ad spend in real-time toward the highest-performing audience segments.',
                metrics: '4.6x Average ROAS on Ad Campaigns',
              },
              {
                icon: Layers,
                color: '#df1529',
                title: 'Sub-Second Headless Web Infrastructure',
                desc: 'Engineered with React 18+ and edge serverless caching. Pages render in under 800 milliseconds, boosting Google Core Web Vitals and cutting ad bounce rates in half.',
                metrics: '< 0.8s Mobile Page Load Times',
              },
              {
                icon: Database,
                color: '#f3268c',
                title: 'Integrated Enterprise ERP Transparency',
                desc: 'Never wonder about project statuses. Our integrated ERP portal gives you real-time visibility into task boards, GST invoices, support tickets, and sprint milestones.',
                metrics: '100% Real-Time Milestone Visibility',
              },
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="col-lg-4 col-md-6">
                  <div className="card h-100 p-4 rounded-4 border-0 shadow-sm bg-white transition hover-shadow-md">
                    <div
                      className="p-3 rounded-3 text-white d-inline-flex mb-3"
                      style={{ backgroundColor: feat.color, width: 'fit-content' }}
                    >
                      <Icon size={24} />
                    </div>
                    <h5 className="fw-bold text-dark mb-2">{feat.title}</h5>
                    <p className="text-muted small mb-3 flex-grow-1">{feat.desc}</p>
                    <div className="pt-3 border-top d-flex align-items-center gap-2 text-primary small fw-semibold">
                      <Sparkles size={15} />
                      <span>{feat.metrics}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Direct Comparison Matrix: DDS Expo vs Traditional Agencies vs Freelancers */}
      <section className="py-5 bg-light">
        <div className="container py-lg-4">
          <div className="text-center max-w-700 mx-auto mb-5">
            <span className="text-primary fw-bold text-uppercase small">Direct Comparison</span>
            <h2 className="fw-bold text-dark">Why DDS Expo Stands Apart</h2>
            <p className="text-muted">A candid, transparent look at how our delivery model compares to legacy alternatives.</p>
          </div>

          <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-slate-50 border-bottom">
                  <tr>
                    <th className="py-3.5 px-4 text-dark fw-bold" style={{ width: '34%' }}>
                      Capability / Standard
                    </th>
                    <th className="py-3.5 px-4 text-primary fw-bold bg-primary/5" style={{ width: '26%' }}>
                      <div className="d-flex align-items-center gap-2">
                        <span className="p-1 rounded-circle bg-primary text-white d-inline-flex">
                          <CheckCircle2 size={14} />
                        </span>
                        <span>DDS Expo Agency</span>
                      </div>
                    </th>
                    <th className="py-3.5 px-4 text-muted fw-semibold" style={{ width: '20%' }}>
                      Traditional Agencies
                    </th>
                    <th className="py-3.5 px-4 text-muted fw-semibold" style={{ width: '20%' }}>
                      Freelance Marketplaces
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {[
                    {
                      label: 'Creative & Poster Turnaround',
                      dds: '24 - 48 Hours SLA',
                      trad: '2 - 3 Weeks',
                      free: 'Unpredictable (Days to Weeks)',
                    },
                    {
                      label: 'Video & Short Reels Production',
                      dds: '15 - 30 Dynamic Reels / Mo',
                      trad: '4 - 6 Videos / Mo',
                      free: 'Inconsistent Pacing',
                    },
                    {
                      label: 'Web Performance & Core Web Vitals',
                      dds: 'Sub-Second React/Edge Stack',
                      trad: 'Heavy Bloated Templates',
                      free: 'Basic Theme Installs',
                    },
                    {
                      label: 'Dedicated Project Manager',
                      dds: 'Assigned on Day 1',
                      trad: 'Junior Account Executive',
                      free: 'None (Direct Freelancer)',
                    },
                    {
                      label: 'Real-Time Client ERP Portal',
                      dds: 'Live Task, Invoice & SLA Hub',
                      trad: 'Weekly Manual PDF Reports',
                      free: 'Messy Chat Threads',
                    },
                    {
                      label: 'Intellectual Property Ownership',
                      dds: '100% Vector & Code Handover',
                      trad: 'Retained by Agency / Royalties',
                      free: 'Disputed or Unclear',
                    },
                    {
                      label: 'Billing & GST Compliance',
                      dds: 'Fully GST Tax Invoiced + ITC',
                      trad: 'GST Invoiced (+ Large Retainer)',
                      free: 'Often Unregistered Cash/UPI',
                    },
                    {
                      label: 'Post-Launch Technical Support',
                      dds: '24/7 SLA + 30 Days Free Warranty',
                      trad: 'Expensive Hourly Retainers',
                      free: 'Ghosting or Disappearance',
                    },
                  ].map((row, idx) => (
                    <tr key={idx}>
                      <td className="py-3.5 px-4 fw-semibold text-dark">{row.label}</td>
                      <td className="py-3.5 px-4 fw-bold text-primary bg-primary/5">
                        <div className="d-flex align-items-center gap-2">
                          <CheckCircle2 size={16} className="text-success shrink-0" />
                          <span>{row.dds}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-muted">
                        <div className="d-flex align-items-center gap-2">
                          <XCircle size={16} className="text-danger shrink-0" />
                          <span>{row.trad}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-muted">
                        <div className="d-flex align-items-center gap-2">
                          <XCircle size={16} className="text-secondary shrink-0" />
                          <span>{row.free}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Security, Confidentiality & Compliance */}
      <section className="py-5 bg-white">
        <div className="container py-lg-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="text-primary fw-bold text-uppercase small">Zero Compromise</span>
              <h2 className="fw-bold text-dark display-6 mb-3">Enterprise Security & Compliance</h2>
              <p className="text-muted mb-4">
                We handle sensitive commercial strategies, product roadmaps, and customer financial datasets with rigorous institutional safeguards.
              </p>

              <div className="space-y-3">
                <div className="d-flex gap-3">
                  <div className="p-2.5 rounded-3 bg-primary/10 text-primary shrink-0 h-fit">
                    <Lock size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-1">Standard Non-Disclosure Agreements (NDA)</h6>
                    <p className="small text-muted mb-0">
                      Before touching your codebase or brand strategy, we execute a legally binding mutual NDA protecting all confidential information.
                    </p>
                  </div>
                </div>

                <div className="d-flex gap-3">
                  <div className="p-2.5 rounded-3 bg-success/10 text-success shrink-0 h-fit">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-1">GDPR & DPDP Indian Data Protection Compliant</h6>
                    <p className="small text-muted mb-0">
                      All customer inquiry funnels and lead databases adhere strictly to modern data privacy frameworks and encrypted storage protocols.
                    </p>
                  </div>
                </div>

                <div className="d-flex gap-3">
                  <div className="p-2.5 rounded-3 bg-info/10 text-info shrink-0 h-fit">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-1">99.98% High Availability Cloud SLAs</h6>
                    <p className="small text-muted mb-0">
                      Web platforms and dynamic portals are deployed across globally distributed edge networks with automatic multi-zone failovers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div
                className="p-5 rounded-4 shadow-lg text-white text-center text-lg-start"
                style={{ background: 'linear-gradient(135deg, #012970 0%, #1a3a8f 100%)' }}
              >
                <span className="badge bg-warning text-dark px-3 py-1.5 rounded-pill fw-bold text-uppercase mb-3">
                  Ready to Upgrade?
                </span>
                <h3 className="display-6 fw-bold text-white mb-3">Accelerate Your Brand Today</h3>
                <p className="text-white-50 mb-4">
                  Schedule a 30-minute discovery call with our Chief Technical Advisor to review your current marketing stack and uncover high-ROI AI automation opportunities.
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3">
                  <button
                    onClick={() => navigateTo('contact')}
                    className="btn btn-warning text-dark fw-bold px-4 py-3 rounded-pill shadow d-inline-flex align-items-center justify-content-center gap-2"
                  >
                    <span>Book Strategy Call</span>
                    <ArrowRight size={18} />
                  </button>
                  <button
                    onClick={() => navigateTo('services')}
                    className="btn btn-outline-light px-4 py-3 rounded-pill fw-semibold"
                  >
                    <span>Browse All Services</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
