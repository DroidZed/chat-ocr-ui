import { Link } from 'react-router-dom';
import { Mail, Globe } from 'lucide-react';
import grepsysLogo from '@/assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={grepsysLogo}
                alt="GREPSYS Logo"
                className="h-10"
              />
              <div className="h-8 w-px bg-gray-600"></div>
              <span className="text-2xl font-bold text-white">Chat OCR</span>
            </div>
            <p className="text-gray-400 mb-4">
              AI-powered document understanding platform by GREPSYS. Transform images into conversations with cutting-edge OCR technology.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Powered by</span>
              <a
                href="https://www.grepsys.com/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:opacity-80 transition-opacity"
                style={{ color: '#43b149' }}
              >
                GREPSYS
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/chat" className="hover:text-white transition-colors">
                  Chat
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4" style={{ color: '#43b149' }} />
                <a
                  href="https://www.grepsys.com/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  grepsys.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" style={{ color: '#43b149' }} />
                <a
                  href="mailto:info@grepsys.com"
                  className="hover:text-white transition-colors"
                >
                  info@grepsys.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} GREPSYS. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
