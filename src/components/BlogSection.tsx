import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/siteData';
import { BlogPost } from '../types';

interface BlogSectionProps {
  onReadPost?: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onReadPost }) => {
  const [activeModalPost, setActiveModalPost] = useState<BlogPost | null>(null);

  const handleOpen = (post: BlogPost) => {
    if (onReadPost) {
      onReadPost(post);
    } else {
      setActiveModalPost(post);
    }
  };

  return (
    <section id="recent-posts" className="recent-posts section py-5 bg-white">
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
          Recent Posts
        </h2>
        <p className="fw-bold fs-2" style={{ color: '#012970' }}>
          Recent posts form our Blog
        </p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {BLOG_POSTS.map(post => (
            <div key={post.id} className="col-xl-4 col-md-6">
              <div
                className="post-item position-relative h-100 bg-white rounded shadow-sm overflow-hidden d-flex flex-column"
                style={{ border: '1px solid #f0f4fb' }}
              >
                <div
                  className="post-img position-relative overflow-hidden"
                  style={{ height: '220px' }}
                >
                  <img
                    src={post.image}
                    className="img-fluid w-100 h-100"
                    alt={post.title}
                    style={{ objectFit: 'cover' }}
                  />
                  <span
                    className="post-date position-absolute bottom-0 end-0 bg-primary text-white px-3 py-1 small fw-semibold"
                    style={{ borderTopLeftRadius: '6px' }}
                  >
                    {post.date}
                  </span>
                </div>
                <div className="post-content p-4 d-flex flex-column flex-grow-1">
                  <h3
                    className="post-title fw-bold fs-5 mb-3"
                    style={{ color: '#012970', lineHeight: '1.4' }}
                  >
                    {post.title}
                  </h3>
                  <div className="meta d-flex align-items-center text-muted small mb-3">
                    <div className="d-flex align-items-center me-2">
                      <i className="bi bi-person me-1 text-primary"></i>
                      <span>{post.author}</span>
                    </div>
                    <span className="mx-2">/</span>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-folder2 me-1 text-primary"></i>
                      <span>{post.category}</span>
                    </div>
                  </div>
                  <hr className="mt-auto mb-3" />
                  <button
                    type="button"
                    onClick={() => handleOpen(post)}
                    className="readmore d-inline-flex align-items-center bg-transparent border-0 p-0 fw-semibold text-primary"
                  >
                    <span>Read More</span>
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <button
            type="button"
            onClick={() => handleOpen(BLOG_POSTS[0])}
            className="btn btn-outline-primary px-4 py-2 fw-semibold"
            style={{ borderRadius: '4px' }}
          >
            View All Blogs
          </button>
        </div>
      </div>

      {/* Blog Article Quick Preview Modal */}
      {activeModalPost && (
        <div
          className="modal d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050 }}
          tabIndex={-1}
          onClick={() => setActiveModalPost(null)}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold" style={{ color: '#012970' }}>
                  {activeModalPost.title}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setActiveModalPost(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-4">
                <img
                  src={activeModalPost.image}
                  className="img-fluid rounded mb-4 w-100"
                  alt={activeModalPost.title}
                  style={{ maxHeight: '320px', objectFit: 'cover' }}
                />
                <div className="d-flex gap-3 text-muted small mb-3">
                  <span>
                    <i className="bi bi-person me-1"></i> {activeModalPost.author}
                  </span>
                  <span>
                    <i className="bi bi-calendar me-1"></i> {activeModalPost.date}
                  </span>
                  <span>
                    <i className="bi bi-tag me-1"></i> {activeModalPost.category}
                  </span>
                </div>
                <p style={{ lineHeight: '1.8' }}>
                  Artificial Intelligence is revolutionizing modern digital marketing by
                  transforming guesswork into precise algorithmic execution. DDS Expo
                  pioneers AI-driven workflows across lead funnels, automated creative
                  generation, video rendering, and search authority.
                </p>
                <p style={{ lineHeight: '1.8' }}>
                  By analyzing real-time consumer intent and search queries, marketing teams
                  can drive down customer acquisition costs (CAC) while scaling audience
                  reach exponentially across Google Ads, Meta Ads, and automated CRM
                  pipelines.
                </p>
              </div>
              <div className="modal-footer border-0">
                <a
                  href="#contact"
                  onClick={() => setActiveModalPost(null)}
                  className="btn btn-primary px-4"
                >
                  Contact DDS Expo for AI Strategy
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
