import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const BookIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

const navItems = [
  { to: '/dashboard',  label: 'Dashboard',  icon: '⊞' },
  { to: '/students',   label: 'Students',   icon: '👤' },
  { to: '/attendance', label: 'Attendance', icon: '📅' },
  { to: '/subjects',   label: 'Subjects',   icon: '📚' },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <BookIcon />
          <div>
            <div className="brand-name">EduManage</div>
            <div className="brand-sub">Student Portal</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(n => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
              <span className="nav-icon">{n.icon}</span>
              {n.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <h1 className="page-title">Dashboard</h1>
          <div className="topbar-right">
            <span className="user-chip">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              {user?.username}
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Logout
            </button>
          </div>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
