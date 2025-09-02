import React from "react";
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";

export function CTASection() {
  return (
    <footer className="bg-gradient-to-r from-blue-700 to-green-600 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* MediTrack Brand */}
        <div>
          <h2 className="text-3xl font-bold mb-4">MediTrack</h2>
          <p className="text-base leading-relaxed opacity-90">
            Your trusted partner for smarter healthcare management. Search,
            order, and receive medicines at your fingertips.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-base">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/services" className="hover:underline">
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Support</h3>
          <ul className="space-y-3 text-base">
            <li>
              <a href="/help" className="hover:underline">
                Help Center
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:underline">
                FAQs
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:underline">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-base">
            <li className="flex items-center gap-3">
              <MailIcon size={18} /> support@meditrack.com
            </li>
            <li className="flex items-center gap-3">
              <PhoneIcon size={18} /> +94 70 494 9394
            </li>
            <li className="flex items-center gap-3">
              <MapPinIcon size={18} /> Colombo, Sri Lanka
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-blue-400 mt-12 pt-6 text-center text-base font-medium opacity-90">
        © 2025 MediTrack. All rights reserved.
      </div>
    </footer>
  );
}
