import React, { useState } from 'react';
import {
  LifeBuoy,
  Plus,
  MessageSquare,
  Search,
  CheckCircle2,
  Clock,
  X,
  User,
  AlertCircle,
} from 'lucide-react';
import { useErp } from '../../../context/ErpContext';
import { SupportTicket, TicketCategory, TicketStatus, PriorityLevel, TicketReply } from '../../../types/erp';

export const SupportView: React.FC = () => {
  const { supportTickets, customers, employees, createTicket, updateTicketStatus, addTicketReply } = useErp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [isAddTicketOpen, setIsAddTicketOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyContent, setReplyContent] = useState('');

  // Ticket Form
  const [ticketForm, setTicketForm] = useState({
    customerId: customers[0]?.id || '',
    subject: '',
    category: 'Bug / Issue' as TicketCategory,
    priority: 'High' as PriorityLevel,
    description: '',
    assignedEmployeeId: employees[2]?.id || 'EMP-03',
  });

  const statuses: TicketStatus[] = ['Open', 'In Progress', 'Waiting on Client', 'Resolved', 'Closed'];

  const filteredTickets = supportTickets.filter((t) => {
    const comp = t.customerCompany || t.customerName || '';
    const matchesSearch =
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreateTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cust = customers.find((c) => c.id === ticketForm.customerId);
    const emp = employees.find((e) => e.id === ticketForm.assignedEmployeeId);

    createTicket({
      ...ticketForm,
      customerName: cust ? cust.name : 'Customer',
      customerCompany: cust ? cust.company : 'Client',
      customerContact: cust ? cust.name : 'Customer Contact',
      assignedEmployeeName: emp ? emp.name : 'Engineer',
    });

    setIsAddTicketOpen(false);
    setTicketForm({
      customerId: customers[0]?.id || '',
      subject: '',
      category: 'Bug / Issue',
      priority: 'High',
      description: '',
      assignedEmployeeId: employees[2]?.id || 'EMP-03',
    });
  };

  const handleAddReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !replyContent.trim()) return;

    addTicketReply(selectedTicket.id, replyContent.trim());
    setReplyContent('');
    const updated = supportTickets.find((t) => t.id === selectedTicket.id);
    if (updated) setSelectedTicket(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Client Support & Helpdesk SLA</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Resolve customer tickets, manage SLA response times, and handle revision requests
          </p>
        </div>
        <button
          onClick={() => setIsAddTicketOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-sm transition"
        >
          <Plus className="w-4 h-4" /> Log Support Ticket
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-sm w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tickets by subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent focus:outline-none text-slate-800"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700"
          >
            <option value="All">All Statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3.5">Ticket ID</th>
              <th className="px-4 py-3.5">Subject & Client</th>
              <th className="px-4 py-3.5">Category</th>
              <th className="px-4 py-3.5">Priority</th>
              <th className="px-4 py-3.5">Assigned To</th>
              <th className="px-4 py-3.5">Status</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTickets.map((tck) => (
              <tr
                key={tck.id}
                onClick={() => setSelectedTicket(tck)}
                className="hover:bg-slate-50/80 transition cursor-pointer"
              >
                <td className="px-5 py-4 font-mono font-bold text-blue-600">{tck.id}</td>
                <td className="px-4 py-4">
                  <div className="font-semibold text-slate-900">{tck.subject}</div>
                  <div className="text-xs text-slate-400">{tck.customerCompany || tck.customerName} {tck.customerContact ? `(${tck.customerContact})` : ''}</div>
                </td>
                <td className="px-4 py-4 text-xs">
                  <span className="px-2 py-0.5 rounded font-medium bg-slate-100 text-slate-700">
                    {tck.category}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                      tck.priority === 'Urgent'
                        ? 'bg-rose-100 text-rose-700'
                        : tck.priority === 'High'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {tck.priority}
                  </span>
                </td>
                <td className="px-4 py-4 text-xs text-slate-600">{tck.assignedEmployeeName}</td>
                <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                  <select
                    value={tck.status}
                    onChange={(e) => updateTicketStatus(tck.id, e.target.value as TicketStatus)}
                    className="text-xs font-semibold px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    {statuses.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </td>
                <td className="px-5 py-4 text-right">
                  <button className="text-xs text-blue-600 hover:text-blue-800 font-semibold">
                    View Thread ({(tck.replies || []).length})
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TICKET THREAD MODAL */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-slate-50">
              <div>
                <span className="text-xs font-mono text-slate-400 font-bold">{selectedTicket.id}</span>
                <h3 className="font-bold text-slate-900 text-base">{selectedTicket.subject}</h3>
                <div className="text-xs text-slate-500">{selectedTicket.customerCompany || selectedTicket.customerName} • SLA Target: 2h response</div>
              </div>
              <button onClick={() => setSelectedTicket(null)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                <div className="font-bold text-slate-900 mb-1">Issue Description:</div>
                {selectedTicket.description}
              </div>

              {/* Replies */}
              <div className="space-y-3">
                {(selectedTicket.replies || []).map((rep: TicketReply) => (
                  <div key={rep.id} className="p-3.5 bg-blue-50/40 rounded-xl border border-blue-100 text-xs">
                    <div className="flex justify-between font-semibold text-slate-900 mb-1">
                      <span>{rep.authorName}</span>
                      <span className="text-slate-400 font-normal">{rep.date}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{rep.content}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t bg-slate-50">
              <form onSubmit={handleAddReplySubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type official reply or customer update..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                />
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold">
                  Reply
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CREATE TICKET MODAL */}
      {isAddTicketOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-base">Register Client Ticket</h3>
              <button onClick={() => setIsAddTicketOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleCreateTicketSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Customer</label>
                <select
                  value={ticketForm.customerId}
                  onChange={(e) => setTicketForm({ ...ticketForm, customerId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                >
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>{c.company} ({c.name})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Ticket Subject *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Broken link on checkout flow"
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={ticketForm.category}
                    onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value as TicketCategory })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  >
                    <option value="Bug / Issue">Bug / Issue</option>
                    <option value="Change Request">Change Request</option>
                    <option value="New Feature">New Feature</option>
                    <option value="Billing Query">Billing Query</option>
                    <option value="General Support">General Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={ticketForm.priority}
                    onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value as PriorityLevel })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Steps to reproduce or requested change details..."
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button type="button" onClick={() => setIsAddTicketOpen(false)} className="px-4 py-2 text-sm text-slate-600">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold">
                  Open Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
