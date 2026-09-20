import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Receipt,
  CreditCard,
  PieChart as PieChartIcon,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  X,
  FileSpreadsheet,
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
} from 'recharts';
import { useErp } from '../../../context/ErpContext';
import { Expense, ExpenseCategory } from '../../../types/erp';

export const FinanceView: React.FC = () => {
  const { payments, expenses, invoices, projects, addExpense } = useErp();

  const [activeTab, setActiveTab] = useState<'overview' | 'expenses' | 'pnl' | 'tax'>('overview');
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  // Financial aggregates
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 100) : 0;
  const totalReceivables = invoices.reduce((sum, i) => sum + i.balanceDue, 0);

  // GST Collected
  const totalGstCollected = invoices.reduce((sum, i) => sum + (i.taxAmount || i.tax || 0), 0);
  const totalGstInputCredit = Math.round(totalExpenses * 0.18); // estimated 18% ITC on operations

  // Expense form
  const [expenseForm, setExpenseForm] = useState({
    title: '',
    category: 'Software Licenses' as ExpenseCategory,
    amount: 5000,
    vendor: '',
    paymentMethod: 'Corporate Card',
    date: new Date().toISOString().slice(0, 10),
    projectId: '',
  });

  const categories: ExpenseCategory[] = [
    'Software Licenses',
    'Cloud & Servers',
    'Marketing & Ads',
    'Office & Utilities',
    'Salaries',
    'Hardware',
    'Travel',
    'Miscellaneous',
  ];

  // Expense distribution for Pie chart
  const categoryTotals = categories.map((cat) => ({
    name: cat,
    value: expenses.filter((e) => e.category === cat).reduce((sum, e) => sum + e.amount, 0),
  })).filter((c) => c.value > 0);

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#f97316'];

  const handleAddExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addExpense({
      description: expenseForm.title || 'Operational Expense',
      title: expenseForm.title,
      category: expenseForm.category,
      amount: Number(expenseForm.amount),
      vendor: expenseForm.vendor,
      vendorName: expenseForm.vendor,
      paymentMethod: expenseForm.paymentMethod,
      date: expenseForm.date,
      projectId: expenseForm.projectId,
    });
    setIsAddExpenseOpen(false);
    setExpenseForm({
      title: '',
      category: 'Software Licenses',
      amount: 5000,
      vendor: '',
      paymentMethod: 'Corporate Card',
      date: new Date().toISOString().slice(0, 10),
      projectId: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Finance & Corporate Accounts</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            P&L statement, cashflow inflows, operating expenses and GST reconciliation
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddExpenseOpen(true)}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-sm transition"
          >
            <Plus className="w-4 h-4" /> Record Expense
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Inflow */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900">₹{totalRevenue.toLocaleString()}</div>
            <div className="text-xs text-emerald-600 mt-1 flex items-center gap-1 font-medium">
              <TrendingUp className="w-3.5 h-3.5" /> Direct collections from clients
            </div>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Expenses</span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <ArrowDownRight className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900">₹{totalExpenses.toLocaleString()}</div>
            <div className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium">
              <span>Hosting, licenses, servers & ads</span>
            </div>
          </div>
        </div>

        {/* Net Profit */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Operating Profit</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-emerald-600">₹{netProfit.toLocaleString()}</div>
            <div className="text-xs text-blue-600 mt-1 font-semibold">
              {profitMargin}% net margin
            </div>
          </div>
        </div>

        {/* Accounts Receivable */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Receivables</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Receipt className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-amber-600">₹{totalReceivables.toLocaleString()}</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">
              Awaiting milestone client clearance
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 bg-white px-4 rounded-xl shadow-2xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <PieChartIcon className="w-4 h-4" /> Cashflow & Categories
        </button>
        <button
          onClick={() => setActiveTab('expenses')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            activeTab === 'expenses'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <CreditCard className="w-4 h-4" /> Expense Ledger ({expenses.length})
        </button>
        <button
          onClick={() => setActiveTab('pnl')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            activeTab === 'pnl'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" /> Profit & Loss Statement
        </button>
        <button
          onClick={() => setActiveTab('tax')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            activeTab === 'tax'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Receipt className="w-4 h-4" /> GST & Tax Report
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pie Chart of Expense Breakdown */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-sm mb-1">Expense Breakdown by Category</h3>
            <p className="text-xs text-slate-400 mb-4">Allocation of business operational costs</p>

            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryTotals}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {categoryTotals.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 mt-4 text-xs">
              {categoryTotals.map((c, i) => (
                <div key={c.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-slate-600">{c.name}</span>
                  </div>
                  <span className="font-semibold text-slate-900">₹{c.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Cash Flow Inflow / Outflow Summary */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Net Operating Health Summary</h3>
              <p className="text-xs text-slate-500">Real-time ledger audit across DDS Expo commercial accounts</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/40">
                <div className="text-xs font-semibold text-emerald-700 uppercase">Gross Operating Cash In</div>
                <div className="text-xl font-bold text-emerald-900 mt-1">₹{totalRevenue.toLocaleString()}</div>
                <div className="text-xs text-slate-500 mt-1">From {payments.length} customer settlements</div>
              </div>
              <div className="p-4 rounded-xl border border-rose-100 bg-rose-50/40">
                <div className="text-xs font-semibold text-rose-700 uppercase">Gross Operating Cash Out</div>
                <div className="text-xl font-bold text-rose-900 mt-1">₹{totalExpenses.toLocaleString()}</div>
                <div className="text-xs text-slate-500 mt-1">Across {expenses.length} approved expenses</div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Gross Billed Invoices</span>
                <strong className="text-slate-800">₹{invoices.reduce((a, i) => a + i.total, 0).toLocaleString()}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Cleared Payments (In Bank)</span>
                <strong className="text-emerald-700">₹{totalRevenue.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Outstanding Receivables</span>
                <strong className="text-amber-700">₹{totalReceivables.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 font-bold">
                <span className="text-slate-800">Net Retained Earnings</span>
                <span className="text-blue-600">₹{netProfit.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EXPENSES TABLE */}
      {activeTab === 'expenses' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Expense ID</th>
                <th className="px-4 py-3.5">Title & Description</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Vendor</th>
                <th className="px-4 py-3.5">Amount</th>
                <th className="px-4 py-3.5">Method</th>
                <th className="px-5 py-3.5 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {expenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-5 py-4 font-mono font-bold text-slate-900">{exp.id}</td>
                  <td className="px-4 py-4 font-semibold text-slate-800">{exp.title || exp.description}</td>
                  <td className="px-4 py-4 text-xs">
                    <span className="px-2 py-0.5 rounded font-medium bg-slate-100 text-slate-700">
                      {exp.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-xs text-slate-600">{exp.vendor || exp.vendorName || '-'}</td>
                  <td className="px-4 py-4 font-bold text-rose-600">₹{exp.amount.toLocaleString()}</td>
                  <td className="px-4 py-4 text-xs text-slate-500">{exp.paymentMethod || 'Direct'}</td>
                  <td className="px-5 py-4 text-right text-xs text-slate-600">{exp.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: PROFIT & LOSS STATEMENT */}
      {activeTab === 'pnl' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs max-w-3xl space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="font-bold text-slate-900 text-lg">Profit & Loss Statement (Fiscal Year 2026)</h3>
            <p className="text-xs text-slate-500">DDS Expo Technologies Pvt Ltd • Visakhapatnam</p>
          </div>

          {/* Revenue Section */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-2">Operating Revenue</h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Client Contract & Service Fees Collected</span>
                <strong className="text-slate-900">₹{totalRevenue.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between py-1 font-bold text-slate-900">
                <span>Total Revenue (A)</span>
                <span>₹{totalRevenue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Expense Section */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-2">Cost of Operations & Overheads</h4>
            <div className="space-y-1.5 text-xs">
              {categories.map((cat) => {
                const sum = expenses.filter((e) => e.category === cat).reduce((s, e) => s + e.amount, 0);
                if (sum === 0) return null;
                return (
                  <div key={cat} className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">{cat}</span>
                    <span className="text-slate-900">₹{sum.toLocaleString()}</span>
                  </div>
                );
              })}
              <div className="flex justify-between py-1 font-bold text-rose-600">
                <span>Total Operating Expenses (B)</span>
                <span>₹{totalExpenses.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Net Profit */}
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex justify-between items-center">
            <div>
              <div className="text-xs font-bold text-emerald-800 uppercase">Net Operating Profit (A - B)</div>
              <div className="text-xs text-emerald-600">Pre-tax corporate retained earnings</div>
            </div>
            <div className="text-2xl font-bold text-emerald-800">
              ₹{netProfit.toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: GST & TAX REPORT */}
      {activeTab === 'tax' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs max-w-2xl space-y-4">
          <h3 className="font-bold text-slate-900 text-base">GST Reconciliation Summary</h3>
          <p className="text-xs text-slate-500">Calculated under Indian GST (18% Digital IT Services Bracket)</p>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Total Output GST (Collected from Client Invoices)</span>
              <strong className="text-slate-900">₹{totalGstCollected.toLocaleString()}</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Total Input Tax Credit (ITC on Software & Server Purchases)</span>
              <strong className="text-emerald-600">₹{totalGstInputCredit.toLocaleString()}</strong>
            </div>
            <div className="flex justify-between py-3 font-bold text-slate-900 text-sm">
              <span>Net GST Payable to Govt</span>
              <span className="text-blue-600">₹{Math.max(0, totalGstCollected - totalGstInputCredit).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* ADD EXPENSE MODAL */}
      {isAddExpenseOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-base">Record Operating Expense</h3>
              <button onClick={() => setIsAddExpenseOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddExpenseSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Expense Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS Cloud Cluster & RDS"
                  value={expenseForm.title}
                  onChange={(e) => setExpenseForm({ ...expenseForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={expenseForm.category}
                    onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value as ExpenseCategory })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    value={expenseForm.amount}
                    onChange={(e) => setExpenseForm({ ...expenseForm, amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Vendor / Payee</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amazon Web Services"
                    value={expenseForm.vendor}
                    onChange={(e) => setExpenseForm({ ...expenseForm, vendor: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Method</label>
                  <select
                    value={expenseForm.paymentMethod}
                    onChange={(e) => setExpenseForm({ ...expenseForm, paymentMethod: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  >
                    <option value="Corporate Card">Corporate Card</option>
                    <option value="Net Banking">Net Banking</option>
                    <option value="UPI">UPI</option>
                    <option value="Cash">Petty Cash</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                <input
                  type="date"
                  value={expenseForm.date}
                  onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button type="button" onClick={() => setIsAddExpenseOpen(false)} className="px-4 py-2 text-sm text-slate-600">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-rose-600 text-white rounded-xl text-sm font-semibold">
                  Record Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
