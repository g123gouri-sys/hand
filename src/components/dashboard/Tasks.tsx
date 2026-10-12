import { Check, Pencil, X } from 'lucide-react'
import { Card } from '../ui/card'

const tasks = [[false, 'Sign contract for "What are conference organizers afraid of?"'], [true, 'Lines From Great Russian Literature? Or E-mails From My Boss?'], [true, 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit'], [true, 'Create 4 Invisible User Experiences you Never Knew About'], [false, 'Read "Following makes Medium better"'], [false, 'Unfollow 5 enemies from twitter']] as const

export function Tasks() { 
 return <Card className="lower-card tasks-card">
     <div className="small-heading">
        <h2>Tasks</h2>
        <p>Backend development</p>
    </div>
    <div className="task-list">{tasks.map(([done, title]) => 
        <div className="task-row" key={title}>
            <button className={`task-checkbox ${done ? 'done' : ''}`} aria-label={`Mark ${title} as complete`}>{done && <Check size={14} />}</button>
            <span className="task-title">{title}</span>
            <button className="task-action edit" aria-label="Edit task"><Pencil /></button>
            <button className="task-action delete" aria-label="Delete task"><X /></button>
        </div>)}
    </div>
    <div className="card-status task-status">Updated 3 minutes ago</div>
 </Card>
}