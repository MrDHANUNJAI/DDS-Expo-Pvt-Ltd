import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { GALLERY_PROJECTS, GalleryProject } from '../data/richContentData';
import { useNavigation } from '../context/NavigationContext';
import {
  Briefcase,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  X,
  ExternalLink,
  Award,
  TrendingUp,
} from 'lucide-react';
import { ServiceItem } from '../types';

interface WorkGalleryPageProps {
  onOpenEnquiry: (service?: ServiceItem | null) => void;
}

export const WorkGalleryPage: React.FC<WorkGalleryPageProps> = ({ onOpenEnquiry }) => {
  const { pageParams } = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<GalleryProject | null>(null);

  // Sync category from URL params if passed from Navbar dropdown
  useEffect(() => {
    if (pageParams.category) {
      setSelectedCategory(pageParams.category);
    }
    if (pageParams.subCategory) {
      setSelectedSubCategory(pageParams.subCategory);
    }
  }, [pageParams]);

  const categories = [
    'All',
    'Creatives & Ads',
    'Identity & Print',
    'Video Marketing',
    'Web & Tech',
    'Social Growth',
  ];

  // Derive available subcategories based on chosen category
  const availableSubCategories = [
    'All',
    ...Array.from(
      new Set(
        GALLERY_PROJECTS.filter(
          (p) => selectedCategory === 'All' || p.category === selectedCategory
        ).map((p) => p.subCategory)
      )
    ),
  ];

  const filteredProjects = GALLERY_PROJECTS.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSubCategory =
      selectedSubCategory === 'All' || p.subCategory === selectedSubCategory;
    return matchesCategory && matchesSubCategory;
  });

  const handleInquireProject = (project: GalleryProject) => {
    setActiveProject(null);
    const mappedService: ServiceItem = {
      id: `project-${project.id}`,
      title: `${project.subCategory} Proposal (Ref: ${project.title})`,
      description: `Inquiry inspired by ${project.client} case study`,
      icon: 'bi-award',
      className: 'item-primary',
      accentColor: '#4154f1',
    };
    onOpenEnquiry(mappedService);
  };

  return (
    <div className="work-gallery-page">
      <PageHeader
        title="Work Gallery & Commercial Portfolio"
        subtitle="Explore our track record of 500+ deployed projects across high-converting print creatives, viral video reels, high-speed web portals, and B2B ad funnels."
        categoryBadge="Featured Showcase"
      />

      {/* Main Categories Bar */}
      <section className="py-4 bg-white border-bottom sticky-top shadow-sm" style={{ top: '70px', zIndex: 10 }}>
        <div className="container">
          <div className="d-flex align-items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            <span className="text-muted small fw-semibold me-2 d-none d-md-inline">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedSubCategory('All');
                }}
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

          {/* Subcategory Pills */}
          {availableSubCategories.length > 2 && (
            <div className="d-flex align-items-center gap-1.5 overflow-x-auto pt-2.5 scrollbar-none border-top mt-2.5">
              <span className="text-muted text-[11px] fw-bold uppercase me-1">Specialization:</span>
              {availableSubCategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubCategory(sub)}
                  className={`btn btn-xs py-0.5 px-2.5 rounded-pill text-nowrap text-xs transition ${
                    selectedSubCategory === sub
                      ? 'btn-dark text-white'
                      : 'btn-outline-secondary text-secondary'
                  }`}
                  style={{ fontSize: '11px' }}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-5 bg-light">
        <div className="container py-lg-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="fw-bold text-dark mb-0">
                {selectedCategory === 'All' ? 'All Verified Deployments' : selectedCategory}
              </h4>
              <span className="text-muted small">
                Showing {filteredProjects.length} case studies
              </span>
            </div>
          </div>

          <div className="row g-4">
            {filteredProjects.map((project) => (
              <div key={project.id} className="col-lg-4 col-md-6">
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white transition hover-shadow-md d-flex flex-column">
                  {/* Thumbnail Banner */}
                  <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-100 h-100 object-fit-cover transition transform hover-scale-105"
                      style={{ transition: 'transform 0.4s ease' }}
                    />
                    <span className="position-absolute top-0 start-0 m-3 badge bg-white text-primary shadow-sm px-2.5 py-1 rounded-pill small fw-bold">
                      {project.subCategory}
                    </span>
                    <span className="position-absolute top-0 end-0 m-3 badge bg-dark/80 text-white shadow-sm px-2.5 py-1 rounded-pill text-[11px]">
                      {project.year}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <div className="d-flex justify-content-between text-muted text-xs mb-1">
                      <span>{project.client}</span>
                      <span className="text-slate-400">•</span>
                      <span>{project.industry}</span>
                    </div>

                    <h5 className="fw-bold text-dark mb-2 line-clamp-2" style={{ minHeight: '48px' }}>
                      {project.title}
                    </h5>

                    <p className="text-muted text-xs mb-3 flex-grow-1 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Metric Highlight Box */}
                    <div className="p-2.5 rounded-3 bg-primary/5 border border-primary/10 d-flex align-items-center justify-content-between mb-3">
                      <div>
                        <span className="text-muted text-[10px] uppercase d-block">{project.metricLabel}</span>
                        <strong className="text-primary h6 fw-bold mb-0">{project.metric}</strong>
                      </div>
                      <TrendingUp size={20} className="text-primary opacity-60" />
                    </div>

                    {/* Tech Badges */}
                    <div className="d-flex flex-wrap gap-1 mb-3">
                      {project.techStack.slice(0, 3).map((t, i) => (
                        <span key={i} className="badge bg-slate-100 text-slate-700 text-[10px] font-monospace px-1.5 py-0.5 border">
                          {t}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="badge bg-slate-100 text-slate-500 text-[10px] px-1 py-0.5 border">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Action */}
                    <div className="pt-3 border-top mt-auto">
                      <button
                        onClick={() => setActiveProject(project)}
                        className="btn btn-outline-primary btn-sm w-100 rounded-pill fw-semibold d-inline-flex align-items-center justify-content-center gap-1.5"
                      >
                        <span>View Case Study Details</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Details Modal */}
      {activeProject && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(1, 41, 112, 0.7)', backdropFilter: 'blur(4px)', zIndex: 1050 }}
          onClick={() => setActiveProject(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 rounded-4 shadow-2xl overflow-hidden bg-white">
              {/* Header */}
              <div className="modal-header border-bottom px-4 py-3 bg-white">
                <div>
                  <span className="badge bg-primary px-2.5 py-1 rounded-pill small mb-1">
                    {activeProject.category} • {activeProject.subCategory}
                  </span>
                  <h4 className="fw-bold text-dark mb-0">{activeProject.title}</h4>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary rounded-circle"
                  onClick={() => setActiveProject(null)}
                  style={{ width: '32px', height: '32px', padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="modal-body p-4 p-lg-5">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-100 rounded-3 mb-4 shadow-sm object-fit-cover"
                  style={{ maxHeight: '320px' }}
                />

                {/* Key Metric Bar */}
                <div className="p-3.5 rounded-3 bg-primary/10 border border-primary/20 d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <span className="text-muted small d-block">Validated Business Outcome</span>
                    <strong className="h4 fw-bold text-primary mb-0">{activeProject.metric}</strong>
                    <span className="text-dark small ms-1">({activeProject.metricLabel})</span>
                  </div>
                  <Award size={32} className="text-primary" />
                </div>

                <div className="row g-4 mb-4">
                  <div className="col-md-6">
                    <h6 className="fw-bold text-danger small text-uppercase mb-2">The Business Challenge:</h6>
                    <p className="text-secondary small bg-light p-3 rounded-3 border">
                      {activeProject.challenge}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h6 className="fw-bold text-success small text-uppercase mb-2">The DDS Expo Solution:</h6>
                    <p className="text-secondary small bg-light p-3 rounded-3 border">
                      {activeProject.solution}
                    </p>
                  </div>
                </div>

                {/* Deliverables */}
                <h6 className="fw-bold text-dark small text-uppercase tracking-wider mb-2">
                  Key Deliverables Handed Over:
                </h6>
                <ul className="list-unstyled space-y-2 mb-4">
                  {activeProject.deliverables.map((d, idx) => (
                    <li key={idx} className="d-flex align-items-center gap-2 text-dark small">
                      <CheckCircle2 size={16} className="text-success shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div className="mb-2">
                  <span className="text-muted small fw-semibold d-block mb-1.5">Technologies Deployed:</span>
                  <div className="d-flex flex-wrap gap-1.5">
                    {activeProject.techStack.map((t, i) => (
                      <span key={i} className="badge bg-slate-100 text-slate-800 border px-2.5 py-1 font-monospace">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer bg-light px-4 py-3 d-flex justify-content-between">
                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="btn btn-outline-secondary btn-sm px-3 rounded-pill"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => handleInquireProject(activeProject)}
                  className="btn btn-primary btn-sm px-4 py-2 rounded-pill fw-semibold shadow-sm d-inline-flex align-items-center gap-2"
                  style={{ backgroundColor: '#4154f1', borderColor: '#4154f1' }}
                >
                  <span>Request Similar Project Proposal</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
