import React, { useState } from "react";
import transferIcon from "@/assets/vektor_transfer.png";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import noDocuments from '@/assets/no_documents.svg';

export interface Notification {
  id: number;
  title: string;
  description: string;
  date: string;
}

interface NotificationListProps {
  notifications: Notification[];
  compact?: boolean;
  maxRow?: number;
  pagination?: boolean;
  onMarkAllAsRead?: () => void;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  compact = false,
  maxRow = 10,
  pagination = false,
  onMarkAllAsRead,
}) => {
  console.log(notifications);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = pagination ? maxRow : notifications.length;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const paginatedNotifications = pagination
    ? notifications.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : notifications.slice(0, maxRow);

  const totalPages = Math.ceil(notifications.length / itemsPerPage);

  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, 3);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 1) {
        pages.push(1);
        pages.push('...');
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div
      className={`bg-white rounded-lg ${
        compact ? "w-full" : "pb-8 pt-2 w-full rounded-lg"
      }`}
    >
      {!compact && (
        <div className="flex justify-end items-center mb-6 mr-6">
          {onMarkAllAsRead && (
            <button
              onClick={onMarkAllAsRead}
              className="border border-1 rounded-xl border-[#0066AE] text-[#0066AE] px-10 py-2"
            >
              Tandai Sudah Baca
            </button>
          )}
        </div>
      )}

      {paginatedNotifications.length > 0 ? (
        <ul className={compact ? "space-y-2" : "space-y-4"}>
          {paginatedNotifications.map((notification) => (
            <li
              key={notification.id}
              className={`flex items-center justify-start text-left border-b pb-4 ${
                compact ? "pl-4" : "px-6 md:pl-12"
              }`}
            >
              <img src={transferIcon} alt="icon" className="w-10 h-10 mr-4" />
              <div>
                <h4
                  className={
                    compact
                      ? "text-sm font-medium text-black"
                      : "text-[16px] font-bold"
                  }
                >
                  {notification.title}
                </h4>
                <p
                  className={
                    compact
                      ? "text-[10px] font-light leading-[10px] text-gray-400"
                      : "text-sm text-gray-600"
                  }
                >
                  {notification.description}
                </p>
                {!compact && (
                  <p className="text-xs text-gray-400">{notification.date}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex justify-center items-center">
          <img src={noDocuments} alt="No notifications" className="w-32 h-32" />
        </div>
      )}

      {pagination && totalPages > 1 && (
        <nav aria-label="Page navigation" className="flex justify-end mt-4 mr-5">
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="py-2.5 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IoIosArrowBack />
              </button>
            </li>
            {generatePageNumbers().map((page, index) =>
              typeof page === 'string' ? (
                <li
                  key={index}
                  className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300"
                >
                  {page}
                </li>
              ) : (
                <li key={index}>
                  <button
                    onClick={() => handlePageChange(page)}
                    className={`py-2 px-3 leading-tight ${
                      currentPage === page
                        ? 'text-white bg-primary-blue'
                        : 'text-gray-500 bg-white'
                    } border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
                  >
                    {page}
                  </button>
                </li>
              )
            )}
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="py-2.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IoIosArrowForward />
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default NotificationList;