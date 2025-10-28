import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const [sending, setSending] = useState(false);

  // use react-toastify for notifications

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.reason) {
      toast.warn('Please fill all required fields.', { position: 'bottom-right' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.warn('Please enter a valid email address.', { position: 'bottom-right' });
      return;
    }

    setSending(true);

    const payload = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      message: `Mobile: ${formData.mobile || 'N/A'}\n\nMessage:\n${formData.reason}`
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const ct = res.headers.get('Content-Type') || '';
      const data = ct.includes('application/json') ? await res.json() : { ok: res.ok, error: await res.text() };

      if (!res.ok) {
        console.error('/api/contact failed', data);
        toast.error(data.error || 'Server error', { position: 'bottom-right' });
        setSending(false);
        return;
      }

      toast.success('Thanks — I will get back to you soon.', { position: 'bottom-right' });
      setFormData({ firstName: '', lastName: '', mobile: '', email: '', reason: '' });
      setSending(false);
    } catch (err) {
      console.error('Contact submit error', err);
      toast.error('Could not send message. Try again later.', { position: 'bottom-right' });
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-white dark:bg-transparent rounded-xl transition-colors duration-300">
  <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white relative inline-block">
            <span className="relative z-10">Contact Me</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-blue-100 dark:bg-cyan-100 opacity-20 rounded"></span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-700 dark:text-cyan-100 max-w-2xl mx-auto">Feel free to reach out to me by filling this form</p>
        </div>

        <div className="relative transition-all duration-300 backdrop-blur-sm bg-transparent dark:bg-transparent border-[2px] border-blue-500/10 p-3 sm:p-6 rounded-xl hover:shadow-xl hover:shadow-blue-500/10 group overflow-hidden">
          <div className="absolute -right-12 -top-12 w-20 h-20 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-all duration-300" />
          <div className="absolute -left-16 -bottom-16 w-28 h-28 rounded-full bg-blue-500/5 group-hover:bg-blue-500/10 transition-all duration-500" />
          <form ref={form} onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-lg space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="p-3 rounded bg-white dark:bg-transparent text-gray-900 dark:text-blue-500 border-[2px] border-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="p-3 rounded bg-white dark:bg-transparent text-gray-900 dark:text-blue-500 border-[2px] border-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-white dark:bg-transparent text-gray-900 dark:text-blue-500 border-[2px] border-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-white dark:bg-transparent text-gray-900 dark:text-blue-500 border-[2px] border-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="reason"
              placeholder="Message"
              value={formData.reason}
              onChange={handleChange}
              rows="4"
              required
              className="w-full p-3 rounded bg-white dark:bg-transparent text-gray-900 dark:text-blue-500 border-[2px] border-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button type="submit" disabled={sending} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded transition duration-300 disabled:opacity-60">{sending ? 'Sending…' : 'Submit'}</button>
          </form>
        </div>
      </div>
      {/* React-Toastify container */}
      <ToastContainer position="bottom-right" autoClose={6000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </section>
  );
};

export default Contact;
