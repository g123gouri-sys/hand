import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Input } from '../ui/input'

export type ProfileValues = { company: string; username: string; email: string; firstName: string; lastName: string; address: string; city: string; country: string; postalCode: string; about: string }

const Field = ({ label, value, placeholder, disabled = false, onChange }: { label: string; value: string; placeholder?: string; disabled?: boolean; onChange: (value: string) => void }) => <label className="profile-field"><span>{label}</span><Input value={value} placeholder={placeholder} disabled={disabled} onChange={event => onChange(event.target.value)} /></label>

export function ProfileForm({ profile, onChange, onSubmit }: { profile: ProfileValues; onChange: (profile: ProfileValues) => void; onSubmit: () => void }) {
  const update = (field: keyof ProfileValues) => (value: string) => {
    if (field === 'firstName' || field === 'lastName') {
      const next = { ...profile, [field]: value }
      onChange({ ...next, username: `${next.firstName} ${next.lastName}`.trim() })
      return
    }
    onChange({ ...profile, [field]: value })
  }
  return <Card className="profile-form-card">
    <h2>Edit Profile</h2>
    <form onSubmit={event => { event.preventDefault(); onSubmit() }}>
      <div className="profile-row profile-company">
        <Field label="Company (disabled)" value={profile.company} onChange={update('company')} />
        <Field label="Username" value={`${profile.firstName} ${profile.lastName}`.trim()} disabled onChange={() => undefined} />
        <Field label="Email address" value={profile.email} placeholder="Email" onChange={update('email')} />
      </div>
      <div className="profile-row profile-halves">
       <Field label="First Name" value={profile.firstName} onChange={update('firstName')} />
       <Field label="Last Name" value={profile.lastName} onChange={update('lastName')} />
      </div>
      <Field label="Address" value={profile.address} onChange={update('address')} />
      <div className="profile-row profile-city">
        <Field label="City" value={profile.city} onChange={update('city')} />
        <Field label="Country" value={profile.country} onChange={update('country')} />
        <Field label="Postal Code" value={profile.postalCode} placeholder="ZIP Code" onChange={update('postalCode')} />
      </div>
      <label className="profile-field profile-about">
        <span>About me</span>
        <textarea value={profile.about} onChange={event => update('about')(event.target.value)} />
      </label>
      <div className="profile-submit">
        <Button type="submit">Update Profile</Button>
      </div>
    </form>
  </Card>
}
