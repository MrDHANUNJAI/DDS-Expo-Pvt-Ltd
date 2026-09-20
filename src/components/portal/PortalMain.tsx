import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Target,
  FileSpreadsheet,
  Receipt,
  Briefcase,
  CheckSquare,
  Clock,
  CreditCard,
  Building,
  LifeBuoy,
  BarChart3,
  Settings,
  Bell,
  Search,
  Sparkles,
  Plus,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Shield,
  ArrowLeft,
  Lock,
} from 'lucide-react';
import { useErp } from '../../context/ErpContext';
import { GlobalSearchModal } from './GlobalSearchModal';
import { AiAssistantDrawer } from './AiAssistantDrawer';
import { NotificationDrawer } from './NotificationDrawer';
import { QuickActionModal } from './QuickActionModal';
import { DashboardView } from './views/DashboardView';
import { CrmView } from './views/CrmView';
import { SalesView } from './views/SalesView';
import { ProjectsView } from './views/ProjectsView';
import { FinanceView } from './views/FinanceView';
import { HrView } from './views/HrView';
import { SupportView } from './views/SupportView';
import { ReportsView } from './views/ReportsView';
import { SettingsView } from './views/SettingsView';
import { UserRole } from '../../types/erp';

interface Props {
  onBackToWebsite: () => void;
}

