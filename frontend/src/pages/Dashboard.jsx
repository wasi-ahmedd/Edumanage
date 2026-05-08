import { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api/dashboard').then(r => setData(r.data)).catch(console.error);
  }, []);

  return (
    <div>
      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6c63ff" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div>
            <div className="stat-label">Total Students</div>
            <div className="stat-value">{data?.totalStudents ?? '—'}</div>
          </div>
        </div>
      </div>

      <h2 className="section-title">Students by Branch</h2>
      <div className="branch-cards">
        {data?.studentsByBranch?.length === 0 && <p style={{color:'var(--text-muted)'}}>No students yet.</p>}
        {data?.studentsByBranch?.map(b => (
          <div key={b.branch} className="branch-card">
            <div className="branch-name">{b.branch}</div>
            <div className="branch-count">{b.count} Student{b.count !== 1 ? 's' : ''}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
