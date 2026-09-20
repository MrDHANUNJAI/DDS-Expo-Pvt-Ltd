import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { ChevronRight, Home } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  categoryBadge?: string;
  breadcrumbs?: { label: string; action?: () => void }[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  categoryBadge,
  breadcrumbs,
}) => {
  const { navigateTo } = useNavigation();

  return (
    <section
      className="position-relative overflow-hidden text-white"
      style={{
        background: 'linear-gradient(135deg, #012970 0%, #1a3a8f 50%, #4154f1 100%)',
        paddingTop: '130px',
        paddingBottom: '60px',
      }}
    >
      {/* Decorative subtle background overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, #ffffff 0%, transparent 40%), radial-gradient(circle at 80% 70%, #20c997 0%, transparent 50%)',
        }}
      />

      <div className="container position-relative z-1">
        <div className="row align-items-center">
          <div className="col-lg-8">
            {/* Breadcrumbs */}
            <nav aria-label="breadcrumb" className="mb-3">
              <ol className="breadcrumb mb-0 bg-transparent p-0 small">
                <li className="breadcrumb-item">
                  <button
                    onClick={() => navigateTo('home')}
                    className="btn btn-link p-0 text-white-50 text-decoration-none d-inline-flex align-items-center hover-text-white transition"
                    style={{ fontSize: '13px' }}
                  >
                    <Home size={14} className="me-1" /> Home
                  </button>
                </li>
                {breadcrumbs ? (
                  breadcrumbs.map((bc, idx) => (
                    <li
                      key={idx}
                      className={`breadcrumb-item ${
                        idx === breadcrumbs.length - 1 ? 'text-white fw-semibold active' : 'text-white-50'
                      }`}
                      style={{ fontSize: '13px' }}
                    >
                      {bc.action ? (
                        <button
                          onClick={bc.action}
                          className="btn btn-link p-0 text-white-50 text-decoration-none hover-text-white"
                          style={{ fontSize: '13px' }}
                        >
                          {bc.label}
                        </button>
                      ) : (
                        bc.label
                      )}
                    </li>
                  ))
                ) : (
                  <li className="breadcrumb-item active text-white fw-semibold" style={{ fontSize: '13px' }}>
                    {title}
                  </li>
                )}
              </ol>
            </nav>

            {categoryBadge && (
              <span className="badge bg-white/20 text-white px-3 py-1.5 rounded-pill mb-2 fw-semibold text-uppercase tracking-wider" style={{ fontSize: '11px' }}>
                {categoryBadge}
              </span>
            )}

            <h1 className="display-5 fw-bold mb-2 text-white">{title}</h1>
            {subtitle && (
              <p className="lead text-white-50 mb-0" style={{ maxWidth: '680px', fontSize: '17px' }}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
