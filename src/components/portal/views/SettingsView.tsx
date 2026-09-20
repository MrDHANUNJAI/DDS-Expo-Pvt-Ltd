import React, { useState } from 'react';
import {
  Building,
  Shield,
  Layers,
  History,
  Save,
  Plus,
  Trash2,
  Lock,
  UserCheck,
} from 'lucide-react';
import { useErp } from '../../../context/ErpContext';
import { UserRole, ServiceCatalogItem } from '../../../types/erp';

export const SettingsView: React.FC = () => {
  const { services, auditLogs, employees, currentUser } = useErp();

  const [activeTab, setActiveTab] = useState<'company' | 'services' | 'roles' | 'audit'>('company');

  // Company Profile form
  const [companyProfile, setCompanyProfile] = useState({
    name: 'DDS Expo Technologies Pvt Ltd',
    tagline: '100% AI-Driven Digital Marketing & IT Solutions',
    gstin: '37AAAAA0000A1Z5',
    address: 'D.No: 48-14-112, 2nd Floor, Rama Talkies Road, Visakhapatnam - 530016, Andhra Pradesh',
    phone: '+91 9966994679',
    email: 'contact@ddsexpo.in',
    bankName: 'HDFC Bank Ltd',
    accountNumber: '50200067891234',
    ifsc: 'HDFC0001234',
    branch: 'Dwaraka Nagar, Visakhapatnam',
  });

  const [serviceList, setServiceList] = useState(services);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState(30000);
  const [newServiceCategory, setNewServiceCategory] = useState('Digital');

  const [savedCompanySuccess, setSavedCompanySuccess] = useState(false);

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedCompanySuccess(true);
    setTimeout(() => setSavedCompanySuccess(false), 3000);
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim()) return;
    const newSrv: ServiceCatalogItem = {
      id: `SRV-${Date.now().toString().slice(-4)}`,
      name: newServiceName.trim(),
      category: newServiceCategory as any,
      basePrice: Number(newServicePrice),
      description: 'Standard agency service package',
      pricingType: 'Fixed',
      taxPercent: 18,
      discountPercent: 0,
      deliveryTimeline: '14 business days',
      status: 'Active',
    };
    setServiceList([...serviceList, newSrv]);
    setNewServiceName('');
  };

  const handleDeleteService = (id: string) => {
    setServiceList(serviceList.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">System Settings & Governance</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage company master data, service catalog, user role permissions, and immutable audit logs
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 bg-white px-4 rounded-xl shadow-2xs">
        <button
          onClick={() => setActiveTab('company')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            activeTab === 'company'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Building className="w-4 h-4" /> Company Master Profile
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            activeTab === 'services'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Layers className="w-4 h-4" /> Service Catalog ({serviceList.length})
        </button>
        <button
          onClick={() => setActiveTab('roles')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            activeTab === 'roles'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Shield className="w-4 h-4" /> Roles & Security Matrix
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            activeTab === 'audit'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <History className="w-4 h-4" /> Audit Trails ({auditLogs.length})
        </button>
      </div>

      {/* TAB 1: COMPANY MASTER */}
      {activeTab === 'company' && (
        <form onSubmit={handleSaveCompany} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs max-w-3xl space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Corporate Legal & Invoicing Profile</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company Legal Name</label>
              <input
                type="text"
                value={companyProfile.name}
                onChange={(e) => setCompanyProfile({ ...companyProfile, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">GSTIN</label>
              <input
                type="text"
                value={companyProfile.gstin}
                onChange={(e) => setCompanyProfile({ ...companyProfile, gstin: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Official Address</label>
            <textarea
              rows={2}
              value={companyProfile.address}
              onChange={(e) => setCompanyProfile({ ...companyProfile, address: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Official Email</label>
              <input
                type="email"
                value={companyProfile.email}
                onChange={(e) => setCompanyProfile({ ...companyProfile, email: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Official Phone</label>
              <input
                type="text"
                value={companyProfile.phone}
                onChange={(e) => setCompanyProfile({ ...companyProfile, phone: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm mb-3">Bank Settlement Account (For Client Invoices)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Bank Name</label>
                <input
                  type="text"
                  value={companyProfile.bankName}
                  onChange={(e) => setCompanyProfile({ ...companyProfile, bankName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Account Number</label>
                <input
                  type="text"
                  value={companyProfile.accountNumber}
                  onChange={(e) => setCompanyProfile({ ...companyProfile, accountNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">IFSC Code</label>
                <input
                  type="text"
                  value={companyProfile.ifsc}
                  onChange={(e) => setCompanyProfile({ ...companyProfile, ifsc: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Branch</label>
                <input
                  type="text"
                  value={companyProfile.branch}
                  onChange={(e) => setCompanyProfile({ ...companyProfile, branch: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-sm transition"
            >
              <Save className="w-4 h-4" /> Save Profile Settings
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: SERVICE CATALOG */}
      {activeTab === 'services' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-3">Add Deliverable Service</h4>
            <form onSubmit={handleAddService} className="flex flex-wrap gap-3">
              <input
                type="text"
                placeholder="Service Title"
                value={newServiceName}
                onChange={(e) => setNewServiceName(e.target.value)}
                className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs flex-1"
              />
              <input
                type="number"
                placeholder="Base Price (₹)"
                value={newServicePrice}
                onChange={(e) => setNewServicePrice(Number(e.target.value))}
                className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs w-36"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold"
              >
                Add Service
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase">
                <tr>
                  <th className="px-5 py-3.5">Service ID</th>
                  <th className="px-4 py-3.5">Service Name</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Standard Base Price</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {serviceList.map((srv) => (
                  <tr key={srv.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-5 py-4 font-mono font-bold text-blue-600">{srv.id}</td>
                    <td className="px-4 py-4 font-semibold text-slate-900">{srv.name}</td>
                    <td className="px-4 py-4 text-xs text-slate-500">{srv.category}</td>
                    <td className="px-4 py-4 font-bold text-slate-900">₹{srv.basePrice.toLocaleString()}</td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => handleDeleteService(srv.id)}
                        className="text-rose-500 hover:text-rose-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ROLES & SECURITY */}
      {activeTab === 'roles' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4 max-w-3xl">
          <h3 className="font-bold text-slate-900 text-base">Role-Based Access Control (RBAC) Enforcement</h3>
          <p className="text-xs text-slate-500">
            Current logged in session: <strong>{currentUser.name}</strong> ({currentUser.role}). Access to modules is strictly verified.
          </p>

          <div className="space-y-3 pt-2">
            {[
              { role: 'Super Admin', desc: 'Full unrestricted access to all modules, financial P&L, HR CTC, and settings.' },
              { role: 'Admin', desc: 'Full operations access across CRM, Projects, Invoices, HR and support.' },
              { role: 'Manager', desc: 'Project oversight, task assignment, quotation creation, and team velocity.' },
              { role: 'Sales', desc: 'CRM leads pipeline, follow-ups, quotations, and customer 360.' },
              { role: 'Project Manager', desc: 'Projects delivery, sprint tasks, timesheet approvals, and milestones.' },
              { role: 'Employee', desc: 'Personal sprint tasks, timesheet logging, leave requests, and helpdesk.' },
              { role: 'Accounts', desc: 'Invoices, payments, operating expenses, financial statements and taxes.' },
            ].map((r) => (
              <div key={r.role} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold text-slate-900">{r.role}</div>
                  <div className="text-slate-500 mt-0.5">{r.desc}</div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded font-semibold shrink-0">
                  Enforced
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT TRAILS */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase">
              <tr>
                <th className="px-5 py-3.5">Timestamp</th>
                <th className="px-4 py-3.5">Operator</th>
                <th className="px-4 py-3.5">Module</th>
                <th className="px-4 py-3.5">Action</th>
                <th className="px-5 py-3.5">Record Affected</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition text-xs">
                  <td className="px-5 py-4 font-mono text-slate-500">{log.date} {log.time}</td>
                  <td className="px-4 py-4 font-semibold text-slate-900">{log.user}</td>
                  <td className="px-4 py-4 font-mono text-blue-600">{log.module}</td>
                  <td className="px-4 py-4 font-medium text-slate-700">{log.action}</td>
                  <td className="px-5 py-4 text-slate-800 font-semibold">{log.record}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
