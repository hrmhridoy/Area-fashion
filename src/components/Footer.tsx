'use client';

import React from 'react';
import Link from 'next/link';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest } from 'react-icons/fa';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const sections = {
    Shop: [
      { label: 'New Arrivals', href: '/shop?sort=newest' },
      { label: 'Best Sellers', href: '/shop?sort=popular' },
      { label: 'Women', href: '/shop?category=women' },
      { label: 'Men', href: '/shop?category=men' },
      { label: 'Sale', href: '/shop?sale=true' },
    ],
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Contact', href: '/contact' },
    ],
    Support: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Shipping Info', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
      { label: 'Size Guide', href: '/size-guide' },
      { label: 'Track Order', href: '/track-order' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Accessibility', href: '/accessibility' },
    ],
  };

  const socialLinks = [
    { icon: FaFacebook, href: '#', label: 'Facebook' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaPinterest, href: '#', label: 'Pinterest' },
  ];

  return (
    <footer className="bg-primary-900 text-gray-100 mt-20">
      {/* Newsletter Section */}
      <div className="bg-primary-800">
        <div className="container-custom py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">
              Join Our Fashion Community
            </h3>
            <p className="text-gray-300 mb-6">
              Subscribe to get special offers and updates on our latest collections.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-600"
              />
              <button className="btn btn-accent">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-serif font-bold">A</span>
              </div>
              <span className="font-serif font-bold text-lg text-white">Aria</span>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Discover timeless fashion with modern design. Quality, elegance, and style in every piece.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FiMapPin className="w-5 h-5 text-accent-600" />
                <span className="text-sm">123 Fashion Ave, New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="w-5 h-5 text-accent-600" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="w-5 h-5 text-accent-600" />
                <span className="text-sm">hello@ariafashion.com</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(sections).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-accent-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} Aria Fashion. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    title={social.label}
                    className="text-gray-400 hover:text-accent-600 transition-colors transform hover:scale-110"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500 uppercase">Secure payments:</span>
              <div className="flex gap-2">
                {['Visa', 'MC', 'Amex', 'Paypal'].map((method) => (
                  <div
                    key={method}
                    className="w-8 h-5 bg-gray-700 rounded flex items-center justify-center text-xs font-bold text-gray-400"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
