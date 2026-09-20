import React from 'react';
import { X, CheckCheck, Bell, ArrowRight, UserCheck, AlertTriangle, FileText, CheckSquare, DollarSign } from 'lucide-react';
import { useErp } from '../../context/ErpContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead, setActiveModule } = useErp();

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'lead':
        return <UserCheck className="w-4 h-4 text-blue-600" />;
      case 'invoice':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'payment':
        return <DollarSign className="w-4 h-4 text-emerald-600" />;
      case 'task':
        return <CheckSquare className="w-4 h-4 text-indigo-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  const handleAction = (notifId: string, linkSection?: string) => {
    markNotificationRead(notifId);
    if (linkSection) {
      setActiveModule(linkSection);
    }
    onClose();
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[400px] bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-slate-700" />
          <h3 className="font-semibold text-slate-800 text-base">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsRead}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" /> Mark all
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
        {notifications.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-sm">
            <Bell className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            No notifications right now.
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => handleAction(n.id, n.linkSection)}
              className={`p-3.5 rounded-xl border transition cursor-pointer flex gap-3 ${
                n.read
                  ? 'bg-white border-slate-100 hover:bg-slate-50'
                  : 'bg-blue-50/40 border-blue-100/80 hover:bg-blue-50/70 shadow-2xs'
              }`}
            >
              <div className="mt-0.5 w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                {getIcon(n.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <div className={`text-xs font-semibold truncate ${n.read ? 'text-slate-700' : 'text-slate-900'}`}>
                    {n.title}
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{n.message}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-100 bg-slate-50 text-center">
        <span className="text-xs text-slate-400">All notifications sync with real-time ERP events</span>
      </div>
    </div>
  );
};
