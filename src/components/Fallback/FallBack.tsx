import React from 'react';

const FallBack = () => (
  <div className='text-center position-relative' style={{ top: '50%' }}>
    <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default FallBack;
