'use client';
import { Card, Image, Text, Grid, Box } from '@mantine/core';
import { ICDislike, ICPeople, ICSharedPost } from '@/assets/icons';
import { Pagination } from '@mantine/core';
import { useState } from 'react';
import { SampleMedia, ICShare, ICCalendarSecondary } from '@/assets/icons';
import { useTabs } from '../providers/TabsContext';
import { TABS_MENU_ENUM } from '../types/tabs.enum';

interface CardContentProps {
    title: string;
    icon: string;
    isDanger?: boolean;
    href?: string;
};

interface IPropsCardMedia {
    borderRed?: boolean
    num?: number
}

const CardMedia = ({ borderRed = false, num }: IPropsCardMedia) => {
    const { activeTab } = useTabs()
  return (
    <Card
      component="a"
      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      target="_blank"
      radius="sm"
      sx={{
        padding: '1rem 1.2rem !important',
        border: `1px solid ${borderRed ? '#FF0000' : '#C8C7CC'}`
      }}
    >

        <Box className='flex items-start justify-between'>
            <Box className='flex items-center gap-2'>
                <Box className='relative'>
                    {!borderRed && (<Box 
                        className='absolute flex items-center justify-center rounded-full'
                        sx={{
                            backgroundColor: '#C8C7CC',
                            left: '-12px',
                            top: '8px',
                            width: '18px',
                            height: '17px'
                        }}
                    >
                        <Text size={14} fw={400} c="#ffffff">{ num }</Text>
                    </Box>)}
                    <Box className='rounded-full border border-[#C8C7CC] w-fit p-2'>
                        <Image src={SampleMedia.src} width={17} height={17} alt='media' />
                    </Box>
                </Box>
                <Box className='flex flex-col'>
                    <Text fw={400} size={14}>bank_indonesia</Text>
                    <Box className='flex items-center gap-2'>
                        <Image src={ICShare.src} width={13} height={13} alt='share' />
                        <Text size={12} fw={400} c='#C8C7CC'>instagram.com</Text>
                    </Box>
                </Box>
            </Box>
            {activeTab === TABS_MENU_ENUM.MEDIA_ONLINE.toLocaleLowerCase() && 
                <Box>
                    <Box className='flex items-center gap-2'>
                        <Image src={ICCalendarSecondary.src} height={10} width={10} alt="Time" />
                        <Text size={10} fw={600} c='#888EA8'>2025-07-02 04:24</Text>
                    </Box>
                </Box>
            }
        </Box>

      <Box>
        <Text mt="xs" size="sm">
            dan TPID melalui Gerakan Nasional Pengendalian Inflasi Pangan (GNPIP) di berbagai daerah! Lalu, apa
        </Text>
      </Box>
      {activeTab === TABS_MENU_ENUM.MEDIA_SOSIAL.toLocaleLowerCase() && 
                <Box>
                    <Box className='flex justify-end items-center gap-2'>
                        <Image src={ICCalendarSecondary.src} height={10} width={10} alt="Time" />
                        <Text size={10} fw={600} c='#888EA8'>2025-07-02 04:24</Text>
                    </Box>
                </Box>
            }
    </Card>
  );
}
  
const CardContent = ({ title, icon, isDanger = false, href }: CardContentProps) => {
    const [activePage, setPage] = useState(1);
    return (
      <Card
        shadow="sm"
        p="xl"
      >
        {/* Header */}
        <Box mb={20} className="flex items-center gap-2">
          <Image src={icon} width={15} height={15} alt={title} />
          <Text size={18} weight={400}>
            {title}
          </Text>
        </Box>
  
        {/* Content List */}
        {[...Array(8)].map((_, idx) => (
          <Box key={idx} mb={20}>
            <CardMedia borderRed={isDanger} num={idx+1} />
          </Box>
        ))}
        <Box className='flex items-center justify-end'>
            <Pagination total={2} size="xs" radius="xl" sx={{ 
                ".mantine-Pagination-item:disabled": {
                  display: 'none !important'  
                }
            }} page={activePage} onChange={setPage} />
        </Box>
      </Card>
    );
  };

export default function Media() {
    
  return (
    <>
     <Grid className='gap-0'>
      <Grid.Col span={4}>
        <Box>
            <CardContent title="People" icon={ICPeople.src} />
        </Box>
      </Grid.Col>
      <Grid.Col span={4}>
        <Box>
            <CardContent title="Netral" icon={ICSharedPost.src} />
        </Box>
      </Grid.Col>
      <Grid.Col span={4}>
        <Box>
            <CardContent title="Negatif" icon={ICDislike.src} isDanger={true} />
        </Box>
      </Grid.Col>
    </Grid>
    </>
  );
}