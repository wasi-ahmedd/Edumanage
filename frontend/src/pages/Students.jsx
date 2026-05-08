import { useEffect, useState } from 'react';
import axios from 'axios';
import './Students.css';

const emptyForm = { name: '', usn: '', branch: '', semester: '', email: '', phone: '' };

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch]     = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing]   = useState(null);
  const [form, setForm]         = useState(emptyForm);
  const [loading, setLoading]   = useState(false);
  const [toast, setToast]       = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchStudents = async () => {
    const { data } = await axios.get('/api/students', { params: search ? { search } : {} });
    setStudents(data);
  };

  useEffect(() => { fetchStudents(); }, [search]);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (s) => { setEditing(s._id); setForm({ name: s.name, usn: s.usn, branch: s.branch, semester: s.semester, email: s.email, phone: s.phone }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        await axios.put(`/api/students/${editing}`, form);
        showToast('Student updated');
      } else {
        await axios.post('/api/students', form);
        showToast('Student added');
      }
      setShowModal(false);
      fetchStudents();
    } catch (err) {
      showToast(err.response?.data?.message || 'Error', 'error');
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this student?')) return;
    await axios.delete(`/api/students/${id}`);
    showToast('Student deleted');
    fetchStudents();
  };

  return (
    <div>
      {toast && <div className={`toast ${toast.type}`}><span>{toast.type === 'error' ? '✕' : '✓'}</span> {toast.msg}</div>}

      <div className="page-header">
        <h2>Students Directory</h2>
        <div className="header-actions">
          <div className="search-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input placeholder="Search by name or USN..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn-add" onClick={openAdd}>+ Add New</button>
        </div>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr><th>STUDENT</th><th>USN</th><th>BRANCH & SEM</th><th>CONTACT</th><th>ACTIONS</th></tr>
          </thead>
          <tbody>
            {students.length === 0 && (
              <tr><td colSpan="5" style={{textAlign:'center',color:'var(--text-muted)',padding:'32px'}}>No students found</td></tr>
            )}
            {students.map(s => (
              <tr key={s._id}>
                <td className="student-name">{s.name}</td>
                <td className="usn">{s.usn}</td>
                <td><span className="branch-tag">{s.branch}</span> Sem {s.semester}</td>
                <td><div>{s.email}</div><div className="phone">{s.phone}</div></td>
                <td className="actions">
                  <button className="icon-btn edit" onClick={() => openEdit(s)} title="Edit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button className="icon-btn del" onClick={() => handleDelete(s._id)} title="Delete">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>{editing ? 'Edit Student' : 'Add New Student'}</h3>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="field"><label>Full Name</label><input value={form.name} onChange={e => setForm({...form,name:e.target.value})} required /></div>
                <div className="field"><label>USN</label><input value={form.usn} onChange={e => setForm({...form,usn:e.target.value})} required /></div>
              </div>
              <div className="form-row">
                <div className="field"><label>Branch</label><input value={form.branch} onChange={e => setForm({...form,branch:e.target.value})} required /></div>
                <div className="field"><label>Semester</label><input type="number" min="1" max="8" value={form.semester} onChange={e => setForm({...form,semester:e.target.value})} required /></div>
              </div>
              <div className="form-row">
                <div className="field"><label>Email</label><input type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} required /></div>
                <div className="field"><label>Phone</label><input value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} required /></div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Saving...' : editing ? 'Update' : 'Add Student'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
