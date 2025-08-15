import { Metadata } from 'next';
import MapDistribution from '@/components/dashboard/MapContainer';

export const metadata: Metadata = {
  title: 'Peta Sebaran',
};

const MapDistributionPage = () => {
  return <MapDistribution />;
};

export default MapDistributionPage;
