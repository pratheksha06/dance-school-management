import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FAQ() {
  // State to track which FAQ item is currently open (Defaults to the first one)
  const [activeId, setActiveId] = useState(1);

  const toggleAccordion = (id) => {
    // If clicked item is already open, close it; otherwise, open the new one
    setActiveId(activeId === id ? null : id);
  };

  const faqData = [
    {
      id: 1,
      question: "Do I need prior dance experience?",
      answer: "No. We welcome beginners, intermediate learners, and advanced dancers. Our trainers guide students according to their skill levels."
    },
    {
      id: 2,
      question: "What dance styles do you teach?",
      answer: "We teach Hip Hop, Ballet, Salsa, Contemporary, Jazz, Classical, Break Dance, and many more."
    },
    {
      id: 3,
      question: "What are the available class timings?",
      answer: "Morning and evening batches are available: 6 AM - 7 AM, 4 PM - 5 PM, and 6 PM - 7 PM."
    },
    {
      id: 4,
      question: "Can I attend trial classes?",
      answer: "Yes. We provide one free trial session for new students before enrollment."
    },
    {
      id: 5,
      question: "How many days can I attend classes in a week?",
      answer: "Students can choose up to 3 preferred days per week according to their schedule."
    },
    {
      id: 6,
      question: "Do you conduct stage performances?",
      answer: "Yes. Students regularly participate in dance shows, cultural events, competitions, and annual performances."
    }
  ];

  return (
    <div style={styles.pageWrapper}>
      <style>{hoverStyles}</style>

      {/* --- NAVIGATION BAR --- */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>Rhythm</div>
        <div style={styles.navLinks}>
          <Link to="/" style={styles.navLink}>Home</Link>
          <a href="#about" style={styles.navLink}>About</a>
          <a href="#programs" style={styles.navLink}>Programs</a>
          <Link to="/faq" style={styles.navLink}>FAQ</Link>
          <a href="#contact" style={styles.navLink}>Contact</a>
        </div>
        <div>
          <Link to="/login" className="action-btn" style={styles.loginBtn}>Login</Link>
        </div>
      </nav>

      {/* --- FAQ SECTION --- */}
      <section style={styles.faqSection}>
        <div style={styles.faqTitleContainer}>
          <h1 style={styles.faqMainTitle}>Frequently Asked Questions</h1>
          <p style={styles.faqSubtitle}>Everything you need to know about Rhythm Dance Academy</p>
        </div>

        <div style={styles.accordionContainer}>
          {faqData.map((item) => {
            const isOpen = activeId === item.id;
            return (
              <div key={item.id} style={styles.accordionItem}>
                <h2>
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    style={{
                      ...styles.accordionButton,
                      background: isOpen ? '#ff3c78' : '#1b1b1b',
                    }}
                  >
                    {item.question}
                    <span style={{ float: 'right', fontSize: '14px' }}>
                      {isOpen ? '▲' : '▼'}
                    </span>
                  </button>
                </h2>
                
                {/* Collapsible Panel Content */}
                <div
                  style={{
                    ...styles.accordionCollapse,
                    maxHeight: isOpen ? '200px' : '0px',
                    padding: isOpen ? '25px' : '0px 25px',
                  }}
                >
                  <div style={styles.accordionBody}>
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer style={styles.footer}>
        <p style={{ margin: 0 }}>© 2026 Rhythm Dance Academy | All Rights Reserved</p>
      </footer>
    </div>
  );
}

// Global Interaction Overrides
const hoverStyles = `
  .action-btn:hover { transform: scale(1.05); cursor: pointer; }
  a:hover { color: #ff3c78 !important; }
`;

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    background: "linear-gradient(rgba(0,0,0,0.82),rgba(0,0,0,0.82)), url('https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1974&auto=format&fit=crop')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    fontFamily: "'Poppins', sans-serif"
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 8%',
    background: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(10px)',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000
  },
  logo: { fontSize: '30px', fontWeight: '700', color: '#ff3c78' },
  navLinks: { display: 'flex', gap: '30px' },
  navLink: { color: 'white', textDecoration: 'none', transition: '0.3s' },
  loginBtn: { background: 'transparent', color: 'white', border: '2px solid #ff3c78', padding: '10px 25px', borderRadius: '20px', fontSize: '15px', fontWeight: '500', textDecoration: 'none', display: 'inline-block', transition: '0.3s' },
  faqSection: { padding: '140px 10% 80px' }, // Extra top padding so fixed navbar doesn't cover title
  faqTitleContainer: { textAlign: 'center', marginBottom: '50px' },
  faqMainTitle: { fontSize: '55px', marginBottom: '15px', fontWeight: '600' },
  faqSubtitle: { color: '#cfcfcf', fontSize: '18px' },
  accordionContainer: { maxWidth: '800px', margin: '0 auto' },
  accordionItem: { background: '#1b1b1b', marginBottom: '20px', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' },
  accordionButton: { width: '100%', border: 'none', color: 'white', fontSize: '18px', padding: '22px', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background-color 0.3s ease' },
  accordionCollapse: { overflow: 'hidden', transition: 'max-height 0.3s ease, padding 0.3s ease', background: '#2a2a2a' },
  accordionBody: { color: '#d8d8d8', lineHeight: '28px', fontSize: '16px' },
  footer: { textAlign: 'center', padding: '30px', background: 'black', color: '#aaa', marginTop: '50px' }
};