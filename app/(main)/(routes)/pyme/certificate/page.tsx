"use client";

import { useState } from "react";
import { User, Book, Calendar, Clock, Download } from "lucide-react";

export default function CertificateForm() {
  const [form, setForm] = useState({ name: "", project: "", date: "", days: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/generate-certificate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      console.error("Error generating certificate");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `certificate-${form.name}.pdf`;
    a.click();
    a.remove();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-10 px-4 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg space-y-6 border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Generate Certificate</h2>

        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="pl-10 w-full text-gray-700 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="relative">
          <Book className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            name="project"
            placeholder="Project Name"
            onChange={handleChange}
            required
            className="pl-10 w-full border text-gray-700 border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="relative">
          <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="date"
            name="date"
            onChange={handleChange}
            required
            className="pl-10 w-full border text-gray-700 border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 "
          />
        </div>

        <div className="relative">
          <Clock className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="number"
            name="days"
            placeholder="Days of Project"
            onChange={handleChange}
            required
            className="pl-10 w-full border text-gray-700 border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-[#2196F3] hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          <Download size={18} />
          Generate Certificate
        </button>
      </form>
    </div>
  );
}
