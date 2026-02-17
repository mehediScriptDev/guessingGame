import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const FooterLayout = () => {
  return (
    <footer className="bg-[#0d1832] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14">
        {/* Brand */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            {/* simple droplet mark */}
            <img src="/img/logo.png" alt="Deal Hunter Logo" />
          </div>

          {/* Socials */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <span className="text-sm text-blue-200/90">Social Media</span>
            <div className="flex items-center gap-5 text-blue-200">
              <a href="#" aria-label="Facebook" className="transition hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="transition hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="transition hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="transition hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* thin divider */}
          <div className="mt-10 w-full border-t border-white/10" />

          {/* Bottom row */}
          <div className="mt-8 flex w-full flex-col items-center justify-between gap-6 text-sm text-blue-100/90 md:flex-row">
            <nav className="flex flex-wrap items-center gap-x-8 gap-y-3 tracking-wide uppercase">
              <Link to="/about" className="text-white hover:text-gray-500">
                About Us
              </Link>
              <Link to="/contact" className="text-white hover:text-gray-500">
                Contact Us
              </Link>
              <Link to="/help" className="text-white hover:text-gray-500">
                Help
              </Link>
              <Link to="/privacy" className="text-white hover:text-gray-500">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-white hover:text-gray-500">
                Terms & Condition
              </Link>
            </nav>

            <p className="text-blue-100/90">
              Copyright © 2026 • <span className="font-semibold">Deal Hunter</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLayout;
