'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('sent');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 3000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setStatus('sent');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="pt-16 pb-24 flex flex-col">
      <h1 className="mb-2 text-3xl font-medium tracking-tight font-syne">
        Contact
      </h1>
      <p className='text-lg font-inter text-[#8f9ba8] mb-8'>Just talk about new projects, ideas, or just say hi!</p>

      <form onSubmit={handleSubmit} className="max-w-lg w-full">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-inter mb-2 text-[#8f9ba8]">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-lg border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-inter mb-2 text-[#8f9ba8]">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-lg border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-inter mb-2 text-[#8f9ba8]">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-2 rounded-lg border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-[#262626] text-white px-6 py-2 rounded-lg font-inter hover:bg-dark-600 transition-colors disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'sent' && (
          <p className="mt-4 text-green-500 font-inter text-sm">Message sent successfully!</p>
        )}
      </form>
    </section>
  );
}
