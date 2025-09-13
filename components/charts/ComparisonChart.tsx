
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface ComparisonChartProps {
  data: { name: string; output: number; fill: string }[];
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart 
        data={data}
        margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
        layout="vertical"
      >
        <XAxis type="number" stroke="#778DA9" />
        <YAxis type="category" dataKey="name" stroke="#778DA9" width={60} />
        <Tooltip
            cursor={{fill: 'rgba(119, 141, 169, 0.2)'}}
            contentStyle={{
                backgroundColor: '#1B263B',
                borderColor: '#415A77',
                borderRadius: '0.5rem',
            }}
            labelStyle={{ color: '#E0E1DD' }}
            formatter={(value: number) => [`${value.toFixed(2)} kWh`, "Output"]}
        />
        <Bar dataKey="output" barSize={30} radius={[0, 5, 5, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ComparisonChart;
