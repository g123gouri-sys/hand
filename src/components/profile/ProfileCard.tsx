import { Card } from '../ui/card'
import type { ProfileValues } from './ProfileForm'

export function ProfileCard({ profile }: { profile: ProfileValues }) {
  const name = `${profile.firstName} ${profile.lastName}`.trim()
  const location = [profile.city, profile.country].filter(Boolean).join(', ')

  return <Card className="profile-summary">
    <div className="profile-cover" />
    <img className="profile-avatar" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=85" alt={name} />
    <div className="profile-details">
      <h2>{name || 'Your Name'}</h2>
      <p>{profile.username || 'username'}</p>
      {profile.email && <span className="profile-contact">{profile.email}</span>}
      {location && <span className="profile-contact">{location}</span>}
      <blockquote>"{profile.about || 'Tell us about yourself.'}"</blockquote>
    </div>
    <div className="profile-social"><span>f</span><span>♥</span><span>G+</span></div>
  </Card>
}
