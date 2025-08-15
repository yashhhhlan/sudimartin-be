import { Metadata } from 'next';
import SnaGraph from '@/components/dashboard/SnaGraphWrapper';

export const metadata: Metadata = {
  title: 'Peta Interaksi',
};

export default function SnaGraphPage() {
  return <SnaGraph />;
}
