import React from "react";

/**
 * Loading Skeleton Component
 */
export const LoadingSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="card h-64 bg-gray-200 animate-pulse" />
    ))}
  </div>
);

/**
 * Error Alert Component
 */
export const ErrorAlert = ({ message, onDismiss }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex justify-between items-center">
    <span>{message}</span>
    {onDismiss && (
      <button onClick={onDismiss} className="text-red-700 font-bold">
        ✕
      </button>
    )}
  </div>
);

/**
 * Success Alert Component
 */
export const SuccessAlert = ({ message, onDismiss }) => (
  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex justify-between items-center">
    <span>{message}</span>
    {onDismiss && (
      <button onClick={onDismiss} className="text-green-700 font-bold">
        ✕
      </button>
    )}
  </div>
);

/**
 * Modal Component
 */
export const Modal = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-dark">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-bold text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

/**
 * No Data Message
 */
export const NoData = ({ message = "Data tidak ditemukan" }) => (
  <div className="text-center py-12">
    <span className="text-6xl mb-4 block">📭</span>
    <p className="text-gray-500 text-lg">{message}</p>
  </div>
);

/**
 * Pagination Component
 */
export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn btn-secondary disabled:opacity-50"
      >
        ← Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
            currentPage === page
              ? "bg-primary text-white"
              : "bg-white border border-gray-300 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn btn-secondary disabled:opacity-50"
      >
        Next →
      </button>
    </div>
  );
};

export default {
  LoadingSkeleton,
  ErrorAlert,
  SuccessAlert,
  Modal,
  NoData,
  Pagination,
};
