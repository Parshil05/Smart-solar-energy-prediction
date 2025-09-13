
import React from 'react';
import { PredictionOutputData } from '../types';
import Card from './ui/Card';
import OutputChart from './charts/OutputChart';
import ComparisonChart from './charts/ComparisonChart';
import { CloudIcon, SunIcon, ThermometerIcon, WindIcon } from './icons/WeatherIcons';

interface PredictionOutputProps {
  data: PredictionOutputData | null;
  isLoading: boolean;
  error: string | null;
}

const StatCard: React.FC<{ title: string; value: string; unit?: string; icon?: React.ReactNode }> = ({ title, value, unit, icon }) => (
    <div className="bg-solar-blue-dark p-4 rounded-lg flex items-center">
        {icon && <div className="mr-4 text-solar-yellow">{icon}</div>}
        <div>
            <p className="text-sm text-solar-gray">{title}</p>
            <p className="text-2xl font-bold text-solar-light">
                {value} <span className="text-lg font-normal text-solar-gray">{unit}</span>
            </p>
        </div>
    </div>
);

const RecommendationCard: React.FC<{ title: string; value: string; isOptimal?: boolean; }> = ({ title, value, isOptimal }) => (
    <div className={`p-4 rounded-lg text-center ${isOptimal ? 'bg-solar-green/20' : 'bg-solar-blue-dark'}`}>
        <p className="text-sm text-solar-gray">{title}</p>
        <p className="text-3xl font-bold text-solar-light">{value}</p>
    </div>
);


const PredictionOutput: React.FC<PredictionOutputProps> = ({ data, isLoading, error }) => {
  if (isLoading) {
    return (
        <Card title="Generating Prediction">
            <div className="flex flex-col items-center justify-center h-96 space-y-4">
                 <svg className="animate-spin h-12 w-12 text-solar-yellow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-solar-gray">Analyzing weather patterns and solar data...</p>
            </div>
        </Card>
    );
  }

  if (error) {
    return (
        <Card title="Error">
            <div className="flex flex-col items-center justify-center h-96 text-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 <p className="text-red-400">{error}</p>
            </div>
        </Card>
    );
  }

  if (!data) {
    return (
      <Card title="Prediction Results">
        <div className="flex flex-col items-center justify-center h-96 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-solar-blue-muted mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707.707M12 21v-1m0-16a1 1 0 011 1v4a1 1 0 01-2 0V5a1 1 0 011-1z" /></svg>
            <h3 className="text-xl font-bold text-solar-light">Your Prediction Awaits</h3>
            <p className="text-solar-gray mt-2">Fill in the details on the left and click "Predict Now" to see your solar potential.</p>
        </div>
      </Card>
    );
  }

  const comparisonChartData = [
    { name: 'Current', output: data.predictedOutput.daily, fill: '#778DA9' },
    { name: 'Optimal', output: data.recommendations.maximizedOutput, fill: '#38B2AC' },
  ];

  return (
    <div className="space-y-8">
        <Card title="Predicted Output Summary">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard title="Next 24 Hours" value={data.predictedOutput.daily.toFixed(2)} unit="kWh" icon={<SunIcon />} />
                <StatCard title="Next 7 Days" value={data.predictedOutput.weekly.toFixed(2)} unit="kWh" />
                <StatCard title="Next 30 Days" value={data.predictedOutput.monthly.toFixed(2)} unit="kWh" />
            </div>
        </Card>

        <Card title="Hourly Output Forecast (Next 24 Hours)">
             <div className="h-80">
                <OutputChart data={data.timeSeries} />
            </div>
        </Card>

        <Card title="Actionable Recommendations">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-semibold text-solar-light mb-3">Optimal Panel Orientation</h3>
                    <div className="grid grid-cols-2 gap-4">
                         <RecommendationCard title="Optimal Tilt" value={`${data.recommendations.optimalTilt}°`} />
                         <RecommendationCard title="Optimal Azimuth" value={`${data.recommendations.optimalAzimuth}°`} />
                    </div>
                    <div className="mt-4">
                         <RecommendationCard 
                            title="Predicted Output at Optimal Angles" 
                            value={`${data.recommendations.maximizedOutput.toFixed(2)} kWh`} 
                            isOptimal
                        />
                         <p className="text-center mt-2 text-solar-green font-semibold">
                            +{data.recommendations.improvementPercentage.toFixed(1)}% improvement
                         </p>
                    </div>
                </div>
                 <div className="h-64 md:h-full">
                    <h3 className="text-lg font-semibold text-solar-light mb-3 text-center">Current vs. Optimal Daily Output</h3>
                    <ComparisonChart data={comparisonChartData} />
                </div>
            </div>
        </Card>
        
        <Card title="Environmental Factors (24hr Avg)">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard title="Avg. Temp" value={data.environmentalFactors.averageTemperature.toFixed(1)} unit="°C" icon={<ThermometerIcon />} />
                <StatCard title="Cloud Cover" value={data.environmentalFactors.cloudCover.toFixed(0)} unit="%" icon={<CloudIcon />} />
                <StatCard title="Humidity" value={data.environmentalFactors.humidity.toFixed(0)} unit="%" />
                <StatCard title="Wind Speed" value={data.environmentalFactors.windSpeed.toFixed(1)} unit="km/h" icon={<WindIcon />} />
            </div>
        </Card>
    </div>
  );
};

export default PredictionOutput;
