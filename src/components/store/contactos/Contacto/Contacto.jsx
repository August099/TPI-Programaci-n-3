import React from 'react';

import { useState } from "react";

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Acá podrías conectar una API
    console.log("Formulario enviado:", form);

    setSubmitted(true);

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Contactanos
      </h2>

      {submitted && (
        <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700">
          Mensaje enviado correctamente.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Nombre
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Tu nombre"
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="tu@email.com"
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Mensaje
          </label>

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Escribí tu mensaje..."
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition"
        >
          Enviar mensaje
        </button>
      </form>
    </div>
  );
}

export default ContactForm;