
import React from 'react';
import { useSolarPrediction } from '../hooks/useSolarPrediction';
import PredictionInput from './PredictionInput';
import PredictionOutput from './PredictionOutput';

const Dashboard: React.FC = () => {
  const { 
    predictionData, 
    isLoading, 
    error, 
    fetchPrediction,
    resetPrediction,
  } = useSolarPrediction();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4">
        <PredictionInput 
          isLoading={isLoading} 
          onSubmit={fetchPrediction}
          onReset={resetPrediction}
        />
      </div>
      <div className="lg:col-span-8">
        <PredictionOutput 
          data={predictionData} 
          isLoading={isLoading} 
          error={error} 
        />
      </div>
    </div>
  );
};

export default Dashboard;
