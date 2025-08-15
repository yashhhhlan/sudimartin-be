'use client';
import { Card, Image, Text, Box, Grid, Button } from '@mantine/core';
import { ICArrow } from '@/assets/icons';
import { useRouter } from "next/navigation";

const CardContent = () => {
  const router = useRouter();
  return (
    <Card
      className="bg-transparent group px-0 overflow-hidden rounded-[20px] cursor-pointer"
      px={0}
      onClick={() => router.push(`/dashboard/media-monitoring/content/xxx`)}
    >
      <Card.Section mb={30} mx={0} className="overflow-hidden">
        <Image
          src="https://plus.unsplash.com/premium_photo-1681492405224-b787ee736768"
          height={248}
          radius={6}
          alt="Norway"
          className="transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-1"
          styles={{
            root: {
              borderRadius: '20px',
            },
          }}
        />
      </Card.Section>

      <Box mb={10}>
        <Text fw="bold" size={16}>Jawa Pos</Text>
        <Text fw={500} size={12} c='#26262699'>04 June 2023</Text>
      </Box>

      <Text size={22} mb={20} sx={{ lineHeight: '28px' }}>
        Pertumbuhan Ekonomi Indonesia di Tengah Tantangan Global
      </Text>
      <Text size={16} fw={500} c="#696868">
        Pertumbuhan ekonomi Indonesia pada 2025 diproyeksikan tetap stabil meski tekanan global seperti perlambatan ekonomi Tiongkok dan ketidakpastian geopolitik masih membayangi.
      </Text>
    </Card>
  );
};

export default function PrintMedia() {
  return (
    <>
      <Grid>
        {[...Array(8)].map((_, idx) => (
          <Grid.Col key={idx} md={6} lg={3}>
            <CardContent />
          </Grid.Col>
        ))}
      </Grid>
      <Box mt={20} className="flex items-center gap-4">
        <Button
          sx={{
            width: '70px',
            '&:disabled': { background: '#BAB8B8' },
          }}
          disabled
          color="dark"
        >
          <Image src={ICArrow.src} alt="Norway" sx={{ rotate: '180deg' }} />
        </Button>
        <Button sx={{ width: '70px' }} color="dark">
          <Image src={ICArrow.src} alt="Norway" />
        </Button>
      </Box>
    </>
  );
}
