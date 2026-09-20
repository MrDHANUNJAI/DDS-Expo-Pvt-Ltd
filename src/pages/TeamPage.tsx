import React, { useState } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { useNavigation } from '../context/NavigationContext';
import {
  Users,
  Award,
  Briefcase,
  Heart,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { TEAM } from '../data/siteData';

interface DetailedTeamMember {
  id: string;
  name: string;
  role: string;
  department: 'Leadership' | 'Engineering' | 'Creative & Video' | 'Marketing & Growth' | 'Client Success';
  experience: string;
  bio: string;
  skills: string[];
  image: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

const EXTENDED_TEAM: DetailedTeamMember[] = [
  {
    id: 'dhanunjay',
    name: 'Mr. Dhanunjay Potini',
    role: 'Founder & Chief Executive Officer',
    department: 'Leadership',
    experience: '8+ Years',
    bio: 'Visionary entrepreneur pioneering commercial AI adoption across South India. Oversees corporate strategy, major enterprise accounts, and technical innovation.',
    skills: ['AI Strategy', 'Enterprise Sales', 'Brand Architecture', 'Full-Stack Architecture'],
    image: '/assets/img/team/team-1.png',
    socials: {
      linkedin: 'https://www.linkedin.com/in/digital-dhanu-ai-11454b293/',
      twitter: 'https://x.com/ddsexpoofficial',
      instagram: 'https://www.instagram.com/dds_expo/',
    },
  },
  {
    id: 'rama-devi',
    name: 'Mrs. Rama Devi Gollavilli',
    role: 'Co-Founder & Director of Operations',
    department: 'Leadership',
    experience: '7+ Years',
    bio: 'Directs corporate governance, financial planning, and cross-departmental operations. Champions customer-centric delivery and employee welfare.',
    skills: ['Operations Governance', 'Financial Analytics', 'Team Leadership', 'Client Experience'],
    image: '/assets/img/team/team-2.png',
    socials: {
      linkedin: 'https://www.linkedin.com/in/digital-dhanu-ai-11454b293/',
      twitter: 'https://x.com/ddsexpoofficial',
      instagram: 'https://www.instagram.com/dds_expo/',
    },
  },
  {
    id: 'srikanth',
    name: 'Mr. Srikanth Potini',
    role: 'Chief Technical Advisor',
    department: 'Leadership',
    experience: '10+ Years',
    bio: 'Veteran software architect specializing in scalable distributed cloud infrastructure, microservices, and enterprise web application performance.',
    skills: ['Cloud Architecture', 'React & Node.js', 'System Security', 'DevOps & CI/CD'],
    image: '/assets/img/team/team-3.png',
    socials: {
      linkedin: 'https://www.linkedin.com/in/digital-dhanu-ai-11454b293/',
      twitter: 'https://x.com/ddsexpoofficial',
      instagram: 'https://www.instagram.com/dds_expo/',
    },
  },
  {
    id: 'sanjay',
    name: 'Mr. Sanjay Kumar',
    role: 'Head of Business Development & Accounts',
    department: 'Marketing & Growth',
    experience: '6+ Years',
    bio: 'Leads our commercial client acquisition and accounts management team, structuring customized digital growth packages and SLA fulfillment.',
    skills: ['B2B Sales', 'Lead Funnel Architecture', 'Contract Negotiation', 'Client Growth'],
    image: '/assets/img/team/team-4.png',
    socials: {
      linkedin: 'https://www.linkedin.com/in/digital-dhanu-ai-11454b293/',
      twitter: 'https://x.com/ddsexpoofficial',
      instagram: 'https://www.instagram.com/dds_expo/',
    },
  },
  {
    id: 'ananya',
    name: 'Ananya Varma',
    role: 'Senior AI Creative Director',
    department: 'Creative & Video',
    experience: '5+ Years',
    bio: 'Award-winning visual designer merging commercial advertising aesthetics with advanced generative diffusion models to produce viral brand collateral.',
    skills: ['Midjourney Pro', 'Photoshop Master', 'Brand Guidelines', 'Typography'],
    image: '/assets/img/team/team-2.png',
    socials: {
      linkedin: 'https://www.linkedin.com/company/ddsexpo',
      instagram: 'https://www.instagram.com/dds_expo/',
    },
  },
  {
    id: 'karthik',
    name: 'Karthik Raju',
    role: 'Lead Full-Stack Web Engineer',
    department: 'Engineering',
    experience: '4+ Years',
    bio: 'Passionate frontend and API developer delivering sub-second Next.js applications, automated headless CMS, and secure payment integrations.',
    skills: ['TypeScript', 'React 18+', 'Tailwind CSS', 'PostgreSQL', 'Cloud Run'],
    image: '/assets/img/team/team-1.png',
    socials: {
      linkedin: 'https://www.linkedin.com/company/ddsexpo',
      twitter: 'https://x.com/ddsexpoofficial',
    },
  },
  {
    id: 'priya',
    name: 'Priya Sharma',
    role: 'Lead Video Editor & Motion Artist',
    department: 'Creative & Video',
    experience: '4+ Years',
    bio: 'Crafts scroll-stopping 9:16 vertical reels and YouTube long-form video content with kinetic text, custom sound design, and viral pacing.',
    skills: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Sound Design'],
    image: '/assets/img/team/team-2.png',
    socials: {
      linkedin: 'https://www.linkedin.com/company/ddsexpo',
      instagram: 'https://www.instagram.com/dds_expo/',
    },
  },
  {
    id: 'vikram',
    name: 'Vikram Reddy',
    role: 'Paid Media & Performance Specialist',
    department: 'Marketing & Growth',
    experience: '5+ Years',
    bio: 'Data-driven PPC strategist managing high-scale Meta and Google Ads campaigns with algorithmic bidding and deep conversion tracking.',
    skills: ['Meta Ads Manager', 'Google Ads Search', 'GA4 Attribution', 'Funnel CRO'],
    image: '/assets/img/team/team-3.png',
    socials: {
      linkedin: 'https://www.linkedin.com/company/ddsexpo',
      twitter: 'https://x.com/ddsexpoofficial',
    },
  },
];

export const TeamPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [selectedDept, setSelectedDept] = useState<string>('All');

  const departments = [
    'All',
    'Leadership',
    'Creative & Video',
    'Engineering',
    'Marketing & Growth',
  ];

  const filteredTeam =
    selectedDept === 'All'
      ? EXTENDED_TEAM
      : EXTENDED_TEAM.filter((m) => m.department === selectedDept);

  return (
    <div className="team-page">
      <PageHeader
        title="Our Leadership & Team"
        subtitle="Meet the multidisciplinary team of designers, engineers, AI specialists, and strategists behind DDS Expo's breakthrough client results."
        categoryBadge="The Innovators"
      />

      {/* Department Filter Bar */}
      <section className="py-4 bg-white border-bottom sticky-top shadow-sm" style={{ top: '70px', zIndex: 10 }}>
        <div className="container">
          <div className="d-flex align-items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            <span className="text-muted small fw-semibold me-2 d-none d-md-inline">Department:</span>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`btn btn-sm px-3.5 py-1.5 rounded-pill text-nowrap fw-semibold transition ${
                  selectedDept === dept
                    ? 'btn-primary text-white shadow-sm'
                    : 'btn-light text-secondary hover-bg-slate-200'
                }`}
                style={selectedDept === dept ? { backgroundColor: '#4154f1', borderColor: '#4154f1' } : {}}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Team Cards Grid */}
      <section className="py-5 bg-light">
        <div className="container py-lg-4">
          <div className="row g-4">
            {filteredTeam.map((member) => (
              <div key={member.id} className="col-lg-3 col-md-6">
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white p-4 d-flex flex-column text-center transition hover-shadow-md">
                  {/* Avatar */}
                  <div className="position-relative mx-auto mb-3" style={{ width: '130px', height: '130px' }}>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-100 h-100 rounded-circle object-fit-cover shadow-sm border border-4 border-white"
                    />
                    <span
                      className="position-absolute bottom-0 end-0 badge bg-primary text-white rounded-pill px-2 py-1 text-[10px]"
                      title="Experience"
                    >
                      {member.experience}
                    </span>
                  </div>

                  <h5 className="fw-bold text-dark mb-1">{member.name}</h5>
                  <div className="text-primary small fw-semibold mb-2">{member.role}</div>
                  <span className="badge bg-light text-secondary border px-2 py-0.5 rounded-pill text-[11px] mb-3 mx-auto">
                    {member.department}
                  </span>

                  <p className="text-muted text-xs mb-3 flex-grow-1" style={{ lineHeight: '1.55' }}>
                    {member.bio}
                  </p>

                  {/* Skills tags */}
                  <div className="d-flex flex-wrap justify-content-center gap-1 mb-3">
                    {member.skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="badge bg-slate-100 text-slate-700 text-[10px] font-monospace py-1 px-1.5 border">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Social links */}
                  <div className="pt-3 border-top d-flex justify-content-center gap-2 mt-auto">
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-secondary rounded-circle"
                        style={{ width: '30px', height: '30px', padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <i className="bi bi-linkedin" style={{ fontSize: '13px' }}></i>
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-secondary rounded-circle"
                        style={{ width: '30px', height: '30px', padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <i className="bi bi-twitter-x" style={{ fontSize: '13px' }}></i>
                      </a>
                    )}
                    {member.socials.instagram && (
                      <a
                        href={member.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-secondary rounded-circle"
                        style={{ width: '30px', height: '30px', padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <i className="bi bi-instagram" style={{ fontSize: '13px' }}></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture & Life at DDS Expo */}
      <section className="py-5 bg-white">
        <div className="container py-lg-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="text-primary fw-bold text-uppercase small">Our Work Culture</span>
              <h2 className="fw-bold text-dark display-6 mb-3">Where Ambition Meets Empathy</h2>
              <p className="text-muted mb-4">
                At DDS Expo, we believe that world-class client deliverables are only possible when team members feel trusted, challenged, and inspired.
              </p>

              <div className="row g-3">
                <div className="col-sm-6">
                  <div className="p-3 rounded-3 bg-light border h-100">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <Lightbulb size={18} className="text-warning" />
                      <h6 className="fw-bold text-dark mb-0">Daily Innovation Labs</h6>
                    </div>
                    <p className="text-muted text-xs mb-0">20% dedicated time for experimenting with bleeding-edge AI models.</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="p-3 rounded-3 bg-light border h-100">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <Heart size={18} className="text-danger" />
                      <h6 className="fw-bold text-dark mb-0">Wellness & Growth</h6>
                    </div>
                    <p className="text-muted text-xs mb-0">Comprehensive health coverage, paid parental leave, and gym perks.</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="p-3 rounded-3 bg-light border h-100">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <Briefcase size={18} className="text-primary" />
                      <h6 className="fw-bold text-dark mb-0">Meritocracy First</h6>
                    </div>
                    <p className="text-muted text-xs mb-0">Accelerated promotion track based purely on measurable client impact.</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="p-3 rounded-3 bg-light border h-100">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <Award size={18} className="text-success" />
                      <h6 className="fw-bold text-dark mb-0">Quarterly Spot Bonuses</h6>
                    </div>
                    <p className="text-muted text-xs mb-0">Direct profit-sharing on breakthrough campaigns and client wins.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div
                className="p-5 rounded-4 shadow-lg text-white"
                style={{ background: 'linear-gradient(135deg, #012970 0%, #1a3a8f 100%)' }}
              >
                <div className="badge bg-warning text-dark px-3 py-1.5 rounded-pill fw-bold text-uppercase mb-3">
                  We Are Actively Hiring
                </div>
                <h3 className="display-6 fw-bold text-white mb-3">Build Your Career at DDS Expo</h3>
                <p className="text-white-50 mb-4">
                  We have open full-time and paid internship positions across Graphic Design, Video Editing, Full-Stack Development, and Business Development.
                </p>

                <ul className="list-unstyled space-y-2 mb-4 text-white-50 small">
                  <li className="d-flex align-items-center gap-2 text-white">
                    <CheckCircle2 size={16} className="text-success" />
                    <span>Work with top regional and national consumer brands.</span>
                  </li>
                  <li className="d-flex align-items-center gap-2 text-white">
                    <CheckCircle2 size={16} className="text-success" />
                    <span>Competitive compensation + generous performance bonuses.</span>
                  </li>
                  <li className="d-flex align-items-center gap-2 text-white">
                    <CheckCircle2 size={16} className="text-success" />
                    <span>Modern workstation setups (Apple M-series & 4K displays).</span>
                  </li>
                </ul>

                <button
                  onClick={() => navigateTo('careers')}
                  className="btn btn-warning text-dark fw-bold px-4 py-3 rounded-pill shadow d-inline-flex align-items-center gap-2"
                >
                  <span>Explore Open Positions & Apply</span>
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
