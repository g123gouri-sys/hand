import { Clock3, RefreshCw } from 'lucide-react'
import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card } from '../ui/card'

const lineData = [{ time: '9:00AM', blue: 250, red: 70, orange: 15 }, { time: '12:00AM', blue: 350, red: 120, orange: 95 }, { time: '3:00PM', blue: 490, red: 110, orange: 65 }, { time: '6:00PM', blue: 490, red: 240, orange: 90 }, { time: '9:00PM', blue: 555, red: 285, orange: 190 }, { time: '12:00PM', blue: 590, red: 335, orange: 240 }, { time: '3:00AM', blue: 700, red: 440, orange: 315 }, { time: '6:00AM', blue: 695, red: 440, orange: 315 }]
const pieData = [{ name: 'Open', value: 40, color: '#28badd' }, { name: 'Click', value: 20, color: '#fc4050' }, { name: 'Bounce', value: 40, color: '#ffa52d' }]

export function AnalyticsCharts() {
  return <section className="charts-grid">
    <Card className="chart-card users-card">
      <div className="chart-heading">
        <h2>Users Behavior</h2>
        <p>24 Hours performance</p>
      </div>
      <div className="line-chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineData} margin={{ top: 48, right: 38, bottom: 30, left: 5 }}>
            <CartesianGrid vertical={false} stroke="#c8c8c8" strokeDasharray="3 3" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: 12 }} dy={10} interval={0} />
            <YAxis domain={[0, 800]} ticks={[0,100,200,300,400,500,600,700,800]} axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: 12 }} width={45} />
            <Tooltip contentStyle={{ borderRadius: 8, borderColor: '#ddd' }} />
            <Line type="monotone" dataKey="blue" stroke="#24b8dc" strokeWidth={5} dot={{ r: 6, fill: '#24b8dc', strokeWidth: 0 }} />
            <Line type="monotone" dataKey="red" stroke="#fb3e4c" strokeWidth={5} dot={{ r: 6, fill: '#fb3e4c', strokeWidth: 0 }} />
            <Line type="monotone" dataKey="orange" stroke="#ffa027" strokeWidth={5} dot={{ r: 6, fill: '#ffa027', strokeWidth: 0 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-legend behavior-legend">
        <span><i className="cyan" />Open</span>
        <span><i className="red" />Click</span>
        <span><i className="orange" />Click Second Time</span>
      </div>
      <div className="card-status chart-status">
        <RefreshCw size={16} />Updated 3 minutes ago
      </div>
    </Card>
    <Card className="chart-card pie-card">
      <div className="chart-heading">
        <h2>Email Statistics</h2>
        <p>Last Campaign Performance</p>
      </div>
      <div className="pie-chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius="55%" outerRadius="78%" paddingAngle={0} label={false} labelLine={false}>{pieData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-legend email-legend">
        <span><i className="cyan" />Open</span>
        <span><i className="red" />Bounce</span>
        <span><i className="orange" />Unsubscribe</span>
      </div>
      <div className="card-status chart-status">
        <Clock3 size={16} />Campaign sent 2 days ago
      </div>
    </Card>
  </section>
}
