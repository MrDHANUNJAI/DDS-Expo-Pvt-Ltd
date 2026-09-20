import React from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl = 'https://www.youtube-nocookie.com/embed/jgc6rMVfVFc?autoplay=1',
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal d-block"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        zIndex: 9999,
      }}
      tabIndex={-1}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        onClick={e => e.stopPropagation()}
      >
        <div
          className="modal-content bg-dark border-0 overflow-hidden"
          style={{ borderRadius: '12px' }}
        >
          <div className="d-flex justify-content-end p-2 bg-black">
            <button
              type="button"
              className="btn btn-sm btn-outline-light rounded-circle"
              onClick={onClose}
              aria-label="Close"
              style={{ width: '36px', height: '36px' }}
            >
              <i className="bi bi-x fs-4"></i>
            </button>
          </div>
          <div className="ratio ratio-16x9">
            <iframe
              src={videoUrl}
              title="DDS Expo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};
