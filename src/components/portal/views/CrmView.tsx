import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Calendar,
  Kanban,
  ListFilter,
  Search,
  Phone,
  Mail,
  Building,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowRight,
  DollarSign,
  Briefcase,
  FileText,
  LifeBuoy,
  Plus,
  X,
  MapPin,
  Tag,
  Filter,
} from 'lucide-react';
import { useErp } from '../../../context/ErpContext';
import { Lead, FollowUp, Customer, LeadStatus, PriorityLevel, FollowUpType, LeadSource } from '../../../types/erp';

export const CrmView: React.FC = () => {
  const {
    leads,
    followUps,
    customers,
    services,
    employees,
    quotations,
    projects,
    invoices,
    supportTickets,
    communications,
    addLead,
    updateLeadStatus,
    convertLeadToCustomer,
    addFollowUp,
    completeFollowUp,
    setActiveModule,
  } = useErp();

  const [activeTab, setActiveTab] = useState<'leads' | 'kanban' | 'followups' | 'customers'>('leads');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterEmployee, setFilterEmployee] = useState<string>('All');
  const [filterPriority, setFilterPriority] = useState<string>('All');

  // Modals
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [isScheduleFollowUpOpen, setIsScheduleFollowUpOpen] = useState(false);
  const [selectedLeadForFollowUp, setSelectedLeadForFollowUp] = useState<Lead | null>(null);
  const [selectedCustomerFor360, setSelectedCustomerFor360] = useState<Customer | null>(null);

  // New Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    location: 'Visakhapatnam',
    source: 'Website' as LeadSource,
    interestedService: services[0]?.name || 'Web & Tech',
    leadValue: 50000,
    assignedEmployeeId: employees[3]?.id || 'EMP-04',
    assignedEmployeeName: employees[3]?.name || 'Mr. Sanjay Kumar',
    priority: 'Medium' as PriorityLevel,
    status: 'New' as LeadStatus,
    notes: '',
    nextFollowUp: new Date().toISOString().slice(0, 10),
  });

  // Follow-up Form State
  const [newFollowUpForm, setNewFollowUpForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    time: '11:00',
    type: 'Phone Call' as FollowUpType,
    notes: '',
  });

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || l.status === filterStatus;
    const matchesEmployee = filterEmployee === 'All' || l.assignedEmployeeName === filterEmployee;
    const matchesPriority = filterPriority === 'All' || l.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesEmployee && matchesPriority;
  });

  const kanbanStages: LeadStatus[] = [
    'New',
    'Contacted',
    'Interested',
    'Follow-up',
    'Proposal Sent',
    'Negotiation',
    'Won',
    'Lost',
  ];

  const handleCreateLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assignedEmp = employees.find((emp) => emp.id === newLeadForm.assignedEmployeeId);
    addLead({
      ...newLeadForm,
      assignedEmployeeName: assignedEmp ? assignedEmp.name : newLeadForm.assignedEmployeeName,
    });
    setIsAddLeadOpen(false);
    setNewLeadForm({
      name: '',
      company: '',
      phone: '',
      email: '',
      location: 'Visakhapatnam',
      source: 'Website',
      interestedService: services[0]?.name || 'Web & Tech',
      leadValue: 50000,
      assignedEmployeeId: employees[3]?.id || 'EMP-04',
      assignedEmployeeName: employees[3]?.name || 'Mr. Sanjay Kumar',
      priority: 'Medium',
      status: 'New',
      notes: '',
      nextFollowUp: new Date().toISOString().slice(0, 10),
    });
  };

  const handleScheduleFollowUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLeadForFollowUp) return;
    addFollowUp({
      leadId: selectedLeadForFollowUp.id,
      leadName: `${selectedLeadForFollowUp.name} (${selectedLeadForFollowUp.company})`,
      date: newFollowUpForm.date,
      time: newFollowUpForm.time,
      employeeId: selectedLeadForFollowUp.assignedEmployeeId,
      employeeName: selectedLeadForFollowUp.assignedEmployeeName,
      type: newFollowUpForm.type,
      notes: newFollowUpForm.notes,
    });
    setIsScheduleFollowUpOpen(false);
    setSelectedLeadForFollowUp(null);
  };

  const handleConvertLead = (lead: Lead) => {
    const cust = convertLeadToCustomer(lead.id);
    setSelectedCustomerFor360(cust);
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">CRM & Client Lifecycle Engine</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage leads, automated follow-ups, pipeline Kanban, and 360° customer profiles
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddLeadOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-sm transition"
          >
            <UserPlus className="w-4 h-4" />
            Add New Lead
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-slate-200 gap-2 bg-white px-4 rounded-xl shadow-2xs">
        <button
          onClick={() => setActiveTab('leads')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            activeTab === 'leads'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <ListFilter className="w-4 h-4" />
          Leads List ({leads.length})
        </button>
        <button
          onClick={() => setActiveTab('kanban')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            activeTab === 'kanban'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Kanban className="w-4 h-4" />
          Pipeline Kanban
        </button>
        <button
          onClick={() => setActiveTab('followups')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            activeTab === 'followups'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Follow-up Calendar ({followUps.filter((f) => f.status === 'Pending').length})
        </button>
        <button
          onClick={() => setActiveTab('customers')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 ${
            activeTab === 'customers'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Users className="w-4 h-4" />
          Customers 360° ({customers.length})
        </button>
      </div>

      {/* TAB 1: LEADS LIST VIEW */}
      {activeTab === 'leads' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-sm w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search leads by name, company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-slate-800"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Status:</span>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  {kanbanStages.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Priority:</span>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 focus:outline-none"
                >
                  <option value="All">All Priorities</option>
                  <option value="Urgent">Urgent</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Sales Rep:</span>
                <select
                  value={filterEmployee}
                  onChange={(e) => setFilterEmployee(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 focus:outline-none"
                >
                  <option value="All">All Reps</option>
                  {employees
                    .filter((e) => e.role === 'Sales' || e.role === 'Manager')
                    .map((emp) => (
                      <option key={emp.id} value={emp.name}>{emp.name}</option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3.5">Lead Info</th>
                    <th className="px-4 py-3.5">Interested Service</th>
                    <th className="px-4 py-3.5">Est. Value</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5">Assigned Rep</th>
                    <th className="px-4 py-3.5">Next Follow-up</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-slate-400">
                        No leads matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/80 transition">
                        <td className="px-5 py-4">
                          <div className="font-semibold text-slate-900">{lead.name}</div>
                          <div className="text-xs text-slate-500">{lead.company} • {lead.location}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                            <span>{lead.phone}</span>
                            <span>•</span>
                            <span>Source: {lead.source}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-xs font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                            {lead.interestedService}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-semibold text-slate-900">
                          ₹{lead.leadValue.toLocaleString()}
                        </td>
                        <td className="px-4 py-4">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full border focus:outline-none cursor-pointer ${
                              lead.status === 'Won'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : lead.status === 'Lost'
                                ? 'bg-rose-50 text-rose-700 border-rose-200'
                                : lead.status === 'Negotiation'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : lead.status === 'Proposal Sent'
                                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                : 'bg-blue-50 text-blue-700 border-blue-200'
                            }`}
                          >
                            {kanbanStages.map((st) => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-4 text-xs text-slate-600">
                          {lead.assignedEmployeeName}
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-xs font-medium text-slate-800">
                            {lead.nextFollowUp || 'None scheduled'}
                          </div>
                          <button
                            onClick={() => {
                              setSelectedLeadForFollowUp(lead);
                              setIsScheduleFollowUpOpen(true);
                            }}
                            className="text-[11px] text-blue-600 hover:text-blue-800 mt-0.5"
                          >
                            + Schedule
                          </button>
                        </td>
                        <td className="px-5 py-4 text-right space-x-2">
                          {lead.status !== 'Won' ? (
                            <button
                              onClick={() => handleConvertLead(lead)}
                              className="px-2.5 py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
                              title="Convert this lead to active customer"
                            >
                              Convert to Customer
                            </button>
                          ) : (
                            <span className="text-xs text-emerald-600 font-semibold inline-flex items-center gap-1">
                              <CheckCircle className="w-3.5 h-3.5" /> Customer Created
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PIPELINE KANBAN BOARD */}
      {activeTab === 'kanban' && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-[1200px]">
            {kanbanStages.map((stage) => {
              const stageLeads = leads.filter((l) => l.status === stage);
              const stageValue = stageLeads.reduce((sum, l) => sum + (l.leadValue || 0), 0);

              return (
                <div
                  key={stage}
                  className="flex-1 bg-slate-50/80 rounded-2xl border border-slate-200 p-3.5 flex flex-col min-h-[500px]"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 mb-3">
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">{stage}</h4>
                      <span className="text-[11px] text-slate-400">₹{stageValue.toLocaleString()}</span>
                    </div>
                    <span className="w-5 h-5 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-semibold flex items-center justify-center shadow-2xs">
                      {stageLeads.length}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1 overflow-y-auto">
                    {stageLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-blue-400 shadow-2xs hover:shadow-md transition space-y-2"
                      >
                        <div className="flex items-start justify-between gap-1">
                          <span className="font-semibold text-slate-900 text-sm leading-tight">
                            {lead.name}
                          </span>
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                              lead.priority === 'Urgent'
                                ? 'bg-rose-100 text-rose-700'
                                : lead.priority === 'High'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {lead.priority}
                          </span>
                        </div>

                        <div className="text-xs text-slate-500 font-medium">{lead.company}</div>
                        <div className="text-[11px] text-slate-400 truncate">{lead.interestedService}</div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-900">₹{lead.leadValue.toLocaleString()}</span>
                          <span className="text-[10px] text-slate-400">{lead.source}</span>
                        </div>

                        {/* Quick stage transition dropdown */}
                        <div className="pt-1 flex items-center justify-between gap-2">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                            className="text-[10px] bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-slate-600 focus:outline-none w-full"
                          >
                            {kanbanStages.map((s) => (
                              <option key={s} value={s}>Move to: {s}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: FOLLOW-UPS CALENDAR & LIST VIEW */}
      {activeTab === 'followups' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Follow-up Agenda */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <h3 className="font-semibold text-slate-900 text-base mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Scheduled Follow-up Agenda
              </h3>

              <div className="space-y-3">
                {followUps.map((flp) => {
                  const isPending = flp.status === 'Pending';
                  return (
                    <div
                      key={flp.id}
                      className={`p-4 rounded-xl border transition flex items-start justify-between gap-4 ${
                        isPending
                          ? 'bg-white border-slate-200 hover:border-blue-400 shadow-2xs'
                          : 'bg-slate-50 border-slate-200 opacity-70'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900 text-sm">{flp.leadName}</span>
                          <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md font-medium">
                            {flp.date} • {flp.time}
                          </span>
                          <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-medium">
                            {flp.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">{flp.notes}</p>
                        {flp.outcome && (
                          <div className="text-xs text-emerald-700 mt-1 font-medium bg-emerald-50 px-2 py-1 rounded inline-block">
                            Outcome: {flp.outcome}
                          </div>
                        )}
                        <span className="text-[11px] text-slate-400 mt-2 block">
                          Assigned Rep: {flp.employeeName}
                        </span>
                      </div>

                      {isPending && (
                        <div className="flex flex-col gap-1.5 shrink-0">
                          <button
                            onClick={() =>
                              completeFollowUp(flp.id, 'Client confirmed interest. Preparing quotation.')
                            }
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition shadow-2xs"
                          >
                            Mark Done
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Col: Quick Reminder Stats */}
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <h4 className="font-semibold text-slate-900 text-sm mb-3">Follow-up SLA Metrics</h4>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Pending Follow-ups</span>
                  <strong className="text-slate-900">{followUps.filter((f) => f.status === 'Pending').length}</strong>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Completed This Month</span>
                  <strong className="text-emerald-600">{followUps.filter((f) => f.status === 'Completed').length}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Avg Response Time</span>
                  <strong className="text-slate-900">45 Minutes</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CUSTOMERS 360° DIRECTORY */}
      {activeTab === 'customers' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customers.map((cust) => {
              const custQuotes = quotations.filter((q) => q.customerId === cust.id);
              const custProjects = projects.filter((p) => p.customerId === cust.id);
              const custInvoices = invoices.filter((i) => i.customerId === cust.id);

              return (
                <div
                  key={cust.id}
                  onClick={() => setSelectedCustomerFor360(cust)}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono text-slate-400">{cust.id}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          cust.status === 'VIP'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {cust.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base">{cust.company}</h3>
                    <div className="text-xs text-slate-500 mt-0.5">Contact: {cust.name}</div>
                    <div className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{cust.address}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-slate-500">Total Business Value:</span>
                      <strong className="text-slate-900 font-bold">₹{cust.totalBusinessValue.toLocaleString()}</strong>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span>{custProjects.length} Projects</span>
                      <span>•</span>
                      <span>{custQuotes.length} Quotes</span>
                      <span>•</span>
                      <span>{custInvoices.length} Invoices</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CUSTOMER 360° PROFILE MODAL */}
      {selectedCustomerFor360 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-blue-300">{selectedCustomerFor360.id}</span>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded text-white font-medium">
                    {selectedCustomerFor360.status}
                  </span>
                </div>
                <h2 className="text-2xl font-bold">{selectedCustomerFor360.company}</h2>
                <div className="text-xs text-blue-200 mt-1">
                  Primary Contact: {selectedCustomerFor360.name} • {selectedCustomerFor360.email} • {selectedCustomerFor360.phone}
                </div>
              </div>
              <button
                onClick={() => setSelectedCustomerFor360(null)}
                className="p-2 text-blue-200 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Linked Projects */}
              <div>
                <h4 className="font-semibold text-slate-900 text-sm mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-600" /> Active & Delivered Projects
                </h4>
                {projects.filter((p) => p.customerId === selectedCustomerFor360.id).length === 0 ? (
                  <p className="text-xs text-slate-400">No projects yet.</p>
                ) : (
                  <div className="space-y-2">
                    {projects
                      .filter((p) => p.customerId === selectedCustomerFor360.id)
                      .map((p) => (
                        <div
                          key={p.id}
                          className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="font-semibold text-slate-800">{p.name}</div>
                            <div className="text-slate-400">PM: {p.projectManagerName} • Deadline: {p.deadline}</div>
                          </div>
                          <div className="text-right">
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded font-semibold">
                              {p.status} ({p.progress}%)
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* Linked Invoices */}
              <div>
                <h4 className="font-semibold text-slate-900 text-sm mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" /> Invoices & Ledger
                </h4>
                {invoices.filter((i) => i.customerId === selectedCustomerFor360.id).length === 0 ? (
                  <p className="text-xs text-slate-400">No invoices generated yet.</p>
                ) : (
                  <div className="space-y-2">
                    {invoices
                      .filter((i) => i.customerId === selectedCustomerFor360.id)
                      .map((inv) => (
                        <div
                          key={inv.id}
                          className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="font-semibold text-slate-800">{inv.id}</div>
                            <div className="text-slate-400">Issued: {inv.issueDate} • Due: {inv.dueDate}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-slate-900">₹{inv.total.toLocaleString()}</div>
                            <span
                              className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                                inv.status === 'Paid'
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : inv.status === 'Overdue'
                                  ? 'bg-rose-100 text-rose-700'
                                  : 'bg-amber-100 text-amber-700'
                              }`}
                            >
                              {inv.status}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* Linked Support Tickets */}
              <div>
                <h4 className="font-semibold text-slate-900 text-sm mb-3 flex items-center gap-2">
                  <LifeBuoy className="w-4 h-4 text-rose-600" /> Support Tickets
                </h4>
                {supportTickets.filter((t) => t.customerId === selectedCustomerFor360.id).length === 0 ? (
                  <p className="text-xs text-slate-400">No support tickets reported.</p>
                ) : (
                  <div className="space-y-2">
                    {supportTickets
                      .filter((t) => t.customerId === selectedCustomerFor360.id)
                      .map((tck) => (
                        <div
                          key={tck.id}
                          className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="font-semibold text-slate-800">{tck.subject}</div>
                            <div className="text-slate-400">Assigned: {tck.assignedEmployeeName}</div>
                          </div>
                          <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded font-medium">
                            {tck.status}
                          </span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD LEAD MODAL */}
      {isAddLeadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Register Incoming Lead</h3>
                <p className="text-xs text-slate-500">Add to CRM sales pipeline with automatic assignment</p>
              </div>
              <button
                onClick={() => setIsAddLeadOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLeadSubmit} className="p-6 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Name *</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.name}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                    placeholder="e.g. Ramesh Naidu"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={newLeadForm.company}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, company: e.target.value })}
                    placeholder="e.g. Naidu Logistics"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    placeholder="+91 98480..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    placeholder="ramesh@company.com"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Interested Service</label>
                  <select
                    value={newLeadForm.interestedService}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, interestedService: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Est. Deal Value (₹)</label>
                  <input
                    type="number"
                    value={newLeadForm.leadValue}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, leadValue: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Source</label>
                  <select
                    value={newLeadForm.source}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, source: e.target.value as LeadSource })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="Website">Website</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Google">Google</option>
                    <option value="Referral">Referral</option>
                    <option value="Cold Calling">Cold Calling</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={newLeadForm.priority}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, priority: e.target.value as PriorityLevel })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Next Follow-up</label>
                  <input
                    type="date"
                    value={newLeadForm.nextFollowUp}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, nextFollowUp: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Notes & Requirements</label>
                <textarea
                  rows={2}
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                  placeholder="Key discussion points, budget expectations, timeline..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddLeadOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-sm transition"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SCHEDULE FOLLOW-UP MODAL */}
      {isScheduleFollowUpOpen && selectedLeadForFollowUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Schedule Follow-up</h3>
                <p className="text-xs text-slate-500">{selectedLeadForFollowUp.name} ({selectedLeadForFollowUp.company})</p>
              </div>
              <button
                onClick={() => setIsScheduleFollowUpOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleFollowUpSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={newFollowUpForm.date}
                    onChange={(e) => setNewFollowUpForm({ ...newFollowUpForm, date: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Time *</label>
                  <input
                    type="time"
                    required
                    value={newFollowUpForm.time}
                    onChange={(e) => setNewFollowUpForm({ ...newFollowUpForm, time: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Communication Channel</label>
                <select
                  value={newFollowUpForm.type}
                  onChange={(e) => setNewFollowUpForm({ ...newFollowUpForm, type: e.target.value as FollowUpType })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="Phone Call">Phone Call</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Meeting">Meeting (In-person)</option>
                  <option value="Video Call">Video Call</option>
                  <option value="Email">Email</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Agenda / Follow-up Goal</label>
                <textarea
                  rows={3}
                  required
                  value={newFollowUpForm.notes}
                  onChange={(e) => setNewFollowUpForm({ ...newFollowUpForm, notes: e.target.value })}
                  placeholder="e.g. Present quotation, discuss timeline, answer tech architecture questions..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsScheduleFollowUpOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition shadow-sm"
                >
                  Confirm Follow-up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
