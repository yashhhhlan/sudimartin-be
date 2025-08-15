'use client';

import { DataTable as Datatable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import sortBy from 'lodash/sortBy';
import Image from 'next/image';
import { Filter } from 'lucide-react';

import { showMessage } from '@/components/toast';
import DeleteButton from '@/components/delete-button';
import Header from '@/components/header';
import IconPencilBlue from '@/components/icon/icon-pencil-blue';
import { SidebarFilter, FilterField } from './sidebar-filter';
import { queryClient } from '@/providers/query-provider';

interface FilterConfig {
  searchableFields?: string[];
  customFilter?: (item: any, search: string) => boolean;
  sidebarFields?: FilterField[];
}

interface DataTableProps {
  title: string;
  description?: React.ReactNode;
  data: any[] | undefined;
  columns: any[];
  addButtonText: string;
  addButtonPath: string;
  showAddButton?: boolean;
  showBulkDelete?: boolean;
  showSearch?: boolean;
  editPath?: string;
  showHeader?: boolean;
  onBulkDelete?: (ids: string[]) => Promise<{ success: boolean; message: string; data?: any | null }>;
  filterConfig?: FilterConfig;
  idAccessor?: string;
  defaultSort?: DataTableSortStatus;
  queryKey?: string[];
}

export const DataTable = ({
  title,
  description,
  data,
  columns,
  addButtonText,
  addButtonPath,
  showAddButton = true,
  showBulkDelete = true,
  showSearch = true,
  editPath,
  showHeader = true,
  onBulkDelete,
  filterConfig,
  idAccessor = '_id',
  defaultSort,
  queryKey,
}: DataTableProps) => {
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [search, setSearch] = useState('');
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>(
    defaultSort || {
      columnAccessor: 'id',
      direction: 'asc',
    },
  );
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [recordsData, setRecordsData] = useState<any[]>([]);
  const [selectedRecords, setSelectedRecords] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarFilters, setSidebarFilters] = useState<Record<string, any>>({});
  const [isFiltersInitialized, setIsFiltersInitialized] = useState(false);

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ['bulk-delete'],
    mutationFn: onBulkDelete!,
    onSuccess: async ({ success, message }) => {
      if (!success) {
        router.refresh();
        showMessage(message, 'error');
        return;
      }

      const isAllDateOnly = selectedIds.every((id) => /^\d{4}-\d{2}-\d{2}$/.test(id));
      const isAllIsoDate = selectedIds.every(
        (id) => typeof id === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(id),
      );

      const isAllCompositeKey = selectedIds.every((id) => {
        const parts = id.split('-');
        if (parts.length < 4) return false;
        const datePart = parts.slice(-3).join('-');
        return /^\d{4}-\d{2}-\d{2}$/.test(datePart);
      });

      queryClient.setQueryData(queryKey || [], (oldData: any[] = []) => {
        return oldData.filter((item) => {
          if (isAllDateOnly || isAllIsoDate) {
            const normalizedSelectedIds = selectedIds.map((id) => (typeof id === 'string' ? id.substring(0, 10) : id));
            const itemDate =
              (typeof item.date === 'string' ? item.date.substring(0, 10) : '') ||
              (typeof item.day === 'string' ? item.day.substring(0, 10) : '');

            return !normalizedSelectedIds.includes(itemDate);
          } else if (isAllCompositeKey) {
            const compositeKey = `${item.project || item.channel}-${item.date.substring(0, 10)}`;
            return !selectedIds.includes(compositeKey);
          } else {
            return !selectedIds.includes(item._id);
          }
        });
      });

      showMessage(message);
    },
    onError: (error: Error) => {
      showMessage(error.message, 'error');
    },
    onSettled: () => {
      setSelectedRecords([]);
    },
  });

  const defaultFilter = (item: any, searchTerm: string) => {
    const lowerSearch = searchTerm.toLowerCase();
    const fieldsToSearch = filterConfig?.searchableFields || ['name'];

    return fieldsToSearch.some((field) => {
      const fieldParts = field.split('.');
      let value = item;

      for (const part of fieldParts) {
        value = value?.[part];
        if (value === undefined) break;
      }

      return value?.toString().toLowerCase().includes(lowerSearch);
    });
  };

  const applyDateFilter = (item: any, fieldId: string, dateValue: any) => {
    if (!dateValue || dateValue === undefined) return true;
    if (Array.isArray(dateValue) && dateValue.length === 0) return true;

    const itemDate = new Date(item[fieldId]);

    if (Array.isArray(dateValue) && dateValue.length === 2) {
      const [startDate, endDate] = dateValue;
      return itemDate >= startDate && itemDate <= endDate;
    } else if (dateValue instanceof Date) {
      return itemDate.toDateString() === dateValue.toDateString();
    }

    return true;
  };

  const applySidebarFilters = (item: any) => {
    if (!filterConfig?.sidebarFields) return true;

    return filterConfig.sidebarFields.every((field) => {
      const filterValue = sidebarFilters[field.id];

      if (!filterValue || filterValue === undefined || (Array.isArray(filterValue) && filterValue.length === 0)) {
        return true;
      }

      if (field.id === 'category') {
        const itemCategories = item.categories?.map((cat: any) => cat.category) || [];
        return filterValue.some((selectedCategory: string) => itemCategories.includes(selectedCategory));
      }

      const accessor = field.accessor || field.id;

      const getNestedValue = (obj: any, path: string) => {
        return path.split('.').reduce((current, key) => current?.[key], obj);
      };

      const itemValue = getNestedValue(item, accessor);

      switch (field.type) {
        case 'date':
        case 'daterange':
          return applyDateFilter(item, accessor, filterValue);

        case 'dropdown':
          return itemValue === filterValue;

        case 'multiselect':
          return filterValue.includes(itemValue);

        default:
          return true;
      }
    });
  };

  useEffect(() => {
    setPage(1);
  }, [filteredData]);

  // Initialize default filters on first load
  useEffect(() => {
    if (!isFiltersInitialized && filterConfig?.sidebarFields) {
      const defaultFilters: Record<string, any> = {};
      filterConfig.sidebarFields.forEach((field) => {
        if (field.defaultValue !== undefined) {
          defaultFilters[field.id] = field.defaultValue;
        }
      });
      if (Object.keys(defaultFilters).length > 0) {
        setSidebarFilters(defaultFilters);
      }
      setIsFiltersInitialized(true);
    }
  }, [filterConfig, isFiltersInitialized]);

  useEffect(() => {
    if (!data) return;

    let filteredItems = [...data];

    filteredItems = filteredItems.filter(applySidebarFilters);

    if (search) {
      const filterFunction = filterConfig?.customFilter || defaultFilter;
      filteredItems = filteredItems.filter((item) => filterFunction(item, search));
    }

    filteredItems = sortBy(filteredItems, sortStatus.columnAccessor);
    if (sortStatus.direction === 'desc') {
      filteredItems.reverse();
    }

    setFilteredData(filteredItems);
  }, [data, search, sortStatus, filterConfig, sidebarFilters]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecordsData(filteredData.slice(from, to));
  }, [page, pageSize, filteredData]);

  useEffect(() => {
    setPage(1);
  }, [pageSize, search, sidebarFilters]);

  const handleAdd = () => router.push(addButtonPath);
  const handleRecordSelection = (records: any[]) => setSelectedRecords(records);
  const selectedIds = selectedRecords.map((record) => record[idAccessor]);

  const handleApplySidebarFilters = (filters: Record<string, any>) => {
    setSidebarFilters(filters);
    setIsSidebarOpen(false);
  };

  const processedColumns = columns.map((col) => {
    if (col.accessor === 'actions' && editPath && !col.render) {
      return {
        ...col,
        render: (record: any) => (
          <div
            className={`flex justify-center items-center ${
              selectedIds.length === 0 ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
            }`}
            onClick={() => selectedIds.length === 0 && router.push(`${editPath}/${record[idAccessor]}/edit`)}
          >
            <IconPencilBlue />
          </div>
        ),
      };
    }
    return col;
  });

  return (
    <>
      {showHeader && <Header className="space-y-2" title={title} description={description} />}

      {!showHeader && description && (
        <div className="space-y-2">
          <h1 className="font-semibold text-lg">{title}</h1>
          {typeof description === 'string' ? <p>{description}</p> : description}
        </div>
      )}

      <div className="panel mt-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            {showAddButton && (
              <button onClick={handleAdd} type="button" className="btn btn-primary capitalize">
                {addButtonText}
              </button>
            )}
            {selectedIds.length > 0 && showBulkDelete && (
              <div className="flex gap-2 items-center">
                <Image
                  className="cursor-pointer"
                  src="/assets/images/dashboard/icon-download.png"
                  alt="download"
                  height={32}
                  width={32}
                />
                {onBulkDelete && <DeleteButton onDelete={() => mutate(selectedIds)} isLoading={isPending} />}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {showSearch && (
              <input
                type="text"
                className="form-input w-auto"
                placeholder="Search..."
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
              />
            )}
            {filterConfig?.sidebarFields && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="btn btn-outline-primary flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>
            )}
          </div>
        </div>
        <div className="datatables">
          <Datatable
            noRecordsText="No results match your search query"
            highlightOnHover
            className="table-hover whitespace-nowrap"
            records={recordsData}
            columns={processedColumns}
            totalRecords={filteredData.length}
            recordsPerPage={pageSize}
            page={page}
            onPageChange={setPage}
            recordsPerPageOptions={PAGE_SIZES}
            onRecordsPerPageChange={setPageSize}
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
            minHeight={200}
            paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
            selectedRecords={selectedRecords}
            onSelectedRecordsChange={handleRecordSelection}
            idAccessor={idAccessor}
          />
        </div>
      </div>

      {/* Sidebar Filter */}
      {filterConfig?.sidebarFields && (
        <SidebarFilter
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          fields={filterConfig.sidebarFields}
          onApplyFilters={handleApplySidebarFilters}
          defaultFilters={sidebarFilters}
        />
      )}
    </>
  );
};
