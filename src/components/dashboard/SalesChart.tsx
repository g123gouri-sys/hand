import { Check } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card } from '../ui/card'
const salesData = [{ month: 'Jan', tesla: 510, bmw: 380 }, { month: 'Feb', tesla: 410, bmw: 220 }, { month: 'Mar', tesla: 285, bmw: 250 }, { month: 'Apr', tesla: 760, bmw: 550 }, { month: 'Mai', tesla: 520, bmw: 420 }, { month: 'Jun', tesla: 425, bmw: 320 }, { month: 'Jul', tesla: 290, bmw: 260 }, { month: 'Aug', tesla: 400, bmw: 330 }, { month: 'Sep', tesla: 540, bmw: 335 }, { month: 'Oct', tesla: 580, bmw: 385 }, { month: 'Nov', tesla: 735, bmw: 610 }, { month: 'Dec', tesla: 900, bmw: 660 }]
export function SalesChart() { 
  return <Card className="lower-card sales-card">
    <div className="small-heading">
        <h2>2017 Sales</h2>
        <p>All products including Taxes</p>
    </div>
    <div className="sales-chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData} margin={{ top: 38, right: 10, bottom: 18, left: 5 }} barCategoryGap="35%">
                <CartesianGrid vertical={false} stroke="#c8c8c8" strokeDasharray="3 3" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: 16 }} />
                <YAxis domain={[0, 900]} ticks={[0,100,200,300,400,500,600,700,800,900]} axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: 16 }} width={45} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,.03)' }} />
                <Bar dataKey="tesla" fill="#26b9d9" maxBarSize={11} />
                <Bar dataKey="bmw" fill="#fc4250" maxBarSize={11} />
            </BarChart>
        </ResponsiveContainer>
    </div>
    <div className="chart-legend">
        <span><i className="cyan" />Tesla Model S</span>
        <span><i className="red" />BMW 5 Series</span>
    </div>
    <div className="card-status">
        <Check size={16} />Data information certified
    </div>
 </Card> 
}