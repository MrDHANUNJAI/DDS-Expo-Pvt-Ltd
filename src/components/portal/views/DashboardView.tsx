import React from 'react';
import {
  TrendingUp,
  Users,
  Briefcase,
  Clock,
  ArrowUpRight,
  AlertCircle,
  Calendar,
  DollarSign,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useErp } from '../../../context/ErpContext';

export const DashboardView: React.FC = () => {
  const {
    leads,
    followUps,
    projects,
    tasks,
    invoices,
    payments,
    expenses,
    auditLogs,
    setActiveModule,
    completeFollowUp,
    updateTaskStatus,
    currentUser,
    hasPermission,
  } = useErp();

  // Financial calculations
  const totalRevenueCollected = payments.reduce((acc, p) => acc + p.amount, 0);
  const totalInvoiced = invoices.reduce((acc, i) => acc + i.total, 0);
  const totalReceivable = invoices.reduce((acc, i) => acc + i.balanceDue, 0);
  const totalPipelineValue = leads
    .filter((l) => l.status !== 'Lost' && l.status !== 'Won')
    .reduce((acc, l) => acc + (l.leadValue || 0), 0);

  const activeProjectsCount = projects.filter(
    (p) => p.status === 'Active' || p.status === 'Testing' || p.status === 'Client Review'
  ).length;

  const pendingTasksCount = tasks.filter((t) => t.status !== 'Completed').length;

  // Today's Follow-ups
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayFollowUps = followUps.filter((f) => f.date === todayStr && f.status === 'Pending');

  // Overdue Invoices
  const overdueInvoices = invoices.filter((i) => i.status === 'Overdue');

  // Chart Data: Monthly Cashflow
  const monthlyData = [
    { month: 'Jun', Invoiced: 88942, Collected: 88942, Expenses: 345000 },
    { month: 'Jul', Invoiced: 111510, Collected: 50150, Expenses: 360000 },
    { month: 'Aug', Invoiced: 100300, Collected: 87320, Expenses: 375000 },
    { month: 'Sep (MTD)', Invoiced: 145435, Collected: 65000, Expenses: 395000 },
  ];

  // Pipeline Status Breakdown
  const pipelineStatuses = [
    { name: 'New', count: leads.filter((l) => l.status === 'New').length, color: '#3b82f6' },
    { name: 'Contacted', count: leads.filter((l) => l.status === 'Contacted').length, color: '#6366f1' },
    { name: 'Interested', count: leads.filter((l) => l.status === 'Interested').length, color: '#06b6d4' },
    { name: 'Proposal', count: leads.filter((l) => l.status === 'Proposal Sent').length, color: '#eab308' },
    { name: 'Negotiation', count: leads.filter((l) => l.status === 'Negotiation').length, color: '#f97316' },
    { name: 'Won', count: leads.filter((l) => l.status === 'Won').length, color: '#10b981' },
  ];

  const canSeeFinance = hasPermission('finance');

  return (
    <div className="space-y-6">
      {/* Top Greeting & Operational Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs text-blue-200 backdrop-blur-md mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            DDS Unified ERP Engine • Live Cloud Sync
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back, {currentUser.name}!
          </h1>
          <p className="text-sm text-blue-200/80 mt-1 max-w-xl">
            Here is your real-time operational dashboard across sales funnels, projects delivery, team velocity, and financial collections.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveModule('crm-leads')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl shadow-lg transition flex items-center gap-2"
          >
            Manage CRM Leads
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Revenue or Pipeline */}
        {canSeeFinance ? (
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Collected
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-slate-900">
                ₹{totalRevenueCollected.toLocaleString()}
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-600 font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+18.4% vs last quarter</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Active Leads
              </span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-slate-900">{leads.length}</div>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-blue-600 font-medium">
                <span>{leads.filter((l) => l.status === 'Negotiation').length} in active negotiation</span>
              </div>
            </div>
          </div>
        )}

        {/* Card 2: Active Projects */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Active Projects
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900">{activeProjectsCount}</div>
            <div className="text-xs text-slate-500 mt-1">
              Average delivery progress: <strong className="text-slate-800">78%</strong>
            </div>
          </div>
        </div>

        {/* Card 3: CRM Pipeline Value */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Open Pipeline Value
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900">
              ₹{totalPipelineValue.toLocaleString()}
            </div>
            <div className="text-xs text-indigo-600 mt-1 font-medium">
              {leads.filter((l) => l.status !== 'Lost' && l.status !== 'Won').length} qualified deals in funnel
            </div>
          </div>
        </div>

        {/* Card 4: Outstanding Receivables or Pending Tasks */}
        {canSeeFinance ? (
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Accounts Receivable
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                <AlertCircle className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-slate-900">
                ₹{totalReceivable.toLocaleString()}
              </div>
              <div className="text-xs text-amber-600 mt-1 font-medium">
                {overdueInvoices.length} invoices overdue
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Pending Tasks
              </span>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-slate-900">{pendingTasksCount}</div>
              <div className="text-xs text-purple-600 mt-1 font-medium">
                Across active sprint deliverables
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Revenue vs Expenses */}
        {canSeeFinance && (
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Financial Inflow & Billing Trends (2026)
                </h3>
                <p className="text-xs text-slate-500">
                  Comparison of total invoiced milestones against verified bank collections
                </p>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
                INR (₹)
              </span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="Invoiced" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Invoiced" />
                  <Bar dataKey="Collected" fill="#10b981" radius={[6, 6, 0, 0]} name="Collected" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Right Col: CRM Pipeline Distribution */}
        <div className={`bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs ${!canSeeFinance ? 'lg:col-span-3' : ''}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Sales Pipeline Stages</h3>
              <p className="text-xs text-slate-500">Live CRM stage distribution</p>
            </div>
            <button
              onClick={() => setActiveModule('crm-pipeline')}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              View Kanban
            </button>
          </div>

          <div className="space-y-3">
            {pipelineStatuses.map((st) => (
              <div key={st.name}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">{st.name}</span>
                  <span className="text-slate-500 font-semibold">{st.count} leads</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.max(5, (st.count / Math.max(1, leads.length)) * 100)}%`,
                      backgroundColor: st.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Total Leads: <strong className="text-slate-800">{leads.length}</strong></span>
            <span>Win Rate: <strong className="text-emerald-600 font-semibold">
              {Math.round((leads.filter((l) => l.status === 'Won').length / Math.max(1, leads.length)) * 100)}%
            </strong></span>
          </div>
        </div>
      </div>

      {/* Action Center: Today's Follow-ups & Priority Deliverables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Follow-ups */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-semibold text-slate-900">Today's Follow-ups</h3>
            </div>
            <button
              onClick={() => setActiveModule('crm-followups')}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
            >
              Full Calendar <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {todayFollowUps.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-sm">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
              All today's follow-ups have been completed!
            </div>
          ) : (
            <div className="space-y-3">
              {todayFollowUps.map((flp) => (
                <div
                  key={flp.id}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50/50 transition flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800 text-sm">{flp.leadName}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-medium">
                        {flp.time} • {flp.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{flp.notes}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Assigned: {flp.employeeName}
                    </span>
                  </div>
                  <button
                    onClick={() => completeFollowUp(flp.id, 'Follow-up marked completed from Dashboard.')}
                    className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition shrink-0"
                  >
                    Mark Done
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Priority Deliverables & Tasks */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-semibold text-slate-900">Sprint Tasks & Milestones</h3>
            </div>
            <button
              onClick={() => setActiveModule('projects-tasks')}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
            >
              Task Board <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {tasks.slice(0, 4).map((t) => (
              <div
                key={t.id}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-400 bg-white transition flex items-center justify-between gap-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800 text-sm truncate">{t.title}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                        t.priority === 'Urgent'
                          ? 'bg-rose-100 text-rose-700'
                          : t.priority === 'High'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {t.priority}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                    <span>{t.projectName}</span>
                    <span>•</span>
                    <span>Assignee: {t.assignedEmployeeName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      t.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : t.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {t.status}
                  </span>
                  {t.status !== 'Completed' && (
                    <button
                      onClick={() => updateTaskStatus(t.id, 'Completed')}
                      className="p-1 text-slate-400 hover:text-emerald-600 rounded transition"
                      title="Quick complete"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent System Activity / Audit Trail preview */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Recent Operational Activity</h3>
            <p className="text-xs text-slate-500">Live immutable trace of business events</p>
          </div>
          <button
            onClick={() => setActiveModule('audit-logs')}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Full Audit Logs
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {auditLogs.slice(0, 5).map((log) => (
            <div key={log.id} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[11px]">
                  {log.module}
                </span>
                <div>
                  <span className="font-semibold text-slate-800">{log.user}</span>{' '}
                  <span className="text-slate-600">{log.action.toLowerCase()}:</span>{' '}
                  <span className="text-slate-900 font-medium">{log.record}</span>
                  {log.newValue && (
                    <span className="text-slate-400 ml-1">({log.newValue})</span>
                  )}
                </div>
              </div>
              <span className="text-slate-400 shrink-0">{log.date} {log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
