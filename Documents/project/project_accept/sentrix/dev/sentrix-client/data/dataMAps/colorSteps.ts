export interface ColorStep {
  label: string;
  color: string;
  min: number;
}

export const colorSteps: ColorStep[] = [
  { label: 'green', color: '#2ecc71', min: 0 }, // Politik
  { label: 'yellow', color: '#f1c40f', min: 100 }, // Ekonomi
  { label: 'orange', color: '#e67e22', min: 200 }, // Olahraga
  { label: 'purple', color: '#8e44ad', min: 300 }, // Budaya
];

export const categoryColorMap: Record<string, string> = {
  Politik: 'green',
  Ekonomi: 'yellow',
  Olahraga: 'orange',
  Budaya: 'purple',
};
