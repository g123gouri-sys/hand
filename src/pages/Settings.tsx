import { useEffect, useRef, useState, type ChangeEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart3, Check, CreditCard, Download, Eye, EyeOff, Laptop, Mail, Plug, Smartphone, Trash2, Upload } from 'lucide-react'
import { Navbar } from '../components/dashboard/Navbar'
import { Sidebar } from '../components/dashboard/Sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getInitials, getProfileUser, getUserDisplayName, saveStoredUser, type StoredUser } from '../lib/auth'

type Passwords = { current: string; next: string; confirm: string }
function PasswordField({ id, label, value, visible, onChange, onToggle }: { id: string; label: string; value: string; visible: boolean; onChange: (v: string) => void; onToggle: () => void }) { return <div className="settings-field"><Label htmlFor={id}>{label}</Label><div className="settings-password-input"><Input id={id} type={visible ? 'text' : 'password'} value={value} onChange={e => onChange(e.target.value)} placeholder={`Enter ${label.toLowerCase()}`} /><Button type="button" variant="ghost" size="icon-sm" onClick={onToggle}>{visible ? <EyeOff /> : <Eye />}</Button></div></div> }
function Row({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (v: boolean) => void }) { return <div className="settings-switch-row"><div><Label>{label}</Label><p>{description}</p></div><Switch checked={checked} onCheckedChange={onChange} /></div> }
function Section({ title, description, children, footer }: { title: string; description: string; children: ReactNode; footer?: ReactNode }) { return <Card><CardHeader><CardTitle>{title}</CardTitle><CardDescription>{description}</CardDescription></CardHeader><CardContent className="settings-form-card-content">{children}</CardContent>{footer && <CardFooter>{footer}</CardFooter>}</Card> }
function FormRow({ label, children }: { label: string; children: ReactNode }) { return <div className="settings-field"><Label>{label}</Label>{children}</div> }

