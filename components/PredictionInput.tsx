
import React, { useState } from 'react';
import { PredictionInputData, PanelType } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import Slider from './ui/Slider';

interface PredictionInputProps {
  isLoading: boolean;
  onSubmit: (data: PredictionInputData) => void;
  onReset: () => void;
}

const PredictionInput: React.FC<PredictionInputProps> = ({ isLoading, onSubmit, onReset }) => {
  const [city, setCity] = useState<string>('San Francisco');
  const [surfaceArea, setSurfaceArea] = useState<number>(20);
  const [tiltAngle, setTiltAngle] = useState<number>(25);
  const [azimuthAngle, setAzimuthAngle] = useState<number>(180);
  const [panelType, setPanelType] = useState<PanelType>(PanelType.MONOCRYSTALLINE);
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!city) newErrors.city = 'City is required.';
    if (surfaceArea <= 0) newErrors.surfaceArea = 'Surface area must be positive.';
    if (tiltAngle < 0 || tiltAngle > 90) newErrors.tiltAngle = 'Tilt must be between 0 and 90.';
    if (azimuthAngle < 0 || azimuthAngle > 360) newErrors.azimuthAngle = 'Azimuth must be between 0 and 360.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ city, surfaceArea, tiltAngle, azimuthAngle, panelType });
    }
  };

  const handleReset = () => {
    setCity('San Francisco');
    setSurfaceArea(20);
    setTiltAngle(25);
    setAzimuthAngle(180);
    setPanelType(PanelType.MONOCRYSTALLINE);
    setErrors({});
    onReset();
  };

  return (
    <Card title="Prediction Configuration">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-solar-light mb-2">Location</h3>
          <Input
            label="City Name"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            error={errors.city}
            placeholder="e.g., Los Angeles"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-solar-light mb-2">Panel Characteristics</h3>
          <Input
            label="Surface Area (m²)"
            id="surfaceArea"
            type="number"
            value={surfaceArea.toString()}
            onChange={(e) => setSurfaceArea(Number(e.target.value))}
            error={errors.surfaceArea}
          />
          <div className="mt-4">
              <label htmlFor="panelType" className="block text-sm font-medium text-solar-gray mb-1">Panel Type</label>
              <select 
                id="panelType" 
                value={panelType}
                onChange={(e) => setPanelType(e.target.value as PanelType)}
                className="w-full bg-solar-blue-dark border border-solar-blue-muted rounded-md p-2 focus:ring-solar-yellow focus:border-solar-yellow transition"
              >
                  {Object.values(PanelType).map(pt => <option key={pt} value={pt}>{pt}</option>)}
              </select>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-solar-light mb-2">Panel Orientation</h3>
          <Slider
            label="Tilt Angle (degrees)"
            id="tiltAngle"
            min={0}
            max={90}
            value={tiltAngle}
            onChange={(e) => setTiltAngle(Number(e.target.value))}
            error={errors.tiltAngle}
          />
          <Slider
            label="Azimuth Angle (degrees)"
            id="azimuthAngle"
            min={0}
            max={360}
            value={azimuthAngle}
            onChange={(e) => setAzimuthAngle(Number(e.target.value))}
            error={errors.azimuthAngle}
            className="mt-4"
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <Button type="submit" disabled={isLoading} fullWidth>
            {isLoading ? 'Predicting...' : 'Predict Now'}
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset} disabled={isLoading} fullWidth>
            Reset
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default PredictionInput;
