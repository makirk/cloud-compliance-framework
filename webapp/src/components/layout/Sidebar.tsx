'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Cloud,
  Search,
  FileText,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ServiceInfo, Provider } from '@/types';

interface SidebarProps {
  services?: Record<Provider, ServiceInfo[]>;
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function NavItem({ href, icon, label, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
        active
          ? 'bg-blue-50 text-blue-700'
          : 'text-gray-700 hover:bg-gray-100'
      )}
    >
      {icon}
      {label}
    </Link>
  );
}

interface ProviderSectionProps {
  provider: Provider;
  services: ServiceInfo[];
  currentPath: string;
}

function ProviderSection({ provider, services, currentPath }: ProviderSectionProps) {
  const [expanded, setExpanded] = useState(
    currentPath.toLowerCase().startsWith(`/${provider.toLowerCase()}`)
  );

  const providerPath = `/${provider.toLowerCase()}`;
  const isProviderActive = currentPath === providerPath;

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          'flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors',
          isProviderActive
            ? 'bg-blue-50 text-blue-700'
            : 'text-gray-700 hover:bg-gray-100'
        )}
      >
        <div className="flex items-center gap-3">
          <Cloud className="w-4 h-4" />
          {provider}
        </div>
        {expanded ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>

      {expanded && services.length > 0 && (
        <div className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-3">
          {services.map((service) => {
            const servicePath = `/${provider.toLowerCase()}/${service.name.toLowerCase()}`;
            const isActive = currentPath.startsWith(servicePath);

            return (
              <Link
                key={service.name}
                href={servicePath}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <FileText className="w-3.5 h-3.5" />
                {service.name}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Sidebar({ services = { AWS: [], Azure: [] } }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 lg:border-r lg:border-gray-200 lg:bg-white">
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <NavItem
          href="/"
          icon={<LayoutDashboard className="w-4 h-4" />}
          label="Dashboard"
          active={pathname === '/'}
        />

        <NavItem
          href="/search"
          icon={<Search className="w-4 h-4" />}
          label="Search"
          active={pathname === '/search'}
        />

        <div className="pt-4">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Cloud Providers
          </h3>

          <div className="mt-2 space-y-1">
            <ProviderSection
              provider="AWS"
              services={services.AWS}
              currentPath={pathname}
            />
            <ProviderSection
              provider="Azure"
              services={services.Azure}
              currentPath={pathname}
            />
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Cloud Compliance Framework
        </p>
      </div>
    </aside>
  );
}