export const PortalMain: React.FC<Props> = ({ onBackToWebsite }) => {
  const {
    activeModule,
    setActiveModule,
    currentUser,
    setCurrentUserRole,
    notifications,
    hasPermission,
    employees,
  } = useErp();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, permission: 'dashboard' },
    {
      id: 'crm',
      label: 'CRM & Leads',
      icon: Users,
      permission: 'crm',
      children: [
        { id: 'crm-leads', label: 'Leads Pipeline' },
        { id: 'crm-kanban', label: 'Kanban Board' },
        { id: 'crm-followups', label: 'Follow-ups' },
        { id: 'crm-customers', label: 'Customers 360°' },
      ],
    },
    {
      id: 'sales',
      label: 'Sales & Billing',
      icon: FileSpreadsheet,
      permission: 'sales',
      children: [
        { id: 'sales-quotations', label: 'Quotations' },
        { id: 'sales-invoices', label: 'Invoices & Tax' },
        { id: 'sales-payments', label: 'Payments Received' },
        { id: 'sales-targets', label: 'Sales Targets' },
      ],
    },
    {
      id: 'projects',
      label: 'Projects & Tasks',
      icon: Briefcase,
      permission: 'projects',
      children: [
        { id: 'projects-list', label: 'Project Portfolio' },
        { id: 'projects-tasks', label: 'Sprint Tasks' },
        { id: 'projects-timesheets', label: 'Timesheets' },
      ],
    },
    {
      id: 'finance',
      label: 'Finance & Accounts',
      icon: CreditCard,
      permission: 'finance',
      children: [
        { id: 'finance-pnl', label: 'Profit & Loss' },
        { id: 'finance-expenses', label: 'Expense Ledger' },
        { id: 'finance-tax', label: 'GST Reports' },
      ],
    },
    {
      id: 'hr',
      label: 'HR & Team',
      icon: Building,
      permission: 'hr',
      children: [
        { id: 'hr-employees', label: 'Staff Directory' },
        { id: 'hr-attendance', label: 'Attendance' },
        { id: 'hr-leaves', label: 'Leave Requests' },
        { id: 'hr-payroll', label: 'Payroll & Slips' },
      ],
    },
    { id: 'support', label: 'Support SLA', icon: LifeBuoy, permission: 'support' },
    { id: 'reports', label: 'BI & Reports', icon: BarChart3, permission: 'reports' },
    { id: 'settings', label: 'Settings & Audit', icon: Settings, permission: 'settings' },
  ];

  // Render view based on activeModule
  const renderModuleView = () => {
    // Check permission
    const currentNavItem = navItems.find(
      (item) => item.id === activeModule || item.children?.some((c) => c.id === activeModule)
    );
    if (currentNavItem && !hasPermission(currentNavItem.permission)) {
      return (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <Lock className="w-12 h-12 text-rose-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">Access Restricted</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Your current assigned role ({currentUser.role}) does not have security authorization to view this module. Switch roles in the demo toolbar above to inspect permissions.
          </p>
        </div>
      );
    }

    if (activeModule.startsWith('crm')) return <CrmView />;
    if (activeModule.startsWith('sales')) return <SalesView />;
    if (activeModule.startsWith('projects')) return <ProjectsView />;
    if (activeModule.startsWith('finance')) return <FinanceView />;
    if (activeModule.startsWith('hr')) return <HrView />;
    if (activeModule === 'support') return <SupportView />;
    if (activeModule === 'reports') return <ReportsView />;
    if (activeModule === 'settings' || activeModule === 'audit-logs') return <SettingsView />;
    return <DashboardView />;
  };

  const allRoles: UserRole[] = [
    'Super Admin',
    'Admin',
    'Manager',
    'Sales',
    'Project Manager',
    'Developer',
    'HR',
    'Accounts',
    'Support',
    'Employee',
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* RBAC Role Switcher Banner (Crucial for testing all 7 roles requested) */}
      <div className="bg-slate-950 text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 shrink-0 z-30">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-slate-400">Security Context:</span>
          <span className="font-semibold text-white">{currentUser.name}</span>
          <span className="px-2 py-0.5 rounded-full bg-blue-900/80 text-blue-300 font-mono text-[10px] border border-blue-700">
            {currentUser.role}
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-slate-400 text-[11px] mr-1">Switch Role Demo:</span>
          {allRoles.map((role) => (
            <button
              key={role}
              onClick={() => setCurrentUserRole(role)}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                currentUser.role === role
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {role}
            </button>
          ))}
          <button
            onClick={onBackToWebsite}
            className="ml-3 px-2.5 py-0.5 bg-white/10 hover:bg-white/20 text-white rounded text-[11px] font-medium flex items-center gap-1 transition"
          >
            <ArrowLeft className="w-3 h-3" /> Public Site
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-slate-900 text-slate-300 flex flex-col shrink-0 transition-all duration-200 z-20 ${
            isSidebarOpen ? 'w-64' : 'w-20'
          }`}
        >
          {/* Logo & Portal Brand */}
          <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800/80">
            <div className="flex items-center gap-3 overflow-hidden">
              <img src="/assets/img/logo/logo-1.png" alt="DDS Expo" className="h-8 w-auto shrink-0 invert brightness-200" />
              {isSidebarOpen && (
                <div className="min-w-0">
                  <div className="font-bold text-white text-sm tracking-tight leading-none truncate">
                    DDS EXPO ERP
                  </div>
                  <div className="text-[10px] text-blue-400 tracking-wider uppercase font-semibold mt-0.5">
                    Unified Portal
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Action Button */}
          <div className="p-3">
            <button
              onClick={() => setIsQuickActionOpen(true)}
              className={`w-full py-2.5 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30 transition ${
                !isSidebarOpen ? 'px-0' : ''
              }`}
              title="Quick Actions (+)"
            >
              <Plus className="w-4 h-4 shrink-0" />
              {isSidebarOpen && <span>Quick Action</span>}
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
            {navItems.map((item) => {
              const allowed = hasPermission(item.permission);
              const isActive =
                activeModule === item.id ||
                item.children?.some((c) => c.id === activeModule);

              return (
                <div key={item.id}>
                  <button
                    disabled={!allowed}
                    onClick={() => setActiveModule(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : allowed
                        ? 'hover:bg-slate-800 text-slate-300 hover:text-white'
                        : 'opacity-40 cursor-not-allowed text-slate-500'
                    }`}
                    title={!allowed ? 'No role access' : item.label}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <item.icon className="w-4 h-4 shrink-0" />
                      {isSidebarOpen && <span className="truncate">{item.label}</span>}
                    </div>
                    {isSidebarOpen && !allowed && (
                      <Lock className="w-3 h-3 text-slate-500" />
                    )}
                  </button>

                  {/* Sub-items if open and sidebar is expanded */}
                  {isSidebarOpen && item.children && isActive && allowed && (
                    <div className="ml-7 mt-1 pl-2 border-l border-slate-700 space-y-1">
                      {item.children.map((child) => (
                        <button
                          key={child.id}
                          onClick={() => setActiveModule(child.id)}
                          className={`w-full text-left py-1.5 px-2 rounded-lg text-[11px] transition ${
                            activeModule === child.id
                              ? 'text-blue-400 font-semibold bg-slate-800/80'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* AI Assistant Callout */}
          <div className="p-3 border-t border-slate-800">
            <button
              onClick={() => setIsAiOpen(true)}
              className="w-full p-2.5 rounded-xl bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/30 hover:border-purple-500/60 text-left transition flex items-center gap-3 text-xs"
            >
              <div className="w-7 h-7 rounded-lg bg-purple-600/30 flex items-center justify-center text-purple-300 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              {isSidebarOpen && (
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-white truncate">AI Assistant</div>
                  <div className="text-[10px] text-purple-300">Ask ERP anything</div>
                </div>
              )}
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Topbar */}
          <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 shadow-2xs z-10">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-400 w-64 transition"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search portal (leads, projects...)...</span>
              <kbd className="ml-auto font-mono text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400 shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Topbar Actions */}
            <div className="flex items-center gap-3">
              {/* AI Button */}
              <button
                onClick={() => setIsAiOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                AI Assistant
              </button>

              {/* Notifications */}
              <button
                onClick={() => setIsNotificationsOpen(true)}
                className="relative p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 animate-pulse ring-2 ring-white"></span>
                )}
              </button>

              <div className="h-5 w-px bg-slate-200" />

              {/* User Avatar */}
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-9 h-9 rounded-xl object-cover border border-slate-200 shadow-2xs"
                />
                <div className="hidden md:block text-left">
                  <div className="text-xs font-bold text-slate-900 leading-tight">{currentUser.name}</div>
                  <div className="text-[10px] text-slate-400">{currentUser.role}</div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Scrollable View */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">{renderModuleView()}</div>
          </main>
        </div>
      </div>

      {/* Global Modals & Drawers */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <AiAssistantDrawer isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
      <NotificationDrawer isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
      <QuickActionModal isOpen={isQuickActionOpen} onClose={() => setIsQuickActionOpen(false)} />
    </div>
  );
};
