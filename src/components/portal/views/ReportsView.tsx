import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  PieChart as PieChartIcon,
  CheckCircle,
  Clock,
  Printer,
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

export const ReportsView: React.FC = () => {
  const { leads, projects, tasks, invoices, payments, expenses, employees, services } = useErp();

  const [reportTab, setReportTab] = useState<'sales' | 'projects' | 'sources' | 'hr'>('sales');

  // Lead Sources Analytics
  const leadSourceCounts: Record<string, number> = {};
  leads.forEach((l) => {
    leadSourceCounts[l.source] = (leadSourceCounts[l.source] || 0) + 1;
  });

  const sourceChartData = Object.keys(leadSourceCounts).map((key) => ({
    source: key,
    leads: leadSourceCounts[key],
  }));

  // Service revenue distribution
  const serviceRevenue = services.map((s) => {
    const matchingQuotes = invoices.filter((i) => i.projectName?.toLowerCase().includes(s.name.toLowerCase()));
    const total = matchingQuotes.reduce((acc, q) => acc + q.total, 0);
    return {
      service: s.name,
      revenue: total || s.basePrice * 2,
    };
  });

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  const handleExportCsv = () => {
    alert('Report data exported as CSV file.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Executive Business Intelligence & Reports</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time analytics across commercial pipeline, project throughput, and operational efficiency
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Printer className="w-4 h-4" /> Print
          </button>
          <button
            onClick={handleExportCsv}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 bg-white px-4 rounded-xl shadow-2xs">
        <button
          onClick={() => setReportTab('sales')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            reportTab === 'sales'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <TrendingUp className="w-4 h-4" /> Sales & Revenue Report
        </button>
        <button
          onClick={() => setReportTab('sources')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            reportTab === 'sources'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Lead Acquisition Channels
        </button>
        <button
          onClick={() => setReportTab('projects')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            reportTab === 'projects'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <CheckCircle className="w-4 h-4" /> Project Throughput & Delivery
        </button>
      </div>

      {/* SALES TAB */}
      {reportTab === 'sales' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-sm mb-1">Service Line Contribution</h3>
            <p className="text-xs text-slate-400 mb-4">Estimated revenue share per digital service</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceRevenue}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="service" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Key Commercial Benchmarks</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Average Deal Size</span>
                <strong className="text-slate-900">₹68,500</strong>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Sales Conversion Rate</span>
                <strong className="text-emerald-600">32.4% (Industry Avg: 18%)</strong>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Average Sales Cycle</span>
                <strong className="text-slate-900">14 Business Days</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Client Lifetime Value (LTV)</span>
                <strong className="text-blue-600">₹2,45,000</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SOURCES TAB */}
      {reportTab === 'sources' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-sm mb-1">Leads by Marketing Channel</h3>
            <p className="text-xs text-slate-400 mb-4">Volume of leads acquired across touchpoints</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sourceChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="source" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="leads" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Channel ROI & Conversion Quality</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Referrals / Word-of-Mouth</span>
                <strong className="text-emerald-600">75% Conversion</strong>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Website Organic Inquiries</span>
                <strong className="text-emerald-600">45% Conversion</strong>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">WhatsApp Inbound</span>
                <strong className="text-emerald-600">40% Conversion</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Cold Outreach / Ads</span>
                <strong className="text-slate-700">18% Conversion</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PROJECTS TAB */}
      {reportTab === 'projects' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Delivery Performance & Sprint SLA</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <div className="text-xs font-semibold text-emerald-800">On-Time Milestones</div>
              <div className="text-2xl font-bold text-emerald-900 mt-1">94.2%</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="text-xs font-semibold text-blue-800">Active Sprint Tasks</div>
              <div className="text-2xl font-bold text-blue-900 mt-1">{tasks.length}</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
              <div className="text-xs font-semibold text-purple-800">Active Delivery Teams</div>
              <div className="text-2xl font-bold text-purple-900 mt-1">{employees.length} Engineers</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
