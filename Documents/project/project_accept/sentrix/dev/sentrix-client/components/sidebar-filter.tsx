'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Select from 'react-select';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';

export interface FilterField {
  id: string;
  label: string;
  type: 'date' | 'dropdown' | 'multiselect' | 'daterange';
  options?: { value: string; label: string }[];
  defaultValue?: any;
  accessor?: string;
  customFilter?: (item: any, filterValues: any) => boolean;
}

interface SidebarFilterProps {
  isOpen: boolean;
  onClose: () => void;
  fields: FilterField[];
  onApplyFilters: (filters: Record<string, any>) => void;
  defaultFilters?: Record<string, any>;
}

export const SidebarFilter = ({ isOpen, onClose, fields, onApplyFilters, defaultFilters = {} }: SidebarFilterProps) => {
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      const initialFilters: Record<string, any> = {};
      fields.forEach((field) => {
        if (defaultFilters[field.id] !== undefined) {
          initialFilters[field.id] = defaultFilters[field.id];
        } else if (field.defaultValue !== undefined) {
          initialFilters[field.id] = field.defaultValue;
        }
      });
      setFilters(initialFilters);
      setIsInitialized(true);
    }
  }, [fields, defaultFilters, isInitialized]);

  const handleFilterChange = (fieldId: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
  };

  const handleReset = () => {
    const resetFilters: Record<string, any> = {};
    fields.forEach((field) => {
      switch (field.type) {
        case 'dropdown':
        case 'date':
        case 'daterange':
          resetFilters[field.id] = undefined;
          break;
        case 'multiselect':
          resetFilters[field.id] = [];
          break;
        default:
          resetFilters[field.id] = undefined;
      }
    });
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  const handleClearDateRange = (fieldId: string) => {
    handleFilterChange(fieldId, undefined);
  };

  const renderField = (field: FilterField) => {
    switch (field.type) {
      case 'date':
        return (
          <div className="relative">
            <Flatpickr
              key={filters[field.id] === undefined ? 'reset' : 'normal'}
              value={filters[field.id] === undefined ? '' : filters[field.id] || ''}
              options={{
                dateFormat: 'd-m-Y',
                position: 'auto left',
              }}
              className="form-input"
              placeholder="Select Date"
              onChange={(date) => handleFilterChange(field.id, date[0])}
            />
            {filters[field.id] !== undefined && filters[field.id] !== '' && (
              <button
                type="button"
                onClick={() => handleFilterChange(field.id, undefined)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        );

      case 'daterange':
        return (
          <div className="relative">
            <Flatpickr
              key={filters[field.id] === undefined ? 'reset' : 'normal'}
              value={filters[field.id] === undefined ? [] : filters[field.id] || []}
              options={{
                mode: 'range',
                dateFormat: 'd-m-Y',
                position: 'auto left',
              }}
              className="form-input"
              placeholder="Select Date"
              onChange={(dates) => handleFilterChange(field.id, dates)}
            />
            {((Array.isArray(filters[field.id]) && filters[field.id].length > 0) ||
              (filters[field.id] && !Array.isArray(filters[field.id]))) && (
              <button
                type="button"
                onClick={() => handleClearDateRange(field.id)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        );

      case 'dropdown':
        return (
          <Select
            placeholder={`Select ${field.label}`}
            options={field.options || []}
            value={filters[field.id] ? field.options?.find((opt) => opt.value === filters[field.id]) : null}
            onChange={(selected) => handleFilterChange(field.id, selected?.value)}
            isSearchable
            isClearable
            className="react-select"
            classNamePrefix="select"
          />
        );

      case 'multiselect':
        return (
          <Select
            placeholder={`Select ${field.label}`}
            options={field.options || []}
            value={
              filters[field.id] && Array.isArray(filters[field.id])
                ? field.options?.filter((opt) => filters[field.id]?.includes(opt.value))
                : []
            }
            onChange={(selected) => handleFilterChange(field.id, selected ? selected.map((s) => s.value) : [])}
            isMulti
            isSearchable
            isClearable
            className="react-select"
            classNamePrefix="select"
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onClose} />}

      <div
        className={`fixed top-0 right-0 z-50 h-full w-80 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <h3 className="text-lg font-semibold">Sidebar Filter</h3>
            <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {fields.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium mb-2">{field.label}</label>
                {renderField(field)}
              </div>
            ))}
          </div>

          <div className="p-4 border-t dark:border-gray-700">
            <div className="flex gap-2">
              <button onClick={handleReset} className="flex-1 btn btn-outline-danger">
                Reset
              </button>
              <button onClick={handleApply} className="flex-1 btn btn-primary">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
