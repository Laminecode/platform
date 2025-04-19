import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const CircularGraph = ({ graphData, titre }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const graphData2 = graphData.labels.map((label, index) => ({
    name: label,
    value: graphData.datasets[0].data[index]
  }));
  console.log(graphData)

  return (
    <div className="">
      <h2>{titre}</h2>
      <div className='stat' style={{ height: '330px', width: '100%' }}>
        <PieChart width={600} height={330}>
          <Pie
            data={graphData2}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {graphData2.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
        <div className='stat_info'>
          <h2>Details :</h2>
          <p><strong>{graphData2[0].value}</strong> {" "}  {graphData.details[0]}</p>
          <p><strong>{graphData2[1].value}</strong> {" "}  {graphData.details[1]}</p>
        </div>
      </div>
    </div>
  );
};

export default CircularGraph;
