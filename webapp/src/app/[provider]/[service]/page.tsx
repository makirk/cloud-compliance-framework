import { ServicePageClient } from './ServicePageClient';

// Generate static params for all provider/service combinations
export function generateStaticParams() {
  const services = [
    // AWS Services
    { provider: 'aws', service: 'ec2' },
    { provider: 'aws', service: 'eks' },
    { provider: 'aws', service: 's3' },
    { provider: 'aws', service: 'iam' },
    { provider: 'aws', service: 'rds' },
    { provider: 'aws', service: 'lambda' },
    { provider: 'aws', service: 'kms' },
    { provider: 'aws', service: 'vpc' },
    { provider: 'aws', service: 'cloudwatch' },
    // Azure Services
    { provider: 'azure', service: 'entraid' },
    { provider: 'azure', service: 'functions' },
    { provider: 'azure', service: 'keyvault' },
    { provider: 'azure', service: 'monitor' },
    { provider: 'azure', service: 'sql' },
    { provider: 'azure', service: 'storage' },
    { provider: 'azure', service: 'virtualmachines' },
    { provider: 'azure', service: 'virtualnetwork' },
  ];

  return services;
}

interface ServicePageProps {
  params: Promise<{ provider: string; service: string }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { provider, service } = await params;
  return <ServicePageClient provider={provider} service={service} />;
}
