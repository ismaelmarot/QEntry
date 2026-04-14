import styled from 'styled-components';

export const ChartCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

export const ChartTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1C1C1E;
  margin: 0 0 16px 0;
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: 250px;
`;

export const ChartsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LineChart, Line, AreaChart, Area } from 'recharts';