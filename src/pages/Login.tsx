import { Apple, Eye, EyeOff, LockKeyhole } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getStoredUser, setAuthenticated, type StoredUser } from '../lib/auth'

type GoogleCredentialResponse = { credential: string }

let googleInitialized = false
let googleResponseHandler: ((response: GoogleCredentialResponse) => void) | null = null

function decodeGoogleToken(token: string): Record<string, string> {
  const payload = token.split('.')[1]
  if (!payload) throw new Error('Invalid Google credential')
  const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
  return JSON.parse(atob(base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '='))) as Record<string, string>
}

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const googleButtonRef = useRef<HTMLDivElement>(null)
  const googleGisRef = useRef<HTMLDivElement>(null)

  const handleGoogleResponse = useCallback((response: GoogleCredentialResponse) => {
    try {
      const payload = decodeGoogleToken(response.credential)
      const user: StoredUser = {
        googleId: payload.sub,
        firstName: payload.given_name ?? '',
        lastName: payload.family_name ?? '',
        email: payload.email ?? '',
        password: '',
        confirmPassword: '',
        avatar: payload.picture,
        picture: payload.picture,
      }
      setAuthenticated(user)
      navigate('/', { replace: true })
    } catch {
    }
  }, [navigate])

  useEffect(() => {
    googleResponseHandler = handleGoogleResponse
    const buttonContainer = googleGisRef.current
    const renderGoogleButton = () => {
      const googleId = import.meta.env.VITE_GOOGLE_CLIENT_ID
      const google = window.google
      if (!google || !googleId || !buttonContainer) return false
      console.log('Google Client ID:', googleId)
      if (!googleInitialized) {
        google.accounts.id.initialize({
          client_id: googleId,
          callback: response => googleResponseHandler?.(response),
        })
        googleInitialized = true
      }
      buttonContainer.replaceChildren()
      google.accounts.id.renderButton(buttonContainer, { type: 'icon', theme: 'outline', size: 'large', shape: 'rectangular' })
      return true
    }
    if (!renderGoogleButton()) {
      const interval = window.setInterval(() => {
        if (renderGoogleButton()) window.clearInterval(interval)
      }, 100)
      return () => { window.clearInterval(interval); googleResponseHandler = null }
    }
    return () => { buttonContainer?.replaceChildren(); googleResponseHandler = null }
  }, [handleGoogleResponse])

  useEffect(() => {
    document.documentElement.dataset.theme = localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') ?? '').trim()
    const password = String(form.get('password') ?? '')
    const storedUser = getStoredUser()
    if (storedUser && (storedUser.email !== email || storedUser.password !== password)) return
    setAuthenticated(storedUser && storedUser.email === email ? storedUser : {
      firstName: '', lastName: '', email, password, confirmPassword: password,
    })
    navigate('/', { replace: true })
  }

  return <main className="login-page">
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="auth-icon"><LockKeyhole /></div>
      <h1>Welcome back</h1>
      <p>Sign in to continue to your dashboard.</p>
      <label>
        Email
        <input type="email" name="email" autoComplete="email" required />
      </label>
      <label>
        Password
        <span className="auth-password-input">
          <input type={showPassword ? 'text' : 'password'} name="password" autoComplete="current-password" required />
          <button className="auth-password-toggle" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(value => !value)}>{showPassword ? <EyeOff /> : <Eye />}</button>
        </span>
      </label>
      <button type="submit">Login</button>
      <div className="auth-divider"><span>or continue with</span></div>
      <div className="social-login-options" aria-label="Social login options">
        <div ref={googleButtonRef} className="google-login-button" aria-label="Continue with Google">
          <svg className="google-logo" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M21.35 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z" />
            <path fill="#34A853" d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.5Z" />
            <path fill="#FBBC05" d="M6.54 13.58A5.85 5.85 0 0 1 6.24 12c0-.55.1-1.08.3-1.58V7.89H3.3A9.5 9.5 0 0 0 2.25 12c0 1.48.36 2.88 1.05 4.11l3.24-2.53Z" />
            <path fill="#EA4335" d="M12 6.39c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.48 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.39l3.24 2.53C7.31 8.11 9.46 6.39 12 6.39Z" />
          </svg>
          <div ref={googleGisRef} className="google-gis-button" />
        </div>
        <button type="button" aria-label="Continue with Microsoft"><span className="microsoft-mark"><i /><i /><i /><i /></span></button>
        <button type="button" aria-label="Continue with Apple"><Apple /></button>
      </div>
      <p className="auth-switch">New here? <Link to="/signup">Create an account</Link></p>
    </form>
  </main>
}
