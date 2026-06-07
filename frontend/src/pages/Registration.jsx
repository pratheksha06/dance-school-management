import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Registration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Safely grab the newly created user's account ID passed from the Signup page
  const userId = location.state?.userId || '';

  // 1. Establish data states matching every dropdown and text input on your UI
  const [formData, setFormData] = useState({
    age: '',
    experienceLevel: 'Beginner', 
    preferredFormat: '',
    preferredSchedule: '',
    studioLocation: '',
    parentGuardian: '',
    phone: '',
    mailingAddress: '',
    specialObjectives: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(''); // Tracks active input element for hot-pink border glow

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Submit the detailed profile update packet straight to Atlas
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!userId) {
      return setError("Session expired or invalid navigation context. Please try signing up again.");
    }

    try {
      setLoading(true);
      
      // Hitting the dynamic profile updates route using PUT protocol
      const response = await axios.put(`https://rhythm-dance-backend.onrender.com/api/users/update-profile/${userId}`, formData);

      if (response.status === 200) {
        alert("✅ Studio placement tracking configured successfully! Your profile is complete.");
        // Redirect them straight back to the main homepage dashboard area
        navigate('/'); 
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating student record.');
    } finally {
      setLoading(false);
    }
  };

  // Helper utility to apply neon styles dynamically on user click focus
  const getInputStyle = (fieldName) => ({
    ...styles.input,
    ...(focusedField === fieldName ? styles.inputFocus : {})
  });

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2 style={styles.title}>Student <span style={{color: '#ff2e7e'}}>Registration</span></h2>
        <p style={styles.subtitle}>Fill out the parameters below to configure your studio placement tracking</p>

        {error && <div style={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.formLayout}>
          {/* Row 1 */}
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Student's Age *</label>
              <input 
                type="number" 
                name="age" 
                placeholder="Enter student's age" 
                value={formData.age} 
                onChange={handleChange} 
                onFocus={() => setFocusedField('age')}
                onBlur={() => setFocusedField('')}
                style={getInputStyle('age')} 
                required 
              />
            </div>
          </div>

          {/* Row 2 */}
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Dance Experience Level</label>
              <select 
                name="experienceLevel" 
                value={formData.experienceLevel} 
                onChange={handleChange} 
                onFocus={() => setFocusedField('experienceLevel')}
                onBlur={() => setFocusedField('')}
                style={getInputStyle('experienceLevel')}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Preferred Class Format *</label>
              <select 
                name="preferredFormat" 
                value={formData.preferredFormat} 
                onChange={handleChange} 
                onFocus={() => setFocusedField('preferredFormat')}
                onBlur={() => setFocusedField('')}
                style={getInputStyle('preferredFormat')} 
                required
              >
                <option value="">Select a discipline...</option>
                <option value="Salsa">Salsa</option>
                <option value="Hip Hop">Hip Hop</option>
                <option value="Contemporary">Contemporary</option>
                <option value="Classical Ballet">Classical Ballet</option>
              </select>
            </div>
          </div>

          {/* Row 3 */}
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Preferred Batch Schedule *</label>
              <select 
                name="preferredSchedule" 
                value={formData.preferredSchedule} 
                onChange={handleChange} 
                onFocus={() => setFocusedField('preferredSchedule')}
                onBlur={() => setFocusedField('')}
                style={getInputStyle('preferredSchedule')} 
                required
              >
                <option value="">Select a slot...</option>
                <option value="Mon/Wed 5:00 PM">Mon/Wed 5:00 PM</option>
                <option value="Tue/Thu 6:00 PM">Tue/Thu 6:00 PM</option>
                <option value="Sat/Sun 10:00 AM">Sat/Sun 10:00 AM</option>
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Studio Location *</label>
              <select 
                name="studioLocation" 
                value={formData.studioLocation} 
                onChange={handleChange} 
                onFocus={() => setFocusedField('studioLocation')}
                onBlur={() => setFocusedField('')}
                style={getInputStyle('studioLocation')} 
                required
              >
                <option value="">Select studio hub...</option>
                <option value="Downtown Hub">Downtown Hub</option>
                <option value="West End Center">West End Center</option>
              </select>
            </div>
          </div>

          {/* Row 4 */}
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Parent/Guardian Name (If Under 18)</label>
              <input 
                type="text" 
                name="parentGuardian" 
                placeholder="Enter full name" 
                value={formData.parentGuardian} 
                onChange={handleChange} 
                onFocus={() => setFocusedField('parentGuardian')}
                onBlur={() => setFocusedField('')}
                style={getInputStyle('parentGuardian')} 
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Active Phone Number *</label>
              <input 
                type="text" 
                name="phone" 
                placeholder="Enter phone number" 
                value={formData.phone} 
                onChange={handleChange} 
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField('')}
                style={getInputStyle('phone')} 
                required 
              />
            </div>
          </div>

          {/* Full Width Layout Elements */}
          <div style={styles.inputGroupFull}>
            <label style={styles.label}>Complete Mailing Address</label>
            <input 
              type="text" 
              name="mailingAddress" 
              placeholder="Street, City, Zip Code" 
              value={formData.mailingAddress} 
              onChange={handleChange} 
              onFocus={() => setFocusedField('mailingAddress')}
              onBlur={() => setFocusedField('')}
              style={getInputStyle('mailingAddress')} 
            />
          </div>

          <div style={styles.inputGroupFull}>
            <label style={styles.label}>Special Objectives or Physical Notes</label>
            <textarea 
              name="specialObjectives" 
              rows="4" 
              placeholder="Detail any medical conditions, scheduling limitations, or dance experience goals..." 
              value={formData.specialObjectives} 
              onChange={handleChange} 
              onFocus={() => setFocusedField('specialObjectives')}
              onBlur={() => setFocusedField('')}
              style={{...getInputStyle('specialObjectives'), ...styles.textarea}}
            ></textarea>
          </div>

          <button type="submit" disabled={loading} style={styles.submitBtn}>
            {loading ? 'Saving Parameters...' : 'Complete Studio Placement Registration'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Layout engine updating your application theme structure
const styles = {
  container: { 
    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('https://images.unsplash.com/photo-1511406584303-d34002996170?auto=format&fit=crop&q=80&w=1200')", 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh', 
    padding: '60px 20px', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    boxSizing: 'border-box'
  },
  formWrapper: { 
    backgroundColor: 'rgba(23, 23, 23, 0.85)', 
    backdropFilter: 'blur(12px)', 
    WebkitBackdropFilter: 'blur(12px)',
    padding: '40px', 
    borderRadius: '20px', 
    width: '100%', 
    maxWidth: '800px', 
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(255, 46, 126, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    boxSizing: 'border-box'
  },
  title: { 
    color: '#ffffff', 
    textAlign: 'center', 
    fontSize: '32px', 
    fontWeight: 'bold', 
    margin: '0 0 8px 0',
    fontFamily: 'sans-serif'
  },
  subtitle: { 
    color: '#b3b3b3', 
    textAlign: 'center', 
    fontSize: '14px', 
    margin: '0 0 35px 0',
    lineHeight: '1.4'
  },
  errorAlert: { 
    backgroundColor: 'rgba(255, 77, 77, 0.1)', 
    color: '#ff4d4d', 
    padding: '12px', 
    borderRadius: '8px', 
    marginBottom: '25px', 
    fontSize: '14px',
    border: '1px solid rgba(255, 77, 77, 0.3)' 
  },
  formLayout: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '24px' 
  },
  row: { 
    display: 'flex', 
    gap: '20px', 
    flexWrap: 'wrap' 
  },
  inputGroup: { 
    flex: '1', 
    minWidth: '280px', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '10px' 
  },
  inputGroupFull: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '10px' 
  },
  label: { 
    color: '#ffffff', 
    fontSize: '15px',
    fontWeight: '500'
  },
  input: { 
    width: '100%', 
    padding: '14px 16px', 
    backgroundColor: '#1e1e1e', 
    border: '1px solid #3a3a3a', 
    borderRadius: '10px', 
    color: '#fff', 
    fontSize: '15px', 
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'all 0.2s ease-in-out',
    fontFamily: 'inherit'
  },
  inputFocus: {
    borderColor: '#ff2e7e',
    boxShadow: '0 0 0 2px rgba(255, 46, 126, 0.4)',
    backgroundColor: '#242424'
  },
  textarea: { 
    resize: 'vertical', 
    minHeight: '100px'
  },
  submitBtn: { 
    width: '100%', 
    padding: '15px', 
    border: 'none', 
    borderRadius: '12px', 
    backgroundColor: '#ff2e7e', 
    color: '#fff', 
    fontSize: '16px', 
    fontWeight: 'bold', 
    cursor: 'pointer', 
    marginTop: '10px',
    transition: 'background-color 0.2s ease',
    boxShadow: '0 4px 15px rgba(255, 46, 126, 0.3)'
  }
};

export default Registration;