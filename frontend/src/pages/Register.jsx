import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('/api/auth/register', {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {error && (
        <div className="toast error">
          <span>✕</span> {error}
        </div>
      )}
      <div className="auth-card">
        <div className="auth-logo">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6c63ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
        </div>
        <h1 className="auth-title">Create an Account</h1>
        <p className="auth-sub">Or <Link to="/login">sign in to your existing account</Link></p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="field">
            <label>Username</label>
            <input type="text" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
          </div>
          <div className="field">
            <label>Email Address</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          </div>
          <div className="field">
            <label>Confirm Password</label>
            <input type="password" value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} required />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}
