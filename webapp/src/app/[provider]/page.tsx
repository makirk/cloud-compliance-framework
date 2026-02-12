import { ProviderPageClient } from './ProviderPageClient';

export function generateStaticParams() {
  return [
    { provider: 'aws' },
    { provider: 'azure' },
  ];
}

interface ProviderPageProps {
  params: Promise<{ provider: string }>;
}

export default async function ProviderPage({ params }: ProviderPageProps) {
  const { provider } = await params;
  return <ProviderPageClient provider={provider} />;
}
