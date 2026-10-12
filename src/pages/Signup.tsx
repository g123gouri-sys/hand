import { Eye, EyeOff, UserRoundPlus } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setAuthenticated } from '../lib/auth'

export default function Signup() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    if (form.get('password') !== form.get('confirmPassword')) {
      setError('Passwords do not match.')
      return
    }
    const password = String(form.get('password') ?? '')
    setAuthenticated({
      firstName: String(form.get('firstName') ?? '').trim(),
      lastName: String(form.get('lastName') ?? '').trim(),
      email: String(form.get('email') ?? '').trim(),
      password,
      confirmPassword: String(form.get('confirmPassword') ?? ''),
    })
    navigate('/', { replace: true })
  }

  return <main className="login-page signup-page">
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="auth-icon"><UserRoundPlus /></div>
      <h1>Create account</h1>
      <p>Sign up to access your dashboard.</p>
      <div className="auth-name-fields">
        <label>First Name<input type="text" name="firstName" autoComplete="given-name" placeholder="Enter first name" required /></label>
        <label>Last Name<input type="text" name="lastName" autoComplete="family-name" placeholder="Enter last name" required /></label>
      </div>
      <label>Email<input type="email" name="email" autoComplete="email" required /></label>
      <label>Password<span className="auth-password-input"><input type={showPassword ? 'text' : 'password'} name="password" autoComplete="new-password" minLength={6} required /><button className="auth-password-toggle" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(value => !value)}>{showPassword ? <EyeOff /> : <Eye />}</button></span></label>
      <label>Confirm password<span className="auth-password-input"><input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" autoComplete="new-password" minLength={6} required /><button className="auth-password-toggle" type="button" aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'} onClick={() => setShowConfirmPassword(value => !value)}>{showConfirmPassword ? <EyeOff /> : <Eye />}</button></span></label>
      {error && <p className="auth-error" role="alert">{error}</p>}
      <button type="submit">Create account</button>
      <p className="auth-switch">Already have an account? 
        <Link to="/login">Log in</Link>
      </p>
    </form>
  </main>
}
