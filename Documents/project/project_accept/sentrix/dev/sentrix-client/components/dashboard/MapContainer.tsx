'use client';

import dynamic from 'next/dynamic';

const MapWithChoropleth = dynamic(() => import('./DistributionMap'), { ssr: false });

export default function MapContainer() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <MapWithChoropleth />
    </div>
  );
}
