import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter, FaPinterest, FaEnvelope, FaLinkedin } from 'react-icons/fa';
import logoPlaceholder from '/src/assets/logo.png'; 

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: 'rgba(28, 48, 103, 0.8)', // Platinum color background
      color: '#fff',
      padding: '40px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    section: {
      flex: '1 1 20%',
      minWidth: '200px',
      marginBottom: '20px',
    },
    logo: {
      marginBottom: '20px',
      height: '130px',
      width: 'auto',
    },
    socialIcons: {
      display: 'flex',
      gap: '10px',
      marginTop: '20px',
    },
    formControl: {
      display: 'block',
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      backgroundColor: '#fff',
      color: '#fff',
      border: 'none',
    },
    radioGroup: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    },
    subscribeButton: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#fff',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
      marginBottom: '10px',
      display: 'block',
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.section}>
        <img src={logoPlaceholder} alt="Logo" style={styles.logo} />
        <div style={styles.socialIcons}>
          <a href="#" style={{ color: '#fff' }}><FaInstagram size={24} /></a>
          <a href="#" style={{ color: '#fff' }}><FaFacebook size={24} /></a>
          <a href="#" style={{ color: '#fff' }}><FaTwitter size={24} /></a>
          <a href="#" style={{ color: '#fff' }}><FaPinterest size={24} /></a>
          <a href="#" style={{ color: '#fff' }}><FaEnvelope size={24} /></a>
          <a href="#" style={{ color: '#fff' }}><FaLinkedin size={24} /></a>
        </div>
      </div>
      <div style={styles.section}>
        <h3>Our Story</h3>
        <ul>
          <li><Link to="/who-we-are" style={styles.link}>Who we are</Link></li>
          <li><Link to="/sustainable-practices" style={styles.link}>Sustainable practices</Link></li>
          <li><Link to="/design-ideology" style={styles.link}>Design Ideology</Link></li>
          <li><Link to="/fabrics" style={styles.link}>Fabrics</Link></li>
          <li><Link to="/circular-denim" style={styles.link}>Circular denim™</Link></li>
          <li><Link to="/partners-and-factories" style={styles.link}>Partners and factories</Link></li>
        </ul>
      </div>
      <div style={styles.section}>
        <h3>Discover</h3>
        <ul>
          <li><Link to="/gift-cards" style={styles.link}>Gift Cards</Link></li>
          <li><Link to="/rewards" style={styles.link}>Frank Rewards</Link></li>
          <li><Link to="/give-get" style={styles.link}>Give $15, Get $15</Link></li>
          <li><Link to="/affiliate" style={styles.link}>Affiliate</Link></li>
          <li><Link to="/blog" style={styles.link}>Blog</Link></li>
          <li><Link to="/careers" style={styles.link}>Work with us</Link></li>
          <li><Link to="/stores" style={styles.link}>Our Stores</Link></li>
        </ul>
      </div>
      <div style={styles.section}>
        <h3>Customer Care</h3>
        <ul>
          <li><Link to="/shipping-information" style={styles.link}>Shipping Information</Link></li>
          <li><Link to="/returns-exchanges" style={styles.link}>Returns & Exchanges</Link></li>
          <li><Link to="/coupon-codes" style={styles.link}>Coupon Codes</Link></li>
          <li><Link to="/faq" style={styles.link}>F.A.Q.</Link></li>
          <li><Link to="/terms-conditions" style={styles.link}>Terms & Conditions</Link></li>
          <li><Link to="/refund-policy" style={styles.link}>Refund Policy</Link></li>
          <li><Link to="/privacy-policy" style={styles.link}>Privacy policy</Link></li>
          <li><Link to="/accessibility" style={styles.link}>Accessibility</Link></li>
        </ul>
      </div>
      <div style={styles.section}>
        <h3>Stay in touch</h3>
        <p>Join our newsletter and stay in the know about new collections, outfit inspiration, sales, and more.</p>
        <input type="email" placeholder="Email" style={styles.formControl} />
        <input type="text" placeholder="First Name" style={styles.formControl} />
        <div style={styles.radioGroup}>
          <label>
            <input type="radio" name="shopfor" value="women" /> Women
          </label>
          <label>
            <input type="radio" name="shopfor" value="men" /> Men
          </label>
          <label>
            <input type="radio" name="shopfor" value="all" /> All
          </label>
        </div>
        <button style={styles.subscribeButton}>Subscribe</button>
      </div>
    </footer>
  );
};

export default Footer;
