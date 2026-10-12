export type StoredUser = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  avatar?: string
  googleId?: string
  picture?: string
}

const userKey = 'dashboard-user'
const authenticatedKey = 'dashboard-authenticated'

export function getStoredUser(): StoredUser | null {
  const value = localStorage.getItem(userKey)
  if (!value) return null
  try {
    const parsed = JSON.parse(value) as Partial<StoredUser> & { name?: string }
    if (parsed.firstName !== undefined || parsed.lastName !== undefined) {
      return { ...parsed, firstName: parsed.firstName ?? '', lastName: parsed.lastName ?? '' } as StoredUser
    }
    const nameParts = (parsed.name ?? '').trim().split(/\s+/).filter(Boolean)
    return {
      firstName: nameParts[0] ?? '',
      lastName: nameParts.slice(1).join(' '),
      email: parsed.email ?? '',
      password: parsed.password ?? '',
      confirmPassword: parsed.confirmPassword ?? '',
      avatar: parsed.avatar,
      googleId: parsed.googleId,
      picture: parsed.picture,
    }
  } catch {
    return null
  }
}

export function saveStoredUser(user: StoredUser) {
  localStorage.setItem(userKey, JSON.stringify(user))
  window.dispatchEvent(new Event('dashboard-user-updated'))
}

export function setAuthenticated(user: StoredUser) {
  saveStoredUser(user)
  localStorage.setItem(authenticatedKey, 'true')
}

export function getProfileUser(): StoredUser {
  return getStoredUser() ?? { firstName: 'Rishi', lastName: 'Sharma', email: '', password: '', confirmPassword: '' }
}

export function getUserDisplayName(user: Pick<StoredUser, 'firstName' | 'lastName'>): string {
  return `${user.firstName} ${user.lastName}`.trim()
}

export function getInitials(firstName: string, lastName: string): string {
  const parts = [firstName, lastName].map(value => value.trim()).filter(Boolean)
  if (!parts.length) return 'U'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export function clearAuthentication() {
  localStorage.removeItem(authenticatedKey)
}

export function isAuthenticated(): boolean {
  return localStorage.getItem(authenticatedKey) === 'true'
}
