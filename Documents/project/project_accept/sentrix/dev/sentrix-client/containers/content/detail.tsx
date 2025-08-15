'use client';
import { Box, Text, Grid, Image} from '@mantine/core';
import { ICTime, ICDoc, ICMoney, ICSize } from '@/assets/icons';
import SideCard from './components/SideCard';

const HeaderContent = () => {
    return (
      <Box mb={30}>
        <Text size={18} fw="bold">Bisnis Indonesia</Text>
        <Box className="flex items-center gap-3">
          {/* date */}
          <Box className='flex items-center gap-2'>
            <Image src={ICTime.src} height={16} width={16} alt="Time" />
            <Text size={14} fw={600} c='#888EA8'>Date : 2024-06-27</Text>
          </Box>
          {/* Doc */}
          <Box className='flex items-center gap-2'>
            <Image src={ICDoc.src} height={16} width={16} alt="Doc" />
            <Text size={14} fw={600} c='#888EA8'>Page : 1</Text>
          </Box>
          {/* Size */}
          <Box className='flex items-center gap-2'>
            <Image src={ICSize.src} height={16} width={16} alt="Doc" />
            <Text size={14} fw={600} c='#888EA8'>Size : 305 x 533 mm</Text>
          </Box>
          {/* Size */}
          <Box className='flex items-center gap-2'>
            <Image src={ICMoney.src} height={16} width={16} alt="Money" />
            <Text size={14} fw={600} c='#888EA8'>Value : 50 M</Text>
          </Box>
        </Box>
      </Box>
    );
  };

export default function Detail() {
  return (
    <>
        <HeaderContent />
        <Grid columns={24}>
            <Grid.Col span={16}>
                <Box className='w-full mb-5'>
                    <Image src="https://plus.unsplash.com/premium_photo-1712509212206-ab4e7b3bb593" height={452} width="100%"/>
                </Box>
                <Box>
                    <Text fw={700} size={24} mb={10}>Pertumbuhan Ekonomi Indonesia di Tengah Tantangan Global</Text>
                    <Text fw={500} size={14}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos labore quia magnam quis iste ullam quasi iure, a doloribus error eveniet mollitia dolorem quaerat natus est architecto repellendus totam esse deleniti itaque laboriosam reprehenderit ea sequi? Possimus numquam facilis veniam laudantium nesciunt distinctio quia eum, tenetur dolorem ducimus id. Molestias.</Text>
                </Box>
            </Grid.Col>
            <Grid.Col span={8}>
                {[...Array(5)].map((_, idx) => (
                    <SideCard />
                ))}
            </Grid.Col>
        </Grid>
    </>
  );
}