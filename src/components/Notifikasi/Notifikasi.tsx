import React from "react";
import transferIcon from "@/assets/vektor_transfer.png";

export interface Notification {
  id: number;
  title: string;
  description: string;
  date: string;
}

interface NotificationListProps {
  notifications: Notification[];
  compact?: boolean;
  onMarkAllAsRead?: () => void;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  compact = false,
  onMarkAllAsRead,
}) => {
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
      <ul className={compact ? "space-y-2" : "space-y-4"}>
        {notifications.map((notification) => (
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
    </div>
  );
};

export default NotificationList;
