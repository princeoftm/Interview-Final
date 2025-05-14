import React, { useState } from 'react';

const Contact = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // State for submission status
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here, you would typically send the form data to a backend or API
    setIsSubmitted(true);
    console.log('Form Submitted:', formData);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Contact Me</h1>
      <p style={{ textAlign: 'center', marginBottom: '20px' }}>Feel free to send me a message and I will get back to you as soon as possible.</p>

      {/* Form */}
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="name" style={{ display: 'block', fontSize: '1rem', marginBottom: '5px' }}>Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{ display: 'block', fontSize: '1rem', marginBottom: '5px' }}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="message" style={{ display: 'block', fontSize: '1rem', marginBottom: '5px' }}>Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '5px', height: '150px' }}
            />
          </div>

          <button type="submit" style={{
            width: '100%',
            padding: '12px',
            fontSize: '1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Send Message
          </button>
        </form>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#28a745' }}>Thank you for reaching out!</h2>
          <p style={{ fontSize: '1rem', color: '#333' }}>Your message has been received. I'll get back to you as soon as possible.</p>
        </div>
      )}
    </div>
  );
};

export default Contact;
