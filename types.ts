
export interface PredictionInputData {
  city: string;
  surfaceArea: number;
  tiltAngle: number;
  azimuthAngle: number;
  panelType: PanelType;
}

export enum PanelType {
  MONOCRYSTALLINE = 'Monocrystalline',
  POLYCRYSTALLINE = 'Polycrystalline',
  THIN_FILM = 'Thin-Film',
}

export interface TimeSeriesData {
  time: string;
  output: number;
}

export interface PredictionOutputData {
  predictedOutput: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  timeSeries: TimeSeriesData[];
  recommendations: {
    optimalTilt: number;
    optimalAzimuth: number;
    maximizedOutput: number;
    improvementPercentage: number;
  };
  environmentalFactors: {
    averageTemperature: number;
    cloudCover: number;
    humidity: number;
    windSpeed: number;
  };
}
