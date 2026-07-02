import React, { useEffect } from 'react';

export const ReviewsWidget: React.FC = () => {
  useEffect(() => {
    const src = 'https://reputationhub.site/reputation/assets/review-widget.js';
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <iframe
      className="lc_reviews_widget"
      src="https://reputationhub.site/reputation/widgets/review_widget/CFAAUO2gnPooyim4LdoM"
      frameBorder={0}
      scrolling="no"
      style={{ minWidth: '100%', width: '100%', border: 'none' }}
      title="Google Reviews"
    />
  );
};
