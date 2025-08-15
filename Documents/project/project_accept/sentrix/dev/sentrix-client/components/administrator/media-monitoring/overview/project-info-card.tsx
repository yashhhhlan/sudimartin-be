import ProjectInfoCardItems from './project-info-card-items';
import IconServer from '@/components/icon/icon-server';
import IconDocument from '@/components/icon/icon-document';
import IconWeb from '@/components/icon/icon-web';
import IconTV from '@/components/icon/icon-tv';

const cards = [
  {
    title: 'Semua Kanal',
    value: 93,
    icon: <IconServer />,
    variant: 'primary',
  },
  {
    title: 'Media Cetak',
    value: 28,
    icon: <IconDocument />,
    variant: 'outline',
  },
  {
    title: 'Media Online',
    value: 51,
    icon: <IconWeb />,
    variant: 'outline',
  },
  {
    title: 'TV',
    value: 14,
    icon: <IconTV />,
    variant: 'outline',
  },
];

const ProjectInfoCard = () => (
  <div className="flex gap-4 items-start">
    {cards.map((card, index) => (
      <ProjectInfoCardItems
        key={index}
        title={card.title}
        value={card.value}
        icon={card.icon}
        variant={card.variant as 'primary' | 'outline'}
      />
    ))}
  </div>
);

export default ProjectInfoCard;
