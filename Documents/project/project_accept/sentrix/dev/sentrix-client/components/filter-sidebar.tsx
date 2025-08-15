import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import Flatpickr from 'react-flatpickr';
import Select from 'react-select';
import { X } from 'lucide-react';
import 'flatpickr/dist/flatpickr.css';

import { useFilterStore } from '@/store/filter-store';
import { CurrentUser } from '@/types/components';

interface FilterSidebarProps {
  currentUser: CurrentUser;
}

const FilterSidebar = ({ currentUser }: FilterSidebarProps) => {
  const { isOpen, closeSidebar, filters, updateFilter, resetFilters } = useFilterStore();

  const [localFilters, setLocalFilters] = useState({
    dateRange: [] as Date[],
    selectedProject: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    dateRange: false,
    selectedProject: false,
  });

  const [flatpickrKey, setFlatpickrKey] = useState<number>(0);
  const [showDatePresets, setShowDatePresets] = useState<boolean>(false);
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });
  const flatpickrRef = useRef<any>(null);

  const isValidForm = useMemo(() => {
    const hasDateRange =
      (localFilters.dateRange.length > 0 && localFilters.dateRange.length === 2) ||
      (filters.dateRange.length > 0 && filters.dateRange.length === 2);
    const hasProject = localFilters.selectedProject || filters.selectedProject;

    return hasDateRange && hasProject;
  }, [localFilters, filters]);

  useEffect(() => {
    if (isOpen) {
      setLocalFilters((prev) => ({
        ...prev,
      }));
    }
  }, [isOpen]);

  const validateForm = () => {
    const errors = {
      dateRange: !(
        (localFilters.dateRange.length > 0 && localFilters.dateRange.length === 2) ||
        (filters.dateRange.length > 0 && filters.dateRange.length === 2)
      ),
      selectedProject: !(localFilters.selectedProject || filters.selectedProject),
    };

    setValidationErrors(errors);
    return !errors.dateRange && !errors.selectedProject;
  };

  const clearValidationError = (field: keyof typeof validationErrors) => {
    setValidationErrors((prev) => ({ ...prev, [field]: false }));
  };

  const getDatePresets = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const last7Days = new Date(today);
    last7Days.setDate(last7Days.getDate() - 7);

    const last30Days = new Date(today);
    last30Days.setDate(last30Days.getDate() - 30);

    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    const thisYearStart = new Date(today.getFullYear(), 0, 1);

    const lastYearStart = new Date(today.getFullYear() - 1, 0, 1);
    const lastYearEnd = new Date(today.getFullYear() - 1, 11, 31);

    const presets = [
      {
        label: 'Today',
        value: [new Date(today), new Date(today)],
      },
      {
        label: 'Yesterday',
        value: [new Date(yesterday), new Date(yesterday)],
      },
      {
        label: 'Last 7 days',
        value: [new Date(last7Days), new Date(today)],
      },
      {
        label: 'Last 30 days',
        value: [new Date(last30Days), new Date(today)],
      },
      {
        label: 'This Month',
        value: [new Date(thisMonthStart), new Date(today)],
      },
      {
        label: 'Last Month',
        value: [new Date(lastMonthStart), new Date(lastMonthEnd)],
      },
      {
        label: 'This Year',
        value: [new Date(thisYearStart), new Date(today)],
      },
      {
        label: 'Last Year',
        value: [new Date(lastYearStart), new Date(lastYearEnd)],
      },
    ];

    return presets.map((preset) => {
      const [startDate, endDate] = preset.value;

      return preset;
    });
  };

  const getCalendarPosition = () => {
    const calendar = document.querySelector('.flatpickr-calendar');
    if (calendar) {
      const rect = calendar.getBoundingClientRect();
      return {
        top: rect.top,
        left: rect.left,
      };
    }
    return { top: 0, left: 0 };
  };

  const projectOptions = useMemo(() => {
    return currentUser.assignedProjects.map((project) => ({
      value: project.name,
      label: project.name,
    }));
  }, [currentUser.assignedProjects]);

  const currentDateRange = localFilters.dateRange.length > 0 ? localFilters.dateRange : filters.dateRange;
  const currentSelectedProject = localFilters.selectedProject || filters.selectedProject;

  useEffect(() => {
    if (currentDateRange.length === 0 && currentSelectedProject === '') {
      setLocalFilters({ dateRange: [], selectedProject: '' });
      setValidationErrors({ dateRange: false, selectedProject: false });
      setFlatpickrKey((prev) => prev + 1);
      setShowDatePresets(false);
    }
  }, [currentDateRange, currentSelectedProject]);

  const handleDateChange = useCallback((dates: Date[]) => {
    setLocalFilters((prev) => ({ ...prev, dateRange: dates }));
    clearValidationError('dateRange');
  }, []);

  const handlePresetSelect = useCallback((preset: { label: string; value: Date[] }) => {
    try {
      setLocalFilters((prev) => ({
        ...prev,
        dateRange: [...preset.value],
      }));

      if (flatpickrRef.current?.flatpickr) {
        const fp = flatpickrRef.current.flatpickr;
        fp.setDate(preset.value, true);
      }

      setShowDatePresets(false);
      clearValidationError('dateRange');
    } catch (error) {}
  }, []);

  const handleProjectChange = (selectedOption: any) => {
    const project = selectedOption ? selectedOption.value : '';
    setLocalFilters((prev) => ({ ...prev, selectedProject: project }));
    clearValidationError('selectedProject');
  };

  const handleApply = () => {
    if (!validateForm()) {
      return;
    }

    if (localFilters.dateRange.length > 0) {
      updateFilter('dateRange', localFilters.dateRange);
    }
    if (localFilters.selectedProject) {
      updateFilter('selectedProject', localFilters.selectedProject);
    }

    setLocalFilters({ dateRange: [], selectedProject: '' });
    setValidationErrors({ dateRange: false, selectedProject: false });
    setShowDatePresets(false);
    closeSidebar();
  };

  const handleReset = () => {
    setLocalFilters({ dateRange: [], selectedProject: '' });
    setValidationErrors({ dateRange: false, selectedProject: false });
    setFlatpickrKey((prev) => prev + 1);
    setShowDatePresets(false);
    resetFilters();
    closeSidebar();
  };

  const handleClose = () => {
    setLocalFilters({ dateRange: [], selectedProject: '' });
    setValidationErrors({ dateRange: false, selectedProject: false });
    setShowDatePresets(false);
    closeSidebar();
  };

  const selectedProjectOption = currentSelectedProject
    ? projectOptions.find((option) => option.value === currentSelectedProject)
    : null;

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-[9998]" onClick={handleClose} />}

      <div
        className={`fixed top-0 right-0 h-screen w-80 bg-white shadow-2xl z-[9999] transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Filter Data</h2>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 p-4 space-y-6">
          <div className="relative">
            <label className="block text-sm font-medium mb-2">
              Periode <span className="text-red-500">*</span>
            </label>
            <Flatpickr
              ref={flatpickrRef}
              key={flatpickrKey}
              value={currentDateRange}
              options={{
                mode: 'range',
                dateFormat: 'd-m-Y',
                onOpen: () => {
                  setTimeout(() => {
                    const position = getCalendarPosition();
                    setCalendarPosition(position);
                    setShowDatePresets(true);
                  }, 10);
                },
                onClose: () => {
                  setShowDatePresets(false);
                },
                onChange: (selectedDates) => {
                  if (selectedDates.length > 0) {
                    handleDateChange(selectedDates);
                  }
                },
              }}
              className={`w-full border rounded-md px-3 py-2 text-sm ${
                validationErrors.dateRange ? 'border-red-500 focus:border-red-500' : 'border-gray-300'
              }`}
              placeholder="Pilih periode tanggal"
            />
            {validationErrors.dateRange && <p className="text-red-500 text-xs mt-1">Date range is required</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Kata kunci <span className="text-red-500">*</span>
            </label>
            <Select
              placeholder="Pilih kata kunci"
              options={projectOptions}
              value={selectedProjectOption}
              onChange={handleProjectChange}
              isClearable={false}
              className={`react-select ${validationErrors.selectedProject ? 'error' : ''}`}
              classNamePrefix="select"
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderColor: validationErrors.selectedProject ? '#ef4444' : base.borderColor,
                  '&:hover': {
                    borderColor: validationErrors.selectedProject ? '#ef4444' : base.borderColor,
                  },
                }),
              }}
            />
            {validationErrors.selectedProject && (
              <p className="text-red-500 text-xs mt-1">Project selection is required</p>
            )}
          </div>
        </div>

        <div className="p-4 border-t">
          <div className="flex gap-3">
            <button onClick={handleReset} className="flex-1 px-4 py-2 text-sm border rounded-md hover:bg-gray-50">
              Reset
            </button>
            <button
              onClick={handleApply}
              disabled={!isValidForm}
              className={`flex-1 px-4 py-2 text-sm rounded-md transition-colors ${
                isValidForm
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Proses
            </button>
          </div>
          {!isValidForm && (
            <p className="text-red-500 text-xs mt-2 text-center">*Silakan pilih periode tanggal dan kata kunci</p>
          )}
        </div>
      </div>

      {showDatePresets && (
        <div
          className="fixed bg-white border rounded-md shadow-lg z-[10001] w-32"
          style={{
            top: `${calendarPosition.top + 22}px`,
            left: `${calendarPosition.left - 120}px`,
            pointerEvents: 'auto',
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
        >
          <div>
            <div className="py-3">
              {getDatePresets().map((preset, index) => (
                <button
                  key={`${preset.label}-${index}`}
                  className="w-full text-left px-3 py-1.5 text-sm rounded-l-md hover:bg-gray-100 text-gray-700 transition-colors border border-transparent hover:border-gray-200"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    try {
                      setLocalFilters((prev) => ({
                        ...prev,
                        dateRange: [...preset.value],
                      }));

                      if (flatpickrRef.current?.flatpickr) {
                        const fp = flatpickrRef.current.flatpickr;
                        fp.setDate(preset.value, true);
                      }

                      setShowDatePresets(false);
                      clearValidationError('dateRange');
                    } catch (error) {}
                  }}
                  type="button"
                  style={{ pointerEvents: 'auto' }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;
