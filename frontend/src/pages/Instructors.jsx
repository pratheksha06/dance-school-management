import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Instructors() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users from the backend and filter for instructors
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        // Hitting your backend users endpoint
        const response = await axios.get('https://rhythm-dance-backend.onrender.com/api/users');
        
        // Filter out anyone who isn't registered with an instructor role
        const instructorProfiles = response.data.filter(user => user.role === 'instructor');
        setInstructors(instructorProfiles);
      } catch (error) {
        console.error("Error fetching instructor list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  return (
    <div style={styles.container}>
      <style>{hoverStyles}</style>
      
      <div style={styles.headerSection}>
        <h2 style={styles.heading}>Meet Our <span style={{ color: '#ff3c78' }}>Elite Instructors</span></h2>
        <p style={styles.subtitle}>Learn from certified, world-class movement professionals dedicated to your growth</p>
      </div>

      {loading ? (
        <p style={styles.loadingText}>Loading instructor profiles...</p>
      ) : instructors.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No instructors registered in the database yet.</p>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Tip: Go to Postman, register a new user with <code>"role": "instructor"</code>, and refresh this page!
          </p>
        </div>
      ) : (
        <div style={styles.gridContainer}>
          {instructors.map((instructor) => (
            <div key={instructor._id} className="instructor-card" style={styles.card}>
              {/* Profile Avatar Placeholder with Neon Border */}
              <div style={styles.avatarZone}>
                <span style={styles.avatarInitial}>{instructor.name.charAt(0)}</span>
              </div>
              
              <h3 style={styles.instructorName}>{instructor.name}</h3>
              <p style={styles.roleTag}>Certified Choreographer</p>
              
              <div style={styles.divider}></div>
              
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>📧 Contact:</span>
                <span style={styles.infoValue}>{instructor.email}</span>
              </div>
              
              {instructor.phone && (
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>📞 Phone:</span>
                  <span style={styles.infoValue}>{instructor.phone}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const hoverStyles = `
  .instructor-card:hover {
    transform: translateY(-8px);
    border-color: #ff3c78 !important;
    box-shadow: 0 10px 25px rgba(255, 60, 120, 0.15) !important;
  }
`;

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#0d0d0d', color: '#fff', padding: '120px 8% 60px 8%', fontFamily: "'Poppins', sans-serif" },
  headerSection: { textAlign: 'center', marginBottom: '5px' },
  heading: { fontSize: '40px', fontWeight: '700', margin: '0 0 10px 0' },
  subtitle: { fontSize: '16px', color: '#888', maxWidth: '600px', margin: '0 auto 50px auto', lineHeight: '1.5' },
  loadingText: { textAlign: 'center', color: '#888', fontSize: '16px', marginTop: '40px' },
  emptyState: { textAlign: 'center', color: '#aaa', padding: '40px', backgroundColor: '#141414', borderRadius: '12px', border: '1px solid #222', maxWidth: '500px', margin: '40px auto' },
  gridContainer: { display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' },
  card: { backgroundColor: '#141414', border: '1px solid #222', borderRadius: '16px', padding: '30px', width: '280px', textAlign: 'center', transition: '0.3s ease-in-out', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' },
  avatarZone: { width: '90px', height: '90px', borderRadius: '50%', border: '2px solid #ff3c78', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px auto', backgroundColor: '#1a1a1a', boxShadow: '0 0 15px rgba(255, 60, 120, 0.2)' },
  avatarInitial: { fontSize: '36px', fontWeight: '700', color: '#ff3c78' },
  instructorName: { fontSize: '22px', fontWeight: '600', margin: '0 0 5px 0', color: '#fff' },
  roleTag: { fontSize: '13px', color: '#ff3c78', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 20px 0', fontWeight: '500' },
  divider: { height: '1px', backgroundColor: '#252525', marginBottom: '20px' },
  infoRow: { display: 'flex', justifyContent: 'space-between', fontSize: '14px', margin: '8px 0', color: '#bbb' },
  infoLabel: { fontWeight: '500' },
  infoValue: { color: '#fff', wordBreak: 'break-word', maxWidth: '180px', textAlign: 'right' }
};