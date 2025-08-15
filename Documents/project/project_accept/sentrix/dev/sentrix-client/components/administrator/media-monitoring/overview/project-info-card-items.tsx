interface ProjectInfoCardItems {
  title: string;
  icon: React.ReactNode;
  value: number;
  variant: 'outline' | 'primary';
}

const ProjectInfoCardItems = ({ title, icon, value, variant }: ProjectInfoCardItems) => {
  const isPrimary = variant === 'primary';

  return (
    <div
      className={[
        'w-44 h-28 rounded-md p-4',
        isPrimary ? 'bg-[#4361EE] text-white' : 'bg-white border border-gray-200 text-gray-800',
      ].join(' ')}
    >
      <h2 className="text-base font-semibold">{title}</h2>
      <div className="flex items-center w-full gap-2">
        <span className="size-4 flex items-center justify-center">{icon}</span>
        <span className="text-2xl font-bold">{value}</span>
      </div>
    </div>
  );
};

export default ProjectInfoCardItems;
