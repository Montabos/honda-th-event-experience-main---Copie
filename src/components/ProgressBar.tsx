import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  steps: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, steps }) => {
  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <div className="relative">
        {/* Barre de progression */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700 -translate-y-1/2" />
        <div 
          className="absolute top-1/2 left-0 h-1 bg-red-600 -translate-y-1/2 transition-all duration-300"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />

        {/* Points et étapes */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full border-2 ${
                  index <= currentStep
                    ? 'border-red-600 bg-red-600'
                    : 'border-gray-700 bg-black'
                } relative z-10`}
              />
              <span
                className={`mt-2 text-sm font-medium ${
                  index <= currentStep ? 'text-white' : 'text-gray-500'
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar; 