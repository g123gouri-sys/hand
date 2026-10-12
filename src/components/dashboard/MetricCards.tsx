import type { ElementType } from 'react'
import { CalendarDays, Clock3, Gauge, Heart, RefreshCw, Share2, Sparkles } from 'lucide-react'
import { Card } from '../ui/card'

type MetricProps = { icon: ElementType; accent: string; label: string; value: string; footer: string; footerIcon: ElementType }
function MetricCard({ icon: Icon, accent, label, value, footer, footerIcon: FooterIcon }: MetricProps) { return <Card className="metric-card"><div className="metric-top"><Icon className="metric-icon" style={{ color: accent }} strokeWidth={2.35} /><div className="metric-copy"><span>{label}</span><strong>{value}</strong></div></div><div className="metric-footer"><FooterIcon size={22} strokeWidth={2.4} />{footer}</div></Card> }
export function MetricCards() {
    return <section className="metrics">
     <MetricCard icon={Gauge} accent="#ff9400" label="Number" value="150GB" footer="Update Now" footerIcon={RefreshCw} />
     <MetricCard icon={Sparkles} accent="#80c915" label="Revenue" value="$ 1,345" footer="Last day" footerIcon={CalendarDays} />
     <MetricCard icon={Share2} accent="#fc4855" label="Errors" value="23" footer="In the last hour" footerIcon={Clock3} />
     <MetricCard icon={Heart} accent="#2566e9" label="Followers" value="+45K" footer="Update now" footerIcon={RefreshCw} />
    </section> 
}
