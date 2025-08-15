'use client';
import ReactApexChart from "react-apexcharts";
import { HistoryChart } from "./constants/history.constants";
import { useEffect, useState } from "react";
import { Box, Text, Select, Image, Card, Grid, Button , ThemeIcon, Avatar, Timeline} from "@mantine/core";
import { ICChevron, SampleMedia, ICRetweet, ICHeart, ICComment, ICAnalytics } from "@/assets/icons";
import { Pagination } from '@mantine/core';

const ActionFilter = () =>{
    return <>
        <Box className="flex items-center gap-3">
            <Text>Urutkan : </Text>
                <Select
                    label=""
                    placeholder="Terbaru"
                    rightSection={<Image src={ICChevron.src} height={7} width={7} alt="Doc" />}
                    data={[
                        { value: 'A', label: 'A' },
                        { value: 'B', label: 'B' },
                        { value: 'C', label: 'C' },
                        { value: 'D', label: 'D' },
                    ]}
                />
                <Select
                    label=""
                    placeholder="Sentimen"
                    rightSection={<Image src={ICChevron.src} height={7} width={7} alt="Doc" />}
                    data={[
                        { value: 'E', label: 'E' },
                        { value: 'F', label: 'F' },
                        { value: 'G', label: 'G' },
                        { value: 'H', label: 'H' },
                    ]}
                />
                <Select
                    label=""
                    placeholder="Submer Data"
                    rightSection={<Image src={ICChevron.src} height={7} width={7} alt="Doc" />}
                    data={[
                        { value: 'I', label: 'I' },
                        { value: 'J', label: 'J' },
                        { value: 'K', label: 'K' },
                        { value: 'L', label: 'L' },
                    ]}
                />
        </Box>
    </>
}

const Content = () =>{
    return <>
    <Card
      radius="sm"
      sx={{
        padding: '1rem 1.2rem !important',
      }}
    >

        <Box className='flex items-end'>
            <Box className='flex items-center gap-2'>
                <Image src={SampleMedia.src} width={30} height={30} alt='media' />
                <Box className='flex flex-col'>
                    <Text fw={400} size={14}>Bank Indonesia</Text>
                    <Box className='flex items-center gap-2'>
                        <Text size={12} fw={400}>@instagram.com</Text>
                    </Box>
                </Box>
            </Box>
            <Box>
                <Text size={14} fw={400} c='#0E1726'>2025-05-13 20:22  05:00</Text>
            </Box>
        </Box>
        <Box mt={20} ml={10}>
            <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum tempora quo ipsa nulla, dolorum repellendus ipsum numquam necessitatibus repellat autem ea, nesciunt eveniet aut ut. Doloribus dolore corporis laudantium quibusdam itaque ut quidem ullam architecto repudiandae! Facere iure magni dolorem nemo magnam, error est deleniti maiores blanditiis ullam enim! Illum iure dicta hic quibusdam sequi laudantium provident quaerat. Deserunt, in hic consequatur dolores illum dicta accusantium quia culpa facere. Praesentium, cum tenetur vel reiciendis dolore exercitationem? Iste iure quas impedit est consequuntur sit? Quisquam error sequi corporis obcaecati. Blanditiis officia vitae maxime esse architecto itaque excepturi nostrum porro iste magni?</Text>
        </Box>
        <Box className="flex items-center justify-between">

            <Box mt={20} ml={10} className="flex items-center justify-start gap-3">
                <Button className="p-0 flex items-center justify-start gap-4" sx={{ background: 'transparent', padding: 0, '.mantine-Button-label, .mantine-Button-root:hover': { padding: '0 !important', background: 'transparent !important' } }}>
                    <Image src={ICComment.src} />
                    <Text fw={600} size={12} color="#888EA8">100</Text>
                </Button>
                <Button className="p-0 flex items-center justify-start gap-4" sx={{ background: 'transparent', padding: 0, '.mantine-Button-label, .mantine-Button-root:hover': { padding: '0 !important', background: 'transparent !important' } } }>
                    <Image src={ICRetweet.src} />
                    <Text fw={600} size={12} color="#888EA8" ml={5}>200</Text>
                </Button>
                <Button className="p-0 flex items-center justify-start gap-4" sx={{ background: 'transparent', padding: 0, '.mantine-Button-label, .mantine-Button-root:hover': { padding: '0 !important', background: 'transparent !important' } } }>
                    <Image src={ICHeart.src} />
                    <Text fw={600} size={12} color="#888EA8" ml={5}>300</Text>
                </Button>
            </Box>

            <Box className="flex items-center gap-4">
                <Text size={12} fw={600} c='#888EA8'>Engagement : 1</Text>
                <Text size={12} fw={600} c='#888EA8'>Reach : 0</Text>
            </Box>
        </Box>
        <Box className="flex items-center gap-4">
            <Box sx={{ background: '#E0E6ED', padding: '8px 20px', borderRadius: '20px' }} >😐 Indonesia</Box>
            <Box sx={{ background: '#E0E6ED', padding: '8px 20px', borderRadius: '20px' }} >㙟 Netral</Box>
        </Box>
    </Card>
    </>
}

