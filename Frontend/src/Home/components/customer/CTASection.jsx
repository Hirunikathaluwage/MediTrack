import React from 'react';
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';

export function CTASection() {
  return (
    <footer className="bg-gradient-to-r from-blue-700 to-green-600 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* MediTrack Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4">MediTrack</h2>
          <p className="text-sm">
            Your trusted partner for smarter healthcare management. Search, order, and receive medicines at your fingertips.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/services" className="hover:underline">Services</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/help" className="hover:underline">Help Center</a></li>
            <li><a href="/faq" className="hover:underline">FAQs</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <MailIcon size={16} /> support@meditrack.com
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon size={16} /> +94 70 494 9394
            </li>
            <li className="flex items-center gap-2">
              <MapPinIcon size={16} /> Colombo, Sri Lanka
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-blue-500 mt-10 pt-6 text-center text-sm">
        © 2025 MediTrack. All rights reserved.
      </div>
    </footer>
  );
}
