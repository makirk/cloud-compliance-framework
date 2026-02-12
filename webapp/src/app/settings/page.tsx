'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Settings, Github, RefreshCw, Trash2 } from 'lucide-react';
import { Provider, ServiceInfo } from '@/types';
import { githubClient } from '@/lib/github/client';
import { useComplianceStore } from '@/stores/compliance';

const DEMO_SERVICES: Record<Provider, ServiceInfo[]> = {
  AWS: [],
  Azure: [],
};

export default function SettingsPage() {
  const { githubConfig, setGitHubConfig } = useComplianceStore();
  const [owner, setOwner] = useState('makirk');
  const [repo, setRepo] = useState('cloud-compliance-framework');
  const [branch, setBranch] = useState('main');
  const [token, setToken] = useState('');
  const [saving, setSaving] = useState(false);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    setOwner(githubConfig.owner);
    setRepo(githubConfig.repo);
    setBranch(githubConfig.branch);
    setToken(githubConfig.token || '');
  }, [githubConfig]);

  const handleSave = async () => {
    setSaving(true);

    // Update the store
    setGitHubConfig({ owner, repo, branch, token: token || undefined });

    // Update the GitHub client
    githubClient.configure({ owner, repo, branch, token: token || undefined });

    // Clear cache to force refresh
    if (typeof window !== 'undefined') {
      const keys = Object.keys(localStorage).filter((k) => k.startsWith('ccf_cache_'));
      keys.forEach((key) => localStorage.removeItem(key));
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    setSaving(false);

    // Reload the page to fetch new data
    window.location.reload();
  };

  const handleClearCache = async () => {
    setClearing(true);
    // Clear localStorage cache
    if (typeof window !== 'undefined') {
      const keys = Object.keys(localStorage).filter((k) => k.startsWith('ccf_cache_'));
      keys.forEach((key) => localStorage.removeItem(key));
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
    setClearing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar services={DEMO_SERVICES} />

      <main className="lg:pl-64 pt-16">
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">
          <Breadcrumb items={[{ label: 'Settings' }]} className="mb-6" />

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Settings className="w-6 h-6" />
              Settings
            </h1>
            <p className="mt-1 text-gray-500">
              Configure the compliance framework data source
            </p>
          </div>

          <div className="space-y-6">
            {/* GitHub Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Github className="w-5 h-5" />
                  GitHub Repository
                </CardTitle>
                <CardDescription>
                  Configure the GitHub repository containing your compliance data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Owner / Organization
                  </label>
                  <input
                    type="text"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your-org"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Repository Name
                  </label>
                  <input
                    type="text"
                    value={repo}
                    onChange={(e) => setRepo(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="cloud-compliance-framework"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Branch
                  </label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="main"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Personal Access Token (Optional)
                  </label>
                  <input
                    type="password"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Adding a token increases the API rate limit from 60 to 5,000 requests per hour
                  </p>
                </div>

                <Button onClick={handleSave} disabled={saving}>
                  {saving ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Configuration'
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Cache Management */}
            <Card>
              <CardHeader>
                <CardTitle>Cache Management</CardTitle>
                <CardDescription>
                  Cached data is stored locally and expires after 15 minutes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" onClick={handleClearCache} disabled={clearing}>
                  {clearing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Clearing...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear Cache
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
