'use client';

import IconDoubleArrowLeft from '@/components/icon/icon-double-arrow-left';
import IconDoubleArrowRight from '@/components/icon/icon-double-arrow-right';
import { getSentimentSummaryByCategory } from '@/server/actions/sentiments/get-sentiment-summary-by-category';
import { useSidebarFilterStore } from '@/store/sidebar-filter-store';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import SwiperInstance from 'swiper';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

interface SwiperButtonProps {
  swiperRef: React.RefObject<SwiperInstance | null>; // Define the type for swiperRef
}

const NextButton = ({ swiperRef }: SwiperButtonProps) => {
  return (
    <button
      onClick={() => swiperRef.current?.slideNext()}
      className="h-[50px] w-[50px] bg-[#00000033] rounded-full flex items-center justify-center"
    >
      <IconDoubleArrowRight />
    </button>
  );
};

const PrevButton = ({ swiperRef }: SwiperButtonProps) => {
  return (
    <button
      onClick={() => swiperRef.current?.slidePrev()}
      className="h-[50px] w-[50px] bg-[#00000033] rounded-full flex items-center justify-center"
    >
      <IconDoubleArrowLeft />
    </button>
  );
};

const SentimentSummaryByCategorySlider = () => {
  const { startDate, endDate, project } = useSidebarFilterStore();

  const swiperRef = useRef<SwiperType | null>(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ['sentiment-summary-category', startDate, endDate, project],
    queryFn: () =>
      getSentimentSummaryByCategory({
        startDate: startDate?.toString() ?? '',
        endDate: endDate?.toString() ?? '',
        project,
      }),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  if (!isMounted) return null;
  if (isLoading || isFetching) {
    return (
      <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
        <span className="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-black !border-l-transparent dark:border-white"></span>
      </div>
    );
  }

  if (isError || !data?.success) {
    return (
      <div className="min-h-[325px] h-full flex items-center justify-center bg-red-50 dark:bg-red-900/10">
        <div className="text-center">
          <div className="text-red-500 mb-2">⚠️ Error loading chart data</div>
          <button onClick={() => refetch()} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 rounded-md text-sm">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-5">
        <p className="text-center">
          Menampilkan {new Intl.NumberFormat('id-ID').format(data?.data?.length || 0)} Hasil
        </p>

        <div className="relative min-h-[300px]">
          <div className="absolute inset-0 flex items-center justify-between">
            <PrevButton swiperRef={swiperRef} />
            <NextButton swiperRef={swiperRef} />
          </div>

          <div className="px-[50px]">
            <Swiper
              onSwiper={(swiper: any) => (swiperRef.current = swiper)}
              slidesPerView={1}
              spaceBetween={0}
              breakpoints={{
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
            >
              {data?.data?.map((e) => (
                <SwiperSlide>
                  <ReactApexChart
                    series={e?.series}
                    type="donut"
                    height={300}
                    width={'100%'}
                    options={{
                      title: {
                        text: e?.category,
                        align: 'center',
                        style: {
                          fontWeight: 'normal',
                        },
                      },
                      chart: {
                        type: 'donut',
                        height: 270,
                        fontFamily: 'Nunito, sans-serif',
                      },
                      colors: ['#1B55E2', '#FE2C55', '#00C86E'],
                      labels: ['Positif', 'Negatif', 'Netral'],
                      legend: {
                        show: true,
                        position: 'bottom',
                      },
                      responsive: [
                        {
                          breakpoint: 480,
                          options: {
                            chart: {
                              width: 200,
                            },
                            legend: {
                              position: 'bottom',
                            },
                          },
                        },
                      ],
                    }}
                  />
                </SwiperSlide>
              ))}
              {/* <SwiperSlide>
                  {isMounted ? (
                  <ReactApexChart
                      series={sentimenKeseluruhanSliderChart.series}
                      options={sentimenKeseluruhanSliderChart.options}
                      type="donut"
                      height={270}
                      width={'100%'}
                  />
                  ) : (
                  <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                      <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
                  </div>
                  )}
              </SwiperSlide>
              <SwiperSlide>
                  {isMounted ? (
                  <ReactApexChart
                      series={sentimenKeseluruhanSliderChart.series}
                      options={sentimenKeseluruhanSliderChart.options}
                      type="donut"
                      height={270}
                      width={'100%'}
                  />
                  ) : (
                  <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                      <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
                  </div>
                  )}
              </SwiperSlide>
              <SwiperSlide>
                  {isMounted ? (
                  <ReactApexChart
                      series={sentimenKeseluruhanSliderChart.series}
                      options={sentimenKeseluruhanSliderChart.options}
                      type="donut"
                      height={270}
                      width={'100%'}
                  />
                  ) : (
                  <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                      <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
                  </div>
                  )}
              </SwiperSlide>
              <SwiperSlide>
                  {isMounted ? (
                  <ReactApexChart
                      series={sentimenKeseluruhanSliderChart.series}
                      options={sentimenKeseluruhanSliderChart.options}
                      type="donut"
                      height={270}
                      width={'100%'}
                  />
                  ) : (
                  <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                      <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
                  </div>
                  )}
              </SwiperSlide>
              <SwiperSlide>
                  {isMounted ? (
                  <ReactApexChart
                      series={sentimenKeseluruhanSliderChart.series}
                      options={sentimenKeseluruhanSliderChart.options}
                      type="donut"
                      height={270}
                      width={'100%'}
                  />
                  ) : (
                  <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                      <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
                  </div>
                  )}
              </SwiperSlide>
              <SwiperSlide>
                  {isMounted ? (
                  <ReactApexChart
                      series={sentimenKeseluruhanSliderChart.series}
                      options={sentimenKeseluruhanSliderChart.options}
                      type="donut"
                      height={270}
                      width={'100%'}
                  />
                  ) : (
                  <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                      <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
                  </div>
                  )}
              </SwiperSlide>
              <SwiperSlide>
                  {isMounted ? (
                  <ReactApexChart
                      series={sentimenKeseluruhanSliderChart.series}
                      options={sentimenKeseluruhanSliderChart.options}
                      type="donut"
                      height={270}
                      width={'100%'}
                  />
                  ) : (
                  <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                      <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
                  </div>
                  )}
              </SwiperSlide>
              <SwiperSlide>
                  {isMounted ? (
                  <ReactApexChart
                      series={sentimenKeseluruhanSliderChart.series}
                      options={sentimenKeseluruhanSliderChart.options}
                      type="donut"
                      height={270}
                      width={'100%'}
                  />
                  ) : (
                  <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                      <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
                  </div>
                  )}
              </SwiperSlide>
              <SwiperSlide>
                  {isMounted ? (
                  <ReactApexChart
                      series={sentimenKeseluruhanSliderChart.series}
                      options={sentimenKeseluruhanSliderChart.options}
                      type="donut"
                      height={270}
                      width={'100%'}
                  />
                  ) : (
                  <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                      <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
                  </div>
                  )}
              </SwiperSlide> */}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default SentimentSummaryByCategorySlider;
