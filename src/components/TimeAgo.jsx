import { useState, useEffect } from 'react';

const TimeAgo = ({ completionDate, className = "" }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    if (!completionDate) return;

  const calculateTimeAgo = () => {
    const now = new Date();
    const completion = new Date(completionDate);
    const diffInMs = now - completion;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInYears > 0) {
      return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
    } else if (diffInMonths > 0) {
      return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
    } else if (diffInDays > 0) {
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    } else {
      return 'Today';
    }
  };

    setTimeAgo(calculateTimeAgo());

    // Update every day
    const interval = setInterval(calculateTimeAgo, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [completionDate]);

  if (!completionDate) return null;

  return (
    <div className={`text-sm text-gray-500 ${className}`}>
      <span className="inline-flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {timeAgo}
      </span>
    </div>
  );
};

export default TimeAgo;
