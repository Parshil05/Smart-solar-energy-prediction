
import React from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const FeatureCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
    <div className="bg-solar-blue-light p-6 rounded-lg shadow-xl text-center transition-transform transform hover:-translate-y-2">
        <div className="flex justify-center mb-4 text-solar-yellow">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-solar-light">{title}</h3>
        <p className="text-solar-gray">{description}</p>
    </div>
);


const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="text-center">
      <div 
        className="min-h-[60vh] flex flex-col items-center justify-center bg-cover bg-center rounded-lg p-8"
        style={{backgroundImage: `linear-gradient(rgba(13, 27, 42, 0.8), rgba(13, 27, 42, 0.8)), url('https://picsum.photos/1600/900?image=1018')`}}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight shadow-text">
          Maximize Your Solar Potential
        </h1>
        <p className="text-xl md:text-2xl text-solar-light mb-8 max-w-3xl">
          Leverage our advanced AI to get hyper-accurate solar output predictions and optimize your panel placement for peak efficiency.
        </p>
        <button
          onClick={onGetStarted}
          className="bg-solar-yellow text-solar-blue-dark font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Predict Your Solar Output
        </button>
      </div>

      <div className="py-16" id="about">
        <h2 className="text-4xl font-bold mb-12">Why Choose SolarPredict AI?</h2>
        <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
                title="Accurate Predictions" 
                description="Our AI model analyzes weather data, historical trends, and your specific setup to deliver precise forecasts."
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
            />
            <FeatureCard 
                title="Adaptive Optimization" 
                description="Get actionable recommendations for tilt and azimuth angles, ensuring you capture every possible ray of sunlight."
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
            />
            <FeatureCard 
                title="Actionable Insights" 
                description="Visualize your potential gains with easy-to-understand charts and data, empowering you to make informed decisions."
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
            />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
