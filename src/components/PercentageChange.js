import React from 'react';

const PercentageChange = ({ value }) => {
  const isPositive = value >= 0;
  return (
    <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
      {isPositive ? '▲' : '▼'} {Math.abs(value)}%
    </span>
  );
};

export default PercentageChange;