const TimeLine = () =>{
    return <>
        <Card
            radius="sm"
            sx={{
                padding: '0!important',
            }}
        >   
            <Box className="flex items-center gap-3" sx={{ borderBottom: '1px solid #E0E6ED', padding: '1rem 1.2rem ' }}>
                <Image src={ICAnalytics.src} width={20} alt="icon" />
                <Text size={19} fw={400}>Wawasan</Text>
            </Box>

            <Box sx={{ padding: '1rem 1.2rem ' }}>
                <Timeline>
                    <Timeline.Item
                    title=""
                    bulletSize={24}
                    bullet={
                        <Avatar
                        size={22}
                        radius="xl"
                        src="https://avatars0.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4"
                        />
                    }
                    >
                    <Text color="#888EA8" fw={400} size={12}>2025-07-17</Text>
                    <Text color="#000000" fw={400} size={14}>
                        Laporan inflasi Bank Indonesia bulan Juni 2025 menyoroti peran 
                        TPIP/TPID dalam pengendalian inflasi
                        <br />
                        Berita singkat tentang inflasi regional dan upaya pengendalian 
                        di berbagai wilayah</Text>
                    </Timeline.Item>

                    <Timeline.Item
                    title=""
                    bulletSize={24}
                    bullet={
                        <Avatar
                        size={22}
                        radius="xl"
                        src="https://avatars0.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4"
                        />
                    }
                    >
                    <Text color="#888EA8" fw={400} size={12}>2025-07-17</Text>
                    <Text color="#000000" fw={400} size={14}>
                        Laporan inflasi Bank Indonesia bulan Juni 2025 menyoroti peran 
                        TPIP/TPID dalam pengendalian inflasi
                        <br />
                        Berita singkat tentang inflasi regional dan upaya pengendalian 
                        di berbagai wilayah</Text>
                    </Timeline.Item>

                </Timeline>
            </Box>
        </Card>
    </>
}

export default function HistoryPage (){

    const [activePage, setPage] = useState(1);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
      setIsMounted(true);
    }, [])

    return (
        <>
            <Box className="panel h-full col-span-2">
                {isMounted ? (
                <ReactApexChart
                    series={HistoryChart.series}
                    options={HistoryChart.options}
                    type="area"
                    height={350}
                    width={'100%'}
                />
                ) : (
            <Box className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                <Text className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></Text>
            </Box>
            )}
        </Box>
        <Box mt={30}>
            <Text className="flex items-center gap-2">Semua . <Text fw={700}>63.524</Text> data . 14 Jul 2025, 00:00 WIB . 20 Jul 2025, 23:59 WIB</Text>
        </Box>
        <Box mt={30}>
            <ActionFilter />
        </Box>
        <Box mt={30}>
        <Grid columns={24} className="flex items-start">
            <Grid.Col span={16}>
                {[...Array(2)].map((_, idx) => (
                    <Content />
                ))}
            <Box className='flex items-center justify-end mt-3 gap-4'>
                <Text size={14} fw={600}>Showing 1 to 10 of 13 entries</Text>
                <Select
                    label=""
                    placeholder="Terbaru"
                    rightSection={<Image src={ICChevron.src} height={7} width={7} alt="Doc" />}
                    data={[
                        { value: '10', label: '10' },
                        { value: '20', label: '20' },
                        { value: '30', label: '30' },
                        { value: '40', label: '40' },
                    ]}
                />
                <Pagination total={2} size="xs" radius="xl"  page={activePage} onChange={setPage} withEdges/>
            </Box>
            </Grid.Col>
            <Grid.Col span={8}>
                <TimeLine />
            </Grid.Col>
        </Grid>
            
        </Box>
        
        </>
    )
}