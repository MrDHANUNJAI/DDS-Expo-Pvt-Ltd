import React, { useState } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { DETAILED_BLOG_POSTS, DetailedBlogPost } from '../data/richContentData';
import {
  Search,
  Calendar,
  Clock,
  User,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  X,
  Share2,
  Bookmark,
  Sparkles,
  Mail,
} from 'lucide-react';

export const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState<DetailedBlogPost | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const categories = [
    'All',
    'Artificial Intelligence',
    'Tools & Technology',
    'Engineering',
    'Web Development',
  ];

  const filteredPosts = DETAILED_BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = DETAILED_BLOG_POSTS.find((p) => p.featured) || DETAILED_BLOG_POSTS[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 3000);
  };

  return (
    <div className="blog-page">
      <PageHeader
        title="Digital Insights & Thought Leadership"
        subtitle="Practical guides, tactical frameworks, and artificial intelligence case studies from our digital strategists and engineers."
        categoryBadge="Knowledge Hub"
      />

      {/* Search & Filter Header */}
      <section className="py-4 bg-white border-bottom sticky-top shadow-sm" style={{ top: '70px', zIndex: 10 }}>
        <div className="container">
          <div className="row g-3 align-items-center">
            {/* Search Input */}
            <div className="col-lg-4">
              <div className="position-relative">
                <Search
                  size={16}
                  className="position-absolute text-muted top-50 start-0 translate-middle-y ms-3"
                />
                <input
                  type="text"
                  placeholder="Search articles, keywords, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-control ps-5 py-2 rounded-pill small border-slate-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="btn btn-sm btn-link position-absolute top-50 end-0 translate-middle-y me-2 text-muted p-0"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="col-lg-8">
              <div className="d-flex align-items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`btn btn-sm px-3 py-1.5 rounded-pill text-nowrap fw-semibold transition ${
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
          </div>
        </div>
      </section>

      {/* Featured Post Hero Banner (when no search query active) */}
      {!searchQuery && selectedCategory === 'All' && featuredPost && (
        <section className="py-5 bg-light">
          <div className="container py-lg-2">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
              <div className="row g-0 align-items-center">
                <div className="col-lg-6">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-100 h-100 object-fit-cover"
                    style={{ minHeight: '360px', maxHeight: '420px' }}
                  />
                </div>
                <div className="col-lg-6 p-4 p-lg-5">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="badge bg-primary px-3 py-1 rounded-pill small text-uppercase">
                      Featured Spotlight
                    </span>
                    <span className="text-muted small d-flex align-items-center gap-1">
                      <Clock size={13} /> {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="fw-bold text-dark h3 mb-3">{featuredPost.title}</h2>
                  <p className="text-muted small mb-4">{featuredPost.excerpt}</p>

                  <div className="d-flex align-items-center justify-content-between pt-3 border-top">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        className="rounded-circle object-fit-cover"
                        style={{ width: '38px', height: '38px' }}
                      />
                      <div>
                        <div className="fw-bold text-dark small">{featuredPost.author.name}</div>
                        <div className="text-muted text-[11px]">{featuredPost.date}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveArticle(featuredPost)}
                      className="btn btn-primary px-4 py-2 rounded-pill fw-semibold shadow-sm d-inline-flex align-items-center gap-2"
                      style={{ backgroundColor: '#4154f1', borderColor: '#4154f1' }}
                    >
                      <span>Read Article</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-5 bg-white">
        <div className="container py-lg-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold text-dark mb-0">
              {searchQuery ? `Search Results (${filteredPosts.length})` : 'Recent Articles'}
            </h4>
            <span className="text-muted small">Showing {filteredPosts.length} published pieces</span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-5">
              <BookOpen size={48} className="text-muted mb-3 mx-auto" />
              <h5 className="fw-bold text-dark">No articles found</h5>
              <p className="text-muted small">Try adjusting your search terms or selecting a different category.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="btn btn-outline-primary px-4 py-2 rounded-pill small"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="row g-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="col-lg-4 col-md-6">
                  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white transition hover-shadow-md d-flex flex-column">
                    <div className="position-relative" style={{ height: '210px' }}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-100 h-100 object-fit-cover"
                      />
                      <span className="position-absolute top-0 start-0 m-3 badge bg-white text-dark shadow-sm px-2.5 py-1 rounded-pill small fw-semibold">
                        {post.category}
                      </span>
                    </div>

                    <div className="p-4 d-flex flex-column flex-grow-1">
                      <div className="d-flex align-items-center gap-3 text-muted text-xs mb-2">
                        <span className="d-flex align-items-center gap-1">
                          <Calendar size={13} /> {post.date}
                        </span>
                        <span className="d-flex align-items-center gap-1">
                          <Clock size={13} /> {post.readTime}
                        </span>
                      </div>

                      <h5 className="fw-bold text-dark mb-2 line-clamp-2" style={{ minHeight: '48px' }}>
                        {post.title}
                      </h5>

                      <p className="text-muted text-xs mb-3 flex-grow-1 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="d-flex flex-wrap gap-1 mb-3">
                        {post.tags.slice(0, 2).map((t, i) => (
                          <span key={i} className="badge bg-light text-secondary text-[10px] font-monospace px-1.5 py-0.5 border">
                            #{t}
                          </span>
                        ))}
                      </div>

                      <div className="pt-3 border-top d-flex align-items-center justify-content-between mt-auto">
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="rounded-circle object-fit-cover"
                            style={{ width: '28px', height: '28px' }}
                          />
                          <span className="text-dark small fw-semibold">{post.author.name}</span>
                        </div>

                        <button
                          onClick={() => setActiveArticle(post)}
                          className="btn btn-sm btn-link text-primary p-0 text-decoration-none fw-semibold d-inline-flex align-items-center gap-1"
                        >
                          <span>Read</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription Strip */}
      <section className="py-5 bg-light border-top">
        <div className="container py-lg-2">
          <div
            className="p-4 p-lg-5 rounded-4 shadow-sm text-white"
            style={{ background: 'linear-gradient(135deg, #012970 0%, #1a3a8f 100%)' }}
          >
            <div className="row align-items-center g-4">
              <div className="col-lg-7">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <Mail size={22} className="text-warning" />
                  <span className="badge bg-warning text-dark px-3 py-1 rounded-pill fw-bold text-uppercase small">
                    DDS Expo Dispatch
                  </span>
                </div>
                <h3 className="display-6 fw-bold text-white mb-2">Stay Ahead of the AI Curve</h3>
                <p className="text-white-50 mb-0">
                  Receive our hand-curated weekly breakdown of breakthrough generative tools, prompts, and performance marketing strategies directly in your inbox.
                </p>
              </div>

              <div className="col-lg-5">
                {newsletterSubscribed ? (
                  <div className="p-3 bg-success/20 border border-success text-white rounded-3 d-flex align-items-center gap-2">
                    <CheckCircle2 size={20} className="text-success" />
                    <div>
                      <strong className="d-block small">You are now subscribed!</strong>
                      <span className="text-white-50 text-xs">Look out for our welcome guide in your inbox.</span>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="d-flex flex-column flex-sm-row gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Enter your work email address..."
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="form-control py-2.5 px-3 rounded-pill bg-white text-dark border-0 shadow-sm small"
                    />
                    <button
                      type="submit"
                      className="btn btn-warning text-dark fw-bold px-4 py-2.5 rounded-pill shadow-sm text-nowrap"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Article Reader Modal */}
      {activeArticle && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(1, 41, 112, 0.7)', backdropFilter: 'blur(4px)', zIndex: 1050 }}
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 rounded-4 shadow-2xl overflow-hidden">
              {/* Modal Header */}
              <div className="modal-header border-bottom px-4 py-3 bg-white">
                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-primary px-3 py-1 rounded-pill small">
                    {activeArticle.category}
                  </span>
                  <span className="text-muted small d-flex align-items-center gap-1">
                    <Clock size={13} /> {activeArticle.readTime}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary rounded-circle"
                  onClick={() => setActiveArticle(null)}
                  aria-label="Close"
                  style={{ width: '32px', height: '32px', padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="modal-body p-4 p-lg-5 bg-white">
                <h1 className="display-6 fw-bold text-dark mb-3">{activeArticle.title}</h1>

                {/* Author Info Bar */}
                <div className="d-flex align-items-center gap-3 pb-4 mb-4 border-bottom">
                  <img
                    src={activeArticle.author.avatar}
                    alt={activeArticle.author.name}
                    className="rounded-circle object-fit-cover shadow-sm"
                    style={{ width: '48px', height: '48px' }}
                  />
                  <div>
                    <div className="fw-bold text-dark">{activeArticle.author.name}</div>
                    <div className="text-muted small">{activeArticle.author.role} • Published {activeArticle.date}</div>
                  </div>
                </div>

                {/* Article Image Banner */}
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-100 rounded-3 mb-4 object-fit-cover shadow-sm"
                  style={{ maxHeight: '380px' }}
                />

                {/* Article Content */}
                <div className="article-body" style={{ maxWidth: '820px', margin: '0 auto' }}>
                  <p className="lead text-dark fw-medium mb-4 fs-6" style={{ lineHeight: 1.7 }}>
                    {activeArticle.content.introduction}
                  </p>

                  {activeArticle.content.sections.map((sec, idx) => (
                    <div key={idx} className="mb-4">
                      <h4 className="fw-bold text-dark mb-2">{sec.heading}</h4>
                      <p className="text-secondary mb-3" style={{ lineHeight: 1.7 }}>
                        {sec.body}
                      </p>
                      {sec.bulletPoints && (
                        <div className="p-3.5 bg-light rounded-3 border-start border-primary border-4 mb-3">
                          <ul className="list-unstyled space-y-2 mb-0">
                            {sec.bulletPoints.map((bp, i) => (
                              <li key={i} className="d-flex align-items-start gap-2 text-dark small">
                                <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                                <span>{bp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Key Takeaways Box */}
                  <div className="p-4 rounded-4 bg-primary/5 border border-primary/20 mb-4">
                    <div className="d-flex align-items-center gap-2 text-primary fw-bold mb-3">
                      <Sparkles size={18} />
                      <span className="text-uppercase tracking-wider small">Executive Takeaways</span>
                    </div>
                    <ul className="list-unstyled space-y-2 mb-0">
                      {activeArticle.content.keyTakeaways.map((takeaway, i) => (
                        <li key={i} className="d-flex align-items-start gap-2 text-dark small fw-semibold">
                          <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-secondary italic mb-4" style={{ lineHeight: 1.7 }}>
                    {activeArticle.content.conclusion}
                  </p>

                  {/* Tags */}
                  <div className="d-flex flex-wrap gap-2 pt-3 border-top">
                    <span className="text-muted small fw-semibold me-2">Article Tags:</span>
                    {activeArticle.tags.map((t, i) => (
                      <span key={i} className="badge bg-light text-dark border px-2.5 py-1 rounded-pill small">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer bg-light px-4 py-3 d-flex justify-content-between">
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: activeArticle.title,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Article link copied to clipboard!');
                    }
                  }}
                  className="btn btn-outline-secondary btn-sm rounded-pill d-inline-flex align-items-center gap-1.5"
                >
                  <Share2 size={14} />
                  <span>Share Article</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="btn btn-primary btn-sm px-4 rounded-pill fw-semibold"
                  style={{ backgroundColor: '#4154f1', borderColor: '#4154f1' }}
                >
                  Done Reading
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
