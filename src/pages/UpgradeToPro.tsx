import { Check, Pencil, Settings, X } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Navbar } from '../components/dashboard/Navbar'
import { Sidebar } from '../components/dashboard/Sidebar'

const comparisons = [
  ['Components', '16', '115+'], ['Plugins', '4', '14+'], ['Example Pages', '4', '22+'], ['Documentation', false, true], ['SASS Files', false, true], ['Login/Register/Lock Pages', false, true], ['Premium Support', false, true],
] as const

export default function UpgradeToPro() {
  return <main className="dashboard-shell">
    <Sidebar />
    <section className="main-area upgrade-page">
      <Navbar title="Upgrade to PRO" />
      <div className="upgrade-page-content">
        <Card className="pro-comparison-card">
          <header>
            <h1>Light Bootstrap Dashboard PRO React</h1>
            <p>Are you looking for more components? Please check our Premium Version of Light Bootstrap Dashboard React.</p>
          </header>
          <table className="pro-table">
            <thead><tr><th /><th>Free</th><th>Pro</th></tr></thead><tbody>{comparisons.map(([feature, free, pro]) => <tr key={feature}><td>{feature}</td><td>{typeof free === 'boolean' ? free ? <Check className="pro-check" /> : <X className="pro-cross" /> : free}</td><td>{typeof pro === 'boolean' ? pro ? <Check className="pro-check" /> : <X className="pro-cross" /> : pro}</td></tr>)}<tr className="pro-price"><td /><td>Free</td><td>Just $49</td></tr><tr className="pro-actions"><td /><td><Button variant="secondary" disabled>Current Version</Button></td><td><Button>Upgrade to PRO</Button></td></tr></tbody>
          </table>
        </Card>
      </div>
      <footer className="page-footer">
        <nav>
          <a>Home</a><a>Company</a><a>Portfolio</a><a>Blog</a>
        </nav>
        <p>© 2026 <a>Creative Tim</a>, made with love for a better web</p>
      </footer>
      <button className="settings" aria-label="Upgrade settings">
        <Settings />
      </button>
      <button className="edit-button" aria-label="Edit upgrade page">
        <Pencil />
      </button>
    </section>
 </main> 
}