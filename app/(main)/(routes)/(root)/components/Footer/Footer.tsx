"use client";

import {  InstagramIcon} from "lucide-react";


export function Footer() {

    return (

        <div className="bg-[#0a2243] text-white px-5 py-10 text-center">
  <footer id="contact-section">
    <ul className="flex flex-wrap justify-center gap-5 mb-8">
      <li className="relative group">
        <a href="/contacto" className="text-white text-base hover:underline">
          Contact
        </a>
        <div className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 bg-gray-800 text-white p-3 rounded-md w-56 mt-2 shadow-lg z-10 text-sm">
          Contact us for support or questions.
        </div>
      </li>
      <li className="relative group">
        <a href="/privacy" className="text-white text-base hover:underline">
          Privacy Policy
        </a>
        <div className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 bg-gray-800 text-white p-3 rounded-md w-56 mt-2 shadow-lg z-10 text-sm">
          Here we explain how we use your data.
        </div>
      </li>
      <li className="relative group">
        <a href="/terms" className="text-white text-base hover:underline">
          Terms and conditions
        </a>
        <div className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 bg-gray-800 text-white p-3 rounded-md w-56 mt-2 shadow-lg z-10 text-sm">
          Read our terms of use.
        </div>
      </li>
      <li className="relative group">
        <a href="/faq" className="text-white text-base hover:underline">
          Frequently asked questions
        </a>
        <div className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 bg-gray-800 text-white p-3 rounded-md w-56 mt-2 shadow-lg z-10 text-sm">
          Answers to common questions.
        </div>
      </li>
    </ul>

    <div className="mt-5">
      <h3 className="mb-4 text-lg font-semibold">Follow us on social media</h3>
      <ul className="flex flex-wrap justify-center gap-6">
        <li>
          <a
            href="mailto:contacto@empresa.com"
            aria-label="Correo Electrónico"
            className="flex items-center gap-2 text-white text-lg hover:text-blue-400 transition-colors"
          >
            <svg
              xmlns=""
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
            </svg>
            dexpertwork@gmail.com
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/dexpert.sv?igsh=MTd0eDZzOGoyZmVlcw=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex items-center gap-2 text-white text-lg hover:text-blue-400 transition-colors"
          >
            <InstagramIcon />
            Instagram
          </a>
        </li>
      </ul>
    </div>

    <div className="mt-8 text-sm text-gray-400">
      <p>© 2025 Dexpert</p>
    </div>
  </footer>
</div>
  );
}
    
