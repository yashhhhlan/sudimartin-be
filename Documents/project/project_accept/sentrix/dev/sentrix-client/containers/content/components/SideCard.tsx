'use client';
import { Box, Text, Image} from '@mantine/core';
import { ICTimePlain, SampleMedia } from '@/assets/icons';


export default function SideCard() {
  return (
    <>
        <Box className='flex items-start gap-4'>
            <Box className='mb-5'>
                <Image src="https://images.unsplash.com/photo-1524661135-423995f22d0b" height={96} width={96} radius={6}/>
            </Box>
            <Box>
                <Text fw={500} size={13} mb={10} c='#3E3232'>Media Online</Text>
                <Text fw={700} size={13}>Pertumbuhan Ekonomi Indonesia di Tengah Tantangan Global</Text>
                <Box className='flex items-center gap-3 mt-2'>
                    <Box className='flex items-center gap-2'>
                        <Image src={SampleMedia.src} width={15} height={15} alt='time' />
                        <Text fw={600} size={13} c='#4E4B66'>CNN</Text>
                    </Box>
                    <Box className='flex items-center gap-2'>
                        <Image src={ICTimePlain.src} width={15} height={15} alt='time' />
                        <Text fw={400} size={13} c='#4E4B66'>04 June 2023</Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    </>
  );
}