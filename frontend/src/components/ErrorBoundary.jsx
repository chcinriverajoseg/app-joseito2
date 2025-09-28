// frontend/src/components/ErrorBoundary.jsx
import React from 'react';

const ErrorBoundary = ({ error }) => {
  return (
    <div className="p-4 bg-red-100 text-red-700 rounded-md">
      <h2 className="font-bold">Ha ocurrido un error</h2>
      {error && <pre className="text-sm mt-2">{error.toString()}</pre>}
    </div>
  );
};

export default ErrorBoundary;
