import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-(--color-text) px-4 pt-12 pb-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <h3 className="text-xl font-extrabold text-(--color-accent)">
            Craving
          </h3>
          <p className="mt-3 text-sm text-white/70">
            Food delivery designed like a vibe — curated kitchens, real-time
            tracking, and one-tap reordering.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Craving on Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-(--color-primary)"
            >
              <FaFacebookF size={14} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Craving on Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-(--color-primary)"
            >
              <FaInstagram size={14} />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Craving on X"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-(--color-primary)"
            >
              <FaXTwitter size={14} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/" className="text-white/80 hover:text-(--color-accent)">
                Home
              </Link>
            </li>
            <li>
              <Link to="/order-now" className="text-white/80 hover:text-(--color-accent)">
                Restaurants
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white/80 hover:text-(--color-accent)">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white/80 hover:text-(--color-accent)">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60">
            Account
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/login" className="text-white/80 hover:text-(--color-accent)">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-white/80 hover:text-(--color-accent)">
                Register
              </Link>
            </li>
            <li>
              <Link to="/userdashboard" className="text-white/80 hover:text-(--color-accent)">
                Customer Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* For Partners */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60">
            For Partners
          </h4>
          <p className="mt-2 text-xs text-white/50">
            Restaurants and riders sign up through the same Register page —
            just pick your role.
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/register" className="text-white/80 hover:text-(--color-accent)">
                Become a Partner
              </Link>
            </li>
            <li>
              <Link to="/restaurantdashboard" className="text-white/80 hover:text-(--color-accent)">
                Restaurant Dashboard
              </Link>
            </li>
            <li>
              <Link to="/riderdashboard" className="text-white/80 hover:text-(--color-accent)">
                Rider Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60">
            Get in Touch
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <FaLocationDot className="mt-1 shrink-0 text-(--color-accent)" />
              <span>Bhopal, Madhya Pradesh, India</span>
            </li>
            <li className="flex items-center gap-2">
              <FaPhone className="shrink-0 text-(--color-accent)" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="shrink-0 text-(--color-accent)" />
              <span>support@craving.app</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-center text-xs text-white/50">
        © {year} Craving. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;