import React, { useState } from 'react';
import { CheckIcon } from './Icons';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const categories = [
  "Technology", "Business", "World News", "Science", "Health",
  "Sports", "Entertainment", "Politics", "Travel", "Style"
];

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Technology", "World News", "Science"
  ]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center">
            <h1 className="text-5xl font-bold font-display mb-4">FlashFeed</h1>
            <p className="text-lg text-gray-300 mb-8">Your daily news, in a snap.</p>
            <button
              onClick={() => setStep(2)}
              className="bg-cyan-500 text-white font-bold py-3 px-10 rounded-full text-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              Get Started
            </button>
          </div>
        );
      case 2:
        return (
          <div className="w-full max-w-2xl text-center">
            <h2 className="text-3xl font-bold mb-2">Personalize Your Feed</h2>
            <p className="text-gray-300 mb-6">Select 3 or more topics you're interested in.</p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map(category => {
                const isSelected = selectedCategories.includes(category);
                return (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 border-2 flex items-center justify-center space-x-2 transform hover:scale-105 ${
                      isSelected
                        ? 'bg-cyan-500 border-cyan-500 text-white'
                        : 'bg-transparent border-gray-500 text-gray-300 hover:bg-gray-700 hover:border-gray-700'
                    }`}
                  >
                    {isSelected && <CheckIcon className="w-4 h-4" />}
                    <span>{category}</span>
                  </button>
                )
              })}
            </div>
            <button
              onClick={() => setStep(3)}
              disabled={selectedCategories.length < 3}
              className="bg-cyan-500 text-white font-bold py-3 px-10 rounded-full text-lg transition-colors hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Continue ({selectedCategories.length}/3)
            </button>
          </div>
        );
      case 3:
        return (
          <div className="text-center max-w-md">
            <h2 className="text-3xl font-bold mb-2">Stay in the Loop</h2>
            <p className="text-gray-300 mb-8">Enable notifications to get breaking news alerts and personalized updates.</p>
            <div className="space-y-4">
              <button
                onClick={onComplete}
                className="w-full bg-cyan-500 text-white font-bold py-3 px-10 rounded-full text-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
              >
                Allow Notifications
              </button>
              <button
                onClick={onComplete}
                className="w-full bg-transparent text-gray-300 font-bold py-3 px-10 rounded-full text-lg hover:bg-gray-800 transition-colors"
              >
                Not Now
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center p-4 overflow-hidden">
      <div key={step} className="animate-fade-in-slide-up flex flex-col items-center">
        {renderStep()}
      </div>
    </div>
  );
};

export default OnboardingFlow;