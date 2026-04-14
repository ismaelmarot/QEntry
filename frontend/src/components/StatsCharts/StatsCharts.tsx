import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LineChart, Line, AreaChart, Area } from 'recharts'
import { 
  ChartCard as ChartCardStyled, 
  ChartTitle, 
  ChartContainer, 
  ChartsRow 
} from './StatsCharts.styles'
import { useStatsCharts } from './useStatsCharts'
import { DailyDataItem, MonthlyDataItem, PieDataItemProps, StatsChartsProps } from '@/interface'

export function StatsCharts({ stats, logsData }: StatsChartsProps) {
  const { pieData, categoryPieData, dailyData, hourlyDistribution, monthlyTrend } = useStatsCharts(stats, logsData)

  return (
    <>
      <ChartsRow>
        <ChartCardStyled>
          <ChartTitle>Presencial vs Ausente</ChartTitle>
          <ChartContainer>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  cx='50%'
                  cy='50%'
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey='value'
                  label={({ value }) => `${value}%`}
                >
                  {pieData.map((entry: PieDataItemProps, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ChartCardStyled>

        <ChartCardStyled>
          <ChartTitle>Por Categoría</ChartTitle>
          <ChartContainer>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={categoryPieData}
                  cx='50%'
                  cy='50%'
                  outerRadius={80}
                  dataKey='value'
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {categoryPieData.map((entry: PieDataItemProps, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ChartCardStyled>
      </ChartsRow>

      <ChartCardStyled>
        <ChartTitle>Movimiento por Día (7 días)</ChartTitle>
        <ChartContainer>
          <ResponsiveContainer>
            <BarChart data={dailyData as DailyDataItem[]}>
              <XAxis dataKey='date' tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey='in' name="Ingresos" fill="#007AFF" radius={[4, 4, 0, 0]} />
              <Bar dataKey='out' name="Egresos" fill="#5856D6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ChartCardStyled>

      <ChartCardStyled>
        <ChartTitle>Tendencia de Presentismo (6 meses)</ChartTitle>
        <ChartContainer>
          <ResponsiveContainer>
            <AreaChart data={monthlyTrend as MonthlyDataItem[]}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Area type="monotone" dataKey="presentismo" name="Presentismo" stroke="#34C759" fill="#34C759" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ChartCardStyled>

      <ChartCardStyled>
        <ChartTitle>Distribución de Ingresos por Hora</ChartTitle>
        <ChartContainer>
          <ResponsiveContainer>
            <BarChart data={hourlyDistribution}>
              <XAxis dataKey='hour' tick={{ fontSize: 12 }} tickFormatter={(h) => `${h}:00`} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey='count' name='Ingresos' fill="#007AFF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ChartCardStyled>

      <ChartCardStyled>
        <ChartTitle>Tendencia de Llegadas Tarde (7 días)</ChartTitle>
        <ChartContainer>
          <ResponsiveContainer>
            <LineChart data={dailyData as DailyDataItem[]}>
              <XAxis dataKey='date' tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type='monotone' dataKey='late' name='Llegadas Tarde' stroke="#FF9500" strokeWidth={2} dot={{ fill: '#FF9500' }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ChartCardStyled>
    </>
  )
}

export {
  ChartCardStyled,
  ChartTitle,
  ChartContainer,
  ChartsRow,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
}