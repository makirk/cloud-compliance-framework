'use client';

import Link from 'next/link';
import { Shield, Search, Menu, X, Settings } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
  onMenuToggle?: () => void;
  onSearchClick?: () => void;
}

export function Header({ onMenuToggle, onSearchClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    onMenuToggle?.();
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and title */}
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
              onClick={handleMenuToggle}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            <Link href="/" className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 hidden sm:block">
                Cloud Compliance Framework
              </span>
              <span className="text-xl font-bold text-gray-900 sm:hidden">
                CCF
              </span>
            </Link>
          </div>

          {/* Search and actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSearchClick}
              className="hidden sm:flex items-center gap-2 text-gray-500"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
              <kbd className="hidden lg:inline-flex items-center px-2 py-0.5 text-xs font-medium text-gray-400 bg-gray-100 rounded">
                /
              </kbd>
            </Button>

            <button
              className="sm:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
              onClick={onSearchClick}
            >
              <Search className="w-5 h-5" />
            </button>

            <Link href="/settings">
              <Button variant="ghost" size="sm" className="text-gray-500">
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/aws"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              AWS
            </Link>
            <Link
              href="/azure"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Azure
            </Link>
            <Link
              href="/search"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Search
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
