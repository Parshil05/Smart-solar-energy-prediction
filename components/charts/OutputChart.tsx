
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TimeSeriesData } from '../../types';

interface OutputChartProps {
  data: TimeSeriesData[];
}

const OutputChart: React.FC<OutputChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#415A77" />
        <XAxis dataKey="time" stroke="#778DA9" />
        <YAxis stroke="#778DA9" label={{ value: 'Watts (W)', angle: -90, position: 'insideLeft', fill: '#778DA9' }} />
        <Tooltip
            contentStyle={{
                backgroundColor: '#1B263B',
                borderColor: '#415A77',
                borderRadius: '0.5rem',
            }}
            labelStyle={{ color: '#E0E1DD' }}
        />
        <Legend wrapperStyle={{ color: '#E0E1DD' }} />
        <Line type="monotone" dataKey="output" name="Predicted Output" stroke="#FFD700" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default OutputChart;
