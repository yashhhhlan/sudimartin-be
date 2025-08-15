'use client';
import 'swiper/css';
import 'swiper/css/navigation';
import IconProjectDate from '@/components/icon/icon-project-date';
import SentimentSummaryDonutChart from './sentiment-summary-donut-chart';
import SentimentSummaryTimelineChart from './sentiment-summary-timeline-chart';
import SentimentSummaryByCategorySlider from './sentiment-summary-by-category-slider';
import EmosiSummaryDonutChart from './emosi-summary-donut-chart';
import EmosiSummaryTimelineChart from './emosi-summary-timeline-chart';
import { useState } from 'react';
import { SidebarFilter } from '@/components/sidebar-filter';
import { useQuery } from '@tanstack/react-query';
import { getAllTopics } from '@/server/actions/topics/get-all-topics';
import { useSidebarFilterStore } from '@/store/sidebar-filter-store';

const Sentiment = () => {
  const { data: topics } = useQuery({
    queryKey: ['topics-all'],
    queryFn: () => getAllTopics(),
  });

  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const { setStartDate, setEndDate, setProject } = useSidebarFilterStore();

  const onApplyFilters = (value: any) => {
    setProject(value?.project);
    if (value?.periode && value?.periode?.length === 2) {
      setStartDate(value?.periode[0]?.toISOString().split('T')[0]);
      setEndDate(value?.periode[1]?.toISOString().split('T')[0]);
    }

    setOpenFilter(false);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="font-bold text-[#0E1726] text-2xl">Sentimen</h1>
            <div className="flex gap-2 items-center">
              <IconProjectDate />
              <div className="font-semibold text-sm">17 Jul 2025 - 18 Jul 2025</div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <button
              className="min-w-[120px] text-base flex gap-2 justify-between items-center border-blue-500 rounded-md px-2 py-1"
              style={{ borderWidth: '1px' }}
              onClick={() => setOpenFilter(true)}
            >
              Filter
              <span>
                <svg width="27" height="29" viewBox="0 0 27 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_210_696)">
                    <path
                      d="M5.70565 0.500013C4.95594 0.498389 4.21329 0.650327 3.52035 0.947107C2.8274 1.24389 2.19779 1.67966 1.66766 2.22943C1.13753 2.77919 0.71732 3.43212 0.431139 4.15073C0.144958 4.86934 -0.00155349 5.63949 1.24208e-05 6.41697V22.5831C-0.00155349 23.3605 0.144958 24.1307 0.431139 24.8493C0.71732 25.5679 1.13753 26.2208 1.66766 26.7706C2.19779 27.3204 2.8274 27.7561 3.52035 28.0529C4.21329 28.3497 4.95594 28.5016 5.70565 28.5H21.2944C22.0441 28.5016 22.7867 28.3497 23.4797 28.0529C24.1726 27.7561 24.8022 27.3204 25.3324 26.7706C25.8625 26.2208 26.2827 25.5679 26.5689 24.8493C26.8551 24.1307 27.0016 23.3605 27 22.5831V6.41697C27.0016 5.63949 26.8551 4.86934 26.5689 4.15073C26.2827 3.43212 25.8625 2.77919 25.3324 2.22943C24.8022 1.67966 24.1726 1.24389 23.4797 0.947107C22.7867 0.650327 22.0441 0.498389 21.2944 0.500013H5.70565ZM8.05681 9.46001C8.05825 9.46001 8.05969 9.46001 8.06113 9.46001C8.07876 9.45912 8.09642 9.45912 8.11405 9.46001C8.13204 9.45908 8.15006 9.45908 8.16805 9.46001H18.8709C18.8802 9.45976 18.8896 9.45976 18.8989 9.46001C18.9158 9.45919 18.9328 9.45919 18.9497 9.46001C18.9679 9.46279 18.9859 9.46653 19.0037 9.47121C19.0055 9.4712 19.0073 9.4712 19.0091 9.47121C19.0254 9.47417 19.0417 9.47791 19.0577 9.48241C19.0588 9.48241 19.0599 9.48241 19.0609 9.48241C19.0767 9.48728 19.0921 9.49288 19.1074 9.49921C19.1088 9.49921 19.1103 9.49921 19.1117 9.49921C19.1275 9.50518 19.143 9.51191 19.1581 9.51937C19.1589 9.51937 19.1596 9.51937 19.1603 9.51937C19.224 9.55195 19.2809 9.59724 19.3277 9.65265C19.3273 9.65265 19.3281 9.65265 19.3277 9.65265C19.3742 9.70917 19.4104 9.77472 19.4323 9.84548C19.4541 9.91623 19.4621 9.99079 19.4559 10.0648C19.4497 10.1388 19.4293 10.2108 19.396 10.2765C19.3626 10.3423 19.317 10.4005 19.2618 10.4479L15.1362 14.7263V20.6555C15.1361 20.7513 15.1123 20.8454 15.0672 20.929C15.022 21.0125 14.9569 21.0826 14.8781 21.1326C14.7994 21.1826 14.7096 21.2108 14.6173 21.2145C14.525 21.2183 14.4333 21.1974 14.3511 21.1539L12.2148 20.0339C12.1256 19.9876 12.0504 19.9164 11.9978 19.8284C11.9452 19.7405 11.9171 19.6391 11.9167 19.5355V14.7498L7.82785 10.5095C7.82569 10.5095 7.82353 10.5095 7.82137 10.5095C7.71853 10.4505 7.63704 10.3583 7.58927 10.247C7.54151 10.1356 7.53007 10.0112 7.5567 9.89247C7.58333 9.77377 7.64658 9.66732 7.73683 9.58928C7.82709 9.51123 7.93943 9.46585 8.05681 9.46001ZM9.41977 10.5823L12.7581 14.0453C12.825 14.1133 12.8738 14.1982 12.8995 14.2917C12.9638 14.3872 12.9978 14.5011 12.9967 14.6176V19.1962L14.0551 19.7517V14.6143C14.0536 14.5221 14.074 14.4309 14.1145 14.3488C14.1347 14.2331 14.1895 14.1269 14.2711 14.0453L17.6105 10.5823H9.41761H9.41977Z"
                      fill="#2196F3"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_210_696">
                      <rect width="27" height="28" fill="white" transform="translate(0 0.5)" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
            </button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-12">
          <div className="panel h-full col-span-2 xl:col-span-5 flex flex-col space-y-4">
            <h5 className="text-lg font-semibold">Sentimen Keseluruhan</h5>
            <SentimentSummaryDonutChart />
          </div>
          <div className="panel h-full col-span-2 xl:col-span-7">
            <SentimentSummaryTimelineChart />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-12">
          <div className="panel h-full col-span-2 xl:col-span-5 flex flex-col space-y-4">
            <h5 className="text-lg font-semibold">Emosi Keseluruhan</h5>

            <EmosiSummaryDonutChart />
          </div>
          <div className="panel h-full col-span-2 xl:col-span-7">
            <EmosiSummaryTimelineChart />
          </div>
        </div>

        <div className="grid grid-cols-1">
          <div className="panel h-full">
            <div className="grid grid-cols-1">
              <h5 className="text-lg font-semibold">Sentimen per Sumber Data</h5>
              <SentimentSummaryByCategorySlider />
            </div>
          </div>
        </div>
      </div>

      <SidebarFilter
        isOpen={openFilter}
        fields={[
          {
            id: 'periode',
            label: 'Periode',
            type: 'daterange',
          },
          {
            id: 'project',
            label: 'Kata kunci',
            type: 'dropdown',
            options:
              topics?.data?.map((e: any) => ({
                label: e.project,
                value: e.project,
              })) || [],
          },
        ]}
        onClose={() => setOpenFilter(false)}
        onApplyFilters={(filter: any) => onApplyFilters(filter)}
      />
    </>
  );
};

export default Sentiment;
