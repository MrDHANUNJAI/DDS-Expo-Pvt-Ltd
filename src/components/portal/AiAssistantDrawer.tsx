import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, AlertCircle, ShieldAlert, ArrowRight } from 'lucide-react';
import { useErp } from '../../context/ErpContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  actionModule?: string;
  time: string;
}

export const AiAssistantDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const {
    currentUser,
    leads,
    followUps,
    projects,
    tasks,
    invoices,
    customers,
    transactions,
    employees,
    hasPermission,
    setActiveModule,
  } = useErp();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hello ${currentUser.name}! I am your DDS Expo AI Business Copilot. How can I assist you with operations, projects, CRM, or performance metrics today?`,
      time: 'Just now',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const quickPrompts = [
    "Show me today's follow-ups",
    "Which invoices are overdue?",
    "How many projects are active?",
    "Which employee has the most pending tasks?",
    "Show this month's revenue",
    "Summarize Vizag Port Logistics",
  ];

  const handleSend = (textToSend?: string) => {
    const q = (textToSend || input).trim();
    if (!q) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: q,
      time: new Date().toTimeString().slice(0, 5),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAiAnswer(q);
      setIsTyping(false);
      setMessages((prev) => [...prev, response]);
    }, 450);
  };

  const generateAiAnswer = (query: string): Message => {
    const lower = query.toLowerCase();
    const timeStr = new Date().toTimeString().slice(0, 5);

    // Role security checks
    const canSeeFinance = hasPermission('finance');
    const canSeeCRM = hasPermission('crm');
    const canSeeProjects = hasPermission('projects');

    // 1. Follow-ups
    if (lower.includes('follow-up') || lower.includes('followup') || lower.includes('agenda')) {
      if (!canSeeCRM) {
        return {
          id: Date.now().toString(),
          sender: 'ai',
          text: `[Access Restricted] Your role (${currentUser.role}) does not have permission to view CRM follow-up records. Please consult the Sales Manager.`,
          time: timeStr,
        };
      }
      const today = new Date().toISOString().slice(0, 10);
      const todayFollowUps = followUps.filter((f) => f.date === today && f.status === 'Pending');
      if (todayFollowUps.length === 0) {
        return {
          id: Date.now().toString(),
          sender: 'ai',
          text: `You have no pending follow-ups scheduled for today. All scheduled client communications are up to date!`,
          actionModule: 'crm-followups',
          time: timeStr,
        };
      }
      const list = todayFollowUps
        .map((f) => `• ${f.time} - ${f.leadName} via ${f.type}: "${f.notes}" (Assigned: ${f.employeeName})`)
        .join('\n');
      return {
        id: Date.now().toString(),
        sender: 'ai',
        text: `Here are today's scheduled follow-ups:\n\n${list}\n\nWould you like me to open the CRM Follow-ups view?`,
        actionModule: 'crm-followups',
        time: timeStr,
      };
    }

    // 2. Invoices / Overdue
    if (lower.includes('invoice') || lower.includes('overdue') || lower.includes('receivable')) {
      if (!canSeeFinance) {
        return {
          id: Date.now().toString(),
          sender: 'ai',
          text: `[Access Restricted] Your role (${currentUser.role}) does not have permission to view financial invoices and accounts receivables. Please contact Accounts or Super Admin.`,
          time: timeStr,
        };
      }
      const overdue = invoices.filter((i) => i.status === 'Overdue');
      if (overdue.length === 0) {
        return {
          id: Date.now().toString(),
          sender: 'ai',
          text: `Great news! There are currently no overdue invoices in the ledger. All accounts are within credit terms.`,
          actionModule: 'sales-invoices',
          time: timeStr,
        };
      }
      const list = overdue
        .map((i) => `• ${i.id} - ${i.customerCompany}: Balance ₹${i.balanceDue.toLocaleString()} (Due: ${i.dueDate})`)
        .join('\n');
      const totalOverdue = overdue.reduce((acc, c) => acc + c.balanceDue, 0);
      return {
        id: Date.now().toString(),
        sender: 'ai',
        text: `There are ${overdue.length} overdue invoices totaling ₹${totalOverdue.toLocaleString()}:\n\n${list}\n\nRecommended Action: Send an automated WhatsApp reminder or call the client representative.`,
        actionModule: 'sales-invoices',
        time: timeStr,
      };
    }

    // 3. Projects
    if (lower.includes('project')) {
      if (!canSeeProjects) {
        return {
          id: Date.now().toString(),
          sender: 'ai',
          text: `[Access Restricted] You do not have project management view access.`,
          time: timeStr,
        };
      }
      const activeProj = projects.filter((p) => p.status === 'Active' || p.status === 'Testing');
      const list = projects
        .map((p) => `• ${p.name}: Status "${p.status}", Progress ${p.progress}%, PM: ${p.projectManagerName}`)
        .join('\n');
      return {
        id: Date.now().toString(),
        sender: 'ai',
        text: `Currently, DDS Expo has ${projects.length} total projects (${activeProj.length} in active delivery / testing):\n\n${list}`,
        actionModule: 'projects-list',
        time: timeStr,
      };
    }

    // 4. Tasks & Employee Workload
    if (lower.includes('task') || lower.includes('workload') || lower.includes('pending task')) {
      const pendingTasks = tasks.filter((t) => t.status !== 'Completed');
      const empTaskCount: { [key: string]: number } = {};
      pendingTasks.forEach((t) => {
        empTaskCount[t.assignedEmployeeName] = (empTaskCount[t.assignedEmployeeName] || 0) + 1;
      });

      let highestEmp = '';
      let maxCount = 0;
      Object.entries(empTaskCount).forEach(([name, count]) => {
        if (count > maxCount) {
          maxCount = count;
          highestEmp = name;
        }
      });

      return {
        id: Date.now().toString(),
        sender: 'ai',
        text: `There are ${pendingTasks.length} pending tasks across the team.\n\nWorkload breakdown:\n${Object.entries(
          empTaskCount
        )
          .map(([name, count]) => `• ${name}: ${count} pending tasks`)
          .join('\n')}\n\n${highestEmp} currently has the most pending items (${maxCount}).`,
        actionModule: 'projects-tasks',
        time: timeStr,
      };
    }

    // 5. Revenue / Finance
    if (lower.includes('revenue') || lower.includes('sales') || lower.includes('income')) {
      if (!canSeeFinance) {
        return {
          id: Date.now().toString(),
          sender: 'ai',
          text: `[Security Guard] Financial ledger metrics are confidential and restricted to Accounts and Executive Leadership. Your current role is "${currentUser.role}".`,
          time: timeStr,
        };
      }
      const totalIncome = transactions
        .filter((t) => t.type === 'Income')
        .reduce((sum, t) => sum + t.amount, 0);
      const totalInvoiced = invoices.reduce((sum, i) => sum + i.total, 0);
      const totalCollected = invoices.reduce((sum, i) => sum + i.amountPaid, 0);

      return {
        id: Date.now().toString(),
        sender: 'ai',
        text: `Financial Performance Overview:\n• Total Invoiced Value: ₹${totalInvoiced.toLocaleString()}\n• Total Payments Received: ₹${totalCollected.toLocaleString()}\n• Net Inflow (All transactions): ₹${totalIncome.toLocaleString()}\n• Collection Efficiency: ${Math.round(
          (totalCollected / totalInvoiced) * 100
        )}%`,
        actionModule: 'finance-income',
        time: timeStr,
      };
    }

    // 6. Client summary
    if (lower.includes('vizag') || lower.includes('client') || lower.includes('customer')) {
      const cust = customers[0];
      const custProjects = projects.filter((p) => p.customerId === cust.id);
      const custInvoices = invoices.filter((i) => i.customerId === cust.id);
      return {
        id: Date.now().toString(),
        sender: 'ai',
        text: `Client 360° Summary for ${cust.company} (${cust.name}):\n• Total Lifetime Business: ₹${cust.totalBusinessValue.toLocaleString()}\n• Active Projects: ${custProjects.length} (${custProjects.map((p) => p.name).join(', ')})\n• Invoices: ${custInvoices.length} issued\n• Location: ${cust.address}\n• Status: ${cust.status} Partner`,
        actionModule: 'crm-customers',
        time: timeStr,
      };
    }

    // General fallback
    return {
      id: Date.now().toString(),
      sender: 'ai',
      text: `Understood! I'm monitoring all connected DDS Expo databases (CRM leads, projects, tasks, attendance, and finances). You can ask me to inspect tasks, check overdue receivables, summarize clients, or audit project milestones anytime.`,
      time: timeStr,
    };
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
            <Bot className="w-5 h-5 text-blue-300" />
          </div>
          <div>
            <div className="font-semibold text-sm flex items-center gap-1.5">
              DDS AI Copilot
              <span className="text-[10px] bg-blue-500/30 text-blue-200 px-1.5 py-0.5 rounded border border-blue-400/20 font-mono">
                RBAC Active
              </span>
            </div>
            <div className="text-xs text-blue-200/80">Context-Aware ERP Intelligence</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-blue-200 hover:text-white rounded-lg hover:bg-white/10 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Role Alert Banner */}
      <div className="bg-slate-50 border-b border-slate-200/80 px-4 py-2 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Logged in as: <strong className="text-slate-800">{currentUser.name}</strong> ({currentUser.role})
        </div>
        <div className="text-slate-400 text-[11px]">Real-time grounding</div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none shadow-sm'
                  : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/60'
              }`}
            >
              <div className="whitespace-pre-line">{m.text}</div>
              {m.actionModule && (
                <button
                  onClick={() => {
                    setActiveModule(m.actionModule!);
                    onClose();
                  }}
                  className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white text-blue-700 rounded-lg shadow-sm border border-slate-200 hover:bg-blue-50 transition"
                >
                  Go to {m.actionModule.replace('-', ' ').toUpperCase()}
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs px-2">
            <Sparkles className="w-4 h-4 text-blue-500 animate-spin" />
            <span>AI Copilot is analyzing ERP data...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Suggested Queries
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="text-xs whitespace-nowrap px-2.5 py-1 bg-white hover:bg-blue-50 hover:text-blue-600 border border-slate-200 rounded-full text-slate-600 transition shadow-2xs shrink-0"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-200 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask about tasks, clients, leads, metrics..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl transition shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
