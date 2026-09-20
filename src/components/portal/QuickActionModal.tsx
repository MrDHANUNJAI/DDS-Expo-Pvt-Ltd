import React, { useState } from 'react';
import {
  X,
  UserPlus,
  FileSpreadsheet,
  Briefcase,
  CheckSquare,
  Receipt,
  LifeBuoy,
  CreditCard,
} from 'lucide-react';
import { useErp } from '../../context/ErpContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickActionModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { setActiveModule, hasPermission } = useErp();

  if (!isOpen) return null;

  const actions = [
    {
      id: 'lead',
      title: 'New Lead',
      description: 'Register incoming client lead into CRM pipeline',
      icon: UserPlus,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      module: 'crm-leads',
      allowed: hasPermission('crm'),
    },
    {
      id: 'quotation',
      title: 'Create Quotation',
      description: 'Generate commercial pricing estimate with tax calculation',
      icon: FileSpreadsheet,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      module: 'sales-quotations',
      allowed: hasPermission('sales'),
    },
    {
      id: 'project',
      title: 'New Project',
      description: 'Setup deliverables, milestones and assign project team',
      icon: Briefcase,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      module: 'projects-list',
      allowed: hasPermission('projects'),
    },
    {
      id: 'task',
      title: 'Assign Task',
      description: 'Create actionable deliverable for developer or designer',
      icon: CheckSquare,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
      module: 'projects-tasks',
      allowed: hasPermission('projects'),
    },
    {
      id: 'invoice',
      title: 'Issue Invoice',
      description: 'Bill customer for milestone or monthly retainer',
      icon: Receipt,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      module: 'sales-invoices',
      allowed: hasPermission('sales'),
    },
    {
      id: 'expense',
      title: 'Record Expense',
      description: 'Log software, server, ad spend or hardware expense',
      icon: CreditCard,
      color: 'bg-rose-50 text-rose-600 border-rose-200',
      module: 'finance-expenses',
      allowed: hasPermission('finance'),
    },
    {
      id: 'ticket',
      title: 'Support Ticket',
      description: 'Log customer issue or website maintenance request',
      icon: LifeBuoy,
      color: 'bg-teal-50 text-teal-600 border-teal-200',
      module: 'support',
      allowed: hasPermission('support'),
    },
  ];

  const handleSelect = (module: string) => {
    setActiveModule(module);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-800">Quick Actions</h3>
            <p className="text-xs text-slate-400">Launch workflows directly from anywhere</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[70vh] overflow-y-auto">
          {actions.map((act) => (
            <button
              key={act.id}
              disabled={!act.allowed}
              onClick={() => handleSelect(act.module)}
              className={`p-4 rounded-xl border text-left transition flex items-start gap-3.5 group ${
                act.allowed
                  ? 'border-slate-200 hover:border-blue-500 hover:shadow-md bg-white'
                  : 'opacity-40 border-slate-100 bg-slate-50 cursor-not-allowed'
              }`}
            >
              <div className={`p-2.5 rounded-xl border shrink-0 ${act.color}`}>
                <act.icon className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-slate-800 text-sm group-hover:text-blue-600 transition flex items-center justify-between">
                  {act.title}
                  {!act.allowed && (
                    <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-normal">
                      No Access
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {act.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