export default function Settings() {
  const navigate = useNavigate(); const fileRef = useRef<HTMLInputElement>(null)
  const [user, setUser] = useState<StoredUser>(() => getProfileUser())
  const [firstName, setFirstName] = useState(() => getProfileUser().firstName), [lastName, setLastName] = useState(() => getProfileUser().lastName), [email, setEmail] = useState(() => getProfileUser().email)
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark'), [twoFactor, setTwoFactor] = useState(false), [avatar, setAvatar] = useState<string | null>(() => getProfileUser().avatar ?? null), [message, setMessage] = useState(''), [profileSaved, setProfileSaved] = useState('')
  const [passwords, setPasswords] = useState<Passwords>({ current: '', next: '', confirm: '' }), [visible, setVisible] = useState({ current: false, next: false, confirm: false }), [passwordMessage, setPasswordMessage] = useState('')
  const [profileVisible, setProfileVisible] = useState({ password: false, confirm: false })
  const [notifications, setNotifications] = useState({ email: true, orders: true, products: true, system: false, marketing: false }), [securityAlerts, setSecurityAlerts] = useState(true), [timeout, setTimeoutValue] = useState('30')
  const [payment, setPayment] = useState('Visa ending in 4242'), [integrations, setIntegrations] = useState({ email: true, payments: true, analytics: false, api: false }), [apiKey, setApiKey] = useState('sk_live_••••••••••••7c91')
  const [compact, setCompact] = useState(false), [fontSize, setFontSize] = useState('medium'), [preferences, setPreferences] = useState({ animations: true, confirmations: true, autosave: true })
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; localStorage.setItem('theme', dark ? 'dark' : 'light') }, [dark])
  useEffect(() => {
    const refreshUser = () => { const next = getProfileUser(); setUser(next); setFirstName(next.firstName); setLastName(next.lastName); setEmail(next.email); setAvatar(next.avatar ?? null) }
    window.addEventListener('dashboard-user-updated', refreshUser)
    return () => window.removeEventListener('dashboard-user-updated', refreshUser)
  }, [])
  useEffect(() => { document.documentElement.style.fontSize = fontSize === 'small' ? '14px' : fontSize === 'large' ? '17px' : '16px'; return () => { document.documentElement.style.fontSize = '' } }, [fontSize])
  const notify = (text: string) => { setMessage(text); window.setTimeout(() => setMessage(''), 2500) }
  const toggle = <T extends object>(setter: React.Dispatch<React.SetStateAction<T>>, key: keyof T) => setter(v => ({ ...v, [key]: !v[key] }))
  const savePassword = () => { if (!passwords.current || !passwords.next || !passwords.confirm) return setPasswordMessage('Please complete all password fields.'); if (passwords.next !== passwords.confirm) return setPasswordMessage('New passwords do not match.'); setPasswords({ current: '', next: '', confirm: '' }); setPasswordMessage('Password updated successfully.') }
  const selectAvatar = (e: ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; if (file.size > 2 * 1024 * 1024) return notify('Avatar must be smaller than 2MB.'); const reader = new FileReader(); reader.onload = () => { const nextAvatar = String(reader.result); setAvatar(nextAvatar); const next = { ...getProfileUser(), avatar: nextAvatar }; setUser(next); saveStoredUser(next) }; reader.readAsDataURL(file) }
  const action = (label: string) => <Button onClick={() => notify(`${label} saved successfully.`)}>{label}</Button>
  const updatePassword = (key: keyof Passwords, value: string) => setPasswords(v => ({ ...v, [key]: value })); const flipVisible = (key: keyof typeof visible) => setVisible(v => ({ ...v, [key]: !v[key] }))
  const invoice = (id: string) => <div><span><strong>{id === '08' ? 'August 19, 2026' : 'July 19, 2026'}</strong><small>Invoice #INV-2026-{id} · Pro plan</small></span><b>$29.00</b><Button variant="ghost" size="icon-sm" onClick={() => notify('Invoice download started.')}><Download /></Button></div>
  return <main className={`dashboard-shell settings-shell ${compact ? 'compact-sidebar' : ''}`}>
    <Sidebar />
    <section className="main-area settings-area">
      <Navbar title="Settings" />
      <div className="settings-content settings-page-wrap">
        <Tabs defaultValue="general">
          <Card className="settings-card-shell">
            <TabsList variant="line" className="settings-tab-list">{['General', 'Notifications', 'Security', 'Billing', 'Integrations', 'Appearance'].map(t => 
              <TabsTrigger key={t} value={t.toLowerCase()}>{t}</TabsTrigger>)}
            </TabsList>
            <TabsContent value="general" className="settings-tab-content">
              <div className="settings-grid">
                <div className="settings-column">
                  <Section title="Profile Settings" description="Update your personal information and profile details." footer={<>
                    <Button onClick={() => { const next = { ...user, firstName, lastName, email, avatar: avatar ?? undefined }; setUser(next); saveStoredUser(next); setProfileSaved(`Changes saved for ${getUserDisplayName(next)}.`) }}>Save Changes</Button>
                    {profileSaved && <p className="settings-inline-feedback">{profileSaved}</p>}</>}>
                    <div className="settings-form">
                      <FormRow label="First Name"><Input value={firstName} onChange={e => setFirstName(e.target.value)} /></FormRow>
                      <FormRow label="Last Name"><Input value={lastName} onChange={e => setLastName(e.target.value)} /></FormRow>
                      <FormRow label="Email Address"><Input type="email" value={email} onChange={e => setEmail(e.target.value)} /></FormRow>
                      <PasswordField id="profile-password" label="Password" value={user.password} visible={profileVisible.password} onChange={value => setUser(v => ({ ...v, password: value }))} onToggle={() => setProfileVisible(v => ({ ...v, password: !v.password }))} />
                      <PasswordField id="profile-confirm-password" label="Confirm Password" value={user.confirmPassword} visible={profileVisible.confirm} onChange={value => setUser(v => ({ ...v, confirmPassword: value }))} onToggle={() => setProfileVisible(v => ({ ...v, confirm: !v.confirm }))} />
                    </div>
                  </Section>
                  <Section title="Password" description="Update your account password." footer={<>
                    <Button onClick={savePassword}>Update Password</Button>{passwordMessage && <p className="settings-inline-feedback">{passwordMessage}</p>}</>}>
                    <div className="settings-form">
                      <PasswordField id="current" label="Current Password" value={passwords.current} visible={visible.current} onChange={v => updatePassword('current', v)} onToggle={() => flipVisible('current')} />
                      <PasswordField id="next" label="New Password" value={passwords.next} visible={visible.next} onChange={v => updatePassword('next', v)} onToggle={() => flipVisible('next')} />
                      <PasswordField id="confirm" label="Confirm New Password" value={passwords.confirm} visible={visible.confirm} onChange={v => updatePassword('confirm', v)} onToggle={() => flipVisible('confirm')} />
                    </div>
                  </Section>
                </div>
                <div className="settings-column">
                  <Section title="Application Settings" description="Configure general application preferences.">
                    <div className="settings-switches">
                      <Row label="Dark Mode" description="Enable dark mode for the application" checked={dark} onChange={setDark} />
                      <Row label="Email Notifications" description="Receive emails about important updates" checked={notifications.email} onChange={() => toggle(setNotifications, 'email')} />
                      <Row label="Two Factor Authentication" description="Add an extra layer of security to your account" checked={twoFactor} onChange={setTwoFactor} />
                    </div>
                  </Section>
                  <Card>
                    <CardHeader>
                      <CardTitle>Change Avatar</CardTitle>
                      <CardDescription>Upload a new profile picture.</CardDescription>
                    </CardHeader>
                    <CardContent className="avatar-settings">
                      <Avatar>
                        <AvatarImage src={avatar ?? undefined} />
                        <AvatarFallback>{getInitials(user.firstName, user.lastName)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="avatar-actions">
                          <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/gif" hidden onChange={selectAvatar} />
                          <Button variant="outline" onClick={() => fileRef.current?.click()}>
                            <Upload />Upload New
                          </Button>
                          <Button variant="outline" className="remove-avatar" onClick={() => { setAvatar(null); const next = { ...getProfileUser(), avatar: undefined }; setUser(next); saveStoredUser(next) }}>
                            <Trash2 />Remove
                          </Button>
                        </div>
                        <p>PNG, JPG or GIF. Max size 2MB.</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="danger-card">
                    <CardHeader>
                      <CardTitle>Danger Zone</CardTitle>
                      <CardDescription>Permanently delete your account and all of your data.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="delete-account" onClick={() => { if (window.confirm('Delete your account permanently?')) { localStorage.removeItem('dashboard-authenticated'); navigate('/login', { replace: true }) } }}>Delete Account</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="notifications" className="settings-tab-content">
              <div className="settings-grid">
                <div className="settings-column">
                  <Section title="Notification Channels" description="Choose which updates should reach your inbox.">
                    <div className="settings-switches">
                      <Row label="Email notifications" description="Receive important account and workspace updates" checked={notifications.email} onChange={() => toggle(setNotifications, 'email')} />
                      <Row label="Order updates" description="Status changes, refunds, and fulfillment events" checked={notifications.orders} onChange={() => toggle(setNotifications, 'orders')} />
                      <Row label="Product alerts" description="Low stock and catalog changes" checked={notifications.products} onChange={() => toggle(setNotifications, 'products')} />
                    </div>
                  </Section>
                  <Section title="System Notifications" description="Keep your workspace healthy and informed.">
                    <div className="settings-switches">
                      <Row label="System notifications" description="Maintenance, outages, and important notices" checked={notifications.system} onChange={() => toggle(setNotifications, 'system')} />
                      <Row label="Product tips and news" description="Occasional advice and announcements" checked={notifications.marketing} onChange={() => toggle(setNotifications, 'marketing')} />
                    </div>
                  </Section>
                </div>
                <div className="settings-column">
                  <Section title="Delivery Preferences" description="Control how and when notifications are delivered.">
                    <div className="settings-form">
                      <FormRow label="Notification email"><Input type="email" value={email} onChange={e => setEmail(e.target.value)} /></FormRow>
                      <FormRow label="Digest frequency">
                        <Select defaultValue="daily">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="realtime">As they happen</SelectItem>
                            <SelectItem value="daily">Daily summary</SelectItem>
                            <SelectItem value="weekly">Weekly summary</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormRow>
                    </div>
                  </Section>
                  <Section title="Notification Status" description="Your current notification setup.">
                    <div className="settings-status-list">
                      <p><Check /> Updates are delivered to {email}.</p>
                      <Button variant="outline" onClick={() => notify('A test notification was sent.')}>Send Test Notification</Button>
                    </div>
                  </Section>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="security" className="settings-tab-content">
              <div className="settings-grid">
                <div className="settings-column">
                  <Section title="Change Password" description="Use a strong, unique password for your account." footer={action('Update Password')}>
                    <div className="settings-form">
                     <PasswordField id="security-current" label="Current Password" value={passwords.current} visible={visible.current} onChange={v => updatePassword('current', v)} onToggle={() => flipVisible('current')} />
                     <PasswordField id="security-new" label="New Password" value={passwords.next} visible={visible.next} onChange={v => updatePassword('next', v)} onToggle={() => flipVisible('next')} />
                    </div>
                  </Section>
                  <Section title="Two-Factor Authentication" description="Protect sign-ins with an authenticator app or security key.">
                    <div className="settings-switches">
                      <Row label="Require two-factor authentication" description="Ask for a verification code when signing in" checked={twoFactor} onChange={setTwoFactor} />
                      <Row label="Security alerts" description="Notify me about new sign-ins and password changes" checked={securityAlerts} onChange={setSecurityAlerts} />
                    </div>
                  </Section>
                </div>
                <div className="settings-column">
                  <Section title="Active Devices" description="Review where your account is currently signed in.">
                    <div className="settings-device-list">
                      <div>
                        <Laptop />
                        <span>
                          <strong>Chrome on Windows</strong>
                          <small>New Delhi, India · Active now</small>
                        </span>
                        <b>Current</b>
                      </div>
                      <div>
                        <Smartphone />
                        <span>
                          <strong>Safari on iPhone</strong>
                          <small>Mumbai, India · Last active yesterday</small>
                        </span>
                        <Button variant="outline" onClick={() => notify('iPhone session signed out.')}>Sign out</Button>
                      </div>
                    </div>
                  </Section>
                  <Section title="Session Settings" description="Automatically protect inactive sessions.">
                    <FormRow label="Session timeout">
                      <Select value={timeout} onValueChange={v => v && setTimeoutValue(v)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormRow>
                  </Section>
                  <Button variant="outline" onClick={() => notify('All other sessions have been signed out.')}>Sign out of all other sessions</Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="billing" className="settings-tab-content">
              <div className="settings-grid">
                <div className="settings-column">
                  <Section title="Current Plan" description="Your Creative TIM workspace subscription.">
                    <div className="settings-plan">
                      <div>
                        <strong>Pro plan</strong>
                        <p>Up to 10 team members · Advanced reports</p>
                      </div>
                      <b>$29<span>/month</span></b>
                    </div>
                    <p className="settings-plan-status">
                      <Check /> Subscription active · Renews September 19, 2026
                    </p>
                    {action('Manage Plan')}
                    </Section>
                    <Section title="Payment Method" description="Your default payment method for subscriptions.">
                      <div className="settings-payment">
                        <CreditCard />
                        <span>
                          <strong>{payment}</strong>
                          <small>Expires 08/28</small>
                        </span>
                        <Button variant="outline" onClick={() => { setPayment(payment.includes('Visa') ? 'Mastercard ending in 5555' : 'Visa ending in 4242'); notify('Payment method updated.') }}>Change</Button>
                      </div>
                   </Section>
                  </div>
                  <div className="settings-column">
                    <Section title="Billing History" description="Download receipts and invoices for your account.">
                      <div className="settings-invoice-list">{invoice('08')}{invoice('07')}</div>
                    </Section>
                    <Section title="Billing Contact" description="Where billing notices and invoices are sent.">
                      <FormRow label="Billing email"><Input value={email} onChange={e => setEmail(e.target.value)} /></FormRow>
                      {action('Save Billing Contact')}
                    </Section>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="integrations" className="settings-tab-content">
              <div className="settings-grid">
                <div className="settings-column">
                  <Section title="Connected Services" description="Connect services used by your store and team.">
                    <div className="settings-switches">
                      <Row label="Email service" description="Transactional mail through SendGrid" checked={integrations.email} onChange={() => toggle(setIntegrations, 'email')} />
                      <Row label="Payment gateway" description="Stripe payments and refunds" checked={integrations.payments} onChange={() => toggle(setIntegrations, 'payments')} />
                      <Row label="Analytics" description="Usage and conversion reporting" checked={integrations.analytics} onChange={() => toggle(setIntegrations, 'analytics')} />
                    </div>
                  </Section>
                  <Section title="API Settings" description="Use API access to connect your own tools.">
                    <div className="settings-form">
                      <FormRow label="API key"><Input value={apiKey} readOnly /></FormRow>
                      <FormRow label="Webhook URL"><Input placeholder="https://example.com/webhooks" /></FormRow>
                    </div>
                    <div className="settings-api-actions">
                      <Button variant="outline" onClick={() => { setApiKey(`sk_live_••••••••••••${Math.floor(1000 + Math.random() * 9000)}`); notify('A new API key was generated.') }}>Regenerate key</Button>
                      <Button onClick={() => notify('Integration settings saved.')}>Save Settings</Button>
                    </div>
                  </Section>
                </div>
                <div className="settings-column">
                  <Section title="Service Health" description="Connection status for your active integrations.">
                    <div className="settings-service-list">
                      <div>
                        <Mail />
                        <span>
                          <strong>Email delivery</strong>
                          <small>SendGrid · Connected</small>
                        </span>
                        <i />
                      </div>
                      <div>
                        <CreditCard />
                        <span>
                          <strong>Payments</strong>
                          <small>Stripe · Connected</small>
                        </span>
                        <i />
                      </div>
                      <div>
                        <BarChart3 />
                        <span>
                          <strong>Analytics</strong>
                          <small>{integrations.analytics ? 'Connected' : 'Not connected'}</small>
                        </span>
                        <Button variant="outline" onClick={() => toggle(setIntegrations, 'analytics')}>{integrations.analytics ? 'Disconnect' : 'Connect'}</Button>
                      </div>
                    </div>
                  </Section>
                  <Section title="Developer Access" description="Allow API access for approved connected services.">
                    <Row label="Allow API access" description="Connected services may read workspace data" checked={integrations.api} onChange={() => toggle(setIntegrations, 'api')} />
                  </Section>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="appearance" className="settings-tab-content">
              <div className="settings-grid">
                <div className="settings-column">
                  <Section title="Theme" description="Choose how Creative TIM looks on your screen.">
                    <div className="settings-switches">
                      <Row label="Dark mode" description="Use darker surfaces in low-light environments" checked={dark} onChange={setDark} />
                    </div>
                  </Section>
                  <Section title="Typography" description="Adjust the interface reading size.">
                    <FormRow label="Font size">
                      <Select value={fontSize} onValueChange={v => v && setFontSize(v)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormRow>
                  </Section>
                </div>
                <div className="settings-column">
                  <Section title="Interface Preferences" description="Fine-tune how the dashboard behaves.">
                    <div className="settings-switches">
                      <Row label="Animations" description="Use subtle transitions throughout the application" checked={preferences.animations} onChange={() => toggle(setPreferences, 'animations')} />
                      <Row label="Confirm destructive actions" description="Ask before deleting data" checked={preferences.confirmations} onChange={() => toggle(setPreferences, 'confirmations')} />
                      <Row label="Autosave forms" description="Save changes when leaving a settings section" checked={preferences.autosave} onChange={() => toggle(setPreferences, 'autosave')} />
                    </div>
                  </Section>
                  <Section title="Preview" description="Your preferences are applied immediately.">
                    <p className="settings-preview">
                      <Plug /> Interface preferences are active for this browser.
                    </p>
                    <Button variant="outline" onClick={() => { setDark(false); setCompact(false); setFontSize('medium'); notify('Appearance preferences reset.') }}>Reset Appearance</Button>
                  </Section>
                </div>
              </div>
            </TabsContent>
         </Card>
        </Tabs>
      </div>{message && 
      <div className="settings-feedback" role="status">{message}</div>}
    </section>
  </main>
}
