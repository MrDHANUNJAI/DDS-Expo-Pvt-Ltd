import React, { useState, useEffect, useRef } from 'react';
import { STATS } from '../data/siteData';

function useCountUp(endValue: number, duration: number = 1500, trigger: boolean = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutQuad
      const easedProgress = progress * (2 - progress);
      setCount(Math.floor(easedProgress * endValue));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };

    window.requestAnimationFrame(step);
  }, [endValue, duration, trigger]);

  return count;
}

const StatCounter: React.FC<{ item: (typeof STATS)[0]; inView: boolean }> = ({ item, inView }) => {
  const count = useCountUp(item.count, 1500, inView);

  return (
    <div className="col-lg-3 col-md-6">
      <div
        className="stats-item d-flex align-items-center w-100 h-100 p-4 bg-white shadow-sm"
        style={{ borderRadius: '6px' }}
      >
        <i
          className={`bi ${item.icon} flex-shrink-0 fs-1 me-3`}
          style={{ color: item.color, lineHeight: 1 }}
        ></i>
        <div>
          <span
            className="fw-bold d-block"
            style={{ fontSize: '36px', color: '#012970', lineHeight: 1.1 }}
          >
            {count}
          </span>
          <p className="text-muted mb-0 small text-uppercase fw-semibold">{item.label}</p>
        </div>
      </div>
    </div>
  );
};

export const StatsSection: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" ref={sectionRef} className="stats section py-5">
      <div className="container">
        <div className="row gy-4">
          {STATS.map(item => (
            <StatCounter key={item.id} item={item} inView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};
