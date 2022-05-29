import React from 'react';

function Artifact() {
  return (
    <div>
      {Array(20)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="w-full min-h-screen mb-1 bg-white border border-black/10 p-2"
          >
            <span className="font-sans text-gray-400">P {i}</span>
          </div>
        ))}
    </div>
  );
}

export default Artifact;
