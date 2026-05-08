import { useEffect, useState } from 'react';
import axios from 'axios';
import './Subjects.css';

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ name: '', code: '', credits: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchSubjects = async () => {
    const { data } = await axios.get('/api/subjects');
    setSubjects(data);
  };

  useEffect(() => { fetchSubjects(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/subjects', form);
      setForm({ name: '', code: '', credits: '' });
      showToast('Subject added');
      fetchSubjects();
    } catch (err) {
      showToast(err.response?.data?.message || 'Error', 'error');
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this subject?')) return;
    await axios.delete(`/api/subjects/${id}`);
    showToast('Subject deleted');
    fetchSubjects();
  };

  return (
    <div className="subjects-layout">
      {toast && <div className={`toast ${toast.type}`}><span>{toast.type === 'error' ? '✕' : '✓'}</span> {toast.msg}</div>}

      <div className="add-card">
        <h2>Add New Subject</h2>
        <form onSubmit={handleSubmit} className="add-form">
          <div className="field">
            <label>Subject Name</label>
            <input value={form.name} onChange={e => setForm({...form,name:e.target.value})} required />
          </div>
          <div className="field">
            <label>Subject Code</label>
            <input value={form.code} onChange={e => setForm({...form,code:e.target.value})} required />
          </div>
          <div className="field">
            <label>Credits</label>
            <input type="number" min="1" max="6" value={form.credits} onChange={e => setForm({...form,credits:e.target.value})} required />
          </div>
          <button type="submit" className="btn-add-subj" disabled={loading}>
            {loading ? 'Adding...' : '+ Add Subject'}
          </button>
        </form>
      </div>

      <div className="subjects-list-card">
        <h2>All Subjects</h2>
        <table className="data-table">
          <thead>
            <tr><th>CODE</th><th>NAME</th><th>CREDITS</th><th>ACTION</th></tr>
          </thead>
          <tbody>
            {subjects.length === 0 && (
              <tr><td colSpan="4" style={{textAlign:'center',color:'var(--text-muted)',padding:'32px'}}>No subjects yet</td></tr>
            )}
            {subjects.map(s => (
              <tr key={s._id}>
                <td><span className="code-link">{s.code}</span></td>
                <td>{s.name}</td>
                <td>{s.credits}</td>
                <td>
                  <button className="icon-btn del" onClick={() => handleDelete(s._id)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
