import { useEffect, useState } from 'react';
import axios from 'axios';
import './Attendance.css';

export default function Attendance() {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [students, setStudents] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const fetchAttendance = async () => {
    const { data } = await axios.get('/api/attendance', { params: { date } });
    setStudents(data.students);
  };

  useEffect(() => { fetchAttendance(); }, [date]);

  const mark = async (studentId, status) => {
    await axios.post('/api/attendance', { studentId, date, status });
    setStudents(prev => prev.map(s => s._id === studentId ? { ...s, status } : s));
    showToast(`Marked ${status}`);
  };

  // Format date for display: DD-MM-YYYY
  const displayDate = date.split('-').reverse().join('-');

  return (
    <div>
      {toast && <div className={`toast ${toast.type}`}><span>{toast.type === 'error' ? '✕' : '✓'}</span> {toast.msg}</div>}

      <div className="att-header">
        <h2>Mark Attendance</h2>
        <div className="date-wrap">
          <label>Date:</label>
          <span className="date-display">{displayDate}</span>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="date-input" />
        </div>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr><th>USN</th><th>NAME</th><th>BRANCH & SEM</th><th>ACTION</th></tr>
          </thead>
          <tbody>
            {students.length === 0 && (
              <tr><td colSpan="4" style={{textAlign:'center',color:'var(--text-muted)',padding:'32px'}}>No students found</td></tr>
            )}
            {students.map(s => (
              <tr key={s._id}>
                <td className="usn">{s.usn}</td>
                <td className="student-name">{s.name}</td>
                <td>{s.branch} - Sem {s.semester}</td>
                <td>
                  <div className="att-btns">
                    <button
                      className={`att-btn present ${s.status === 'present' ? 'active' : ''}`}
                      onClick={() => mark(s._id, 'present')}
                    >Present</button>
                    <button
                      className={`att-btn absent ${s.status === 'absent' ? 'active' : ''}`}
                      onClick={() => mark(s._id, 'absent')}
                    >Absent</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
