import {Cell, Pie, PieChart, Legend} from 'recharts'

const RADIAN = Math.PI / 180
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const PieChartWithCustomizedLabel = ({data, isAnimationActive = true}) => (
  <PieChart width={400} height={400}>
    <Pie
      data={data}
      labelLine={false}
      label={renderCustomizedLabel}
      fill='#8884d8'
      dataKey='value'
      isAnimationActive={isAnimationActive}
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Legend layout='horizontal' verticalAlign='bottom' align='center' />
  </PieChart>
)

export default PieChartWithCustomizedLabel
