import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Users, Briefcase, CheckSquare, FileText, LifeBuoy, ArrowRight } from 'lucide-react';
import { useErp } from '../../context/ErpContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { leads, customers, projects, tasks, invoices, supportTickets, setActiveModule } = useErp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedLeads = q
    ? leads.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.company.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.id.toLowerCase().includes(q)
      )
    : [];

  const matchedCustomers = q
    ? customers.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q)
      )
    : [];

  const matchedProjects = q
    ? projects.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.customerName.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q)
      )
    : [];

  const matchedTasks = q
    ? tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.assignedEmployeeName.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q)
      )
    : [];

  const matchedInvoices = q
    ? invoices.filter(
        (i) =>
          i.id.toLowerCase().includes(q) ||
          i.customerCompany.toLowerCase().includes(q) ||
          i.customerName.toLowerCase().includes(q)
      )
    : [];

  const matchedTickets = q
    ? supportTickets.filter(
        (t) =>
          t.id.toLowerCase().includes(q) ||
          t.subject.toLowerCase().includes(q) ||
          t.customerName.toLowerCase().includes(q)
      )
    : [];

  const totalMatches =
    matchedLeads.length +
    matchedCustomers.length +
    matchedProjects.length +
    matchedTasks.length +
    matchedInvoices.length +
    matchedTickets.length;

  const handleNavigate = (module: string) => {
    setActiveModule(module);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-100 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search leads, customers, projects, tasks, invoices, tickets..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-slate-800 placeholder:text-slate-400 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-semibold text-slate-400 bg-slate-100 rounded border border-slate-200">
            ESC
          </kbd>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query ? (
            <div className="py-8 text-center text-slate-400 text-sm">
              <p>Type keywords to search instantly across all ERP & CRM records.</p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                <button
                  onClick={() => setQuery('Vizag')}
                  className="px-3 py-1 text-xs bg-slate-100 text-slate-600 rounded-full hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  Vizag Port
                </button>
                <button
                  onClick={() => setQuery('Invoice')}
                  className="px-3 py-1 text-xs bg-slate-100 text-slate-600 rounded-full hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  Invoices
                </button>
                <button
                  onClick={() => setQuery('AI')}
                  className="px-3 py-1 text-xs bg-slate-100 text-slate-600 rounded-full hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  AI Solutions
                </button>
                <button
                  onClick={() => setQuery('Task')}
                  className="px-3 py-1 text-xs bg-slate-100 text-slate-600 rounded-full hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  Tasks
                </button>
              </div>
            </div>
          ) : totalMatches === 0 ? (
            <div className="py-8 text-center text-slate-500 text-sm">
              No matching records found for <span className="font-semibold text-slate-800">"{query}"</span>.
            </div>
          ) : (
            <>
              {/* Customers & Leads */}
              {matchedCustomers.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    <Users className="w-3.5 h-3.5 text-blue-600" /> Customers ({matchedCustomers.length})
                  </div>
                  <div className="space-y-1">
                    {matchedCustomers.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleNavigate('crm-customers')}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition flex items-center justify-between group"
                      >
                        <div>
                          <div className="font-medium text-slate-800 group-hover:text-blue-600 transition text-sm">
                            {c.company} <span className="text-slate-400 font-normal">({c.name})</span>
                          </div>
                          <div className="text-xs text-slate-400">{c.id} • {c.email} • ₹{c.totalBusinessValue.toLocaleString()}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {matchedLeads.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    <Users className="w-3.5 h-3.5 text-indigo-600" /> Leads ({matchedLeads.length})
                  </div>
                  <div className="space-y-1">
                    {matchedLeads.map((l) => (
                      <button
                        key={l.id}
                        onClick={() => handleNavigate('crm-leads')}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition flex items-center justify-between group"
                      >
                        <div>
                          <div className="font-medium text-slate-800 group-hover:text-indigo-600 transition text-sm">
                            {l.name} - {l.company}
                          </div>
                          <div className="text-xs text-slate-400">{l.id} • Status: {l.status} • Est: ₹{l.leadValue.toLocaleString()}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {matchedProjects.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-600" /> Projects ({matchedProjects.length})
                  </div>
                  <div className="space-y-1">
                    {matchedProjects.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handleNavigate('projects-list')}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition flex items-center justify-between group"
                      >
                        <div>
                          <div className="font-medium text-slate-800 group-hover:text-emerald-600 transition text-sm">
                            {p.name}
                          </div>
                          <div className="text-xs text-slate-400">{p.id} • Status: {p.status} • Progress: {p.progress}%</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tasks */}
              {matchedTasks.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    <CheckSquare className="w-3.5 h-3.5 text-amber-600" /> Tasks ({matchedTasks.length})
                  </div>
                  <div className="space-y-1">
                    {matchedTasks.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleNavigate('projects-tasks')}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition flex items-center justify-between group"
                      >
                        <div>
                          <div className="font-medium text-slate-800 group-hover:text-amber-600 transition text-sm">
                            {t.title}
                          </div>
                          <div className="text-xs text-slate-400">{t.id} • Assignee: {t.assignedEmployeeName} • Status: {t.status}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-600 transition" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Invoices */}
              {matchedInvoices.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    <FileText className="w-3.5 h-3.5 text-purple-600" /> Invoices ({matchedInvoices.length})
                  </div>
                  <div className="space-y-1">
                    {matchedInvoices.map((i) => (
                      <button
                        key={i.id}
                        onClick={() => handleNavigate('sales-invoices')}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition flex items-center justify-between group"
                      >
                        <div>
                          <div className="font-medium text-slate-800 group-hover:text-purple-600 transition text-sm">
                            {i.id} - {i.customerCompany}
                          </div>
                          <div className="text-xs text-slate-400">Total: ₹{i.total.toLocaleString()} • Status: {i.status}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-purple-600 transition" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Support Tickets */}
              {matchedTickets.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    <LifeBuoy className="w-3.5 h-3.5 text-rose-600" /> Support Tickets ({matchedTickets.length})
                  </div>
                  <div className="space-y-1">
                    {matchedTickets.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleNavigate('support')}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition flex items-center justify-between group"
                      >
                        <div>
                          <div className="font-medium text-slate-800 group-hover:text-rose-600 transition text-sm">
                            {t.id}: {t.subject}
                          </div>
                          <div className="text-xs text-slate-400">{t.customerName} • Status: {t.status}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-rose-600 transition" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div>Press ESC to exit</div>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
