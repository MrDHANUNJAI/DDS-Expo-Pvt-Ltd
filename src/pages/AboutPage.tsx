import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { useNavigation } from '../context/NavigationContext';
import {
  Award,
  CheckCircle2,
  ShieldCheck,
  Target,
  Sparkles,
  Users,
  Compass,
  Zap,
  TrendingUp,
  ArrowRight,
  Clock,
  Briefcase,
} from 'lucide-react';
import { TEAM, STATS } from '../data/siteData';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="about-page">
      {/* Dedicated Breadcrumb Header */}
      <PageHeader
        title="About DDS Expo"
        subtitle="Empowering brands with cutting-edge artificial intelligence, high-performance web engineering, and award-winning creative execution."
        categoryBadge="Who We Are"
      />

      {/* Origin Story Section */}
      <section className="py-5 bg-white">
        <div className="container py-lg-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="text-primary fw-bold text-uppercase small tracking-wider">Our Origin & Purpose</span>
              <h2 className="fw-bold text-dark display-6 mt-1 mb-4">
                Bridging Human Artistry with Generative Precision
              </h2>
              <p className="text-muted lead fs-6 mb-3">
                Founded by <strong>Mr. Dhanunjay</strong> and <strong>Mrs. Rama Devi</strong> in Visakhapatnam, Andhra Pradesh, DDS Expo started with a single conviction: <em>traditional digital agencies were too slow, too expensive, and too disconnected from business ROI.</em>
              </p>
              <p className="text-muted mb-4">
                We pioneered the integration of proprietary AI creative workflows with full-stack web engineering. Today, we manage end-to-end digital growth for more than 230 enterprises, retail chains, tech startups, and manufacturing groups across India and abroad.
              </p>

              <div className="row g-3 pt-2">
                <div className="col-sm-6">
                  <div className="p-3 rounded-3 bg-light border-start border-primary border-4 h-100">
                    <h5 className="fw-bold text-dark mb-1">500+ Delivered</h5>
                    <p className="small text-muted mb-0">Commercial projects across 20+ diverse industries.</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="p-3 rounded-3 bg-light border-start border-success border-4 h-100">
                    <h5 className="fw-bold text-dark mb-1">99.2% Retention</h5>
                    <p className="small text-muted mb-0">Clients who partner with us for ongoing monthly retainers.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="position-relative">
                <img
                  src="/assets/img/about.jpg"
                  alt="DDS Expo Leadership and Strategy"
                  className="img-fluid rounded-4 shadow-lg w-100"
                  style={{ maxHeight: '460px', objectFit: 'cover' }}
                />
                <div
                  className="position-absolute bottom-0 start-0 m-4 p-3 bg-white rounded-3 shadow-lg border d-flex align-items-center gap-3"
                  style={{ maxWidth: '280px' }}
                >
                  <div className="p-2.5 rounded-circle bg-primary text-white">
                    <Award size={24} />
                  </div>
                  <div>
                    <div className="fw-bold text-dark">ISO & GST Verified</div>
                    <div className="small text-muted">Government recognized enterprise agency</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Dual Cards */}
      <section className="py-5 bg-light">
        <div className="container py-lg-4">
          <div className="text-center max-w-700 mx-auto mb-5">
            <span className="text-primary fw-bold text-uppercase small">Our Compass</span>
            <h2 className="fw-bold text-dark">Mission & Future Vision</h2>
            <p className="text-muted">Guiding our daily design sprints, engineering commits, and client consultations.</p>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4 p-lg-5 bg-white position-relative overflow-hidden">
                <div
                  className="position-absolute top-0 end-0 p-4 opacity-10 text-primary pointer-events-none"
                  style={{ fontSize: '100px', lineHeight: 1 }}
                >
                  <Target />
                </div>
                <div className="d-inline-flex p-3 rounded-3 bg-primary/10 text-primary mb-3">
                  <Target size={28} />
                </div>
                <h3 className="fw-bold text-dark mb-3">Our Mission</h3>
                <p className="text-muted mb-4">
                  To democratize enterprise-grade AI marketing and high-performance digital infrastructure for every ambitious business. We eliminate wasteful agency overhead, deliver measurable customer acquisition, and make premium digital experiences affordable, transparent, and scalable.
                </p>
                <ul className="list-unstyled space-y-2 mb-0">
                  <li className="d-flex align-items-center gap-2 text-dark small fw-semibold">
                    <CheckCircle2 size={16} className="text-success" />
                    <span>Deliver 3x faster turnaround times via proprietary AI workflows.</span>
                  </li>
                  <li className="d-flex align-items-center gap-2 text-dark small fw-semibold">
                    <CheckCircle2 size={16} className="text-success" />
                    <span>Provide 100% transparent pricing with zero hidden surcharges.</span>
                  </li>
                  <li className="d-flex align-items-center gap-2 text-dark small fw-semibold">
                    <CheckCircle2 size={16} className="text-success" />
                    <span>Transfer complete vector source code and IP ownership to clients.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4 p-lg-5 bg-white position-relative overflow-hidden">
                <div
                  className="position-absolute top-0 end-0 p-4 opacity-10 text-success pointer-events-none"
                  style={{ fontSize: '100px', lineHeight: 1 }}
                >
                  <Compass />
                </div>
                <div className="d-inline-flex p-3 rounded-3 bg-success/10 text-success mb-3">
                  <Compass size={28} />
                </div>
                <h3 className="fw-bold text-dark mb-3">Our Vision</h3>
                <p className="text-muted mb-4">
                  To be recognized as India’s foremost AI-native digital solutions provider by 2030, establishing a benchmark where every brand campaign is backed by verified predictive intelligence, emotional storytelling, and resilient cloud software.
                </p>
                <ul className="list-unstyled space-y-2 mb-0">
                  <li className="d-flex align-items-center gap-2 text-dark small fw-semibold">
                    <CheckCircle2 size={16} className="text-primary" />
                    <span>Scale our integrated ERP portal to empower 10,000+ MSME businesses.</span>
                  </li>
                  <li className="d-flex align-items-center gap-2 text-dark small fw-semibold">
                    <CheckCircle2 size={16} className="text-primary" />
                    <span>Foster regional digital talent through paid internships and hands-on AI labs.</span>
                  </li>
                  <li className="d-flex align-items-center gap-2 text-dark small fw-semibold">
                    <CheckCircle2 size={16} className="text-primary" />
                    <span>Pioneer sustainable, energy-efficient edge computing for our client portals.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Milestones Timeline */}
      <section className="py-5 bg-white">
        <div className="container py-lg-4">
          <div className="text-center max-w-700 mx-auto mb-5">
            <span className="text-primary fw-bold text-uppercase small">The DDS Expo Journey</span>
            <h2 className="fw-bold text-dark">Milestones of Innovation</h2>
            <p className="text-muted">From a regional creative studio to a nationally recognized AI agency.</p>
          </div>

          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 p-4 rounded-4 border border-slate-100 shadow-sm text-center">
                <div className="badge bg-primary px-3 py-1.5 rounded-pill mx-auto mb-3 fs-6">2020</div>
                <h5 className="fw-bold text-dark mb-2">Inception & First 50</h5>
                <p className="small text-muted mb-0">
                  Founded in Visakhapatnam. Successfully served our first 50 local retail and healthcare businesses with print and social media creatives.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="card h-100 p-4 rounded-4 border border-slate-100 shadow-sm text-center">
                <div className="badge bg-info text-white px-3 py-1.5 rounded-pill mx-auto mb-3 fs-6">2022</div>
                <h5 className="fw-bold text-dark mb-2">Web & Cloud Systems</h5>
                <p className="small text-muted mb-0">
                  Expanded into full-stack modern web engineering, deploying e-commerce platforms, custom CRMs, and dedicated hosting infrastructure.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="card h-100 p-4 rounded-4 border border-slate-100 shadow-sm text-center">
                <div className="badge bg-success px-3 py-1.5 rounded-pill mx-auto mb-3 fs-6">2024</div>
                <h5 className="fw-bold text-dark mb-2">AI Creative Pipelines</h5>
                <p className="small text-muted mb-0">
                  Launched our proprietary AI design and motion video pipeline, reducing client turnaround times by 65% while maintaining 4K fidelity.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="card h-100 p-4 rounded-4 border border-slate-100 shadow-sm text-center">
                <div className="badge bg-warning text-dark px-3 py-1.5 rounded-pill mx-auto mb-3 fs-6">2026</div>
                <h5 className="fw-bold text-dark mb-2">Enterprise Portal & Beyond</h5>
                <p className="small text-muted mb-0">
                  Surpassed 500+ projects milestone. Launched our Unified ERP & Business Portal with real-time tracking, GST billing, and lead automation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Spotlight */}
      <section className="py-5 bg-light">
        <div className="container py-lg-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5">
            <div>
              <span className="text-primary fw-bold text-uppercase small">Guiding Minds</span>
              <h2 className="fw-bold text-dark mb-1">Executive Leadership</h2>
              <p className="text-muted mb-0">Seasoned pioneers committed to your business success.</p>
            </div>
            <button
              onClick={() => navigateTo('team')}
              className="btn btn-outline-primary px-4 py-2 rounded-pill fw-semibold mt-3 mt-md-0 d-inline-flex align-items-center gap-2"
            >
              <span>View Entire Team Directory</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="row g-4">
            {TEAM.map((member) => (
              <div key={member.id} className="col-lg-3 col-md-6">
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white text-center p-4">
                  <div className="position-relative mx-auto mb-3" style={{ width: '130px', height: '130px' }}>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-100 h-100 rounded-circle object-fit-cover shadow-sm border border-3 border-white"
                    />
                  </div>
                  <h5 className="fw-bold text-dark mb-1">{member.name}</h5>
                  <span className="text-primary small fw-semibold mb-3 d-block">{member.role}</span>
                  <div className="d-flex justify-content-center gap-2 mt-auto pt-3 border-top">
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-secondary rounded-circle"
                        style={{ width: '32px', height: '32px', padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <i className="bi bi-linkedin"></i>
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-secondary rounded-circle"
                        style={{ width: '32px', height: '32px', padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <i className="bi bi-twitter-x"></i>
                      </a>
                    )}
                    {member.socials.instagram && (
                      <a
                        href={member.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-secondary rounded-circle"
                        style={{ width: '32px', height: '32px', padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <i className="bi bi-instagram"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Guarantees */}
      <section className="py-5 bg-white">
        <div className="container py-lg-4">
          <div className="p-5 rounded-4 shadow-sm" style={{ background: 'linear-gradient(135deg, #012970 0%, #1a3a8f 100%)', color: '#fff' }}>
            <div className="row align-items-center g-4">
              <div className="col-lg-8">
                <span className="badge bg-warning text-dark px-3 py-1.5 rounded-pill fw-bold text-uppercase mb-3">Our Ironclad Guarantee</span>
                <h2 className="display-6 fw-bold text-white mb-3">Enterprise Standards. Absolute Reliability.</h2>
                <p className="text-white-50 lead fs-6 mb-4">
                  Every contract signed with DDS Expo includes explicit SLA commitments, non-disclosure confidentiality, and full intellectual property assignments.
                </p>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center gap-2">
                      <ShieldCheck className="text-warning shrink-0" size={20} />
                      <span className="text-white fw-semibold small">100% Vector IP Ownership Transferred</span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center gap-2">
                      <Clock className="text-warning shrink-0" size={20} />
                      <span className="text-white fw-semibold small">Guaranteed Turnaround SLA in Contract</span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center gap-2">
                      <Zap className="text-warning shrink-0" size={20} />
                      <span className="text-white fw-semibold small">GST Invoiced & ITC Input Credit Ready</span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center gap-2">
                      <TrendingUp className="text-warning shrink-0" size={20} />
                      <span className="text-white fw-semibold small">Live Tracking in Client ERP Portal</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 text-lg-end">
                <button
                  onClick={() => navigateTo('contact')}
                  className="btn btn-warning text-dark fw-bold px-4 py-3 rounded-pill shadow-lg d-inline-flex align-items-center gap-2"
                >
                  <span>Start a Conversation</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
