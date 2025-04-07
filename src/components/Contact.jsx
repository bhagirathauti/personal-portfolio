import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    reason: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, form.current, import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
      .then(
        () => {
          alert('Thank you for contacting me!');
          setFormData({
            firstName: '',
            lastName: '',
            mobile: '',
            email: '',
            reason: ''
          });
        },
        (error) => {
          console.error('EmailJS error:', error.text);
          alert('Something went wrong. Please try again.');
        }
      );
  };

  return (
    <section id="contact" className="py-16 bg-transparent rounded-xl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white relative inline-block">
            <span className="relative z-10">Contact Me</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-cyan-100 opacity-20 rounded"></span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-cyan-100 max-w-2xl mx-auto">Feel free to reach out to me by filling this form</p>
        </div>

        <div className="transition-all duration-300 backdrop-blur-sm shadow-md bg-transparent">
          <form ref={form} onSubmit={handleSubmit} className="p-8 rounded-lg shadow-lg space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="p-3 rounded text-blue-500 border-[2px] border-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="p-3 text-blue-500 rounded border-[2px] border-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full p-3 text-blue-500 rounded border-[2px] border-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 text-blue-500 rounded border-[2px] border-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="reason"
              placeholder="Message"
              value={formData.reason}
              onChange={handleChange}
              rows="4"
              required
              className="w-full p-3 text-blue-500 rounded border-[2px] border-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
