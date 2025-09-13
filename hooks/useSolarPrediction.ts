
import { useState, useCallback } from 'react';
import { PredictionInputData, PredictionOutputData } from '../types';
import { getSolarPrediction } from '../services/geminiService';

export const useSolarPrediction = () => {
  const [predictionData, setPredictionData] = useState<PredictionOutputData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrediction = useCallback(async (input: PredictionInputData) => {
    setIsLoading(true);
    setError(null);
    setPredictionData(null);
    try {
      const data = await getSolarPrediction(input);
      setPredictionData(data);
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred.');
        }
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const resetPrediction = useCallback(() => {
    setPredictionData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    predictionData,
    isLoading,
    error,
    fetchPrediction,
    resetPrediction,
  };
};
