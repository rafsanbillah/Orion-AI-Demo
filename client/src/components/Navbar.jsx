import {
  Building2,
  HeartPulse,
  Home,
  HousePlug,
  LayoutDashboard,
  LogIn,
  ShieldCheck,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/clinic', label: 'Clinic', icon: HeartPulse },
  { to: '/real-estate', label: 'Real estate', icon: Building2 },
  { to: '/home-services', label: 'Home services', icon: HousePlug },
  { to: '/dashboard/demo', label: 'Demo', icon: LayoutDashboard },
  { to: '/dashboard/admin', label: 'Admin', icon: ShieldCheck },
  { to: '/login', label: 'Login', icon: LogIn },
]

const navLinkClass = ({ isActive }) =>
  [
    'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition',
    isActive
      ? 'bg-slate-900 text-white'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
  ].join(' ')

function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <NavLink className="flex items-center gap-3" to="/">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-600 text-white">
              <LayoutDashboard size={22} aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase text-emerald-700">
                MERN MVP
              </p>
              <p className="text-sm text-slate-500">Industry starter</p>
            </div>
          </NavLink>
        </div>

        <nav className="flex flex-wrap items-center gap-2" aria-label="Main navigation">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                className={navLinkClass}
                end={item.end}
                key={item.to}
                to={item.to}
              >
                <Icon size={16} aria-hidden="true" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
